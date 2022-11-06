import axios from 'axios';

import { baseURL } from '../config';

export const addRevenue = async (newItem) => {
    const { data } = await axios.post(baseURL + '/revenue/add/', newItem);
    return data;
}

export const getAllRevenues = async (newItem) => {
    const { data } = await axios.get(baseURL + '/revenue/revenue');
    return data;
}

export const deleteRevenue = async (id) => {
    const { data } = await axios.get(baseURL + '/revenue/delete/' + id);
    return data;
}

export const viewRevenue = async (id) => {
    const { data } = await axios.get(baseURL + '/revenue/getRevenue/' + id);
    return data;
}

export const editRevenue = async (id, newItem) => {
    const { data } = await axios.post(baseURL + '/revenue/update/' + id, newItem);
    return data;
}

export const viewRevenueOfACustomer = async (id) => {
    const { data } = await axios.get(baseURL + '/revenue/viewRevenueOfACustomer/' + id);
    return data;
}

