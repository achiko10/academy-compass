from django.contrib import admin
from .models import MapNode, MapEdge

@admin.register(MapNode)
class MapNodeAdmin(admin.ModelAdmin):
    list_display = ('node_name', 'node_type', 'term')
    list_filter = ('node_type',)
    search_fields = ('node_name',)

@admin.register(MapEdge)
class MapEdgeAdmin(admin.ModelAdmin):
    list_display = ('source_node', 'target_node', 'condition_label')
