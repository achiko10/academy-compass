from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=255, verbose_name="სათაური")
    content = models.TextField(verbose_name="შინაარსი")
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts', verbose_name="ავტორი"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self) -> str:
        return self.title

    @property
    def comment_count(self) -> int:
        return self.comments.count()


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='comments', verbose_name="პოსტი"
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments', verbose_name="ავტორი"
    )
    body = models.TextField(verbose_name="კომენტარი")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self) -> str:
        return f"{self.author.username} on '{self.post.title}'"
