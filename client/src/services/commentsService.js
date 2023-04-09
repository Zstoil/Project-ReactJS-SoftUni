import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/comments`;


export  const getOne = async (id) => {

    const result = await requester.get(`${url}/${id}`);

    return result;
};

export const getAll = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${url}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);
    
    return comments;
};

export const create = async (carId, comment) => {
    const result = await requester.post(url, { carId, comment });

    return result;
};

export const editComment = async (id,comment) => requester.put(`${url}/${id}`,comment)

export const deleteComment = async (id) => requester.del(`${url}/${id}`);

