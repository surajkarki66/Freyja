import React from "react";
import Question from "./Question/Question";

import classes from "./Questions.module.css";

//This component takes array of question as props named: questionsArray
const Questions = (props) => {
  const questionSets = props.questionArray.map((ques, _idx) => {
    return (
      <Question
        key={ques.id}
        id={ques.id}
        questionText={ques.question}
        sq={props.singleQuestion}
      />
    );
  });
  return (
    <div className={classes.Questions}>
      <h1>Questions Set</h1>
      <ul>{questionSets}</ul>
    </div>
  );
};

export default Questions;
