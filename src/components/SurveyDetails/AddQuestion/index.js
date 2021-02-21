import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { updateQuestionDescriptionFormInput, addQuestion } from '../../../reducers/question'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useAddQuestionStyles from "./AddQuestionStyle";

const AddQuestion = (props) => {
    const classes = useAddQuestionStyles();

    console.log('Rendering Question Form...')
    const {updateQuestionDescriptionFormInput, addQuestion, description, surveyId} = props;
    const [answerType, changeAnswerType] = useState(null);
    const [compulsory, changeCompulsory] = useState(null);
    const [answerTypeOptions, changeAnswerTypeOptions] = useState({ 0: 'Single Answer', 1: 'Multiple Answer', 2: 'Text ' });
    const [compulsoryOptions, changeCompulsoryOptions] = useState({ 0: 'Compulsory', 1: 'Not Compulsory' });
    

    return (
        <div className={classes.outerContainer}>
            <p>#Add Question</p>
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
                    onChange={(e) => updateQuestionDescriptionFormInput(e.target.value)}
                />

                <Select
                    onChange={(e) => changeAnswerType(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    className={classes.input}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        Object.keys(answerTypeOptions).map((key) => <MenuItem key={key} value={key} > {answerTypeOptions[key]} </MenuItem> )
                    }
                </Select>


                <Select
                    onChange={(e) => changeCompulsory(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    className={classes.input}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        Object.keys(compulsoryOptions).map((key) => <MenuItem key={key} value={key} > {compulsoryOptions[key]} </MenuItem> )
                    }
                </Select>

                <Button
                    color="primary"
                    variant="contained"
                    className={classes.blueButton}
                    // disabled={!!clicked}
                    onClick={() => {
                        addQuestion({ surveyId, description, answerType, compulsory })
                    }}
                > Submit </Button>
            </form>
        </div>
    );

}


export default connect(
    (state) => ({description: state.question.questionDescriptionFormInput}),
    { updateQuestionDescriptionFormInput, addQuestion }
)(AddQuestion);