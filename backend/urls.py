from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from thesaurus.views import ThesaurusTermViewSet, TermRelationViewSet
from map.views import MapNodeViewSet, MapEdgeViewSet
from content.views import ArticleViewSet
from quizzes.views import QuizViewSet, QuizResultViewSet

router = DefaultRouter()
router.register(r'terms', ThesaurusTermViewSet, basename='term')
router.register(r'term-relations', TermRelationViewSet, basename='term-relation')
router.register(r'map-nodes', MapNodeViewSet, basename='map-node')
router.register(r'map-edges', MapEdgeViewSet, basename='map-edge')
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'quiz-results', QuizResultViewSet, basename='quiz-result')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
]
