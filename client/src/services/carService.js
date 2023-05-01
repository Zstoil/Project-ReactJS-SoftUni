import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

// const baseUrl = process.env.NODE_ENV === 'development' 
//     ? 'http://localhost:3030'
//     : 'http://localhost:3030'; // TODO: Add server url when deployed


const url = `${baseUrl}/data/cars`;


  export  const getAll = async () => {
        const result = await requester.get(url);

        const cars = Object.values(result);

        return cars;
    };

    export  const create = async (carData) => {
        
        const result = await requester.post(url, carData);

        return result;
    };

    export  const getOne = async (carId) => {

        const result = await requester.get(`${url}/${carId}`);

        return result;
    };

    export  const edit = (carId,data) => requester.put(`${url}/${carId}`,data);

    export  const removeCar = (carId) => requester.del(`${url}/${carId}`);


    

