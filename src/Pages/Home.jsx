import React from 'react'
import { sliderItems } from '../data'
import Slider from '../components/Slider'
import Article from '../components/Article'
import Products from '../components/Products'
import Newletter from '../components/Newletter'
import Categories from '../components/Categories'
import SliderMobile from '../components/SliderMobile'
import OnSaleProducts from '../components/OnSaleProducts'
import GallerySliderMobile from '../components/GallerySliderMobile'


const Home = () => {

  return (
    <div>       
      <SliderMobile sliderItemsIn={sliderItems}/> 
        <Slider sliderItemsIn={sliderItems} />
        <OnSaleProducts/>
        <GallerySliderMobile/>
        <Article/>
        <Categories/>
        <Products/>
        <Newletter/>       
    </div>
    
  )
}

export default Home
