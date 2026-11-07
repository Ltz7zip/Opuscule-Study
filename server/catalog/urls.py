from django.urls import path

from catalog import views

urlpatterns = [
    path('subjects', views.SubjectListView.as_view(), name='subject-list'),
    path('subjects/<slug:slug>', views.SubjectDetailView.as_view(), name='subject-detail'),
    path('lessons', views.LessonListView.as_view(), name='lesson-list'),
    path(
        'lessons/<slug:subject>/<slug:unit>/<int:ordinal>',
        views.LessonDetailView.as_view(),
        name='lesson-detail',
    ),
    path('concepts', views.ConceptListView.as_view(), name='concept-list'),
    path('graph', views.GraphView.as_view(), name='concept-graph'),
    # 账号
    path('auth/csrf', views.CsrfView.as_view(), name='auth-csrf'),
    path('auth/register', views.RegisterView.as_view(), name='auth-register'),
    path('auth/login', views.LoginView.as_view(), name='auth-login'),
    path('auth/logout', views.LogoutView.as_view(), name='auth-logout'),
    path('auth/me', views.MeView.as_view(), name='auth-me'),
    # 学习进度
    path('progress', views.ProgressView.as_view(), name='progress'),
    path('progress/merge', views.ProgressMergeView.as_view(), name='progress-merge'),
    # 复习
    path('review/queue', views.ReviewQueueView.as_view(), name='review-queue'),
    path('review/<slug:slug>/grade', views.ReviewGradeView.as_view(), name='review-grade'),
]
