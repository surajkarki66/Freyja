import React, { useState } from "react";
import Axios from "../../axios-url";
import { Redirect } from "react-router-dom";

import Signup from "../Signup/Signup";

const SignupPage = () => {
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
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
  function submit(e) {
    e.preventDefault();
    let data = {
      email: Email,
      username: Username,
      password: Password,
      password2: Password2,
    };
    setLoading(true);
    setError("");
    Axios
      .post("/api/user/register/", data)
      .then((response) => {
        setEmail("");
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response.data.password) {
          setError(error.response.data.password);
        }
        else if (error.response.data.email) {
          setError(error.response.data.email[0]);
        }
        else if (error.response.data.username) {
          setError(error.response.data.username[0]);
        } else {
          setError("Something went wrong!");
        }
        setLoading(false);
        setSuccess(false);
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
        loading={loading}
        error={Error}
      />
      {success ? <Redirect to="/login" /> : null}
    </div>
  );
};

export default SignupPage;
