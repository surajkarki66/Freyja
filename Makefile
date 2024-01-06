.PHONY: install-backend
install-backend:
	cd backend;pip install -r "requirements.txt"

.PHONY: install-frontend
install-frontend:
	cd frontend;yarn install

.PHONY: migrations
migrations:
	cd backend;python manage.py makemigrations

.PHONY: migrate
migrate:
	cd backend;python manage.py migrate;python manage.py loaddata --app users initial_data;python manage.py loaddata --app api initial_data


.PHONY: superuser
superuser:
	cd backend;python manage.py createsuperuser

.PHONY: run-backend
run-backend:
	cd backend;python manage.py runserver

.PHONY: run-frontend
run-frontend:
	cd frontend;yarn start
