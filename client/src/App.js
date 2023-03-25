import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import * as carService from './services/carService';

import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Home } from './Components/Home/Home';
import { Create } from './Components/Create/Create';
import { Catalog } from "./Components/Catalog/Catalog";
import { Details } from "./Components/Details/Details";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";

function App() {

  const navigate = useNavigate();

  const[cars,setCars] = useState([]);

  useEffect(() =>{
    carService.getAll()
      .then(result => {
        setCars(result)
      })
  },[]);

  const onCreateGameSubmit = async (data) => {

    const newCar = await carService.create(data);
 
     //set new game in catalog
     setCars(state => [...state, newCar]);
 
     //redirect  to catalog
     navigate("/catalog");
   }

  return (
    <>
     <Header/>
     <main id="main-content">
     <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<Create onCreateGameSubmit={onCreateGameSubmit}/>} />
          <Route path='/catalog' element={<Catalog cars={cars}/>} />
          <Route path="/catalog/:carId" element={<Details/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
    </Routes>
     </main>
     <Footer/>
    </>
  );
}

export default App;
