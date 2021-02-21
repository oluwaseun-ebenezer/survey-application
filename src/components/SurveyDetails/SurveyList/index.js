import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllSurveys } from '../../../reducers/survey'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useSurveyListStyles from "./SurveyListStyle";
import QuestionList from '../QuestionList';
import AddQuestion from '../AddQuestion';
import { Link } from 'react-router-dom';

const SurveyList = (props) => {
    
    const { fetchAllSurveys, surveys } = props;

    const [update, setUpdate] = useState(false);
    const [questionPanel, setQuestionPanel] = useState(null);

    useEffect(() => {
        fetchAllSurveys();
    }, []) 
    

    const classes = useSurveyListStyles();
    console.log('Rendering Survey List');
    console.log(surveys);
    return (
        <div className={classes.outerContainer}>
            <p>#Surveys</p>

            <Select
                onChange={(e) => setQuestionPanel(e.target.value)}
                variant="outlined"
                color="secondary"
                className={classes.input}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {
                    surveys
                    
                    ? 
                        Object.keys(surveys).map((key) => (
                            <MenuItem
                                key={key}
                                value={key}
                            >
                                {surveys[key].title}
                            </MenuItem>
                        ))
                    : <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                }
            </Select>

            {
                questionPanel

                ?
                    <div>
                        <div style={{textAlign: 'center'}}>
                            <br />
                            <h1>{`Survey ${surveys[questionPanel].id}: ${surveys[questionPanel].title}`}</h1>
                            <p>{surveys[questionPanel].description}</p>
                            <Link to={`/survey/${surveys[questionPanel].id}`} style={{textDecoration: 'none', color: 'blue'}} > Visit Survey Page </Link>
                            <br />
                            <br />
                        </div>
                        <AddQuestion surveyId={surveys[questionPanel].id} />
                        <QuestionList surveyId={surveys[questionPanel].id} />
                    </div>
                :
                    ''
            }
        </div>
        
    );
}

export default connect(
    (state) => ({ surveys: state.survey.surveys }),
    { fetchAllSurveys }
)(SurveyList);