import styled from 'styled-components'
import React from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItemMobile'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Window = styled.div`
  width: 100vw;
  overflow: hidden;
  overflow-x: scroll;
  bottom:0; 
`
const Container = styled.div`
    display: none;
    /* min-width: 200vw; */
    height:100vw;  
    position: relative;
    justify-content: space-between;
    /* padding:20px; */   
    overflow: hidden;   
    ${mobile({ display: "flex" })}  
    scroll-snap-type: x mandatory;
  overflow-x: scroll;
`
const GalleryItem = styled.div`
    display:flex;
    min-width: 100vw;
    height:100vw;
    background-color:coral;
    background-image: linear-gradient( rgba(225,225,225,.0), teal);
    justify-content:center;
    align-items: center;
    position: relative;

`
const GalleryTitle = styled.h2` 
  position:absolute;
`
const PhotoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items:center;
  background-color:rgba(0,0,0,.5);
  width:90%;
  height:90%;
  scroll-snap-align: center;
  border-radius:2%;
`
const ImageDivs = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,.8);
    width:40%;
    height:40%;
    /* margin:5%; */
`

const Image = styled.img`
    max-width:100%;
    max-height:100%;
`

const GallerySliderModile = () => {

  const galleries = useSelector(state => state.photo.galleries)
  // console.log(galleries);
  return (
    <Window>
      <Container>
        {galleries?.map((item, idx) => (
          <Link key={idx} to={'/photoGallery/'} state={item}>
          <GalleryItem >
            <GalleryTitle>{item.galTitle}</GalleryTitle>
            <PhotoContainer>
              {item?.photos?.map((photo, idx) => (
                idx<=3 && 
                <ImageDivs key={idx}>
                  <Image src={photo.source} />
                </ImageDivs>
              ))}
            </PhotoContainer>
          </GalleryItem>
          </Link>
        ))}
      </Container>
    </Window>
  )
}

export default GallerySliderModile 