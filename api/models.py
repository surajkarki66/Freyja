from django.db import models


class Question(models.Model):
    """ A model of the 10 questions. """
    question = models.TextField(max_length=10000)
    set_no = models.IntegerField(unique=True)
    min_score = models.IntegerField()
    max_score = models.IntegerField()

    def __str__(self):
        return str(self.set_no)
