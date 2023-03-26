import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/cars';


export const carServiceFactory = (token) => {

    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(baseUrl);

        const cars = Object.values(result);

        return cars;
    };

    const create = async (carData) => {
        const result = await request.post(baseUrl, carData);

        return result;
    };

    const getOne = async (carId) => {

        const result = await request.get(`${baseUrl}/${carId}`);

        return result;
    };

    const removeCar = (carId) => request.delete(`${baseUrl}/${carId}`)


    return {
        getAll,
        create,
        getOne,
        removeCar,
    };

};