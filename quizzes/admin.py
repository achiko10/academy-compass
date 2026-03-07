from django.contrib import admin
from .models import Quiz, Question, Answer, QuizResult

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 3

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'quiz_type')
    list_filter = ('quiz_type',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'quiz')
    list_filter = ('quiz',)
    inlines = [AnswerInline]

@admin.register(QuizResult)
class QuizResultAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'score', 'completed_at')
