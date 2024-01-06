
import os

from django.conf import settings
from whitenoise import WhiteNoise
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'essay_grader.settings')

application = get_wsgi_application()
application = WhiteNoise(application, root=settings.STATIC_ROOT)

app = application