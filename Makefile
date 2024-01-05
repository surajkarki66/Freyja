.PHONY: install
install:
	pip install -r "requirements.txt"

.PHONY: migrations
migrations:
	python manage.py makemigrations

.PHONY: migrate
migrate:
	python manage.py migrate

.PHONY: superuser
superuser:
	python manage.py createsuperuser

.PHONY: run-server
run-server:
	python manage.py runserver

.PHONY: update
update: install migrate ;