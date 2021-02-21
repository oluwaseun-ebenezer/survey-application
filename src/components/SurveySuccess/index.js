import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import useSurveySuccessStyles from "./SurveySuccessStyle";

const SurveySuccess = () => {
    const classes = useSurveySuccessStyles();
    return (
        <div className={classes.outerContainer}>
            <h1>Thanks!</h1>
            <h3>For checking out our survey...</h3>
        </div>
        
    );
}

export default connect()(SurveySuccess);