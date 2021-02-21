import axios from 'axios';

export const getAllAnswersByQuestionAndSurvey = async (answer) => {
    return await axios.get(`http://localhost:3006/answer/${answer.survey_id}/${answer.question_id}`)
        .then((res) => {console.log(res.data.data); return res.data.data})
}

export const createAnswerForQuestionInSurvey = async(answer) => {
    console.log(answer);
    return await axios.post('http://localhost:3006/answer/add',{...answer})
        .then((res) => {return res.data})
}

export const updateAnswerForQuestionInSurvey = async(answer) => {
    return await axios.post(`http://localhost:3006/answer/edit/${answer.survey_id}/${answer.question_id}/${answer.id}`,{...answer})
        .then((res) => {return res.data})
}

export const deleteAnswerFromQuestionInSurvey = async(answer) => {
    return await axios.post(`http://localhost:3006/answer/delete/${answer.survey_id}/${answer.question_id}/${answer.id}`)
        .then((res) => {return res.data})
}  
    