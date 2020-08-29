import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Login from "../Login/Login";

const LoginPage = (props) => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [sucess, setSucess] = useState(false);
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
    axios
      .post("http://127.0.0.1:8000/api/login/", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.user_id);
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
