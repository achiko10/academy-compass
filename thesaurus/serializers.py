from rest_framework import serializers
from .models import ThesaurusTerm, TermRelation

class TermRelationSerializer(serializers.ModelSerializer):
    term_b_name = serializers.ReadOnlyField(source='term_b.name_ka')
    
    class Meta:
        model = TermRelation
        fields = ['id', 'term_a', 'term_b', 'term_b_name', 'relation_type']

class ThesaurusTermSerializer(serializers.ModelSerializer):
    relations_from = TermRelationSerializer(many=True, read_only=True)

    class Meta:
        model = ThesaurusTerm
        fields = ['id', 'name_ka', 'name_en', 'definition', 'parent', 'relations_from']
