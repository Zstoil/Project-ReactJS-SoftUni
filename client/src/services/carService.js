import * as request from './requester';

const baseUrl = 'http://localhost:3030/data/cars';


  export  const getAll = async () => {
        const result = await request.get(baseUrl);

        const cars = Object.values(result);

        return cars;
    };

    export  const create = async (carData) => {
        const result = await request.post(baseUrl, carData);

        return result;
    };

    export  const getOne = async (carId) => {

        const result = await request.get(`${baseUrl}/${carId}`);

        return result;
    };

    export  const edit = (carId,data) => request.put(`${baseUrl}/${carId}`,data);

    export  const removeCar = (carId) => request.del(`${baseUrl}/${carId}`);


    

