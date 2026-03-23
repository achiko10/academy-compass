from django.db import models
from django.contrib.auth.models import User
from thesaurus.models import ThesaurusTerm

class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    # Tags based on the thesaurus
    tags = models.ManyToManyField(ThesaurusTerm, related_name='articles', blank=True)

    def __str__(self):
        return self.title

class ResourceCategory(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Resource(models.Model):
    category = models.ForeignKey(ResourceCategory, on_delete=models.CASCADE, related_name='items')
    title = models.CharField(max_length=255)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title

class Skill(models.Model):
    title = models.CharField(max_length=255)
    level = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
