import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllQuestions, getSurveyInfo } from '../../../reducers/question'
import { addResponse } from '../../../reducers/response';

import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useQuestionListStyles from "./QuestionListStyle";
import Question from '../Question';
import { Redirect } from 'react-router-dom';

const QuestionList = (props) => {
    
    const { fetchAllQuestions, addResponse, getSurveyInfo, surveyInfo, questions, surveyId } = props;
    const [redirect, updateRedirect] = useState(false);

    const compulsories = [];
    for (const key in questions) {
        if(questions[key].compulsory == 0){
            compulsories.push(questions[key].id);
        }
    }
    useEffect(() => {
        getSurveyInfo(surveyId)
    }, [])

    useEffect(() => {
        fetchAllQuestions({survey_id: surveyId});
    }, [surveyId])

    const classes = useQuestionListStyles();
    console.log('Rendering Question List');

    return (
        <div className={classes.outerContainer}>

            {
                redirect == true
                ?
                    <Redirect to="/" />
                :   ''
            }  

            {
                surveyInfo.id
                ?
                    <div style={{textAlign: 'center'}}>
                        <br />
                        <h1>{`${surveyInfo.title}`}</h1>
                        <p>{surveyInfo.description}</p>
                        <br />
                        <br />
                    </div>
                :
                    ''
            }

            <div>
                {
                    Object.keys(questions).map((key) => <Question key={key} refKey={key} surveyId={surveyId} {...questions[key]} />)
                }
            </div>

            {
                surveyInfo.id
                ?
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.button}
                        // disabled={!!clicked}
                        onClick={() => {
                            addResponse(compulsories);
                            updateRedirect(true);
                        }}
                    > Submit Survey</Button>
                :
                    ''
            }
        </div>
        
    );
}

export default connect(
    (state) => ({ questions: state.question.questions, surveyInfo: state.question.surveyInfo }),
    { fetchAllQuestions, addResponse, getSurveyInfo }
)(QuestionList);