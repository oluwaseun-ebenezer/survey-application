import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAnswerDescriptionFormInput, addAnswer } from '../../../reducers/answer'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'

import useAddAnswerStyles from "./AddAnswerStyle";

const AddAnswer = (props) => {
    const classes = useAddAnswerStyles();

    console.log('Rendering Survey Form...')
    const {updateAnswerDescriptionFormInput, addAnswer, surveyId, questionId, description} = props;

    return (
        <div className={classes.outerContainer}>
            <p>#Add Answer</p>
            <form className={classes.form}>
                <TextField
                    label="Name"
                    size="small"
                    helperText=""
                    variant="outlined"
                    color="secondary"
                    className={classes.input}
                    value={description}
                    type="text"
                    onChange={(e) => updateAnswerDescriptionFormInput(e.target.value)}
                />

                <Button
                    color="primary"
                    variant="contained"
                    className={classes.blueButton}
                    // disabled={!!clicked}
                    onClick={() => {
                        addAnswer({ description, surveyId, questionId })
                    }}
                > Submit </Button>
            </form>
        </div>
    );

}

   
export default connect(
    (state) => ({description: state.answer.answerDescriptionFormInput}),
    { addAnswer, updateAnswerDescriptionFormInput }
)(AddAnswer);