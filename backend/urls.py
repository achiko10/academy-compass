from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from thesaurus.views import ThesaurusTermViewSet, TermRelationViewSet
from map.views import MapNodeViewSet, MapEdgeViewSet
from content.views import ArticleViewSet, ResourceCategoryViewSet, SkillViewSet
from quizzes.views import QuizViewSet, QuizResultViewSet
from community.views import PostViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'terms', ThesaurusTermViewSet, basename='term')
router.register(r'term-relations', TermRelationViewSet, basename='term-relation')
router.register(r'map-nodes', MapNodeViewSet, basename='map-node')
router.register(r'map-edges', MapEdgeViewSet, basename='map-edge')
router.register(r'articles', ArticleViewSet, basename='article')
router.register(r'resources', ResourceCategoryViewSet, basename='resource')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'quizzes', QuizViewSet, basename='quiz')
router.register(r'quiz-results', QuizResultViewSet, basename='quiz-result')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth/', include('accounts.urls')),  # JWT Auth endpoints
]
