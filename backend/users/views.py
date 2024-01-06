from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authtoken.views import ObtainAuthToken

from users.serializers import RegistrationSerializer
from users.models import User


@swagger_auto_schema(
    method="post",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'username': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'password2': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['email', 'username','password', 'password2'],
    ),
    operation_description="Signup a user account into the Freyja",
    operation_summary="User registration",
    responses={201: RegistrationSerializer, 400 : "Error: Bad Request", 405: "Method \"POST\" not allowed."},
)
@api_view(['POST', ])
@permission_classes((AllowAny,))
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        serializer.is_valid(raise_exception=True)
        account = serializer.save()
        data['response'] = 'successfully registered new user.'
        data['email'] = account.email
        data['username'] = account.username
        token = Token.objects.get(user=account).key
        data['token'] = token
        return Response(data)


class CustomAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'username': user.username,
            'email': user.email
        })
