from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, Comment


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'body', 'author_username', 'created_at']
        read_only_fields = ['author_username', 'created_at']


class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)
    comment_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author_username', 'created_at', 'updated_at', 'comment_count']
        read_only_fields = ['author_username', 'created_at', 'updated_at', 'comment_count']
