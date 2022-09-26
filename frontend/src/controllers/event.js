import axios from 'axios';

import { baseURL } from '../config';

export const addHouseKeeper = async (newItem) => {
    const { data } = await axios.post(baseURL + '/houseKeeper/add/', newItem);
    return data;
}

export const getAllHouseKeeper = async () => {
    const { data } = await axios.get(baseURL + '/houseKeeper/allHouseKeepers');
    return data;
}

export const getSelectedHouseKeeper = async (id) => {
    const { data } = await axios.get(baseURL + '/houseKeeper/getHouseKeeper/' + id);
    return data;
}

export const deleteHouseKeeper = async (id) => {
    const { data } = await axios.get(baseURL + '/houseKeeper/delete/' + id);
    return data;
}

export const editHouseKeeper = async (newItem, id) => {
    const { data } = await axios.post(baseURL + '/houseKeeper/update/' + id, newItem);
    return data;
}