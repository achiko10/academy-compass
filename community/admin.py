from django.contrib import admin
from .models import Post, Comment

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'comment_count')
    search_fields = ('title', 'content', 'author__username')
    list_filter = ('created_at', 'author')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at', 'body_snippet')
    search_fields = ('body', 'author__username')
    list_filter = ('created_at', 'author')

    def body_snippet(self, obj):
        return obj.body[:50] + "..." if len(obj.body) > 50 else obj.body
    body_snippet.short_description = 'Comment'
