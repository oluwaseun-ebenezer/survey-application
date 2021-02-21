import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSurveyTitleFormInput, addSurvey, updateDescriptionFormInput } from '../../../reducers/survey'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField'

import useAddSurveyStyles from "./AddSurveyStyle";
import { TextareaAutosize } from '@material-ui/core';

const AddSurvey = (props) => {
    const classes = useAddSurveyStyles();

    console.log('Rendering Survey Form...')
    const {addSurvey, updateSurveyTitleFormInput, updateDescriptionFormInput, title, description} = props;

    return (
        <div className={classes.outerContainer}>
            <p>#Add Survey</p>
            <form className={classes.form}>
                <TextField
                    label="Name"
                    size="small"
                    helperText=""
                    variant="outlined"
                    color="secondary"
                    className={classes.input}
                    value={title}
                    type="text"
                    onChange={(e) => updateSurveyTitleFormInput(e.target.value)}
                />

                <TextareaAutosize
                    label="Description"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    rowsMin={5}
                    rowsMax={5}
                    className={classes.input}
                    value={description}
                    type="text"
                    onChange={(e) => updateDescriptionFormInput(e.target.value)}
                />

                <Button
                    color="primary"
                    variant="contained"
                    className={classes.blueButton}
                    // disabled={!!clicked}
                    onClick={() => {
                        addSurvey({ title, description })
                    }}
                > Submit </Button>
            </form>
        </div>
    );

}

   
export default connect(
    (state) => ({title: state.survey.surveyTitleFormInput, description: state.survey.surveyDescriptionFormInput }),
    { addSurvey, updateSurveyTitleFormInput, updateDescriptionFormInput }
)(AddSurvey);