import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/like`;


export const like = async (carId, userId) => {
    const result = await requester.post(url,{carId, userId});

    return result;
};

export const getAllLike = async (carId) => {

    const likes = await requester.get(`${url}/${carId}`);
    
    return likes;
};

export  const deleteLike = async (likeId,carId) =>{
    
    await requester.del(`${url}/${likeId}`,{carId});
} 



