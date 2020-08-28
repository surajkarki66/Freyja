import os

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Question
from .utils.model import *
from .utils.helpers import *


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
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
                    current_path, "files/word2vec.bin"), binary=True)
                clean_test_essays = []
                clean_test_essays.append(essay_to_wordlist(
                    content, remove_stopwords=True))

                testDataVecs = getAvgFeatureVecs(
                    clean_test_essays, model, num_features)
                testDataVecs = np.array(testDataVecs)

                testDataVecs = np.reshape(
                    testDataVecs, (testDataVecs.shape[0], 1, testDataVecs.shape[1]))

                lstm_model = Model()
                lstm_model.load_weights(os.path.join(
                    current_path, "files/essay_model.h5"))
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
            K.clear_session()

            data = {"predicted_score": preds,
                    "full_score": question.max_score,
                    "low_score": question.min_score,
                    "pass_score": question.max_score / 2}
            return Response(data=data, status=status.HTTP_200_OK)

        else:
            data = {'error': "Answer is required."}
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
