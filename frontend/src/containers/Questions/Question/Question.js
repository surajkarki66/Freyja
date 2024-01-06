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
                <b>Source Essay</b>
              </h4>
              <p>{props.sourceEssay}</p>
              <h4>
                <b>Prompt</b>
              </h4>
              <p className={classes.Ptag}>"{props.questionText}"</p>
              <h5>
                <b>Set No:</b> {props.setNo}
              </h5>
              <h5>
                <b>Author:</b> <i>{props.author}</i>
              </h5>
              <h6><b>Published:</b> {moment(props.time).format("MMM Do YY")}</h6>
            </div>
          ) : null}

          <p style={{ fontSize: "18px" }} className={classes.Q}>
            {props.single ? null : <span>• {props.questionText} (Set {props.setNo})</span>} 
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Question;
