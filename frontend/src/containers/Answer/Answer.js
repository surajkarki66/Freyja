import React from 'react';

import classes from './Answer.module.css';

const Answer = (props) => {
  return (
    <div className={classes.Answer} style={{ marginBottom: '200px' }}>
      <textarea name="message" rows="10" cols="72" placeholder='Answer' onChange={props.changed} />
      <br />
      <br />
      <button type='submit' onClick={props.gradeMe} className='btn btn-primary mt-3'>Grade Me</button>
    </div>
  );
};

export default Answer;