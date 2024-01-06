from django.db import models
from django.conf import settings

from users.models import User


class Question(models.Model):
    """ A model of the 10 questions. """
    question = models.TextField(max_length=10000)
    source_essay = models.TextField()
    set_no = models.IntegerField()
    max_score = models.IntegerField()
    timestamp = models.DateTimeField(
        verbose_name='question_published', auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)

    def __str__(self):
        return str(self.set_no)


class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    full_score = models.IntegerField()
    pass_score = models.IntegerField()
    predicted_score = models.IntegerField()
    answer = models.TextField()
    timestamp = models.DateTimeField(verbose_name='answer_published', auto_now_add=True)

    def __str__(self):
        return str(self.question)
