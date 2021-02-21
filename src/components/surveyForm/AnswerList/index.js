import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useAnswerListStyles from "./AnswerListStyle";
import Answer from '../Answer';
import { updateAnswerInput } from '../../../reducers/response'

import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
const AnswerList = (props) => {
    
    const { addResponse, addTextResponse, addMultipleResponse, removeResponse, updateAnswerInput, answerInput, fetchAllAnswers, reducerAnswers, surveyId, questionId, answerType, compulsory } = props;
    
    const [value, setValue] = useState(null);
    const [textValue, setTextValue] = useState('');
    const [multiple, setMultipleValue] = useState([]);
    const [answers, setAnswers] = useState([]);

    const getAllAnswersByQuestionAndSurvey = async (answer) => {
        return await axios.get(`http://localhost:3006/answer/${answer.survey_id}/${answer.question_id}`)
            .then((res) => {console.log(res.data.data); return setAnswers(res.data.data);})
    }
    
    useEffect(() => {
        getAllAnswersByQuestionAndSurvey({survey_id: surveyId, question_id: questionId});
    }, [questionId])

    const changeAnswer = (id) => {
        addResponse({answer_id: id, question_id: questionId, survey_id: parseInt(surveyId, 10)});
        setValue(id);
    }

    const changeAnswerMultiple = (id) => {
        addMultipleResponse({answer_id: id, question_id: questionId, survey_id: parseInt(surveyId, 10)});
        setMultipleValue([...multiple, id]);
        setValue(id)
    }
    
    const removeAnswerMultiple = (id) => {
        console.log(id)
        removeResponse({answer_id: id, question_id: questionId, survey_id: parseInt(surveyId, 10)})
        console.log(Object.keys(multiple).filter(key => multiple[key] != id ))
        setMultipleValue(Object.keys(multiple).filter(key => multiple[key] != id ))
    }

    const changeAnswerText = (text) => {
        addTextResponse({description: text, question_id: questionId, survey_id: parseInt(surveyId, 10)});
    }

    console.log(answers);
    const classes = useAnswerListStyles();
    console.log('Rendering Answer List');
    console.log(value)
    return (
        <div>
            {
                answerType === 0 || answerType === 1
                ?
                    <div>
                    
                        {
                            Object.keys(answers).map((key) => <Answer key={key} value={value} multiple={multiple} removeAnswerMultiple={removeAnswerMultiple} changeAnswerMultiple={changeAnswerMultiple} answerType={answerType} changeAnswerText={changeAnswerText} changeAnswer={changeAnswer} surveyId={surveyId} questionId={questionId} {...answers[key]} />)
                        }
                    
                    </div>
                :
                
                    (
                        <TextField
                            label=""
                            size="small"
                            helperText=""
                            variant="outlined"
                            color="secondary"
                            className={classes.input}
                            value={answerInput}
                            type="text"
                            onChange={(e) => changeAnswerText(e.target.value)}
                        />
                    )
            }

        </div>
        
        
    );
}

export default connect(
    (state) => ({answerInput: state.answer.answerInput}),
    { updateAnswerInput }
)(AnswerList);