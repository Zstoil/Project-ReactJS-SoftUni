import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/like`;


export const like = async (carId, userId) => {
    const result = await requester.post(url,{carId, userId});

    return result;
};

export const getAllLike = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${url}?where=${searchQuery}&load=${relationQuery}`);
    const likes = Object.values(result);
    
    return likes;
};

export  const deleteLike = (likeId) => requester.del(`${url}/${likeId}`);



