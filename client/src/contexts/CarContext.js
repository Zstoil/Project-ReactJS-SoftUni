import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import * as carService from '../services/carService';

export const CarContext = createContext();

export const CarProvider = ({
    children
}) => {

    const navigate = useNavigate();
    const [cars,setCars] = useState([]);
    const [filteredCars,setFilteredCars] = useState([]);
    
  useEffect(() =>{
    carService.getAll()
      .then(result => {
        setCars(result);
        setFilteredCars(result);
      })
  },[]);


  const onCreateCarsSubmit = async (data) => {

    const newCar = await carService.create(data);
 
     //set new car in catalog
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

// search cars
    const filterCars = (text,criteria = "all") => {

      if(criteria === "all"){
        setFilteredCars(cars);
      }else{
        setFilteredCars(cars.filter(x => x[criteria].toLowerCase()?.includes(text.toLowerCase())))
      }

     }


   const contextValues = {
    onCreateCarsSubmit,
    onEditCarSubmit,
    onDeleteCar,
    filterCars,
    getCar,
    cars,
    filteredCars,
    
};

return(
    <>
    <CarContext.Provider value={contextValues}>
        {children}
    </CarContext.Provider>
</>
)
};