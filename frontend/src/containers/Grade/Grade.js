import React from "react";

import classes from "./Grade.module.css";

const Grade = (props) => {
  return (
    <div className={classes.Grade}>
      <h2 style={{ textAlign: "center" }}>
        <u>Result</u>
      </h2>
      <h4>
        Obtained Score: {props.grade} / {props.fullScore}
      </h4>
      <h5>
        Remarks:{" "}
        <i style={{ color: props.remark === "Bad!" ? "red" : "green" }}>
          {props.remark}
        </i>
      </h5>

      <div>
        <h4 style={{ textAlign: "center" }}>
          <u>Your Submission</u>
        </h4>
        <p>{props.answer}</p>
      </div>
    </div>
  );
};

export default Grade;
