import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { editAnswer, updateAnswerInput, remvoveAnswer, updateAnswerDescriptionFormInput, updateEditAnswerDescriptionFormInput } from '../../../reducers/answer'

import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';

import useAnswerStyles from "./answerStyle";

const Answer = (props) => {

    const classes = useAnswerStyles();
    const { value, changeAnswer, multiple, removeAnswerMultiple, changeAnswerMultiple, changeAnswerText, answerType, answerInput, updateAnswerInput, updateAnswerDescriptionFormInput, editDescriptionFormInput, updateEditAnswerDescriptionFormInput, remvoveAnswer, editAnswer, surveyId, questionId, id, description } = props;
    console.log('Rendering Answer...')

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        
    }, [])
    
    return (
        <div>
            {
                answerType === 1

                ?   (
                    <FormControlLabel
                        control={<Checkbox
                            checked={ value ? (multiple.includes(id) ? true : false ) : false}
                            value={id}
                            onChange={() => value ? (multiple.includes(id) ? removeAnswerMultiple(id) : changeAnswerMultiple(id) ) : changeAnswerMultiple(id) }
                        />}
                        label={description}
                    />
                )

                :       answerType === 0

                    ?   (
                        <FormControlLabel
                            control={<Radio
                                checked={ value ? (id == value ? true : false ) : false} 
                                onChange={() => changeAnswer(id)}
                                value={id}
                            />}
                            label={description}
                        />
                    )

                    : ''
                        


            }
        </div>
        
    );
}

export default connect(
    (state) => ({ editDescriptionFormInput: state.answer.editAnswerDescriptionFormInput, answerInput: state.answer.answerInput }),
    { updateEditAnswerDescriptionFormInput, updateAnswerDescriptionFormInput, editAnswer, remvoveAnswer }
)(Answer);
