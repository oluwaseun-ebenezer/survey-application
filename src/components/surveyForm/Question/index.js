import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { updateResponse, deleteResponse, updateMultipleResponse, updateAnswerInput } from '../../../reducers/response'

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useQuestionStyles from "./QuestionStyle";
import AnswerList from '../AnswerList';

const Question = (props) => {
    
    const { updateResponse, updateMultipleResponse, updateAnswerInput, deleteResponse, surveyId, id, refKey, description, answer_type, compulsory } = props;

    const [update, setUpdate] = useState(false);

    useEffect(() => {
      
    }, [])

    const appendToSubmittable = (response) => {
        let formattedResponse = {};
        formattedResponse[response.answer_id] = response;
        updateResponse(formattedResponse, response.question_id);
    }

    const appendToMultipleSubmittable = (response) => {
        let formattedResponse = {};
        formattedResponse[response.answer_id] = response;
        updateMultipleResponse(formattedResponse, response.question_id);
    }

    const removeFromMultiple = (response) => {
        let formattedResponse = {};
        formattedResponse[response.answer_id] = response;
        deleteResponse(formattedResponse, response.question_id, response.answer_id);
    }

    const addTextSubmittable = (response) => {
        let formattedResponse = {};
        formattedResponse[`Text-${response.question_id}`] = response;
        updateAnswerInput(formattedResponse, response.question_id, `Text-${response.question_id}`);
    }

    const classes = useQuestionStyles();
    console.log('Rendering Question');

    return (
        <div className={classes.outerContainer}>
            

            <p><span>{`Q ${parseInt(refKey, 10) + 1}`}</span> &nbsp; &nbsp; &nbsp; {description}? {compulsory ? '' : '*'}</p>
            <div>
                <FormControl component="fieldset">
                    <AnswerList surveyId={surveyId} questionId={id} compulsory={compulsory} answerType={answer_type} addTextResponse={addTextSubmittable} removeResponse={removeFromMultiple} addMultipleResponse={appendToMultipleSubmittable} addResponse={appendToSubmittable} />
                </FormControl>
            </div>
        </div>
        
    );
}

export default connect(
    (state) => ({ responses: state.response.responses }),
    { updateResponse, deleteResponse, updateMultipleResponse, updateAnswerInput }
)(Question);