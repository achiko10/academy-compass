from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from .models import Quiz, QuizResult


class QuizResultIsolationTest(TestCase):
    """
    SECURITY TEST: Each user must ONLY see their own QuizResults.
    No cross-user data leakage allowed.
    """

    def setUp(self):
        self.client = APIClient()

        # Create a quiz
        self.quiz = Quiz.objects.create(title="Career Test", quiz_type="Career Test")

        # Create two users
        self.user1 = User.objects.create_user(username='user1', email='u1@test.com', password='Pass123!')
        self.user2 = User.objects.create_user(username='user2', email='u2@test.com', password='Pass123!')

        # Create a result for user1
        self.result1 = QuizResult.objects.create(user=self.user1, quiz=self.quiz, score=10)

    def test_user1_sees_own_result(self):
        """User1 should see their own result."""
        self.client.force_authenticate(user=self.user1)
        response = self.client.get('/api/v1/quiz-results/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        # Handle paginated or direct list response
        results = data.get('results', data) if isinstance(data, dict) else data
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['score'], 10)

    def test_user2_cannot_see_user1_result(self):
        """User2 should see ZERO results (only their own, which is none)."""
        self.client.force_authenticate(user=self.user2)
        response = self.client.get('/api/v1/quiz-results/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data
        results = data.get('results', data) if isinstance(data, dict) else data
        self.assertEqual(len(results), 0)

    def test_unauthenticated_cannot_access_results(self):
        """Anonymous requests must be rejected (401)."""
        response = self.client.get('/api/v1/quiz-results/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class RegistrationValidationTest(TestCase):
    """Tests for registration input validation."""

    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/v1/auth/register/'
        User.objects.create_user(
            username='existing', email='taken@test.com', password='Pass123!'
        )

    def test_duplicate_email_rejected(self):
        """Registering with an already-used email must return 400."""
        response = self.client.post(self.register_url, {
            'username': 'newuser',
            'email': 'taken@test.com',
            'password': 'Pass123!',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    def test_duplicate_username_rejected(self):
        """Registering with an already-used username must return 400."""
        response = self.client.post(self.register_url, {
            'username': 'existing',
            'email': 'new@test.com',
            'password': 'Pass123!',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_short_password_rejected(self):
        """Passwords shorter than 8 characters must be rejected."""
        response = self.client.post(self.register_url, {
            'username': 'newuser2',
            'email': 'new2@test.com',
            'password': '12345',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_valid_registration_succeeds(self):
        """A clean registration must return 201."""
        response = self.client.post(self.register_url, {
            'username': 'brandnew',
            'email': 'brandnew@test.com',
            'password': 'SecurePass123!',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
