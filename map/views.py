from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import MapNode, MapEdge
from .serializers import MapNodeSerializer, MapEdgeSerializer


class MapNodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MapNode.objects.all().order_by('node_type', 'node_name')
    serializer_class = MapNodeSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['node_name', 'summary_snippet']
    ordering_fields = ['node_name', 'node_type']


class MapEdgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MapEdge.objects.all()
    serializer_class = MapEdgeSerializer

