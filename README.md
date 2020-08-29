# Freyja

This is a web app to grade essay using LSTM model using Django REST, React and Tensorflow. The dataset used to train the NLP model is https://www.kaggle.com/mpwolke/hewlett-foundation-essay-scoring 

# Tech Stack

# Usage
First, you need to install requirements for backend server and frontend.

## For backend:
#### Install the requirements:
`pipx install -r requirements.txt`
#### Run migrations
`python manage.py migrate`
#### Run the server
`python manage.py runserver`

## For frontend:
#### Change the directory into frontend
`cd frontend`
#### Install the dependencies
`npm i`
#### Start the frontend server
`npm start`