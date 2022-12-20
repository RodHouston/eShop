import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../components/Categories'
import Newletter from '../components/Newletter'
import Products from '../components/Products'
//import { mobile } from "../responsive";
import Slider from '../components/Slider'
import SliderMobile from '../components/SliderMobile'
import { syncCart } from '../redux/cartRedux'
import { clearCurrProduct, closeDropDownMenu, openDropDownMenu } from '../redux/sideMenuRedux'
import { syncWish } from '../redux/wishRedux'
import { userRequest } from '../RequestMethods'
import { sliderItems } from '../data'
import GallerySliderMobile from '../components/GallerySliderMobile'
import Article from '../components/Article'

const Home = () => {
  const user = useSelector((state) => state.user.currentUser)
  const dropMenu = useSelector((state) => state.menu.dropDownMenu)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const getMyCart = async () => {  

      if(user!= null){
  try {
    const res = await userRequest.get('/carts/find/Cart/'+ user._id) 
    
    if (res.data === null) {       
      try {    
        // console.log('Making Cart');  
        await userRequest.post('/carts/Cart', 
        {
        "userId" : user._id,
        "products": [], 
        "amount": 0,
        "address" : "123 Test Ave, Tester, Va. 22153"
    })
      //  console.log(res.data);        
        
      } catch (error) {
        console.log(error);
        
      }
      }  else {
        // console.log('found cart');
        // console.log(res.data);
        dispatch(syncCart(res.data)) 
      }            
    
  } catch (error) {
    console.log('notworking');   
    console.log(error);   
  }   
}
} 
  dispatch(closeDropDownMenu(false))
  getMyCart()
}, [user, user?._id, dispatch])





  useEffect(() => {
    // console.log('here first'); 
    const getMyWish = async () => {   
      if(user!= null){
      try{     
        
       let wish = await userRequest.get('/carts/find/Wish/'+ user._id)    
      //  console.log('here'); 
      if (wish.data === null) {       
        try {    
          // console.log('Making wishlist');  
          wish = await userRequest.post('/carts/Wish', 
          {
          "userId" : user._id,
          "products": [], 
          "amount": 0        
      })
        //  console.log(wish.data);        
          
        } catch (error) {
          console.log(error);
          
        }
        }  else {
          // console.log('found Wish');
          // console.log(wish.data);
          dispatch(syncWish(wish.data)) }   
        } catch (error) {
          console.log('notworking');
         
        }  
  
      }
    }
      getMyWish()
}, [user, user?._id, dispatch])
// console.log('home')

  return (
    <div>       
      <SliderMobile sliderItemsIn={sliderItems}/> 
        <Slider sliderItemsIn={sliderItems} />
        <GallerySliderMobile/>
        <Article/>
        <Categories/>
        <Products/>
        <Newletter/>       
    </div>
    
  )
}

export default Home
