from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient


class CatalogApiTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command('import_content', verbosity=0)

    def setUp(self):
        self.client = APIClient()

    def test_subject_list(self):
        response = self.client.get('/api/v1/subjects')
        self.assertEqual(response.status_code, 200)
        slugs = {row['slug'] for row in response.data}
        # P4：110 科目录导入后，列表不再只有三个精讲科目
        self.assertGreaterEqual(len(slugs), 110)
        self.assertTrue({'analysis', 'dl', 'la'} <= slugs)
        self.assertIn('public', response.headers['Cache-Control'])

    def test_subject_detail_has_units_and_lessons(self):
        response = self.client.get('/api/v1/subjects/analysis')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title']['zh'], '数学分析')
        self.assertEqual(len(response.data['units']), 16)
        self.assertEqual(response.data['units'][0]['lessons'][0]['slug'], 'analysis-set')
        self.assertEqual(response.data['units'][0]['lessons'][0]['path'], '/read/analysis/u01/1')

    def test_lesson_detail_defaults_to_mastery_zh(self):
        response = self.client.get('/api/v1/lessons/analysis/u01/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['mode'], 'mastery')
        self.assertEqual(response.data['lang'], 'zh')
        self.assertGreaterEqual(len(response.data['sections']), 8)
        self.assertEqual(response.data['sections'][0]['id'], 'sec-1')
        self.assertEqual(response.data['sections'][0]['label'], '01')
        self.assertTrue(response.data['sections'][0]['html'])

    def test_lesson_english_variant(self):
        response = self.client.get('/api/v1/lessons/analysis/u01/1?lang=en')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['lang'], 'en')
        self.assertEqual(response.data['title'], 'Sets and Operations')

    def test_lesson_keeps_math_markup(self):
        response = self.client.get('/api/v1/lessons/la/u01/1')
        self.assertEqual(response.status_code, 200)
        body = ' '.join(section['html'] for section in response.data['sections'])
        self.assertIn('class="math-display"', body)
        self.assertIn('class="math-inline"', body)
        self.assertNotIn('OPUSMATH', body)

    def test_lesson_renders_markdown_blocks(self):
        response = self.client.get('/api/v1/lessons/analysis/u01/1')
        self.assertEqual(response.status_code, 200)
        body = ' '.join(section['html'] for section in response.data['sections'])
        self.assertIn('class="myth"', body)
        self.assertIn('class="ex"', body)
        self.assertIn('class="table-wrap"', body)
        self.assertNotIn('<p class="lead">', body)
        self.assertNotIn('<!-- section', body)

    def test_missing_variant_returns_variants(self):
        response = self.client.get('/api/v1/lessons/analysis/u01/1?mode=literacy')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data['variants'], {'mastery': ['en', 'zh']})

    def test_graph_has_nodes_and_edges(self):
        response = self.client.get('/api/v1/graph')
        self.assertEqual(response.status_code, 200)
        self.assertGreater(len(response.data['nodes']), 5)
        self.assertTrue(response.data['edges'])

    def test_import_is_idempotent(self):
        call_command('import_content', verbosity=0)
        response = self.client.get('/api/v1/lessons/analysis/u01/1')
        self.assertEqual(len(response.data['sections']), 10)


class LearningApiTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        call_command('import_content', verbosity=0)

    def setUp(self):
        self.client = APIClient()

    def register(self, username='reader', password='opuscule-2026'):
        response = self.client.post(
            '/api/v1/auth/register',
            {'username': username, 'password': password},
            format='json',
        )
        self.assertEqual(response.status_code, 201, response.data)
        return response

    def test_anonymous_has_no_account(self):
        response = self.client.get('/api/v1/auth/me')
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.data['user'])

    def test_register_login_logout(self):
        self.register()
        self.assertEqual(self.client.get('/api/v1/auth/me').data['user']['username'], 'reader')

        self.client.post('/api/v1/auth/logout')
        self.assertIsNone(self.client.get('/api/v1/auth/me').data['user'])

        response = self.client.post(
            '/api/v1/auth/login',
            {'username': 'reader', 'password': 'opuscule-2026'},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['username'], 'reader')

    def test_progress_survives_new_browser_session(self):
        self.register()
        response = self.client.post(
            '/api/v1/progress',
            {'lesson': 'analysis-set', 'mode': 'mastery', 'completed': True},
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['stats']['lessons_read'], 1)

        # 新客户端 = 换浏览器，只要重新登录，进度就还在
        other = APIClient()
        other.post(
            '/api/v1/auth/login',
            {'username': 'reader', 'password': 'opuscule-2026'},
            format='json',
        )
        data = other.get('/api/v1/progress').data
        self.assertEqual([row['lesson'] for row in data['lessons']], ['analysis-set'])
        self.assertTrue(data['lessons'][0]['completed'])
        self.assertEqual(data['stats']['lessons_read'], 1)

    def test_progress_is_stored_per_mode(self):
        self.register()
        for mode in ('mastery', 'applied'):
            self.client.post(
                '/api/v1/progress',
                {'lesson': 'analysis-set', 'mode': mode, 'completed': True},
                format='json',
            )
        data = self.client.get('/api/v1/progress').data
        self.assertEqual({row['mode'] for row in data['lessons']}, {'mastery', 'applied'})
        self.assertEqual(data['stats']['lessons_read'], 2)

    def test_anonymous_progress_is_rejected(self):
        self.assertEqual(self.client.get('/api/v1/progress').status_code, 403)

    def test_grade_uses_real_fsrs_interval(self):
        self.register()
        response = self.client.post('/api/v1/review/backprop/grade', {'rating': 3}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['rating'], 3)
        self.assertEqual(response.data['interval_days'], 3)
        self.assertEqual(response.data['reps'], 1)
        self.assertGreater(response.data['mastery'], 0)

        again = self.client.post('/api/v1/review/backprop/grade', {'rating': 1}, format='json')
        self.assertEqual(again.status_code, 200)
        self.assertEqual(again.data['interval_days'], 1)
        self.assertEqual(again.data['lapses'], 1)
        self.assertEqual(again.data['state'], 'relearning')

    def test_queue_orders_due_cards_first(self):
        self.register()
        self.client.post('/api/v1/review/backprop/grade', {'rating': 3}, format='json')
        queue = self.client.get('/api/v1/review/queue').data
        nodes = self.client.get('/api/v1/graph').data['nodes']
        self.assertEqual(len(queue['cards']), len(nodes))
        # 新卡今天到期，排在已排期到三天后的 backprop 之前
        self.assertTrue(queue['cards'][0]['due_now'])
        self.assertEqual(queue['cards'][0]['state'], 'new')
        last = queue['cards'][-1]
        self.assertEqual(last['concept'], 'backprop')
        self.assertFalse(last['due_now'])
        self.assertEqual(last['previews']['3'], 3)
        self.assertEqual(queue['stats']['reviewed'], 1)

    def test_merge_uploads_local_progress_without_overwriting_cards(self):
        self.register()
        self.client.post('/api/v1/review/backprop/grade', {'rating': 3}, format='json')
        before = self.client.get('/api/v1/review/queue').data['cards'][-1]

        response = self.client.post(
            '/api/v1/progress/merge',
            {
                'lessons': [{'lesson': 'analysis-set', 'mode': 'mastery'}],
                'reviews': [
                    {'concept': 'backprop', 'rating': 1, 'due': '2020-01-01T00:00:00Z'},
                    {'concept': 'grad', 'rating': 2, 'due': '2020-01-01T00:00:00Z'},
                ],
            },
            format='json',
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['merged_lessons'], 1)
        self.assertEqual(response.data['merged_cards'], 1)
        self.assertEqual(response.data['stats']['reviewed'], 2)

        cards = {row['concept']: row for row in self.client.get('/api/v1/review/queue').data['cards']}
        self.assertEqual(cards['backprop']['due'], before['due'])
        self.assertEqual(cards['grad']['due_now'], True)
