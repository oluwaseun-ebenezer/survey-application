import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllAnswers } from '../../../reducers/answer'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useAnswerListStyles from "./AnswerListStyle";
import Answer from '../Answer';

const AnswerList = (props) => {
    
    const { fetchAllAnswers, answers, surveyId, questionId } = props;
    
    // const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchAllAnswers({survey_id: surveyId, question_id: questionId});
    }, [])

    const classes = useAnswerListStyles();
    console.log('Rendering Answer List');

    return (
        <div className={classes.outerContainer}>
            <p>#Answers</p>

            <div>
                {
                    Object.keys(answers).map((key) => <Answer key={key} surveyId={surveyId} questionId={questionId} {...answers[key]} />)
                }
            </div>
        </div>
        
    );
}

export default connect(
    (state) => ({ answers: state.answer.answers }),
    { fetchAllAnswers }
)(AnswerList);