
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import Register from "./Pages/Register";
import Pay from "./components/Pay";
import Success from "./Pages/Success";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";


const App = () => {

  
  const user = useSelector((state) => state.user.currentUser)

  return(
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
          
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/> } />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register/> } /> 


        <Route path="/productlist/:category" element={<ProductList/>} />   
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={<Cart/>} />         
        <Route path="/pay" element={<Pay/>} />
        <Route path="/success" element={<Success/>} />
      </Routes>
    </Router>
    </>
)
};

export default App;