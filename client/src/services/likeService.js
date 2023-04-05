import * as requester from './requester';

const baseUrl = 'http://localhost:3030/data/like';


export const like = async (carId, userId) => {
    const result = await requester.post(baseUrl,{carId, userId});

    return result;
};

export const getAllLike = async (carId) => {
    const searchQuery = encodeURIComponent(`carId="${carId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await requester.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const likes = Object.values(result);
    
    return likes;
};

export  const deleteLike = (likeId) => requester.del(`${baseUrl}/${likeId}`);



