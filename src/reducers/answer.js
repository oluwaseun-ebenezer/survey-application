import { getAllAnswersByQuestionAndSurvey, updateAnswerForQuestionInSurvey, deleteAnswerFromQuestionInSurvey, createAnswerForQuestionInSurvey } from '../lib/answerServices';

const initState = {
    answers: [],
    answerDescriptionFormInput: '',
    editAnswerDescriptionFormInput: '',
}

const ADD_ANSWER = 'ADD_ANSWER'
const FETCH_ANSWERS = 'FETCH_ANSWERS';
const UPDATE_ANSWER_DESCRIPTION_FORM_INPUT = 'UPDATE_ANSWER_DESCRIPTION_FORM_INPUT';
const UPDATE_EDIT_ANSWER_DESCRIPTION_FORM_INPUT = 'UPDATE_EDIT_ANSWER_DESCRIPTION_FORM_INPUT';
const CLEAR_ANSWER_DESCRIPTION_FORM_INPUT = 'CLEAR_ANSWER_DESCRIPTION_FORM_INPUT';
const CLEAR_EDIT_ANSWER_DESCRIPTION_FORM_INPUT = 'CLEAR_EDIT_ANSWER_DESCRIPTION_FORM_INPUT';


export const updateAnswerDescriptionFormInput = (val) => ({type: UPDATE_ANSWER_DESCRIPTION_FORM_INPUT, payload: val})
export const updateEditAnswerDescriptionFormInput = (val) => ({type: UPDATE_EDIT_ANSWER_DESCRIPTION_FORM_INPUT, payload: val})
const clearAnswerDescriptionFormInput = () => ({type: CLEAR_ANSWER_DESCRIPTION_FORM_INPUT, payload: ''});
const clearEditAnswerDescriptionFormInput = () => ({type: CLEAR_EDIT_ANSWER_DESCRIPTION_FORM_INPUT, payload: ''});

export const addAnswer = (answer) => {
    return (dispatch) => {
        if (answer.description.length){
            createAnswerForQuestionInSurvey(answer)
            .then((res) => {
                dispatch(clearAnswerDescriptionFormInput());
                dispatch(fetchAllAnswers({survey_id: answer.surveyId, question_id: answer.questionId}));
            })
        }
    }
}

export const editAnswer = (answer) => {
    return (dispatch) => {
        if (answer.description.length){
            updateAnswerForQuestionInSurvey(answer)
            .then((res) => {
                dispatch(clearEditAnswerDescriptionFormInput());
                dispatch(fetchAllAnswers({survey_id: answer.survey_id, question_id: answer.question_id}));
            })
        }
    }
}

export const remvoveAnswer = (answer) => {
    return (dispatch) => {
        deleteAnswerFromQuestionInSurvey(answer)
        .then((res) => {
            dispatch(fetchAllAnswers());
        })
    }
}

export const fetchAllAnswers = (answer) => {
    return (dispatch) => {
        getAllAnswersByQuestionAndSurvey(answer)
            .then((answers) => {
                dispatch({type: FETCH_ANSWERS, payload: answers})
            })
            .catch(err => {
                // dispatch({type: FETCH_SURVEYS, payload: []})
            })
    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_ANSWER:
            return {...state, answers: state.answers.concat(action.payload)};
    
        case FETCH_ANSWERS:
            state.answers = [];
            return {...state, answers: state.answers.concat(action.payload)};

        case CLEAR_ANSWER_DESCRIPTION_FORM_INPUT:
            return {...state, answerDescriptionFormInput: action.payload, }

        case CLEAR_EDIT_ANSWER_DESCRIPTION_FORM_INPUT:
            return {...state, editAnswerDescriptionFormInput: action.payload, }

        case UPDATE_ANSWER_DESCRIPTION_FORM_INPUT:
            return {...state, answerDescriptionFormInput: action.payload}

        case UPDATE_EDIT_ANSWER_DESCRIPTION_FORM_INPUT:
            return {...state, editAnswerDescriptionFormInput: action.payload}
        default:
            return state;

    }
}