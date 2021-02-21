import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import appTheme from "./theme/AppTheme";
import {ThemeProvider} from "@material-ui/core/styles";
import useAppStyles from './AppStyle';
import { connect } from 'react-redux';
import AddSurvey from './components/Survey/AddSurvey';
import SurveyList from './components/Survey/SurveyList';
import SurveyDropList from './components/SurveyDetails/SurveyList';
import SurveyForm from './components/surveyForm/QuestionList';
import SurveySuccess from './components/SurveySuccess'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SurveyReport from './components/SurveyReport/SurveyList';

const App = () => {

  const classes = useAppStyles();

  return (
    <div className={classes.outerContainer}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/add-survey" component={SurveyList} />
            <Route exact path="/survey-setup" component={SurveyDropList} />
            <Route exact path="/survey-report" component={SurveyReport} />
            <Route exact path="/" component={SurveySuccess} />
            <Route
              path={`/survey/:id`}
              render={(props) => <SurveyForm surveyId={props.match.params.id} /> }
            />
          </Switch>
          <div>
            
          </div>
        </BrowserRouter>
        </ThemeProvider>
    </div>
  );
}

export default connect()(App);
