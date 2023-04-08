import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { CarProvider } from "./contexts/CarContext";

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
import { MyAd } from "./Components/MyAd/MyAd";
import { Search } from "./Components/Search/Search";
import { RouteGuard } from "./Components/RouteGuard/RouteGuard";
import { EditGuard } from "./Components/RouteGuard/EditGuard";
import { NotFound } from "./Components/404/NotFound";

function App() {

  
  return (
  <>
    <AuthProvider>
      <CarProvider>
     <Header/>
     <main id="main-content">
     <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/search' element={<Search/>} />
          <Route path="/catalog/:carId" element={<Details/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route element= {<RouteGuard/>}>
              <Route path='/create' element={<Create/>} />
              <Route path="/myAd" element={<MyAd/>}/>
              
              <Route path="/catalog/:carId/edit" element={
                <EditGuard>
                    <EditAd/>
                </EditGuard>
              }/>
              
          </Route>
          <Route path="*" element={<NotFound/>}/>
    </Routes>
     </main>
     <Footer/>
     </CarProvider>
    </AuthProvider>
  </>
  );
}

export default App;
