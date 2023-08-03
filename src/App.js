import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min';
import Header from './components/header';
import Productlisting from './components/productlisting';
import { Routes, Route, useLocation} from "react-router-dom";
import ProductDetails from './components/productDetails';
import FourZeroFour from './404';
import Register from './register';
import Login from './login';
import Addcart from './components/addcart';
import Protected_route from './components/protected_route';
import Footer from './components/footer';
import Navigationbar from './navbar';

function App() {
  const location = useLocation();
  return (
    <>
      <div className='container-fluid p-0 position-relative' style={{minHeight:'100vh'}}>
        {location.pathname === `/` && <Header />}
        <Navigationbar/>
        <Routes>
          <Route exact path='/' element={<Productlisting />}></Route>
          <Route exact path='/addcart' element={<Protected_route Cmp={Addcart}/>}></Route>
          <Route  path='register' element={<Register />}></Route>
          <Route  path='login' element={<Login />}></Route>
          <Route path='productDetails' element={<ProductDetails />}></Route>
          <Route path='addtocart/:id' element={<Addcart/>}></Route>
          <Route path='*' element={<FourZeroFour />}></Route>
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
