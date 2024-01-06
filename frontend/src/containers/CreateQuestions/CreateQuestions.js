import React from "react";

import classes from "./CreateQuestions.module.css";

const CreateQuestions = ({
  setQuestion,
  setMaxScore,
  submit,
  setSetNo,
  setSourceEssay,
  error,
  loading,
}) => {
  return (
    <React.Fragment>
      <form>
        <div className={classes.CreateQuestions}>
          <h2>
            <b>ADD ESSAY</b>
          </h2>
          {error ? <h6 style={{ color: "red" }}>{error}</h6> : null}
          <div>
            <h6>Maximum Score</h6>
            <input
              type="number"
              placeholder="Enter the maximum score"
              onChange={(e) => setMaxScore(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Essay Set No.</h6>
            <input
              type="number"
              placeholder="Enter the essay set number"
              onChange={(e) => setSetNo(e.target.value)}
              required
            />
          </div>

          <div>
            <h6>Source Essay</h6>
            <textarea
              name="promsource_essaypt"
              rows="4"
              cols="20"
              placeholder="Source Essay"
              onChange={(e) => setSourceEssay(e.target.value)}
              required
            />
          </div>
          <div>
            <h6>Question</h6>
            <input
              type="text"
              placeholder="Enter the question title"
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              onClick={submit}
              className={"btn btn-primary"}
              disabled={loading}
            >
              {loading ? (
                <span>
                  Loading &nbsp;<i className="fa fa-spinner fa-spin"></i>
                </span>
              ) : (
                "Submit Question"
              )}
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateQuestions;
