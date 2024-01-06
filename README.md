# Freyja

This is a web app to grade essay using LSTM model using Django REST, React and Tensorflow. The dataset used to train the NLP model is https://www.kaggle.com/mpwolke/hewlett-foundation-essay-scoring 

# Live Preview
[Click here]()

# Local Preview

## a. First Run Backend

### STEPS:

1. Clone the repository
   ```bash
    git clone  https://github.com/surajkarki66/Freyja/
    ```

2. Create a Python virtual environment and activate the environment based on your machine(Linux, MacOS, and Windows)

3. Install the dependencies
   ```bash
    make install
   ```
4. Create a `.env` file in a project root directory and set all the environment variables based on the provided `.env.sample` example.
5. Go inside the essay_grader directory and find `settings.py`, inside it set `DEBUG = True`.

6. Migrate the database
   ```bash
    make migrate
    ```

7. If you want to create a super user then enter the following command.
    ```bash
    make superuser
    ```

8. Run the development server
    ```bash
    make run-server
    ```

Now, open the web browser and go to the given address: http://127.0.0.1:8000/

To access the admin panel click here: http://127.0.0.1:8000/admin


Note: There are also lots of REST APIs available that you can check.

Documentation: http://127.0.0.1:8000/docs/

## b. Now, Run Frontend

### STEPS:
1. After running the backend server, you only need to run the frontend.
2. Open up a new terminal window, and change the directory to `frontend` folder.
   ```bash
   cd frontend
   ```
3. Install dependencies required by the frontend app.
   ```bash
   yarn install
   ```
4. Inside `src` directory there is a file with a name `config.js`. Go inside that file and replace the second line of code with the code provided below.
    ```js
   export const baseURL = "http://127.0.0.1:8000"
   ```

5. Run the development server
   ```bash
   yarn start
   ```
6. Preview: http://localhost:3000
   
Happy Coding !!
