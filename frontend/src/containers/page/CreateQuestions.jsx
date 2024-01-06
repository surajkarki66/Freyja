import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CreateQuestions from "../CreateQuestions/CreateQuestions";
import Axios from "../../axios-url";

const CreateQuestionsPage = () => {
  const [question, setQuestion] = useState();
  const [loading, setLoading] = useState(false);
  const [maxScore, setMaxScore] = useState(null);
  const [setNo, setSetNo] = useState(null);
  const [error, setError] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    Axios.defaults.headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    const data = {
      question: question,
      set_no: setNo,
      max_score: maxScore,
    }
    setLoading(true);
    Axios.post("/api/question/create/", data)
      .then((_res) => {
        setError("");
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        if(error.response.data) {
          if (error.response.data.question &&  error.response.data.question.length > 0) {
            setError("Please enter a question");
          }
          else if (error.response.data.set_no && error.response.data.set_no.length > 0) {
            setError("Please enter a set number");
          }
          else if (error.response.data.max_score && error.response.data.max_score.length > 0) {
            setError("Please enter a maximum score for the essay");
          } else {
            setError("Something went wrong!");
          }
        }
       
        setLoading(false);
      });
  };
  return (
    <div>
      <CreateQuestions
        submit={onSubmit}
        setQuestion={setQuestion}
        setMaxScore={setMaxScore}
        setSetNo={setSetNo}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CreateQuestionsPage;
