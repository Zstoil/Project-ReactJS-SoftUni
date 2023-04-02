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
import { MyAdd } from "./Components/MyAdd/MyAdd";
import { Search } from "./Components/Search/Search";


function App() {

  
  return (
  <>
    <AuthProvider>
      <CarProvider>
     <Header/>
     <main id="main-content">
     <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/catalog' element={<Catalog/>} />
          <Route path='/search' element={<Search/>} />
          <Route path="/catalog/:carId" element={<Details/>}/>
          <Route path="/myAdd" element={<MyAdd/>}/>
          <Route path="/catalog/:carId/edit" element={<EditAd/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          
    </Routes>
     </main>
     <Footer/>
     </CarProvider>
    </AuthProvider>
  </>
  );
}

export default App;
