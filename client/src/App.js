import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { AuthContext } from "./contexts/AuthContext";
import { carServiceFactory } from './services/carService';
import { authServiceFactory } from './services/authService';

import { Footer } from './Components/Footer/Footer';
import { Header } from './Components/Header/Header';
import { Home } from './Components/Home/Home';
import { Create } from './Components/Create/Create';
import { Catalog } from "./Components/Catalog/Catalog";
import { Details } from "./Components/Details/Details";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Logout } from "./Components/Logout/Logout";
import { EditAd } from "./Components/EditAd/EditAd";


function App() {

  const navigate = useNavigate();

  const[cars,setCars] = useState([]);
  const[auth,setAuth] = useState({});
  const[error,setError] = useState();
  const carService = carServiceFactory(auth.accessToken);
  const authService = authServiceFactory(auth.accessToken);

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

    if(!repeatedPassword){
      return setError('Repeated password is required!');
    }

    if(repeatedPassword !== registerData.password){
      return setError('Password not match!');
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

   await authService.logout();

    setAuth({});
};


   const contextValues = {
    onLoginSubmit,
    onRegisterSubmit,
    onLogout,
    onCreateCarsSubmit,
    onEditCarSubmit,
    userId: auth._id,
    token: auth.accessToken,
    userEmail: auth.email,
    userName: auth.userName,
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
          <Route path='/create' element={<Create/>} />
          <Route path='/catalog' element={<Catalog cars={cars}/>} />
          <Route path="/catalog/:carId" element={<Details/>}/>
          <Route path="/catalog/:carId/edit" element={<EditAd/>}/>
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
