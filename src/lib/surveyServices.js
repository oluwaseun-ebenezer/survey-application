import axios from 'axios';

export const getAllSurveys = async () => {
    return await axios.get('http://localhost:3006/survey')
        .then((res) => {console.log(res.data.data); return res.data.data})
}

export const createSurvey = async(survey) => {
    return await axios.post('http://localhost:3006/survey/add',{...survey})
        .then((res) => {return res.data})
}

export const updateSurvey = async(survey) => {
    return await axios.post(`http://localhost:3006/survey/edit/${survey.id}`,{...survey})
        .then((res) => {return res.data})
}

export const deleteSurvey = async(survey) => {
    return await axios.post(`http://localhost:3006/survey/delete/${survey.id}`)
        .then((res) => {return res.data})
}  
    