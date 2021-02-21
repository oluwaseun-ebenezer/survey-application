import { Redirect } from 'react-router-dom';
import { getUniqueSurveyInfo, getAllQuestionsBySurvey, updateQuestionForSurvey, deleteQuestionFromSurvey, createQuestionForSurvey } from '../lib/questionServices';

const initState = {
    questions: [],
    questionDescriptionFormInput: '',
    editQuestionDescriptionFormInput: '',
    surveyStatus: true,
    surveyInfo: {},
}

const ADD_QUESTION = 'ADD_QUESTION'
const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
const UPDATE_QUESTION_DESCRIPTION_FORM_INPUT = 'UPDATE_QUESTION_DESCRIPTION_FORM_INPUT';
const UPDATE_EDIT_QUESTION_DESCRIPTION_FORM_INPUT = 'UPDATE_EDIT_QUESTION_DESCRIPTION_FORM_INPUT';
const CLEAR_QUESTION_DESCRIPTION_FORM_INPUT = 'CLEAR_QUESTION_DESCRIPTION_FORM_INPUT';
const CLEAR_EDIT_QUESTION_DESCRIPTION_FORM_INPUT = 'CLEAR_EDIT_QUESTION_DESCRIPTION_FORM_INPUT';
const SURVEY_UPDATE_STATUS = 'SURVEY_UPDATE_STATUS';
const PUSH_SURVEY_INFO = 'PUSH_SURVEY_INFO';


export const updateQuestionDescriptionFormInput = (val) => ({type: UPDATE_QUESTION_DESCRIPTION_FORM_INPUT, payload: val})
export const updateEditQuestionDescriptionFormInput = (val) => ({type: UPDATE_EDIT_QUESTION_DESCRIPTION_FORM_INPUT, payload: val})
const clearQuestionDescriptionFormInput = () => ({type: CLEAR_QUESTION_DESCRIPTION_FORM_INPUT, payload: ''});
const clearEditQuestionDescriptionFormInput = () => ({type: CLEAR_EDIT_QUESTION_DESCRIPTION_FORM_INPUT, payload: ''});
export const surveyUpdateStatus = (val) => ({type: SURVEY_UPDATE_STATUS, payload: val});

export const addQuestion = (question) => {
    console.log(question)
    return (dispatch) => {
        if (question.description.length && (question.answerType == 0 || question.answerType == 1 || question.answerType == 2)  && (question.compulsory == 0 || question.compulsory == 1)){
            createQuestionForSurvey(question)
            .then((res) => {
                dispatch(clearQuestionDescriptionFormInput());
                dispatch(fetchAllQuestions({survey_id: question.surveyId}));
            })
        } 
    }
}

export const getSurveyInfo = (id) => {
    return (dispatch) => {
        getUniqueSurveyInfo(id)
            .then((res) => {
                if(res == false){
                    dispatch({type: PUSH_SURVEY_INFO, payload: res })
                } else{
                    dispatch({type: PUSH_SURVEY_INFO, payload: res })
                }
            })
    }
}

export const editQuestion = (question) => {
    return (dispatch) => {
        console.log(question)
        if (question.description.length && (question.answerType == 0 || question.answerType == 1 || question.answerType == 2)  && (question.compulsory == 0 || question.compulsory == 1)){
            updateQuestionForSurvey(question)
            .then((res) => {
                dispatch(clearEditQuestionDescriptionFormInput());
                dispatch(fetchAllQuestions({survey_id: question.survey_id}));
            })
        }
    }
}

export const removeQuestion = (question) => {
    return (dispatch) => {
        deleteQuestionFromSurvey(question)
        .then((res) => {
            dispatch(fetchAllQuestions({survey_id: question.survey_id}));
        })
    }
}

export const fetchAllQuestions = (survey) => {
    console.log('Wereh got here o')
    return (dispatch) => {
        getAllQuestionsBySurvey(survey)
            .then((questions) => {
                dispatch({type: FETCH_QUESTIONS, payload: questions})
            })
            .catch(err => {
                // dispatch({type: FETCH_QUESTIONS, payload: []})
            })
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_QUESTION:
            return {...state, questions: state.questions.concat(action.payload)};
    
        case FETCH_QUESTIONS:
            state.questions = [];
            return {...state, questions: state.questions.concat(action.payload)};

        case CLEAR_QUESTION_DESCRIPTION_FORM_INPUT:
            return {...state, questionDescriptionFormInput: action.payload, }

        case CLEAR_EDIT_QUESTION_DESCRIPTION_FORM_INPUT:
            return {...state, editQuestionDescriptionFormInput: action.payload, }

        case UPDATE_QUESTION_DESCRIPTION_FORM_INPUT:
            return {...state, questionDescriptionFormInput: action.payload}

        case UPDATE_EDIT_QUESTION_DESCRIPTION_FORM_INPUT:
            return {...state, editQuestionDescriptionFormInput: action.payload}

        case SURVEY_UPDATE_STATUS:
            return {...state, surveyStatus: action.payload }

        case PUSH_SURVEY_INFO:
            return {...state, surveyInfo: state.surveyInfo = action.payload}
        default:
            return state;

    }
}