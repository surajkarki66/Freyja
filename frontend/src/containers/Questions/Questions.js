import React from "react";
import Question from "./Question/Question";

import classes from "./Questions.module.css";

const Questions = (props) => {
  const questionSets = props.questionArray.map((ques, _idx) => {
    return (
      <Question
        key={ques.id}
        id={ques.id}
        questionText={ques.question}
        setNo = {ques.set_no}
        sq={props.singleQuestion}
      />
    );
  });
  return (
    <div className={classes.Questions}>
      <h1><b>Essays</b></h1>
      <ul>{questionSets}</ul>
    </div>
  );
};

export default Questions;
