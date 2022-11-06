import axios from 'axios';

import { baseURL } from '../config';

export const addPayment = async (newItem) => {
    const { data } = await axios.post(baseURL + '/payments/add/', newItem);
    return data;
}

export const getAllPayments = async () => {
    const { data } = await axios.get(baseURL + '/payments/allPayments');
    return data;
}

export const getSelectedPayment = async (id) => {
    const { data } = await axios.get(baseURL + '/payments/getPaymentById/' + id);
    return data;
}

export const getPaymentsByReservation = async (id) => {
    const { data } = await axios.get(baseURL + '/payments/getPaymentsByReservation/' + id);
    return data;
}

export const deletePayment = async (id) => {
    const { data } = await axios.get(baseURL + '/payments/delete/' + id);
    return data;
}

export const editPayment = async (newItem, id) => {
    const { data } = await axios.post(baseURL + '/payments/update/' + id, newItem);
    return data;
}

export const viewPaymentsOfAReservation = async ( id) => {
    const { data } = await axios.get(baseURL + '/payments/viewPaymentsOfACustomer/' + id);
    return data;
}