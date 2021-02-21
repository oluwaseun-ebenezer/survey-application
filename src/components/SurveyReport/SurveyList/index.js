import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllSurveys } from '../../../reducers/survey'
import { updateSurveyReport } from '../../../reducers/response'
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import useSurveyListStyles from "./SurveyListStyle";
import TextField from '@material-ui/core/TextField'
// import QuestionList from '../QuestionList';
// import AddQuestion from '../AddQuestion';
import { Link } from 'react-router-dom';
import { EmojiObjects } from '@material-ui/icons';
import {CSVLink, CSVDownload} from 'react-csv';

const SurveyList = (props) => {
    
    const { fetchAllSurveys, updateSurveyReport, report, surveys } = props;

    const [update, setUpdate] = useState(false);
    const [questionPanel, setQuestionPanel] = useState(null);

    const today = new Date(Date.now());

    const [from, updateFrom] = useState('0000-00-00');
    const [to, updateTo] = useState(`${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`)
    
    const format =[
        ['S/N',	'Question', 'Answer', 'Count',	'Percentage Count',	'Total Number',	'Total Percentage'],
    ];

    const [csvData, updateCSVData] = useState(format)
  
    useEffect(() => {
        fetchAllSurveys();
    }, []) 
    
    useEffect(() => {
        updateCSVData([...format, ...report]);
    }, [report])

    const classes = useSurveyListStyles();
    console.log('Rendering Survey List');

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

                            <TextField
                                id="date"
                                label="From"
                                type="date"
                                value={from}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => updateFrom(e.target.value)}
                            />

                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                            <TextField
                                id="date"
                                label="To"
                                type="date"
                                value={to}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => {updateTo(e.target.value)}}
                            />
                            <br />
                            <br />

                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                // disabled={!!clicked}
                                onClick={() => {
                                    updateSurveyReport({survey_id: surveys[questionPanel].id, from, to})
                                }}
                            > Generate Report </Button>

                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                            <Button
                                color="primary"
                                variant="contained"
                                className={classes.button}
                                disabled={ csvData.length > 1 ? false : true}
                            > <CSVLink style={{textDecoration: 'none', color: 'black'}} data={csvData} target="_blank" filename={`my-report${Date.now()}.csv`}>Download Report </CSVLink></Button>

                            
                        </div>
                        <div>
                            {
                                report

                                ?

                                    (

                                        <div className={classes.mainContainer}>
                                            <table className={classes.table}>
                                                <thead>
                                                    <tr>
                                                        <th className={classes.heading}>S/N</th>
                                                        <th className={classes.heading}>Question</th>
                                                        <th className={classes.heading}>Answer</th>
                                                        <th className={classes.heading}>Count</th>
                                                        <th className={classes.heading}>Percentage Count</th>
                                                        <th className={classes.heading}>Total Number</th>
                                                        <th className={classes.heading}>Total Percentage</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        Object.keys(report).map((key) => {
                                                            return (
                                                                <tr>
                                                                    <td>{report[key][0]}</td>
                                                                    <td>{report[key][1]}</td>
                                                                    <td>{report[key][2]}</td>
                                                                    <td>{report[key][3]}</td>
                                                                    <td>{report[key][4]}</td>
                                                                    <td>{report[key][5]}</td>
                                                                    <td>{report[key][6]}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                :
                                    ''
                            }
                            
                        </div>
                    </div>
                :
                    ''
            }
        </div>
        
    );
}

export default connect(
    (state) => ({ surveys: state.survey.surveys, report: state.response.report }),
    { fetchAllSurveys, updateSurveyReport }
)(SurveyList);