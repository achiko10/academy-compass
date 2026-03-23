from rest_framework import serializers
from .models import Article, ResourceCategory, Resource, Skill
from thesaurus.serializers import ThesaurusTermSerializer

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    tags_detail = ThesaurusTermSerializer(source='tags', many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'author', 'author_name', 'tags', 'tags_detail']

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'title', 'url']

class ResourceCategorySerializer(serializers.ModelSerializer):
    items = ResourceSerializer(many=True, read_only=True)

    class Meta:
        model = ResourceCategory
        fields = ['id', 'title', 'items']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'title', 'level', 'description']
