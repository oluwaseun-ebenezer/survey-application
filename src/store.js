import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import surveyReducer from './reducers/survey';
import questionReducer from './reducers/question';
import answerReducer from './reducers/answer';
import responseReducer from './reducers/response';

const reducer = combineReducers({
    survey: surveyReducer,
    question: questionReducer,
    answer: answerReducer,
    response: responseReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);
