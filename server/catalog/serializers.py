from rest_framework import serializers

from catalog.models import Concept, Lesson, LessonDoc, Subject, Unit


class BilingualMixin(serializers.Serializer):
    title = serializers.SerializerMethodField()
    desc = serializers.SerializerMethodField()

    def get_title(self, obj):
        return {'zh': obj.title_zh, 'en': obj.title_en}

    def get_desc(self, obj):
        return {'zh': obj.desc_zh, 'en': obj.desc_en}


class ConceptSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    definition = serializers.SerializerMethodField()

    class Meta:
        model = Concept
        fields = ['slug', 'title', 'definition', 'field', 'x', 'y']

    def get_title(self, obj):
        return {'zh': obj.title_zh, 'en': obj.title_en}

    def get_definition(self, obj):
        return {'zh': obj.def_zh, 'en': obj.def_en}


class LessonSummarySerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    modes = serializers.SerializerMethodField()
    concepts = serializers.SerializerMethodField()
    path = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['slug', 'path', 'ordinal', 'title', 'modes', 'concepts']

    def get_path(self, obj):
        return f'/read/{obj.unit.subject.slug}/{obj.unit.slug}/{obj.ordinal}'

    def get_title(self, obj):
        docs = list(obj.docs.all())
        zh = next((d for d in docs if d.lang == 'zh'), None)
        en = next((d for d in docs if d.lang == 'en'), None)
        fallback = zh or en
        return {
            'zh': zh.title if zh else (fallback.title if fallback else obj.slug),
            'en': en.title if en else (zh.title if zh else obj.slug),
        }

    def get_modes(self, obj):
        modes = {}
        for doc in obj.docs.all():
            modes.setdefault(doc.mode, []).append(doc.lang)
        return modes

    def get_concepts(self, obj):
        return [
            {'slug': c.slug, 'title': {'zh': c.title_zh, 'en': c.title_en}}
            for c in obj.concepts.all()
        ]


class UnitSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    lessons = serializers.SerializerMethodField()

    class Meta:
        model = Unit
        fields = ['slug', 'ordinal', 'title', 'lessons']

    def get_title(self, obj):
        return {'zh': obj.title_zh, 'en': obj.title_en}

    def get_lessons(self, obj):
        return LessonSummarySerializer(obj.lessons.all(), many=True).data


class SubjectListSerializer(BilingualMixin, serializers.ModelSerializer):
    counts = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = [
            'slug', 'code', 'title', 'desc', 'tag', 'textbook',
            'status', 'modes', 'counts',
        ]

    def get_counts(self, obj):
        # 列表接口在 queryset 上 annotate 了 *_count，避免 110 科逐个发查询
        units = getattr(obj, 'unit_count', None)
        lessons = getattr(obj, 'lesson_count', None)
        concepts = getattr(obj, 'concept_count', None)
        return {
            'units': units if units is not None else obj.units.count(),
            'lessons': lessons if lessons is not None
            else Lesson.objects.filter(unit__subject=obj).count(),
            'concepts': concepts if concepts is not None
            else Concept.objects.filter(lessons__unit__subject=obj).distinct().count(),
        }


class SubjectDetailSerializer(SubjectListSerializer):
    units = UnitSerializer(many=True, read_only=True)

    class Meta(SubjectListSerializer.Meta):
        fields = SubjectListSerializer.Meta.fields + ['units']


class LessonDocSerializer(serializers.ModelSerializer):
    sections = serializers.SerializerMethodField()

    class Meta:
        model = LessonDoc
        fields = [
            'mode', 'lang', 'kicker', 'title', 'subtitle', 'minutes', 'meta',
            'sections', 'updated_at',
        ]

    def get_sections(self, obj):
        return [
            {'id': s.anchor, 'label': s.label, 'title': s.title, 'html': s.html}
            for s in obj.sections.all()
        ]


class LessonDetailSerializer(serializers.ModelSerializer):
    subject = serializers.SerializerMethodField()
    unit = serializers.SerializerMethodField()
    concepts = ConceptSerializer(many=True, read_only=True)
    prereq = ConceptSerializer(many=True, read_only=True)
    related = ConceptSerializer(many=True, read_only=True)
    path = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = ['slug', 'path', 'ordinal', 'subject', 'unit', 'concepts', 'prereq', 'related']

    def get_path(self, obj):
        return f'/read/{obj.unit.subject.slug}/{obj.unit.slug}/{obj.ordinal}'

    def get_subject(self, obj):
        subject = obj.unit.subject
        return {
            'slug': subject.slug,
            'code': subject.code,
            'title': {'zh': subject.title_zh, 'en': subject.title_en},
        }

    def get_unit(self, obj):
        return {
            'slug': obj.unit.slug,
            'title': {'zh': obj.unit.title_zh, 'en': obj.unit.title_en},
        }
