from rest_framework import serializers

from .models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):
    """
     Serializes the fields of Question model comes from database.

    """
    username = serializers.SerializerMethodField('get_username_from_author')

    class Meta:
        model = Question
        fields = ['id', 'question', 'set_no',
                  'max_score', 'timestamp', 'username']

    def get_username_from_author(self, question):
        username = question.author.username
        return username


class PredictionSerializer(serializers.ModelSerializer):
    """
     Serializes the fields of Prediction.

    """

    class Meta:
        model = Answer
        fields = "__all__"

