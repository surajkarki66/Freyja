import React from "react";
import classes from "./Signup.module.css";

const Signup = (props) => {
  return (
    <div>
      <form onSubmit={(e) => props.submit(e)} className={classes.Signup}>
        <h2>
          <b>SIGN UP</b>
        </h2>
        {props.error ? <h6 style={{ color: "red" }}>{props.error}</h6> : null}
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
          <h6>Username</h6>
          <input
            type="text"
            placeholder="Enter an username"
            onChange={props.usernameChange}
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
        <div>
          <h6>Confirm Password</h6>
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={props.password2Change}
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
              "Sign Up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
