from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Quiz, QuizResult
from .serializers import QuizSerializer, QuizResultSerializer


class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    """Quizzes are publicly readable."""
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [AllowAny]


class QuizResultViewSet(viewsets.ModelViewSet):
    """Users can only access their own quiz results."""
    permission_classes = [IsAuthenticated]
    serializer_class = QuizResultSerializer

    def get_queryset(self):
        # SECURITY FIX: each user sees only their own results
        return QuizResult.objects.filter(user=self.request.user).order_by('-completed_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
