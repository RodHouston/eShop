import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Success from "./Pages/Success";
import Product from "./Pages/Product";
import Wishlist from "./Pages/Wishlist";
import Register from "./Pages/Register";
import WholeSale from "./Pages/WholeSale";
import ProfilePage from "./Pages/ProfilePage";
import PhotoGallery from "./Pages/PhotoGallery";
import ProductList2 from "./Pages/ProductList2";
import WholeSaleList from "./Pages/WholeSaleList";
import Pay from "./components/Pay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SideMenu from "./components/SideMenu";
import NavMobile from "./components/NavMobile";
import ScrollToTop from "./components/ScrollToTop";
import Announcement from "./components/Announcement";
import Announcement2 from "./components/Announcement2";
import { categories } from "./data";
import { syncCart } from "./redux/cartRedux";
import { syncWish } from "./redux/wishRedux";
import { setGalleries } from "./redux/photoRedux";
import { setCategories } from "./redux/globalRedux";
import { publicRequest, userRequest } from "./RequestMethods";


const App = () => {

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const tempUser = useSelector((state) => state.user.tempUser) 
  
console.log(tempUser);
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

      try {
        const res = await publicRequest.get("/photoGallery")
        dispatch(setGalleries(res.data))

        const res2 = await publicRequest.get("/productCategories")
        const cats = [...categories, ...res2.data]
        dispatch(setCategories(cats))

        const cart = await userRequest.get('/carts/find/Cart/' + user?._id)
        // console.log("in useEffect getting cart");
        // console.log(cart.data);
        dispatch(syncCart(cart.data))

      } catch (err) {
        console.log(err);
      }

    }
    console.log("In APP");
    getGlobalData()
  }, [user])

  // useEffect(() => {
  //   const getMyCart = async () => {
  //     console.log('app')
  //     if (user != null) {
  //       //IF USER LOGGED IN CHECK FOR THEIR CART
  //       try {
  //         const res = await userRequest.get('/carts/find/Cart/' + user._id)
  //         console.log("HERE WE GO");
  //         if (res.data === null) {
  //           try {
  //             //IF USER DOES NOT HAVE A CART, CREATE ONE
  //             await userRequest.post('/carts/Cart',
  //               {
  //                 "userId": user._id,
  //                 "products": [],
  //                 "amount": 0,
  //                 "address": "123 Test Ave, Tester, Va. 22153"
  //               })
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else {
  //           //IF USER DOES HAVE A CART, DISPATCH IT  
  //           dispatch(syncCart(res.data))
  //         }

  //       } catch (error) {
  //         console.log('notworking');
  //         console.log(error);
  //       }
  //     }
  //   }
  //   getMyCart()
  // }, [user, user?._id, dispatch])

  // useEffect(() => {
  //   const getMyWish = async () => {
  //     if (user != null) {
  //       //IF USER LOGGED IN CHECK FOR THEIR WISH LIST
  //       try {
  //         let wish = await userRequest.get('/carts/find/Wish/' + user._id)
  //         if (wish.data === null) {
  //           //IF USER DOES NOT HAVE A WISH LIST, CREATE ONE
  //           try {
  //             wish = await userRequest.post('/carts/Wish',
  //               {
  //                 "userId": user._id,
  //                 "products": [],
  //                 "amount": 0
  //               })
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else {
  //           //IF USER DOES HAVE A WISH LIST, DISPATCH IT           
  //           dispatch(syncWish(wish.data))
  //         }
  //       } catch (error) {
  //         console.log('notworking');
  //       }
  //     }
  //   }
  //   getMyWish()
  // }, [user, user?._id, dispatch])

  // {isDesktop ? null :
  //   <SideMenu />}

  return (
    <>

      <Router>
        <Announcement />
        <Navbar />
        <Announcement2 />
        <NavMobile />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={!tempUser? <Navigate to={"/"} /> : <Login />} />
          <Route path="/register" element={!tempUser ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile" element={!tempUser ? <Navigate to="/" /> : <ProfilePage />} />

          <Route path="/wholesale/:id" element={<WholeSale />} />
          <Route path="/wholesalelist/" element={<WholeSaleList />} />

          <Route path="/product/:id" element={<Product />} />
          <Route path="/productlist2/:category" element={<ProductList2 />} />

          <Route path="/photoGallery/:id" element={<PhotoGallery />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/pay" element={<Pay />} />
          <Route path="/success" element={<Success />} />

        </Routes>

        
        <ScrollToTop />
        <Footer />
      </Router>

    </>
  )
};

export default App;