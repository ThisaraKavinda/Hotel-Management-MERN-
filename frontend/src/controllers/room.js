import axios from 'axios';

import { baseURL } from '../config';

export const addRoom = async (roomCode, type, price, isAvaialable, isAc, facilities) => {
    let newItem = {
        name: roomCode, 
        type: type, 
        price: price,
        isAvailable: isAvaialable,
        isAc: isAc,
        facilities: facilities
    }
    const { data } = await axios.post(baseURL + '/room/add/', newItem);
    return data;
}

export const getAllRooms = async () => {
    const { data } = await axios.get(baseURL + '/room/allRooms');
    return data;
}

export const getSelectedRoom = async (id) => {
    const { data } = await axios.get(baseURL + '/room/getRoom/' + id);
    return data;
}

export const getAvailableRooms = async () => {
    const { data } = await axios.get(baseURL + '/room/getAvailableRooms/');
    return data;
}

export const getSelectedTypeAvailableRooms = async (type) => {
    const { data } = await axios.get(baseURL + '/room/getSelectedTypeAvailableRooms/' + type);
    return data;
}

export const deleteRoom = async (id) => {
    const { data } = await axios.get(baseURL + '/room/delete/' + id);
    return data;
}

export const editRoom = async (id, roomCode, type, price, isAvaialable, isAc, facilities) => {
    let newItem = {
        name: roomCode, 
        type: type, 
        price: price,
        isAvailable: isAvaialable,
        isAc: isAc,
        facilities: facilities
    }
    const { data } = await axios.post(baseURL + '/room/update/' + id, newItem);
    return data;
}