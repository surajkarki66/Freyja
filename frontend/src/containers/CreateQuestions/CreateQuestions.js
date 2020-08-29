import React from "react";

import classes from "./CreateQuestions.module.css";

//This conponent need
const CreateQuestions = (props) => {
  return (
    <React.Fragment>
      <div className={classes.CreateQuestions}>
        <h3>Add Essay</h3>
        <textarea
          name="message"
          rows="10"
          cols="72"
          placeholder="Answer"
          onChange={props.typing}
        />
        <br />
        <br />
        <button
          type="submit"
          onClick={props.submit}
          className={"btn btn-primary"}
        >
          Submit Question
        </button>
      </div>
    </React.Fragment>
  );
};

export default CreateQuestions;
