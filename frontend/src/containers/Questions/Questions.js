import React from 'react';
import Question from './Question/Question';

import classes from './Questions.module.css';

//This component takes array of question as props named: questionsArray
const Questions = (props) => {
    const questionSets = props.questionArray.map((ques, idx) => {
        return (<Question key={idx} id={idx} questionText={ques} sq={props.singleQuestion}/>)
    })
    return(
        <div className={classes.Questions}>
            <h1>Questions Sets</h1>
            <ul>
                {questionSets}
            </ul>
        </div>
    )

}

export default Questions;