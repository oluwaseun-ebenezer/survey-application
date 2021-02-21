import { getAllSurveys, updateSurvey, deleteSurvey, createSurvey } from '../lib/surveyServices';

const initState = {
    surveys: [],
    surveyTitleFormInput: '',
    editSurveyTitleFormInput: '',
    surveyDescriptionFormInput: '',
    editSurveyDescriptionFormInput: '',
}

const ADD_SURVEY = 'ADD_SURVEY'
const FETCH_SURVEYS = 'FETCH_SURVEYS';
const REMOVE_SURVEY = 'REMOVE_SURVEY'
const EDIT_SURVEY = 'EDIT_SURVEY'
const UPDATE_SURVEY_TITLE_FORM_INPUT = 'UPDATE_SURVEY_TITLE_FORM_INPUT';
const UPDATE_EDIT_SURVEY_TITLE_FORM_INPUT = 'UPDATE_EDIT_SURVEY_TITLE_FORM_INPUT';
const CLEAR_SURVEY_TITLE_FORM_INPUT = 'CLEAR_SURVEY_TITLE_FORM_INPUT';
const CLEAR_EDIT_SURVEY_TITLE_FORM_INPUT = 'CLEAR_EDIT_SURVEY_TITLE_FORM_INPUT';
const UPDATE_SURVEY_DESCRIPTION = 'UPDATE_SURVEY_DESCRIPTION';
const UPDATE_EDIT_SURVEY_DESCRIPTION = 'UPDATE_EDIT_SURVEY_DESCRIPTION';

export const updateSurveyTitleFormInput = (val) => ({type: UPDATE_SURVEY_TITLE_FORM_INPUT, payload: val})
export const updateEditSurveyTitleFormInput = (val) => ({type: UPDATE_EDIT_SURVEY_TITLE_FORM_INPUT, payload: val})
const clearSurveyFormInput = () => ({type: CLEAR_SURVEY_TITLE_FORM_INPUT, payload: ''});
const clearEditSurveyFormInput = () => ({type: CLEAR_EDIT_SURVEY_TITLE_FORM_INPUT, payload: ''});
export const updateDescriptionFormInput = (val) => ({type: UPDATE_SURVEY_DESCRIPTION, payload: val});
export const updateEditDescriptionFormInput = (val) => ({type: UPDATE_EDIT_SURVEY_DESCRIPTION, payload: val});

export const addSurvey = (survey) => {
    return (dispatch) => {
        if (survey.title.length){
            createSurvey(survey)
            .then((res) => {
                dispatch(clearSurveyFormInput());
                return dispatch(fetchAllSurveys());
            })
        }
    }
}

export const editSurvey = (survey) => {
    return (dispatch) => {
        if (survey.title.length){
            updateSurvey(survey)
            .then((res) => {
                dispatch(clearEditSurveyFormInput());
                return dispatch(fetchAllSurveys());
            })
        }
    }
}


export const removeSurvey = (survey) => {
    return (dispatch) => {
            deleteSurvey(survey)
            .then((survey) => {
                dispatch(fetchAllSurveys());
            })
    }
}


export const fetchAllSurveys = () => {
    return (dispatch) => {
        getAllSurveys()
            .then((surveys) => {
                dispatch({type: FETCH_SURVEYS, payload: surveys})
            })
            .catch(err => {
                // dispatch({type: FETCH_SURVEYS, payload: []})
            })
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_SURVEY:
            return {...state, surveys: state.surveys.concat(action.payload)};
    
        case FETCH_SURVEYS:
            state.surveys = [];
            return {...state, surveys: state.surveys.concat(action.payload)};

        case CLEAR_SURVEY_TITLE_FORM_INPUT:
            return {...state, surveyTitleFormInput: action.payload, surveyDescriptionFormInput: action.payload }

        case CLEAR_EDIT_SURVEY_TITLE_FORM_INPUT:
            return {...state, editSurveyTitleFormInput: action.payload, editSurveyDescriptionFormInput: action.payload }

        case UPDATE_SURVEY_TITLE_FORM_INPUT:
            return {...state, surveyTitleFormInput: action.payload}

        case UPDATE_EDIT_SURVEY_TITLE_FORM_INPUT:
            return {...state, editSurveyTitleFormInput: action.payload}

        case UPDATE_SURVEY_DESCRIPTION:
            return {...state, surveyDescriptionFormInput: action.payload }

        case UPDATE_EDIT_SURVEY_DESCRIPTION:
            return {...state, editSurveyDescriptionFormInput: action.payload }
        
        default:
            return state;

    }
}