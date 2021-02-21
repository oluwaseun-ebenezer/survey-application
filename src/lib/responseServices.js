import axios from 'axios';

export const submitResponseToSurvey = async(responses) => {
    return await axios.post(`http://localhost:3006/response`, {responses})
        .then((res) => {return res.data})
}

export const checkResponseToSurveyCount = async(survey) => {
    return await axios.get(`http://localhost:3006/response/check/${survey.survey_id}`)
        .then((res) => {return res.data.data})
} 

export const getSurveyReport = async(survey) => {
    return await axios.get(`http://localhost:3006/response/statistics/${survey.survey_id}/${survey.from}/${survey.to}`)
        .then((res) => {return res.data.data})
} 