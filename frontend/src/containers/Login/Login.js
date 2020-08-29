import React from "react";
import classes from "./Login.module.css";

const Login = (props) => {
  return (
    <div>
      <div className={classes.Login}>
        <h3>Login</h3>
        {props.error ? (
          <h6 style={{ color: "red" }}>Username password is not valid</h6>
        ) : null}
        <div>
          <h4>Email</h4>
          <input
            type="email"
            name="InputEmail1"
            placeholder="Email"
            onChange={props.emailChange}
          ></input>
        </div>
        <div>
          <h4>Password</h4>
          <input
            type="password"
            name="InputPassword"
            placeholder="Password"
            onChange={props.passwordChange}
          ></input>
        </div>
        <div>
          <button
            type="submit"
            className={"btn btn-primary"}
            onClick={props.submit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
