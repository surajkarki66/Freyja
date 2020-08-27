from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    """
     Serializes the fields of Question model comes from database.

    """
    username = serializers.SerializerMethodField('get_username_from_author')

    class Meta:
        model = Question
        fields = ['id', 'question', 'set_no', 'min_score',
                  'max_score', 'timestamp', 'username']

    def get_username_from_author(self, question):
        username = question.author.username
        return username
