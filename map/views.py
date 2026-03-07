from rest_framework import viewsets
from .models import MapNode, MapEdge
from .serializers import MapNodeSerializer, MapEdgeSerializer

class MapNodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MapNode.objects.all()
    serializer_class = MapNodeSerializer

class MapEdgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MapEdge.objects.all()
    serializer_class = MapEdgeSerializer
