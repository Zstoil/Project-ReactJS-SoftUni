import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { AuthContext } from "./contexts/AuthContext";

import * as carService from './services/carService';
import * as authService from './services/authService';
import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Home } from './Components/Home/Home';
import { Create } from './Components/Create/Create';
import { Catalog } from "./Components/Catalog/Catalog";
import { Details } from "./Components/Details/Details";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Logout } from "./Components/Logout/Logout";

function App() {

  const navigate = useNavigate();

  const[cars,setCars] = useState([]);
  const[auth,setAuth] = useState({});
  const[error,setError] = useState();

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

   const onLoginSubmit = async (data) => {

    try {
      const result = await authService.login(data);

      setAuth(result);

      navigate('/');
  } catch (error) {
    const result = await Object.values(error)[1];

    setError(result);
  }
   };

   const onRegisterSubmit = async (data) => {

    const{repeatedPassword,...registerData} = data;

    if(repeatedPassword !== registerData.password){
      return;
    }

    try {
      const result = await authService.register(registerData);

      setAuth(result);

      navigate('/');
  } catch (error) {
    const result = await Object.values(error)[1];

    setError(result);
  }
   };

   const onLogout = async () => {

  //  await  authService.logout()

    setAuth({});

   };

   const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    isAuthenticated: !!auth.accessToken,
    error,
    isError: !!error,
};

  return (
  <>
    <AuthContext.Provider value={contextValues}>
     <Header/>
     <main id="main-content">
     <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<Create onCreateGameSubmit={onCreateGameSubmit}/>} />
          <Route path='/catalog' element={<Catalog cars={cars}/>} />
          <Route path="/catalog/:carId" element={<Details/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
    </Routes>
     </main>
     <Footer/>
    </AuthContext.Provider>
  </>
  );
}

export default App;
