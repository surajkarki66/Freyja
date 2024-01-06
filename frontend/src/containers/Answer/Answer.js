import React from "react";

import classes from "./Answer.module.css";

const Answer = (props) => {
  return (
    <div className={classes.Answer} style={{ marginBottom: "60px" }}>
      <h4>
        <b>GIVE ANSWER HERE</b>
      </h4>
      {props.error ? <h6 style={{ color: "red" }}>{props.error}</h6> : null}
      <textarea
        name="message"
        rows="12"
        cols="50"
        placeholder="Answer"
        onChange={props.changed}
        required
      />
      <br />
      <div>
        <button
          onClick={props.gradeMe}
          className={"btn btn-primary mt-3"}
          disabled={props.loading}
        >
          {props.loading ? (
            <span>
              Loading &nbsp;<i className="fa fa-spinner fa-spin"></i>
            </span>
          ) : (
            "Grade Me"
          )}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        {props.showGrade ? (
          <h6 style={{ textAlign: "center" }}>Move down</h6>
        ) : (
          false
        )}
        {props.showGrade ? <i class="fa-solid fa-arrow-down"></i> : null}
      </div>
    </div>
  );
};

export default Answer;
