import React from "react";

import classes from "./Grade.module.css";

//Grade take props: remarks, grade, answer
const Grade = (props) => {
  return (
    <div className={classes.Grade}>
      <h2>Result:</h2>

      <h4>Grade: {props.grade}</h4>
      <h5>Full Score:{props.fullScore}</h5>
      <h5>Pass Score:{props.passScore}</h5>
      <p>
        <i>Remarks: {props.remark}</i>
      </p>

      <div>
        <h3>Your Submission:</h3>
        <p>{props.answer}</p>
      </div>
    </div>
  );
};

export default Grade;
