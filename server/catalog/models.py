from django.conf import settings
from django.db import models


class Concept(models.Model):
    slug = models.SlugField(max_length=60, unique=True)
    title_zh = models.CharField(max_length=80)
    title_en = models.CharField(max_length=120, blank=True)
    def_zh = models.TextField(blank=True)
    def_en = models.TextField(blank=True)
    field = models.CharField(max_length=40, blank=True)
    x = models.FloatField(default=0)
    y = models.FloatField(default=0)

    class Meta:
        ordering = ['slug']

    def __str__(self):
        return self.title_zh


class ConceptEdge(models.Model):
    class Kind(models.TextChoices):
        PREREQ = 'prereq', '前置'
        USED_BY = 'used_by', '被使用'

    source = models.ForeignKey(Concept, on_delete=models.CASCADE, related_name='outgoing')
    target = models.ForeignKey(Concept, on_delete=models.CASCADE, related_name='incoming')
    kind = models.CharField(max_length=12, choices=Kind.choices, default=Kind.PREREQ)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['source', 'target', 'kind'], name='unique_concept_edge')
        ]

    def __str__(self):
        return f'{self.source.slug} -> {self.target.slug} ({self.kind})'


class Subject(models.Model):
    class Status(models.TextChoices):
        ACTIVE = 'active', '精讲中'
        OUTLINE = 'outline', '仅目录'
        PENDING = 'outline_pending', '目录待补'
        DEMO = 'demo', '示例'

    code = models.CharField(max_length=16, unique=True)
    slug = models.SlugField(max_length=80, unique=True)
    title_zh = models.CharField(max_length=80)
    title_en = models.CharField(max_length=120, blank=True)
    tag = models.CharField(max_length=20, blank=True)
    desc_zh = models.TextField(blank=True)
    desc_en = models.TextField(blank=True)
    textbook = models.CharField(max_length=200, blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.OUTLINE)
    modes = models.JSONField(default=list)
    ordinal = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['ordinal', 'code']

    def __str__(self):
        return f'{self.code} {self.title_zh}'


class Unit(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='units')
    slug = models.SlugField(max_length=40)
    ordinal = models.PositiveIntegerField(default=0)
    title_zh = models.CharField(max_length=120)
    title_en = models.CharField(max_length=160, blank=True)

    class Meta:
        ordering = ['ordinal']
        constraints = [
            models.UniqueConstraint(fields=['subject', 'slug'], name='unique_unit_per_subject')
        ]

    def __str__(self):
        return f'{self.subject.code} / {self.title_zh}'


class Lesson(models.Model):
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='lessons')
    slug = models.SlugField(max_length=80, unique=True)
    ordinal = models.PositiveIntegerField(default=0)
    concepts = models.ManyToManyField(Concept, blank=True, related_name='lessons')
    prereq = models.ManyToManyField(Concept, blank=True, related_name='prereq_lessons')
    related = models.ManyToManyField(Concept, blank=True, related_name='related_lessons')

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return self.slug


class LessonDoc(models.Model):
    class Mode(models.TextChoices):
        MASTERY = 'mastery', '专业'
        APPLIED = 'applied', '应用'
        LITERACY = 'literacy', '通识'

    class Lang(models.TextChoices):
        ZH = 'zh', '中文'
        EN = 'en', 'English'

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='docs')
    mode = models.CharField(max_length=12, choices=Mode.choices)
    lang = models.CharField(max_length=4, choices=Lang.choices)
    kicker = models.CharField(max_length=120, blank=True)
    title = models.CharField(max_length=160)
    subtitle = models.CharField(max_length=240, blank=True)
    minutes = models.PositiveIntegerField(default=0)
    meta = models.JSONField(default=list)
    body_md = models.TextField(blank=True)
    prev_title = models.CharField(max_length=80, blank=True)
    prev_href = models.CharField(max_length=200, blank=True)
    next_title = models.CharField(max_length=80, blank=True)
    next_href = models.CharField(max_length=200, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['lesson__ordinal']
        constraints = [
            models.UniqueConstraint(fields=['lesson', 'mode', 'lang'], name='unique_doc_variant')
        ]

    def __str__(self):
        return f'{self.lesson.slug} [{self.mode}/{self.lang}]'


class LessonSection(models.Model):
    doc = models.ForeignKey(LessonDoc, on_delete=models.CASCADE, related_name='sections')
    ordinal = models.PositiveIntegerField(default=0)
    anchor = models.SlugField(max_length=60)
    label = models.CharField(max_length=20, blank=True)
    title = models.CharField(max_length=160)
    html = models.TextField()

    class Meta:
        ordering = ['ordinal']

    def __str__(self):
        return f'{self.doc.lesson.slug}#{self.anchor}'


class LessonProgress(models.Model):
    """某用户在某模式下读完某讲。三种模式互不影响。"""

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress')
    mode = models.CharField(max_length=12, choices=LessonDoc.Mode.choices, default=LessonDoc.Mode.MASTERY)
    completed = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['lesson__ordinal']
        constraints = [
            models.UniqueConstraint(fields=['user', 'lesson', 'mode'], name='unique_progress_per_mode')
        ]

    def __str__(self):
        return f'{self.user} / {self.lesson.slug} [{self.mode}] {"done" if self.completed else "todo"}'


class ReviewCard(models.Model):
    """FSRS 卡片状态。一个用户对一个概念只有一张卡。"""

    class State(models.TextChoices):
        NEW = 'new', '新卡'
        LEARNING = 'learning', '学习中'
        REVIEW = 'review', '复习'
        RELEARNING = 'relearning', '重学'

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review_cards')
    concept = models.ForeignKey(Concept, on_delete=models.CASCADE, related_name='review_cards')
    due = models.DateTimeField(db_index=True)
    state = models.CharField(max_length=12, choices=State.choices, default=State.NEW)
    stability = models.FloatField(default=0)
    difficulty = models.FloatField(default=0)
    reps = models.PositiveIntegerField(default=0)
    lapses = models.PositiveIntegerField(default=0)
    last_review = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['due', 'concept__slug']
        constraints = [
            models.UniqueConstraint(fields=['user', 'concept'], name='unique_card_per_concept')
        ]

    def __str__(self):
        return f'{self.user} / {self.concept.slug} due {self.due:%Y-%m-%d}'
