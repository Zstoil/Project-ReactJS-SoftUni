import * as requester from './requester';

const baseUrl = 'http://localhost:3030/data/comments';


export const getAll = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);

    return comments;
};

export const create = async (carId, comment) => {
    const result = await requester.post(baseUrl, { carId, comment });

    return result;
};