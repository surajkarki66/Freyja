import React from "react";
import moment from "moment";

import classes from "./Question.module.css";

const Question = (props) => {
  return (
    <React.Fragment>
      <div
        onClick={props.single ? null : () => props.sq(props.id)}
        className={props.single ? classes.QuestionSingle : classes.Question}
      >
        <div>
          {props.single ? (
            <div
              className={props.single ? classes.SingleQuestionContainer : ""}
            >
              <h4>
                <b>Essay Title</b>
              </h4>
              <p className={classes.Ptag}>"{props.questionText}"</p>
              <h5>
                <b>Author:</b> <i>{props.author}</i>
              </h5>
              <h6>Published: {moment(props.time).format("MMM Do YY")}</h6>
            </div>
          ) : null}

          <p style={{ fontSize: "18px" }}>
            {props.single ? null : <span>• {props.questionText}</span>}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Question;
