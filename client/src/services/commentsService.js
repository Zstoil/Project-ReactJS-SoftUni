import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/comments`;


export  const getOne = async (id) => {

    const result = await requester.get(`${url}/edit/${id}`);

    return result;
};

export const getAll = async (carId) => {
    
    const result = await requester.get(`${url}/${carId}`);
    
    return result;
};

export const create = async (carId, comment) => {

    const result = await requester.post(url, { carId, comment });
    
    return result;
};

export const editComment = async (id,comment) => requester.put(`${url}/${id}`,comment)

export const deleteComment = async (id,carId) => requester.del(`${url}/${id}`,{carId});

