import React from "react";

import classes from "./Question.module.css";

const Question = (props) => {
  return (
    <React.Fragment>
      <div
        onClick={props.single ? null : () => props.sq(props.id)}
        className={props.single ? classes.QuestionSingle : classes.Question}
      >
        {props.single ? (
          <div>
            <h3>Question Title:</h3>
            <p className={classes.Ptag}>"{props.questionText}"</p>
          </div>
        ) : null}
        {props.single ? <h5>Author: {props.author}</h5> : null}
        {props.single ? (
          <h6>
            <i>Created At: {props.time}</i>
          </h6>
        ) : null}

        <p style={{ fontSize: "18px" }}>
          {props.single ? null : <span>• {props.questionText}</span>}
        </p>
      </div>
    </React.Fragment>
  );
};

export default Question;
