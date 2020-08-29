import React from 'react';

import classes from './Grade.module.css';


//Grade take props: remarks, grade, answer
const Grade =(props) => {
    return (
        <div className={classes.Grade}>
            <h1>Result:</h1>

            <h3>Grade: {props.grade}</h3>
            <h5>Full Score:{props.fullScore}</h5>
            <h5>Pass Score:{props.passScore}</h5>
            <h5>Low Score:{props.lowScore}</h5>
            <p>Remarks: {props.remark}</p>

            <div>
                <h3>Your Submission:</h3>
                <p>{props.answer}</p>
            </div>
            
        </div>
    )
}

export default Grade;