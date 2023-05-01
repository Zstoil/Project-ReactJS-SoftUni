import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/data/unLike`;


export const unLike = async (carId, userId) => {
    const result = await requester.post(url,{carId, userId});

    return result;
};

export const getAllUnLike = async (carId) => {

    const unLikes = await requester.get(`${url}/${carId}`);
    
    return unLikes;
};

export  const deleteUnLike = async (unLikeId,carId) =>{

    await requester.del(`${url}/${unLikeId}`,{carId});
} 
