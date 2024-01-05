import React from "react";

import classes from "./CreateQuestions.module.css";

const CreateQuestions = ({ setQuestion, setMaxScore, submit }) => {
  return (
    <React.Fragment>
      <form onSubmit={submit}>
        <div className={classes.CreateQuestions}>
          <h3>Add essay</h3>
          <input
            type="number"
            placeholder="Enter the maximum score"
            onChange={(e) => setMaxScore(e.target.value)}
            required
          />
          <textarea
            name="message"
            rows="4"
            cols="60"
            placeholder="Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit" className={"btn btn-primary"}>
            Submit Question
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateQuestions;
