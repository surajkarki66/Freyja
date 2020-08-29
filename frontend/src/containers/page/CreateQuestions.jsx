import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import CreateQuestions from "../CreateQuestions/CreateQuestions";
import axios from "axios";

const CreateQuestionsPage = (props) => {
  const [question, setQuestion] = useState();
  const [response, setResponse] = useState(false);
  const onQuestions = (event) => {
    setQuestion(event.target.value);
  };
  function onSubmit() {
    axios.defaults.headers = {
      Authorization: `Token ${localStorage.getItem("token")}`,
    };
    let data;
    console.log(data);
    axios
      .get("http://127.0.0.1:8000/api/questions/")
      .then((response) => {
        let id = 1;
        if (response.data.length !== 0) {
          id = response.data.slice(-1).pop()["id"] + 1;
        }
        data = {
          ...data,
          question: question,
          set_no: id,
          min_score: 1,
          max_score: 12,
        };
        console.log(data);
      });
    axios
      .post("http://127.0.0.1:8000/api/question/create/", data)
      .then((response) => setResponse(true))
      .catch((error) => console.log(error));
  }
  return (
    <div>
      {response ? <Redirect to="/sam" /> : null}
      <CreateQuestions
        typing={(event) => onQuestions(event)}
        submit={onSubmit}
      />
    </div>
  );
};

export default CreateQuestionsPage;
