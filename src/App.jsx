
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import ProductList from "./Pages/ProductList";
import WholeSaleList from "./Pages/WholeSaleList";
import Register from "./Pages/Register";
import Pay from "./components/Pay";
import Success from "./Pages/Success";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import WholeSale from "./Pages/WholeSale";
import { syncCart } from "./redux/cartRedux";
import { userRequest } from "./RequestMethods";
import { useEffect, useState } from "react";
import { syncWish } from "./redux/wishRedux";
import SideMenu from "./components/SideMenu";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";

import Footer from "./components/Footer";
import ProductList2 from "./Pages/ProductList2";



const App = () => {


  const user = useSelector((state) => state.user.currentUser)
console.log(user);
  const dispatch = useDispatch()

  const [isDesktop, setDesktop] = useState(window.innerWidth > 735)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 735);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  useEffect(() => {
    const getMyCart = async () => {

      if (user != null) {
        try {
          const res = await userRequest.get('/carts/find/Cart/' + user._id)
          console.log("HERE WE GO");
          if (res.data === null) {
            try {
              // console.log('Making Cart');  
              await userRequest.post('/carts/Cart',
                {
                  "userId": user._id,
                  "products": [],
                  "amount": 0,
                  "address": "123 Test Ave, Tester, Va. 22153"
                })
              //  console.log(res.data);        

            } catch (error) {
              console.log(error);

            }
          } else { 
            // console.log('found cart in app');
            // console.log(res.data);
            dispatch(syncCart(res.data))
          }

        } catch (error) {
          console.log('notworking');
          console.log(error);
        }
      }
    }
    getMyCart()
  }, [user, user?._id])





  useEffect(() => {
    // console.log('here first'); 
    const getMyWish = async () => {
      if (user != null) {
        try {

          let wish = await userRequest.get('/carts/find/Wish/' + user._id)
          //  console.log('here'); 
          if (wish.data === null) {
            try {
              // console.log('Making wishlist');  
              wish = await userRequest.post('/carts/Wish',
                {
                  "userId": user._id,
                  "products": [],
                  "amount": 0
                })
              //  console.log(wish.data);        

            } catch (error) {
              console.log(error);

            }
          } else {
            // console.log('found Wish');
            // console.log(wish.data);
            dispatch(syncWish(wish.data))
          }
        } catch (error) {
          console.log('notworking');

        }

      }
    }
    getMyWish()
  }, [user, user?._id, ])


  // console.log('in app');

  return (
    <>

      <Router>
        <Announcement />
        <Navbar />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />


          <Route path="/wholesalelist/" element={<WholeSaleList />} />
          <Route path="/wholesale/:id" element={<WholeSale />} />


          <Route path="/productlist/:category" element={<ProductList />} />
          <Route path="/productlist2/:category" element={<ProductList2 />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />

        </Routes>

        {isDesktop ? null :
          <SideMenu />}
        <ScrollToTop />
        <Footer />
      </Router>

    </>
  )
};

export default App;