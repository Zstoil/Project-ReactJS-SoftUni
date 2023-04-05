import * as requester from './requester';

const baseUrl = 'http://localhost:3030/data/unLike';


export const unLike = async (carId, userId) => {
    const result = await requester.post(baseUrl,{carId, userId});

    return result;
};

export const getAllUnLike = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const unLikes = Object.values(result);
    
    return unLikes;
};
