from django.contrib import admin
from .models import ThesaurusTerm, TermRelation

@admin.register(ThesaurusTerm)
class ThesaurusTermAdmin(admin.ModelAdmin):
    list_display = ('name_ka', 'name_en', 'parent')
    search_fields = ('name_ka', 'name_en')
    list_filter = ('parent',)

@admin.register(TermRelation)
class TermRelationAdmin(admin.ModelAdmin):
    list_display = ('term_a', 'term_b', 'relation_type')
    list_filter = ('relation_type',)
