import * as requester from './requester';

const baseUrl = 'http://localhost:3030/data/cars';


  export  const getAll = async () => {
        const result = await requester.get(baseUrl);

        const cars = Object.values(result);

        return cars;
    };

    export  const create = async (carData) => {
        const result = await requester.post(baseUrl, carData);

        return result;
    };

    export  const getOne = async (carId) => {

        const result = await requester.get(`${baseUrl}/${carId}`);

        return result;
    };

    export  const edit = (carId,data) => requester.put(`${baseUrl}/${carId}`,data);

    export  const removeCar = (carId) => requester.del(`${baseUrl}/${carId}`);


    

