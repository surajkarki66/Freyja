import React, { useState } from "react";

import Axios from "../../axios-url";

import Questions from "../Questions/Questions";
import Question from "../Questions/Question/Question";
import Answer from "../Answer/Answer";
import Grade from "../Grade/Grade";
import { useEffect } from "react";

function Home(props) {
  const [q, setQ] = useState([]);
  const [id, setId] = useState(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(); //current question state
  const [answer, setAnswer] = useState(""); // User answer state
  const [grade, setGrade] = useState(); // Grade result
  const [showGrade, setShowGrade] = useState(false); // For showing the grade.
  const [responseGrade, setResponseGrade] = useState(Object());

  const fetchQuestions = () => {
    Axios
      .get("/api/question/")
      .then((response) => {
        const dataResponse = response.data;
        setQ(dataResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchSingleQuestion = (id) => {
    const question = q.find((qs) => qs.id === id);
    return question;
  };

  function postAnswer() {
    const token = localStorage.getItem("token");
    if (token) {
      window.alert(
        "Please wait 2-3 seconds for the model to analyze the grade. Scroll down to view the grading"
      );
    } else {
      window.alert("You need to be logged in.");
    }
    Axios.defaults.headers = {
      Authorization: `Token ${token}`,
    };
    Axios
      .post("/api/score/" + id + "/", {
        answer: answer,
      })
      .then((response) => {
        let data = response.data;
        setResponseGrade({ ...responseGrade, ...data });
        let remark;
        if (data.predicted_score <= data.pass_score) {
          remark = "Bad!";
        } else if (data.predicted_score >= data.pass_score) {
          remark = "Good job!";
        } else {
          remark = "Prefect!";
        }
        let resultGrade = (
          <Grade
            grade={data.predicted_score}
            fullScore={data.full_score}
            passScore={data.pass_score}
            answer={answer}
            remark={remark}
          />
        );
        setGrade(resultGrade);
        setShowGrade(true);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    fetchQuestions();
    if (localStorage.getItem("token")) {
      setShowGrade(true);
    }
  }, []);

  const singleQuestionHandler = (id) => {
    setId(id);
    const question = fetchSingleQuestion(id);
    let qs;

    qs = (
      <Question
        questionText={question.question}
        author={question.username}
        time={question.timestamp.slice(0, 10)}
        single
      />
    );
    setCurrentQuestion(qs); // updating the state of currentquestion
    setShowGrade(false);
  };
  const inputAnswerHandler = (event) => {
    // When ever the use enter the answer the answer state update
    let inputAnswer = event.target.value;
    setAnswer(inputAnswer);
  };
  return (
    <div className="App">
      <Questions questionArray={q} singleQuestion={singleQuestionHandler} />
      {currentQuestion}
      {currentQuestion ? (
        <Answer
          changed={(event) => inputAnswerHandler(event)}
          gradeMe={postAnswer}
        />
      ) : null}
      {showGrade ? grade : null}
    </div>
  );
}

export default Home;
