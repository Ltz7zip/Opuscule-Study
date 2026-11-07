from django.contrib import admin

from catalog.models import (
    Concept,
    ConceptEdge,
    Lesson,
    LessonDoc,
    LessonProgress,
    LessonSection,
    ReviewCard,
    Subject,
    Unit,
)


class UnitInline(admin.TabularInline):
    model = Unit
    extra = 0


class LessonSectionInline(admin.TabularInline):
    model = LessonSection
    extra = 0


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ['code', 'slug', 'title_zh', 'status', 'tag']
    list_filter = ['status', 'tag']
    search_fields = ['code', 'slug', 'title_zh', 'title_en', 'textbook']
    inlines = [UnitInline]


@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ['subject', 'slug', 'title_zh', 'ordinal']
    list_filter = ['subject']


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['slug', 'unit', 'ordinal']
    search_fields = ['slug']


@admin.register(LessonDoc)
class LessonDocAdmin(admin.ModelAdmin):
    list_display = ['lesson', 'mode', 'lang', 'title', 'minutes', 'updated_at']
    list_filter = ['mode', 'lang']
    search_fields = ['title', 'lesson__slug']
    inlines = [LessonSectionInline]


@admin.register(Concept)
class ConceptAdmin(admin.ModelAdmin):
    list_display = ['slug', 'title_zh', 'title_en', 'field']
    search_fields = ['slug', 'title_zh', 'title_en']


@admin.register(ConceptEdge)
class ConceptEdgeAdmin(admin.ModelAdmin):
    list_display = ['source', 'target', 'kind']
    list_filter = ['kind']


@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'mode', 'completed', 'updated_at']
    list_filter = ['mode', 'completed']


@admin.register(ReviewCard)
class ReviewCardAdmin(admin.ModelAdmin):
    list_display = ['user', 'concept', 'state', 'due', 'stability', 'difficulty', 'reps', 'lapses']
    list_filter = ['state']
    search_fields = ['user__username', 'concept__slug']
