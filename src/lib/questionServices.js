import axios from 'axios';

export const getAllQuestionsBySurvey = async (survey) => {
    return await axios.get(`http://localhost:3006/question/${survey.survey_id}`)
        .then((res) => {console.log(res.data.data); return res.data.data})
}

export const createQuestionForSurvey = async(question) => {
    return await axios.post('http://localhost:3006/question/add',{...question})
        .then((res) => {return res.data})
}

export const updateQuestionForSurvey = async(question) => {
    return await axios.post(`http://localhost:3006/question/edit/${question.survey_id}/${question.id}`,{...question})
        .then((res) => {return res.data})
}

export const deleteQuestionFromSurvey = async(question) => {
    return await axios.post(`http://localhost:3006/question/delete/${question.survey_id}/${question.id}`)
        .then((res) => {return res.data})
}  
    
export const getUniqueSurveyInfo = async(id) => {
    return await axios.get(`http://localhost:3006/survey/${id}`)
        .then((res) => {
            if(res.data.data){
                return res.data.data
            }
            return {}
        })
}  
    