import React, { useState } from "react";
import Axios from "../../axios-url";
import { Redirect } from "react-router-dom";

import Login from "../Login/Login";

const LoginPage = (props) => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const email = (event) => {
    setEmail(event.target.value);
  };
  const password = (event) => {
    setPassword(event.target.value);
  };
  function submit() {
    const data = {
      username: Email,
      password: Password,
    };
    Axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setSucess(true);
        props.onSucess();
      })
      .catch((error) => {
        if (error.response.data.non_field_errors) {
          setError(error.response.data.non_field_errors[0]);
        }
      });
  }
  return (
    <div>
      {sucess ? <Redirect to="/" /> : null}
      <Login
        emailChange={(event) => email(event)}
        passwordChange={(event) => password(event)}
        submit={submit}
        error={error}
      />
    </div>
  );
};

export default LoginPage;
