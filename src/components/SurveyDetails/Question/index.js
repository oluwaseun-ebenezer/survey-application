import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from "@material-ui/core/Button";
import { updateEditQuestionDescriptionFormInput, updateQuestionDescriptionFormInput, editQuestion, removeQuestion } from '../../../reducers/question'
import { checkSurvey } from '../../../reducers/response'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useQuestionStyles from "./QuestionStyle";
import AnswerList from '../AnswerList';
import AddAnswer from '../AddAnswer';

const Question = (props) => {
    
    const { nas, checkSurvey, surveyStatus, editDescriptionFormInput, updateEditQuestionDescriptionFormInput, updateQuestionDescriptionFormInput, editQuestion, removeQuestion, surveyId, id, description, answer_type, compulsory } = props;

    const [update, setUpdate] = useState(false);
    const [answerPanel, setAnswerPanel] = useState(null);
    const [answerType, changeAnswerType] = useState(answer_type);
    const [compulsory_, changeCompulsory] = useState(compulsory);
    const [answerTypeOptions, changeAnswerTypeOptions] = useState({ 0: 'Single Answer', 1: 'Multiple Answer', 2: 'Text ' });
    const [compulsoryOptions, changeCompulsoryOptions] = useState({ 0: 'Compulsory', 1: 'Not Compulsory' });
    
    useEffect(() => {
        checkSurvey({survey_id: surveyId});
    }, [])
    console.log(answer_type,'-------------', description)
    const classes = useQuestionStyles();
    console.log('Rendering Question');

    return (
        <div className={classes.outerContainer}>
            <p>#Q{parseInt(nas, 10)+1}</p>

            <div>
                <input
                    type="text"
                    value={update ? editDescriptionFormInput : description}
                    className={update ? classes.allowInput : classes.input}
                    disabled={!(update)}
                    onChange={(e) => updateEditQuestionDescriptionFormInput(e.target.value)}
                />

                <Select
                    onChange={(e) => changeAnswerType(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    className={classes.select}
                    value={answerType}
                    disabled={update ? false : true}
                >
                    {
                        Object.keys(answerTypeOptions).map((key) => <MenuItem key={key} value={key} > {answerTypeOptions[key]} </MenuItem> )
                    }
                </Select>


                <Select
                    onChange={(e) => changeCompulsory(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    className={classes.select}
                    value={compulsory_}
                    disabled={update ? false : true}
                >
                    {
                        Object.keys(compulsoryOptions).map((key) => <MenuItem key={key} value={key} > {compulsoryOptions[key]} </MenuItem> )
                    }
                </Select>

                {
                    update
                    ?   (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.greenButton}
                            // disabled={!!clicked}
                            onClick={() => {
                                editQuestion({survey_id: surveyId, id, description: editDescriptionFormInput, answerType, compulsory: compulsory_ })
                                setUpdate(false);
                                updateQuestionDescriptionFormInput('');
                                updateEditQuestionDescriptionFormInput('');
                                setAnswerPanel(null);
                            }}
                        > Save </Button>
                        )
                    :   (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.cyanButton}
                            disabled={surveyStatus ? false : true}
                            onClick={() => {
                                if(!(editDescriptionFormInput)) {
                                    if(surveyStatus){
                                        setUpdate(true);
                                        setAnswerPanel(id);
                                        updateEditQuestionDescriptionFormInput(description);

                                    }
                                }
                            }}
                        > Update </Button>
                        )
                }

                {
                    update
                    ? (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.redButton}
                            onClick={() => {
                                setUpdate(false);
                                updateQuestionDescriptionFormInput('');
                                updateEditQuestionDescriptionFormInput('');
                                setAnswerPanel(null);
                            }}
                        > Close </Button>
                    )
                    : (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.redButton}
                            disabled={surveyStatus ? false : true}
                            onClick={() => removeQuestion({survey_id: surveyId, id, description})}
                        > Delete </Button>
                    )
                }
            </div>


            {
                answer_type == 2
                ?   
                    ''
                :
                    answerPanel

                    ?
                        <div>
                            <AddAnswer surveyId={surveyId} questionId={id} />
                            <AnswerList surveyId={surveyId} questionId={id} />
                        </div>
                    :
                        ''
            }
        </div>
        
    );
}

export default connect(
    (state) => ({ editDescriptionFormInput: state.question.editQuestionDescriptionFormInput, surveyStatus: state.question.surveyStatus }),
    { updateEditQuestionDescriptionFormInput, updateQuestionDescriptionFormInput, editQuestion, removeQuestion, checkSurvey }
)(Question);