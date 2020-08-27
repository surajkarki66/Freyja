from django.db import models
from django.conf import settings

from users.models import User


class Question(models.Model):
    """ A model of the 10 questions. """
    question = models.TextField(max_length=10000)
    set_no = models.IntegerField(unique=True)
    min_score = models.IntegerField()
    max_score = models.IntegerField()
    timestamp = models.DateTimeField(
        verbose_name='question_published', auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE)

    def __str__(self):
        return str(self.set_no)
