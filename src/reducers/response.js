import { submitResponseToSurvey, checkResponseToSurveyCount, getSurveyReport } from '../lib/responseServices';
import { surveyUpdateStatus } from '../reducers/question'

const initState = {
    responses: {},
    answerInput: '',
    report: [],
}

const UPDATE_RESPONSE = 'UPDATE_RESPONSE';
const MULTIPLE_RESPONSE = 'MULTIPLE_RESPONSE';
const DELETE_RESPONSE = 'DELETE_RESPONSE';
const TEXT_RESPONSE = 'TEXT_RESPONSE';
const UPDATE_REPORT = 'UPDATE_REPORT';

export const updateSurveyReport = (survey) => {
    return (dispatch) => {
        getSurveyReport(survey)
            .then((res) => {
                dispatch({type: UPDATE_REPORT, payload: res});
            })
    }
}

export const checkSurvey = (survey) => {
    return (dispatch) => {
        checkResponseToSurveyCount(survey)
            .then((res) => {
                dispatch(surveyUpdateStatus(res == 0 ? true : false ));
            })
    }
}

export const updateAnswerInput = (response, question) => {
    return (dispatch) => {
        dispatch({type: TEXT_RESPONSE, payload: {response, question}});
    }
}

export const updateResponse = (response, question) => {
    return (dispatch) => {
        dispatch({type: UPDATE_RESPONSE, payload: {response, question}});
    }
}

export const updateMultipleResponse = (response, question) => {
    return (dispatch) => {
        dispatch({type: MULTIPLE_RESPONSE, payload: {response, question}});
    }
}

export const deleteResponse = (response, question, answer) => {
    return (dispatch) => {
        dispatch({type: DELETE_RESPONSE, payload: {response, question, answer}});
    }
}
const checkResponse = ([responses, compulsories]) => {
    const not_yet_answered = []
    let check = true;
    for (const key in compulsories) {
        if (responses[compulsories[key]]){
            continue;
        } else{
            check = false;
            not_yet_answered.push(compulsories[key]);
        }
    }
    // write a dispatch function here...
    console.log(not_yet_answered);
    return check;
}

export const addResponse = (compulsories) => {

    return (dispatch) => {
        console.log(Object.keys(initState.responses).length)
        const check = checkResponse([initState.responses, compulsories]);
        if(check){
            submitResponseToSurvey(initState.responses)
                .then((res) => {
                    // 
                })
        }
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case UPDATE_RESPONSE:
            state.responses[action.payload.question] = action.payload.response
            console.log(state);
            return {...state};
        case MULTIPLE_RESPONSE:
            state.responses[action.payload.question] = {...state.responses[action.payload.question], ...action.payload.response}
            console.log(state);
            return {...state};
        case DELETE_RESPONSE:
            console.log(action.payload)
            delete state.responses[action.payload.question]
            // delete state.responses[action.payload.question][action.payload.answer];
            console.log(state);
            return {...state};
        case TEXT_RESPONSE:
            state.responses[action.payload.question] = {...state.responses[action.payload.question], ...action.payload.response}
            console.log(state);
            return {...state};
        case UPDATE_REPORT:
            state.report = [];
            return {...state, report: state.report.concat(action.payload)};
        default:
            return state;
    }
}