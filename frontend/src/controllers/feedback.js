import axios from 'axios';

import { baseURL } from '../config';

export const addFeedBack = async (newItem) => {
    const { data } = await axios.post(baseURL + '/feedback/add/', newItem);
    return data;
}

export const getAllFeedbacks = async (newItem) => {
    const { data } = await axios.get(baseURL + '/feedback/feedbacks');
    return data;
}

export const deleteFeedBack = async (id) => {
    const { data } = await axios.get(baseURL + '/feedback/delete/' + id);
    return data;
}

export const viewFeedback = async (id) => {
    const { data } = await axios.get(baseURL + '/feedback/get/' + id);
    return data;
}

export const editFeedback = async (id, newItem) => {
    const { data } = await axios.post(baseURL + '/feedback/update/' + id, newItem);
    return data;
}

export const getFeedbacksOfAUser = async (id) => {
    const { data } = await axios.get(baseURL + '/feedback/getFeedbacksOfAUser/' + id);
    return data;
}