#!/bin/bash

# Build the project
echo "Building the project..."
python3.9 -m venv venv
source venv/bin/activate
apt-get install libsqlite3-dev
python3.9 -m pip install -r requirements.txt

echo "Make Migration..."
python3.9 manage.py makemigrations --noinput
python3.9 manage.py migrate --noinput

echo "Collect Static..."
python3.9 manage.py collectstatic --noinput --clear