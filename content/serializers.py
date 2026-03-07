from rest_framework import serializers
from .models import Article
from thesaurus.serializers import ThesaurusTermSerializer

class ArticleSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    tags_detail = ThesaurusTermSerializer(source='tags', many=True, read_only=True)

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'author', 'author_name', 'tags', 'tags_detail']
