import React from 'react';

import classes from './Question.module.css';
//This component takes props: id and questionText
const Question = (props) => {
    return (
        <React.Fragment>
            <div onClick={props.single ? null : () => props.sq(props.id)} className={props.single ? classes.QuestionSingle : classes.Question}>
                {props.single ? <div><h3>Question Title:</h3><p className={classes.Ptag}>"{props.questionsTitle}"</p></div> : null}
                {props.single ? <h4>Author: {props.author}</h4> : null}
                {props.single ? <h4>Time: {props.time}</h4> : null}
                {props.author ? <h3>Essay:</h3>: null}
                <p>
                    {props.single ? <span className={classes.Essay}>{props.questionText}</span> : <span>{props.id+1}. {props.questionText}</span>}
                </p>
            </div>
        </React.Fragment>
    )
}

export default Question;