import React from "react";
import classes from "./Login.module.css";

const Login = (props) => {
  return (
    <div>
      <form onSubmit={props.submit} className={classes.Login}>
        <h2>
          <b>LOGIN</b>
        </h2>
        {props.error ? (
          <h6 style={{ color: "red" }}>Username password is not valid</h6>
        ) : null}
        <div>
          <h6>Email</h6>
          <input
            type="email"
            placeholder="Enter an email address"
            onChange={props.emailChange}
            required
          ></input>
        </div>
        <div>
          <h6>Password</h6>
          <input
            type="password"
            placeholder="Enter a password"
            onChange={props.passwordChange}
            required
          ></input>
        </div>
        <br />
        <br />
        <div>
          <button
            type="submit"
            className={"btn btn-primary"}
            disabled={props.loading}
          >
            {props.loading ? (
              <span>
                Loading &nbsp;<i className="fa fa-spinner fa-spin"></i>
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
