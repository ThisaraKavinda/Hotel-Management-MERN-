import axios from 'axios';

import { baseURL } from '../config';

export const addReservation = async (newItem) => {
    const { data } = await axios.post(baseURL + '/reservation/add/', newItem);
    return data;
}

export const getAllReservations = async () => {
    const { data } = await axios.get(baseURL + '/reservation/allReservations');
    return data;
}

export const getSelectedReservation = async (id) => {
    const { data } = await axios.get(baseURL + '/reservation/getReservationById/' + id);
    return data;
}

export const getSelectedReservationByNic = async (nic) => {
    const { data } = await axios.get(baseURL + '/reservation/getReservationByNic/' + nic);
    return data;
}

export const getReservationsInAGivenPeriod = async (checkInDate, checkOutDate) => {
    const { data } = await axios.get(baseURL + '/reservation/getReservationsInAGivenPeriod/' + checkInDate.toISOString() + "/" + checkOutDate.toISOString());
    return data;
}

export const getCurrentReservations = async () => {
    const { data } = await axios.get(baseURL + '/reservation/getCurrentReservations');
    return data;
}

export const deleteReservation = async (id) => {
    const { data } = await axios.get(baseURL + '/reservation/delete/' + id);
    return data;
}

export const editReservation = async (newItem, id) => {
    const { data } = await axios.post(baseURL + '/reservation/update/' + id, newItem);
    return data;
}