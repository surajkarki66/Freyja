import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Nav.module.css";

const Nav = (props) => {
  const { auth } = props;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload(false);
  };
  return (
    <div className={classes.Nav}>
      <div className={classes.TwoElement}>
        <div className={classes.item1}>
          <NavLink to="/" activeClassName="nav">
          Home
          </NavLink>
        </div>
        {auth ? (
          <div className={classes.item2}>
            <NavLink to="/create-questions">Add essay</NavLink>
          </div>
        ) : null}
      </div>
      <div className={classes.OneElement}>
        {auth ? (
          <div className={classes.item4}>
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>
              Logout
            </li>
          </div>
        ) : (
          <div className={classes.item4}>
            <NavLink to="/login">Log In</NavLink>
          </div>
        )}
        {!auth ? (
          <div className={classes.item5}>
            {" "}
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Nav;
