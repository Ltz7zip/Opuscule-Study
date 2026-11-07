"""opuscule URL Configuration."""
from pathlib import Path

from django.conf import settings
from django.contrib import admin
from django.http import FileResponse, JsonResponse
from django.urls import include, path, re_path
from django.views.static import serve

SITE_DIST = Path(settings.BASE_DIR).parent / 'site' / 'dist'


def spa_index(request):
    """把前端构建产物作为 SPA 入口，/zh/、/en/ 等路径都交给客户端路由。"""
    index = SITE_DIST / 'index.html'
    if not index.exists():
        return JsonResponse(
            {'detail': '前端尚未构建：在 site/ 目录执行 npm run build'},
            status=503,
        )
    return FileResponse(index.open('rb'), content_type='text/html; charset=utf-8')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('catalog.urls')),
    re_path(
        r'^assets/(?P<path>.*)$',
        serve,
        {'document_root': SITE_DIST / 'assets'},
    ),
    re_path(r'^(?!api/|admin/|assets/).*$', spa_index, name='spa'),
]
