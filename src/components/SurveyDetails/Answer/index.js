import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import { connect } from 'react-redux';
import { editAnswer, remvoveAnswer, updateAnswerDescriptionFormInput, updateEditAnswerDescriptionFormInput } from '../../../reducers/answer'

import useAnswerStyles from "./answerStyle";


const Answer = (props) => {

    const classes = useAnswerStyles();
    const { updateAnswerDescriptionFormInput, editDescriptionFormInput, updateEditAnswerDescriptionFormInput, remvoveAnswer, editAnswer, surveyId, questionId, id, description } = props;
    console.log('Rendering Answer...')

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        
    }, [])
    
    return (
        <div className={classes.outerContainer}>
            <p>#Answer</p>

            <div>
                <input
                    type="text"
                    value={update ? editDescriptionFormInput : description}
                    className={update ? classes.allowInput : classes.input}
                    disabled={!(update)}
                    onChange={(e) => updateEditAnswerDescriptionFormInput(e.target.value)}
                />

                {
                    update
                    ?   (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.greenButton}
                            // disabled={!!clicked}
                            onClick={() => {
                                editAnswer({survey_id: surveyId, question_id: questionId, id, description: editDescriptionFormInput})
                                setUpdate(false);
                                updateAnswerDescriptionFormInput('');
                                updateEditAnswerDescriptionFormInput('');
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
                                if(!(editDescriptionFormInput)) {
                                    setUpdate(true);
                                    updateEditAnswerDescriptionFormInput(description);
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
                                updateAnswerDescriptionFormInput('');
                                updateEditAnswerDescriptionFormInput('');
                            }}
                        > Close </Button>
                    )
                    : (
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.redButton}
                            onClick={() => remvoveAnswer({survey_id: surveyId, question_id: questionId, id, description})}
                        > Delete </Button>
                    )
                }
            </div>

        </div>
    );
}

export default connect(
    (state) => ({ editDescriptionFormInput: state.answer.editAnswerDescriptionFormInput }),
    { updateEditAnswerDescriptionFormInput, updateAnswerDescriptionFormInput, editAnswer, remvoveAnswer }
)(Answer);
