import { useContext } from "react";
import { useParams, Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { CarContext } from "../../contexts/CarContext";

export const EditGuard = ({
    children,
}) => {
    const { carId } = useParams();
    const { getCar } =  useContext(CarContext);
    const { userId } =  useContext(AuthContext);

    const currentCar = getCar(carId);
    
    if (currentCar && currentCar._ownerId !== userId) {
        return <Navigate to={`/catalog/${carId}`}/>
    }

    return children 
};