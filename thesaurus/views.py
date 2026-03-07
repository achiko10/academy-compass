from rest_framework import viewsets
from .models import ThesaurusTerm, TermRelation
from .serializers import ThesaurusTermSerializer, TermRelationSerializer

class ThesaurusTermViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ThesaurusTerm.objects.all()
    serializer_class = ThesaurusTermSerializer

class TermRelationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TermRelation.objects.all()
    serializer_class = TermRelationSerializer
