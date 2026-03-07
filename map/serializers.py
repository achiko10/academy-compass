from rest_framework import serializers
from .models import MapNode, MapEdge
from thesaurus.serializers import ThesaurusTermSerializer

class MapNodeSerializer(serializers.ModelSerializer):
    # Depending on detail level, we might just want term name, but let's include detail.
    term_detail = ThesaurusTermSerializer(source='term', read_only=True)
    
    class Meta:
        model = MapNode
        fields = ['id', 'node_name', 'node_type', 'summary_snippet', 'term', 'term_detail']

class MapEdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MapEdge
        fields = ['id', 'source_node', 'target_node', 'condition_label']
