from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseNotAllowed, JsonResponse
from django.conf.urls import static
from django.conf import settings
from django.utils.translation import gettext_lazy as _


admin.site.site_header = _('Freyja administration')

def welcome_view(request):
    if request.method == 'GET':
        data = {'message': "Welcome to the Freyja's API!. To see the API documentation, go to http://127.0.0.1:8000/docs"}
        return JsonResponse(data)
    else:
        data = {'error': 'Not Found'}
        return HttpResponseNotAllowed(['GET'], content_type='application/json')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/user/', include('users.urls')),
    path('', welcome_view, name="home"),

]

if settings.DEBUG:
    from drf_yasg.views import get_schema_view
    from drf_yasg import openapi
    from rest_framework import permissions

    schema_view = get_schema_view(
    openapi.Info(
        title="Freyja API",
        default_version='v1',
        description=""" This is a web app to grade essay using LSTM model using Django REST, React and Tensorflow. The dataset used to train the NLP model is https://www.kaggle.com/mpwolke/hewlett-foundation-essay-scoring """,
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="suraj.karki500@gmail.com"),
        license=openapi.License(name="GPL V3 License"),
    ),
    public=False,
    permission_classes=(permissions.AllowAny,),
)

    urlpatterns = [
        *urlpatterns,
        path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
        path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
        path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
        *static.static(settings.STATIC_URL,
                       document_root=settings.STATIC_ROOT),
    ]