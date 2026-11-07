from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from catalog import srs
from catalog.models import (
    Concept, ConceptEdge, Lesson, LessonDoc, LessonProgress, ReviewCard, Subject,
)
from catalog.serializers import (
    ConceptSerializer,
    LessonDetailSerializer,
    LessonDocSerializer,
    LessonSummarySerializer,
    SubjectDetailSerializer,
    SubjectListSerializer,
)

CACHE_HEADERS = {'Cache-Control': 'public, max-age=300'}


class SubjectListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        subjects = Subject.objects.annotate(
            unit_count=Count('units', distinct=True),
            lesson_count=Count('units__lessons', distinct=True),
            concept_count=Count('units__lessons__concepts', distinct=True),
        ).order_by('ordinal', 'code').prefetch_related('units__lessons__docs', 'units__lessons__concepts')
        tag = request.query_params.get('tag')
        if tag:
            subjects = subjects.filter(tag=tag)
        expand = request.query_params.get('expand') in {'units', '1', 'true'}
        serializer = SubjectDetailSerializer if expand else SubjectListSerializer
        data = serializer(subjects, many=True).data
        return Response(data, headers=CACHE_HEADERS)


class SubjectDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, slug):
        subject = get_object_or_404(
            Subject.objects.prefetch_related('units__lessons__docs'), slug=slug
        )
        return Response(SubjectDetailSerializer(subject).data, headers=CACHE_HEADERS)


class LessonListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        lessons = Lesson.objects.select_related('unit__subject').prefetch_related(
            'docs', 'concepts'
        )
        data = []
        for lesson in lessons:
            row = LessonSummarySerializer(lesson).data
            subject = lesson.unit.subject
            row['subject'] = {
                'slug': subject.slug,
                'code': subject.code,
                'title': {'zh': subject.title_zh, 'en': subject.title_en},
            }
            row['unit'] = {
                'slug': lesson.unit.slug,
                'title': {'zh': lesson.unit.title_zh, 'en': lesson.unit.title_en},
            }
            data.append(row)
        return Response(data, headers=CACHE_HEADERS)


class LessonDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, subject, unit, ordinal):
        lesson = get_object_or_404(
            Lesson.objects.select_related('unit__subject').prefetch_related(
                'docs__sections', 'concepts', 'prereq', 'related'
            ),
            unit__subject__slug=subject,
            unit__slug=unit,
            ordinal=ordinal,
        )
        mode = request.query_params.get('mode') or LessonDoc.Mode.MASTERY
        lang = request.query_params.get('lang') or LessonDoc.Lang.ZH

        variants = {}
        for doc in lesson.docs.all():
            variants.setdefault(doc.mode, set()).add(doc.lang)
        variants = {mode_key: sorted(langs) for mode_key, langs in variants.items()}

        doc = next((d for d in lesson.docs.all() if d.mode == mode and d.lang == lang), None)
        if doc is None:
            return Response(
                {
                    'detail': f'该讲暂无 {mode}/{lang} 版本',
                    'variants': variants,
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        payload = LessonDetailSerializer(lesson).data
        payload.update(LessonDocSerializer(doc).data)
        payload['prev'] = {'title': doc.prev_title, 'href': doc.prev_href}
        payload['next'] = {'title': doc.next_title, 'href': doc.next_href}
        payload['variants'] = variants
        return Response(payload, headers=CACHE_HEADERS)


class ConceptListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = ConceptSerializer(Concept.objects.all(), many=True).data
        return Response(data, headers=CACHE_HEADERS)


class GraphView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        nodes = ConceptSerializer(Concept.objects.all(), many=True).data
        # 同一关系在源文件里可能同时写成 prereq 与 used_by，图只保留有向的前置边
        edges = [
            {'source': e.source.slug, 'target': e.target.slug, 'kind': e.kind}
            for e in ConceptEdge.objects.filter(kind=ConceptEdge.Kind.PREREQ).select_related('source', 'target')
        ]
        return Response({'nodes': nodes, 'edges': edges}, headers=CACHE_HEADERS)


# ---------------------------------------------------------------- 账号

def _user_payload(user):
    return {'username': user.username, 'joined': user.date_joined.isoformat()}


def _aware(value):
    if not value:
        return None
    parsed = parse_datetime(str(value))
    if parsed is None:
        return None
    if timezone.is_naive(parsed):
        parsed = timezone.make_aware(parsed)
    return parsed


@method_decorator(ensure_csrf_cookie, name='dispatch')
class CsrfView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return Response({'ok': True})


class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = str(request.data.get('username') or '').strip()
        password = str(request.data.get('password') or '')
        if not username or not password:
            return Response({'detail': '用户名和密码都不能为空'}, status=status.HTTP_400_BAD_REQUEST)
        if len(username) < 2 or len(username) > 30:
            return Response({'detail': '用户名需要 2 到 30 个字符'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username__iexact=username).exists():
            return Response({'detail': '这个用户名已经被占用'}, status=status.HTTP_400_BAD_REQUEST)
        candidate = User(username=username)
        try:
            validate_password(password, candidate)
        except ValidationError as exc:
            return Response(
                {'detail': ' '.join(exc.messages), 'errors': exc.messages},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = User.objects.create_user(username=username, password=password)
        login(request, user)
        return Response({'user': _user_payload(user)}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        username = str(request.data.get('username') or '').strip()
        password = str(request.data.get('password') or '')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response({'detail': '用户名或密码不正确'}, status=status.HTTP_400_BAD_REQUEST)
        login(request, user)
        return Response({'user': _user_payload(user)})


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class MeView(APIView):
    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        return Response({'user': _user_payload(user) if user else None})


# ------------------------------------------------------------ 学习进度

def _stats(user):
    lessons_read = LessonProgress.objects.filter(user=user, completed=True).count()
    cards = list(ReviewCard.objects.filter(user=user, reps__gt=0))
    now = timezone.now()
    due = sum(1 for card in cards if card.due <= now)
    average = round(sum(srs.mastery(card.stability) for card in cards) / len(cards)) if cards else 0
    return {
        'lessons_read': lessons_read,
        'reviewed': len(cards),
        'due': due,
        'avg_mastery': average,
    }


def _lesson_row(row):
    return {
        'lesson': row.lesson.slug,
        'mode': row.mode,
        'completed': row.completed,
        'updated_at': row.updated_at.isoformat(),
    }


class ProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rows = LessonProgress.objects.filter(user=request.user).select_related('lesson')
        return Response({'lessons': [_lesson_row(row) for row in rows], 'stats': _stats(request.user)})

    def post(self, request):
        slug = str(request.data.get('lesson') or '')
        mode = str(request.data.get('mode') or LessonDoc.Mode.MASTERY)
        completed = bool(request.data.get('completed', True))
        if mode not in LessonDoc.Mode.values:
            return Response({'detail': '未知的学习模式'}, status=status.HTTP_400_BAD_REQUEST)
        lesson = get_object_or_404(Lesson, slug=slug)
        row, _ = LessonProgress.objects.update_or_create(
            user=request.user, lesson=lesson, mode=mode, defaults={'completed': completed},
        )
        return Response({'lesson': _lesson_row(row), 'stats': _stats(request.user)})


class ProgressMergeView(APIView):
    """把未登录时存在本地的阅读/复习记录并入账号，只补空缺，不覆盖服务器上更新的卡。"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        lessons = request.data.get('lessons') or []
        reviews = request.data.get('reviews') or []
        merged_lessons = 0
        merged_cards = 0

        for item in lessons:
            if not isinstance(item, dict):
                continue
            slug = str(item.get('lesson') or '')
            mode = str(item.get('mode') or LessonDoc.Mode.MASTERY)
            if not slug or mode not in LessonDoc.Mode.values:
                continue
            lesson = Lesson.objects.filter(slug=slug).first()
            if lesson is None:
                continue
            _, created = LessonProgress.objects.update_or_create(
                user=request.user, lesson=lesson, mode=mode, defaults={'completed': True},
            )
            merged_lessons += 1 if created else 0

        now = timezone.now()
        for item in reviews:
            if not isinstance(item, dict):
                continue
            concept = Concept.objects.filter(slug=str(item.get('concept') or '')).first()
            if concept is None or ReviewCard.objects.filter(user=request.user, concept=concept).exists():
                continue
            try:
                rating = int(item.get('rating') or 3)
            except (TypeError, ValueError):
                rating = 3
            rating = min(3, max(1, rating))
            due = _aware(item.get('due')) or now
            last_review = _aware(item.get('at')) or now
            ReviewCard.objects.create(
                user=request.user,
                concept=concept,
                due=due,
                state=ReviewCard.State.REVIEW,
                stability=srs.init_stability(rating),
                difficulty=srs.init_difficulty(rating),
                reps=1,
                lapses=1 if rating == 1 else 0,
                last_review=last_review,
            )
            merged_cards += 1

        return Response({
            'merged_lessons': merged_lessons,
            'merged_cards': merged_cards,
            'stats': _stats(request.user),
        })


# ---------------------------------------------------------------- 复习

def _card_payload(concept, card):
    now = timezone.now()
    fresh = card is None or card.reps <= 0
    stability = 0.0 if fresh else card.stability
    difficulty = 0.0 if fresh else card.difficulty
    reps = 0 if fresh else card.reps
    last_review = None if fresh else card.last_review
    return {
        'concept': concept.slug,
        'due': None if fresh else card.due.isoformat(),
        'state': 'new' if fresh else card.state,
        'stability': round(stability, 4),
        'difficulty': round(difficulty, 4),
        'reps': reps,
        'lapses': 0 if fresh else card.lapses,
        'last_review': last_review.isoformat() if last_review else None,
        'mastery': srs.mastery(stability),
        'due_now': fresh or card.due <= now,
        'previews': srs.preview(
            stability=stability, difficulty=difficulty, reps=reps,
            lapses=0 if fresh else card.lapses, last_review=last_review, now=now,
        ),
    }


class ReviewQueueView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cards = {
            card.concept.slug: card
            for card in ReviewCard.objects.filter(user=request.user).select_related('concept')
        }
        rows = [_card_payload(concept, cards.get(concept.slug)) for concept in Concept.objects.all()]
        rows.sort(key=lambda row: (not row['due_now'], row['due'] or '', row['concept']))
        return Response({
            'cards': rows,
            'stats': _stats(request.user),
            'generated_at': timezone.now().isoformat(),
        })


class ReviewGradeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        concept = get_object_or_404(Concept, slug=slug)
        try:
            rating = int(request.data.get('rating'))
        except (TypeError, ValueError):
            return Response({'detail': '评分必须是 1、2 或 3'}, status=status.HTTP_400_BAD_REQUEST)
        if rating not in srs.RATINGS:
            return Response({'detail': '评分必须是 1、2 或 3'}, status=status.HTTP_400_BAD_REQUEST)

        card, _ = ReviewCard.objects.get_or_create(
            user=request.user,
            concept=concept,
            defaults={'due': timezone.now(), 'state': ReviewCard.State.NEW},
        )
        result = srs.schedule(
            stability=card.stability,
            difficulty=card.difficulty,
            reps=card.reps,
            lapses=card.lapses,
            last_review=card.last_review,
            rating=rating,
        )
        card.stability = result['stability']
        card.difficulty = result['difficulty']
        card.state = result['state']
        card.reps = result['reps']
        card.lapses = result['lapses']
        card.last_review = result['last_review']
        card.due = result['due']
        card.save()

        payload = _card_payload(concept, card)
        payload['rating'] = rating
        payload['interval_days'] = result['interval_days']
        payload['stats'] = _stats(request.user)
        return Response(payload)
