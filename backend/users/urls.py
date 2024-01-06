from django.urls import path
from users.views import(
    registration_view,
    CustomAuthToken,

)

app_name = 'users'

urlpatterns = [
    path('register/', registration_view, name="register"),
    path('login/', CustomAuthToken.as_view(), name="login"),

]
