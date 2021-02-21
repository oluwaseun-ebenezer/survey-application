import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllSurveys } from '../../../reducers/survey'

import useSurveyListStyles from "./SurveyListStyle";
import Survey from '../Survey';
import AddSurvey from '../AddSurvey';

const SurveyList = (props) => {
    
    const { fetchAllSurveys, surveys } = props;

    useEffect(() => {
        fetchAllSurveys();
    }, [])

    

    const classes = useSurveyListStyles();
    console.log('Rendering Survey List');

    return (
        <div className={classes.outerContainer}>
            <AddSurvey />
            <p>#Surveys</p>

            <div className={classes.mainContainer}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.heading}>Title</th>
                            {/* <th className={classes.heading}>Description</th> */}
                            <th className={classes.heading}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(surveys).map((key) => <Survey key={key} {...surveys[key]} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    );
}

export default connect(
    (state) => ({ surveys: state.survey.surveys }),
    { fetchAllSurveys }
)(SurveyList);