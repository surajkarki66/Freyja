#!/bin/sh

python manage.py makemigrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input
python manage.py loaddata --app users initial_data
python manage.py loaddata --app api initial_data

gunicorn essay_grader.wsgi:application --bind 0.0.0.0:8000