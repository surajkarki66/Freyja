import React, { useState } from "react";
import Axios from "../../axios-url";
import { Redirect } from "react-router-dom";

import Login from "../Login/Login";

const LoginPage = (props) => {
  const [Email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [Password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const email = (event) => {
    setEmail(event.target.value);
  };
  const password = (event) => {
    setPassword(event.target.value);
  };
  function submit(e) {
    e.preventDefault();
    const data = {
      username: Email,
      password: Password,
    };
    setLoading(true);
    setError("");
    Axios
      .post("/api/user/login/", data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        setSuccess(true);
        setLoading(false);
        props.onSuccess();
      })
      .catch((error) => {
        if (error.response.data.non_field_errors) {
          setError(error.response.data.non_field_errors[0]);
        }else{
          setError("Something went wrong!");
        }
        setLoading(false);
      });
  }
  return (
    <div>
      {success ? <Redirect to="/" /> : null}
      <Login
        emailChange={(event) => email(event)}
        passwordChange={(event) => password(event)}
        submit={submit}
        error={error}
        loading={loading}
      />
    </div>
  );
};

export default LoginPage;
