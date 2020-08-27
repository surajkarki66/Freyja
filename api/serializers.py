from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    """
     Serializes the fields of Question model comes from database.

    """
    class Meta:
        model = Question
        fields = "__all__"
