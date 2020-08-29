import React from 'react';

import classes from './Answer.module.css';

const Answer =(props) => {
    return(
        <div className={classes.Answer}>
            <textarea name="message" rows="10" cols="72" placeholder='Answer' onChange={props.changed} />
            <br />
            <br />
            <button type='submit' onClick={props.gradeMe} className={'btn btn-primary'}>Grade Me</button>
        </div>
    )
}

export default Answer;