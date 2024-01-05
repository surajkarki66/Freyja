import React, { useState } from "react";
import Axios from "../../axios-url";
import { Redirect } from "react-router-dom";

import Signup from "../Signup/Signup";

const SignupPage = (props) => {
  const [success, setSuccess] = useState();
  const [Email, setEmail] = useState();
  const [Username, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [Password2, setPassword2] = useState();
  const [Error, setError] = useState("");
  const email = (event) => {
    setEmail(event.target.value);
  };
  const username = (event) => {
    setUsername(event.target.value);
  };
  const password = (event) => {
    setPassword(event.target.value);
  };
  const password2 = (event) => {
    setPassword2(event.target.value);
  };
  function submit() {
    let data = {
      email: Email,
      username: Username,
      password: Password,
      password2: Password2,
    };
    Axios
      .post("/api/register/", data)
      .then((response) => {
        if (typeof response.data.email === Array) {
          setError(response.data.email[0]);
        }
        if (typeof response.data.username === Array) {
          setError(response.data.username[0]);
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        if (error.response.data.password) {
          setError(error.response.data.password);
        }
      });
  }
  return (
    <div>
      <Signup
        emailChange={(event) => email(event)}
        usernameChange={(event) => username(event)}
        passwordChange={(event) => password(event)}
        password2Change={(event) => password2(event)}
        submit={submit}
        error={Error}
      />
      {success ? <Redirect to="/login" /> : null}
    </div>
  );
};

export default SignupPage;
