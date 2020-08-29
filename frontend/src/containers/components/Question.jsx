import React from "react";
import uniqid from "uniqid";

import questions from "../../questions";

const Questions = () => {
  return (
    <div>
      <h5>Questions</h5>
      <div className="card" style={{ width: "18rem", cursor: "pointer" }}>
        <ul className="list-group list-group-flush">
          {questions.questions.map((question) => {
            return (
              <li key={uniqid()} className="list-group-item">
                {question}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Questions;
