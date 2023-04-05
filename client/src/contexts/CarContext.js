import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import * as carService from '../services/carService';

export const CarContext = createContext();

export const CarProvider = ({
    children
}) => {

    const navigate = useNavigate();
    const[cars,setCars] = useState([]);
  
  

  useEffect(() =>{
    carService.getAll()
      .then(result => {
        setCars(result)
      })
  },[]);


  const onCreateCarsSubmit = async (data) => {

    const newCar = await carService.create(data);
 
     //set new game in catalog
     setCars(state => [...state, newCar]);
 
     //redirect  to catalog
     navigate("/catalog");
   }

   const onEditCarSubmit = async (values) => {

      const result = await carService.edit(values._id,values);

      // set state 
      setCars(state => state.map(x => x._id === values._id ? result : x))

      navigate(`/catalog/${values._id}`);
   }

    const onDeleteCar = async (carId) => {
        
        setCars(state => state.filter(car => car._id !== carId));
    }

    
    const getCar = (carId) => {
      return cars.find(car => car._id === carId);
   };


   const contextValues = {
    onCreateCarsSubmit,
    onEditCarSubmit,
    onDeleteCar,
    getCar,
    cars,
};

return(
    <>
    <CarContext.Provider value={contextValues}>
        {children}
    </CarContext.Provider>
</>
)
};