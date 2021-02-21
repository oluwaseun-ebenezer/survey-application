import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllQuestions } from '../../../reducers/question'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useQuestionListStyles from "./QuestionListStyle";
import Question from '../Question';

const QuestionList = (props) => {
    
    const { fetchAllQuestions, questions, surveyId } = props;
    
    // const [update, setUpdate] = useState(false);

    useEffect(() => {
        fetchAllQuestions({survey_id: surveyId});
    }, [surveyId])

    const classes = useQuestionListStyles();
    console.log('Rendering Question List');

    return (
        <div className={classes.outerContainer}>
            <p>#Questions for survey {surveyId}</p>

            <div>
                {
                    Object.keys(questions).map((key) => <Question nas={key} key={key} surveyId={surveyId} {...questions[key]} />)
                }
            </div>
        </div>
        
    );
}

export default connect(
    (state) => ({ questions: state.question.questions }),
    { fetchAllQuestions }
)(QuestionList);