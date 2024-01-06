import React, { useState } from "react";

import Axios from "../../axios-url";

import Questions from "../Questions/Questions";
import Question from "../Questions/Question/Question";
import Answer from "../Answer/Answer";
import Grade from "../Grade/Grade";
import { useEffect } from "react";

function Home() {
  const [q, setQ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Loading, setLoading2] = useState(false);
  const [id, setId] = useState(undefined);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState();
  const [error, setError] = useState("");
  const [showGrade, setShowGrade] = useState(false);
  const [responseGrade, setResponseGrade] = useState(Object());

  const fetchQuestions = () => {
    Axios.get("/api/question/")
      .then((response) => {
        const dataResponse = response.data;
        setLoading(false);
        setQ(dataResponse);
      })
      .catch((error) => {
        setLoading(false);
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
    setLoading2(true);
    setError("");
    Axios.post("/api/score/" + id + "/", {
      answer: answer,
    })
      .then((response) => {
        let data = response.data;
        let remark;
        setResponseGrade({ ...responseGrade, ...data });
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
        setLoading2(false);
        setError("");
      })
      .catch((error) => {
        setLoading2(false);
        if (error.response.data.answer) {
          setError("Please enter the answer first");
        } else {
          setError("Something went wrong!");
        }
      });
  }
  useEffect(() => {
    fetchQuestions();
  }, []);

  const singleQuestionHandler = (id) => {
    setId(id);
    const question = fetchSingleQuestion(id);
    let qs;

    qs = (
      <Question
        questionText={question.question}
        sourceEssay={question.source_essay}
        setNo = {question.set_no}
        author={question.username}
        time={question.timestamp.slice(0, 10)}
        single
      />
    );
    setCurrentQuestion(qs);
    setShowGrade(false);
    window.scrollBy({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  const inputAnswerHandler = (event) => {
    let inputAnswer = event.target.value;
    setAnswer(inputAnswer);
  };
  return (
    <div className="App">
      <Questions questionArray={q} singleQuestion={singleQuestionHandler} />
      {loading ? (
        <h5 className="loading-icon-home">Loading...</h5>
      ) : (
        <>
          {currentQuestion}
          {currentQuestion ? (
            <Answer
              changed={(event) => inputAnswerHandler(event)}
              gradeMe={postAnswer}
              loading={Loading}
              error={error}
              showGrade={showGrade}
            />
          ) : null}
          {showGrade ? grade : null}
        </>
      )}
    </div>
  );
}

export default Home;
