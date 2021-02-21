import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { editSurvey, updateSurveyTitleFormInput, updateEditSurveyTitleFormInput, updateEditDescriptionFormInput, removeSurvey } from '../../../reducers/survey'

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import useSurveyStyles from "./SurveyStyle";


const Survey = (props) => {

    const classes = useSurveyStyles();
    const { updateSurveyTitleFormInput, descriptionFormInput, editTitleFormInput, updateEditDescriptionFormInput, updateEditSurveyTitleFormInput, removeSurvey, description, editSurvey, title, id } = props;
    console.log('Rendering Survey...')

    const [update, setUpdate] = useState(false);


    useEffect(() => {
        
    }, [])
    
    return (
        <tr>
            <td>
                <input
                    type="text"
                    value={update ? editTitleFormInput : title}
                    className={update ? classes.allowInput : classes.input}
                    disabled={!(update)}
                    onChange={(e) => updateEditSurveyTitleFormInput(e.target.value)}
                />
            </td>
            <td>
                
                <TextareaAutosize
                    label="Description"
                    size="small"
                    variant="outlined"
                    color="secondary"
                    rowsMin={5}
                    rowsMax={5}
                    className={classes.input}
                    value={update ? descriptionFormInput : description}
                    type="text"
                    onChange={(e) => updateEditDescriptionFormInput(e.target.value)}
                />
            </td>
            <td>
                {
                    update
                    ?   (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.greenButton}
                            // disabled={!!clicked}
                            onClick={() => {
                                editSurvey({id, title: editTitleFormInput, description: descriptionFormInput})
                                setUpdate(false);
                                updateSurveyTitleFormInput('');
                                updateEditSurveyTitleFormInput('');
                                updateEditDescriptionFormInput('')
                            }}
                        > Save </Button>
                        )
                    :   (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.cyanButton}
                            // disabled={!!clicked}
                            onClick={() => {
                                if(!(editTitleFormInput) && !(descriptionFormInput)) {
                                    setUpdate(true);
                                    updateEditSurveyTitleFormInput(title);
                                    updateEditDescriptionFormInput(description)
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
                                updateSurveyTitleFormInput('');
                                updateEditSurveyTitleFormInput('');
                                updateEditDescriptionFormInput('')
                            }}
                        > Close </Button>
                    )
                    : (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.redButton}
                            onClick={() => removeSurvey({id, title})}
                        > Delete </Button>
                    )
                }
                
            </td>
        </tr>
    );
}

export default connect(
    (state) => ({ editTitleFormInput: state.survey.editSurveyTitleFormInput, descriptionFormInput: state.survey.editSurveyDescriptionFormInput }),
    { updateSurveyTitleFormInput, updateEditSurveyTitleFormInput, updateEditDescriptionFormInput, editSurvey, removeSurvey }
)(Survey);