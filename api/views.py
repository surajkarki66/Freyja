import os
import math
import tensorflow as tf
import gensim.models.keyedvectors as word2vec


from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny

from api.models import Question
from .utils.model import *
from .utils.helpers import *
from .serializers import PredictionSerializer, QuestionSerializer



@swagger_auto_schema(
    method="get",
    operation_description="List all of the questions",
    operation_summary="Get all questions",
    responses={200: "Get a list of all questions.", 405: "Method \"POST\" not allowed."},
)
@api_view(['GET'])
@permission_classes((AllowAny,))
def question_list(request):
    """
    List all questions

    """
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@swagger_auto_schema(
    method="post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'question': openapi.Schema(type=openapi.TYPE_STRING),
            'set_no': openapi.Schema(type=openapi.TYPE_INTEGER),
            'max_score': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
        required=['question', 'set_no','max_score'],
    ),
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description="Token in the format 'Token <your_token>'",
            type=openapi.TYPE_STRING,
        ),
    ],
    security=[{'token': []}],
    operation_description="Create a new question",
    operation_summary="Create a new question",
    responses={201: QuestionSerializer, 401: "Error: Unauthorized", 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def question_create(request):
    """
    Create a one question.

    """
    user = request.user
    question = Question(author=user)
    if request.method == 'POST':

        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@swagger_auto_schema(
    method="get",
    operation_description="Get details of a question",
    operation_summary="Get details",
    responses={200: QuestionSerializer, 405: "Method \"POST\" not allowed."},
)
@api_view(['GET'])
@permission_classes((AllowAny,))
def question_detail(request, pk=None):
    """
    Details of a Single Question

    """
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@swagger_auto_schema(
    method="put",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'question': openapi.Schema(type=openapi.TYPE_STRING),
            'set_no': openapi.Schema(type=openapi.TYPE_INTEGER),
            'max_score': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
        required=['question', 'set_no','max_score'],
    ),
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description="Token in the format 'Token <your_token>'",
            type=openapi.TYPE_STRING,
        ),
    ],
    security=[{'token': []}],
    operation_description="Complete update a question",
    operation_summary="Complete update a question",
    responses={200: "Updated successfully", 401: "Error: Unauthorized", 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['PUT'])
@permission_classes((IsAuthenticated,))
def question_update(request, pk=None):
    """
    Update all fields of question

    """
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # verifying user of this question
    user = request.user
    if question.author != user:
        return Response({'error': 'You do not have permission to update this question.'})
    if request.method == 'PUT':
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@swagger_auto_schema(
    method="patch",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'question': openapi.Schema(type=openapi.TYPE_STRING),
            'set_no': openapi.Schema(type=openapi.TYPE_INTEGER),
            'max_score': openapi.Schema(type=openapi.TYPE_INTEGER),
        },
        required=[],
    ),
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description="Token in the format 'Token <your_token>'",
            type=openapi.TYPE_STRING,
        ),
    ],
    security=[{'token': []}],
    operation_description="Partial update a question",
    operation_summary="Partial update a question",
    responses={200: "Updated successfully", 401: "Error: Unauthorized", 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['PATCH'])
@permission_classes((IsAuthenticated,))
def question_partial_update(request, pk=None):
    """
    Update partial fields of question

    """
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

     # verifying user of this question
    user = request.user
    if question.author != user:
        return Response({'error': 'You do not have permission to update this question.'})

    if request.method == 'PATCH':
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@swagger_auto_schema(
    method="delete",
    manual_parameters=[
        openapi.Parameter(
            'Authorization',
            openapi.IN_HEADER,
            description="Token in the format 'Token <your_token>'",
            type=openapi.TYPE_STRING,
        ),
    ],
    security=[{'token': []}],
    operation_description="Delete a question",
    operation_summary="Delete question",
    responses={204: "Delete successfully", 401: "Error: Unauthorized", 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def question_delete(request, pk=None):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # verifying user of this question
    user = request.user
    if question.author != user:
        return Response({'error': 'You do not have permission to update this question.'})

    if request.method == 'DELETE':
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)



@swagger_auto_schema(
    method="post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'answer': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['answer'],
    ),
    operation_description="Calculate the score of Essay written by user",
    operation_summary="Grade an essay",
    responses={201: PredictionSerializer, 401: "Error: Unauthorized", 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['POST'])
@permission_classes((AllowAny,))
def calculate_score(request, pk=None):
    """

     Calculate the score of Essay written by user using NLP

    """
    current_path = os.path.abspath(os.path.dirname(__file__))
    question = get_object_or_404(Question, pk=pk)
    if request.method == 'POST':
        if request.data != {}:
            content = request.data['answer']

            if len(content) > 20:
                num_features = 300
                model = word2vec.KeyedVectors.load_word2vec_format(os.path.join(
                    current_path, "../models/word2vec_model.bin"), binary=True)
                clean_test_essays = []
                clean_test_essays.append(essay_to_wordlist(
                    content, remove_stopwords=True))

                testDataVecs = getAvgFeatureVecs(
                    clean_test_essays, model, num_features)
                testDataVecs = np.array(testDataVecs)

                testDataVecs = np.reshape(
                    testDataVecs, (testDataVecs.shape[0], 1, testDataVecs.shape[1]))

                lstm_model = get_model()
                lstm_model.load_weights(os.path.join(
                    current_path, "../models/simple_lstm.h5"))
                preds = lstm_model.predict(testDataVecs)

                if math.isnan(preds):
                    preds = 0
                else:
                    preds = np.around(preds)
                    preds = preds[0][0]

                if preds < 0:
                    preds = 0
                if preds > question.max_score:
                    preds = question.max_score

            else:
                preds = 0
            tf.keras.backend.clear_session()

            data = {"question": pk,
                    "predicted_score": preds,
                    "full_score": question.max_score,
                    "pass_score": question.max_score / 2,
                    "answer": content,
                    }
            serializer = PredictionSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            data = {'error': "Answer is required."}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
