import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/unLike`;


export const unLike = async (carId, userId) => {
    const result = await requester.post(url,{carId, userId});

    return result;
};

export const getAllUnLike = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${url}?where=${searchQuery}&load=${relationQuery}`);
    const unLikes = Object.values(result);
    
    return unLikes;
};

export  const deleteUnLike = (unLikeId) => requester.del(`${url}/${unLikeId}`);
