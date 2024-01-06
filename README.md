# Freyja

This is a web app to grade essay using LSTM model using Django REST, React and Tensorflow. The dataset used to train the NLP model is https://www.kaggle.com/mpwolke/hewlett-foundation-essay-scoring , this project was the education category winner of Quantum Hack 2020.

# How to run?

## Using Docker
1. Clone the repository
   ```bash
    git clone  https://github.com/surajkarki66/Freyja/
    ``` 
2. Make sure that the Docker and docker-compose is installed in your local computer. If not installed, you can install it using this [link](https://docs.docker.com/engine/install/).
3. Create a `.env` file in a project root directory and set all the environment variables based on the provided `.env.sample` example.
4. Run the following docker command.

   ```bash
    docker-compose up --build
    ```

Now, open the web browser and go to the given address: http://127.0.0.1

To access the APIs: http://127.0.0.1:8000/

To access the APIs documentations: http://127.0.0.1:8000/docs/

To access the admin panel click here: http://127.0.0.1:8000/admin

## Without using Docker

## a. First Run Backend

### STEPS:

1. Clone the repository
   ```bash
    git clone  https://github.com/surajkarki66/Freyja/
    ```

2. Create a Python virtual environment and activate the environment based on your machine(Linux, MacOS, and Windows)

3. Install the dependencies
   ```bash
    make install-backend
   ```
4. Create a `.env` file in a project root directory and set all the environment variables based on the provided `.env.sample` example.

5. Migrate the database
   ```bash
    make migrate
    ```

6. If you want to create a super user then enter the following command.
    ```bash
    make superuser
    ```

7. Run the development server
    ```bash
    make run-backend
    ```

Now, open the web browser and go to the given address: http://127.0.0.1:8000/

To access the admin panel click here: http://127.0.0.1:8000/admin


Note: There are also lots of REST APIs available that you can check.

Documentation: http://127.0.0.1:8000/docs/

## b. Now, Run Frontend

### STEPS:
1. After running the backend server, you only need to run the frontend.
   
2. Open up a new terminal window, and install dependencies required by the frontend app.
   ```bash
   make install-frontend
   ```

3. Run the development server
   ```bash
   make run-frontend
   ```
4. Preview: http://localhost:3000

   
Happy Coding !!
