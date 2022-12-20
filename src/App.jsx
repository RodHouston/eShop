
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import WholeSaleList from "./Pages/WholeSaleList";
import Register from "./Pages/Register";
import Pay from "./components/Pay";
import Success from "./Pages/Success";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "./components/ScrollToTop";
import WholeSale from "./Pages/WholeSale";
import { syncCart } from "./redux/cartRedux";
import { publicRequest, userRequest } from "./RequestMethods";
import { useEffect, useState } from "react";
import { syncWish } from "./redux/wishRedux";
import SideMenu from "./components/SideMenu";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import PhotoGallery from "./Pages/PhotoGallery";

import Footer from "./components/Footer";
import ProductList2 from "./Pages/ProductList2";
import { setGalleries } from "./redux/photoRedux";
import Announcement2 from "./components/Announcement2";
import NavMobile from "./components/NavMobile";
import { setCategories } from "./redux/globalRedux";
import { categories } from "./data";



const App = () => {


  const user = useSelector((state) => state.user.currentUser)
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
    const getGlobalData = async () => {
      const res = await publicRequest.get("/photoGallery")
      const res2 = await publicRequest.get("/productCategories")

      const cats = [...categories, ...res2.data]
      dispatch(setCategories(cats))
      dispatch(setGalleries(res.data))
    }
    getGlobalData()
  }, [])

  useEffect(() => {
    const getCategories = async () => {

    }
    getCategories()
  }, [])




  useEffect(() => {
    const getMyCart = async () => {

      if (user != null) {
        //IF USER LOGGED IN CHECK FOR THEIR WISH LIST
        try {
          const res = await userRequest.get('/carts/find/Cart/' + user._id)
          console.log("HERE WE GO");
          if (res.data === null) {
            try {
              //IF USER DOES NOT HAVE A CART, CREATE ONE
              await userRequest.post('/carts/Cart',
                {
                  "userId": user._id,
                  "products": [],
                  "amount": 0,
                  "address": "123 Test Ave, Tester, Va. 22153"
                })
            } catch (error) {
              console.log(error);
            }
          } else {
            //IF USER DOES HAVE A CART, DISPATCH IT  
            dispatch(syncCart(res.data))
          }

        } catch (error) {
          console.log('notworking');
          console.log(error);
        }
      }
    }
    getMyCart()
  }, [user, user?._id, dispatch])





  useEffect(() => {

    const getMyWish = async () => {
      if (user != null) {
        //IF USER LOGGED IN CHECK FOR THEIR WISH LIST
        try {
          let wish = await userRequest.get('/carts/find/Wish/' + user._id)
          if (wish.data === null) {
            //IF USER DOES NOT HAVE A WISH LIST, CREATE ONE
            try {
              wish = await userRequest.post('/carts/Wish',
                {
                  "userId": user._id,
                  "products": [],
                  "amount": 0
                })
            } catch (error) {
              console.log(error);
            }
          } else {
            //IF USER DOES HAVE A WISH LIST, DISPATCH IT           
            dispatch(syncWish(wish.data))
          }
        } catch (error) {
          console.log('notworking');
        }
      }
    }
    getMyWish()
  }, [user, user?._id, dispatch])


  // console.log('in app');

  return (
    <>

      <Router>
        <Announcement />
        <Navbar />
        <Announcement2 />
        <NavMobile />

        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

          <Route path="/wholesale/:id" element={<WholeSale />} />
          <Route path="/wholesalelist/" element={<WholeSaleList />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/productlist2/:category" element={<ProductList2 />} />

          <Route path="/photoGallery/" element={<PhotoGallery />} />

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