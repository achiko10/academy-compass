from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import ThesaurusTerm, TermRelation
from .serializers import ThesaurusTermSerializer, TermRelationSerializer


class ThesaurusTermViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ThesaurusTerm.objects.all().order_by('name_ka')
    serializer_class = ThesaurusTermSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name_ka', 'name_en', 'definition']
    ordering_fields = ['name_ka', 'name_en']


class TermRelationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TermRelation.objects.all()
    serializer_class = TermRelationSerializer

