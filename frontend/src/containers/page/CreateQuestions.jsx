import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CreateQuestions from "../CreateQuestions/CreateQuestions";
import Axios from "../../axios-url";

const CreateQuestionsPage = (props) => {
  const [question, setQuestion] = useState();
  const [minScore, setMinScore] = useState(1);
  const [maxScore, setMaxScore] = useState(12);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    Axios.defaults.headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    let data;
    Axios.get("http://127.0.0.1:8000/api/questions/").then((response) => {
      let id = 1;
      if (response.data.length !== 0) {
        id = response.data.slice(-1).pop()["id"] + 1;
      }
      data = {
        ...data,
        question: question,
        set_no: id,
        max_score: maxScore,
        username: localStorage.getItem("username"),
      };
      Axios
        .post("http://127.0.0.1:8000/api/question/create/", data)
        .then((response) => {
          console.log(response);
          history.push("/");
        })
        .catch((error) => console.log(error.response.data));
    });
  };
  return (
    <div>
      <CreateQuestions
        submit={onSubmit}
        setQuestion={setQuestion}
        setMaxScore={setMaxScore}
        setMinScore={setMinScore}
      />
    </div>
  );
};

export default CreateQuestionsPage;
