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
const Link1 = styled(Link)`
    color:rgba(215, 215, 215, 1);
    text-shadow: 2px 2px 10px black;
    text-decoration:none;
`
const Container = styled.div`
    display: none;
    /* min-width: 200vw; */
    /* height:105vw;   */
    position: relative;
    justify-content: space-between;
    padding:10px;   
    overflow: hidden;  
    
    ${mobile({ display: "flex" })}  
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
`
const GalleryItemDiv = styled.div`
    display:flex;
    flex-direction:column;
    min-width: 100vw;
    /* min-height:105vw;   */
    background-color:coral;
    background-image: linear-gradient( rgba(225,225,225,.0), teal);  
`
const GalleryItemTitle = styled.h4` 
    margin-top: 10px;
    margin-left: 10px;
    text-decoration:none;
`
const GalleryItem = styled.div`
    display:flex;
    min-width: 100vw;
    height:100vw;
    justify-content:center;
    align-items: center;
    position: relative;
`
const GalleryTitle = styled.h2` 
    position:absolute;
    z-index:2;    
`
const PhotoContainer = styled.div`
    display: flex;
    flex-direction:column;
    box-sizing:border-box;
    /* flex-wrap: wrap; */
    justify-content: space-between;
    align-items:center;
    background-color:rgba(0,0,0,.5);
    width:90%;
    height:90%;
    scroll-snap-align: center;
    border-radius:2%;
    padding:4vw;
`
const PhotoSlantWindow = styled.div` 
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
    /* background-color:red;  */
    width:100%;
    height:100%;     
    opacity:80%;
    overflow: hidden;  
`
const PhotoSlantWindowEffect = styled.div` 
    display:flex; 
    position: absolute;     
    width:100%;
    height:100%;  
    justify-content:center;
    align-items:center;
    box-shadow: 2px 2px 10px rgba(0,0,0,.8) inset;    
    z-index:2;
`
const PhotoSlantDiv = styled.div`    
    width:100%;
    height:100%;
    display: grid;
    position: absolute;
    grid-template-columns: repeat(4, 1fr);    
    grid-template-rows: auto;
    gap:.025em ;   
    transform:rotate(325deg);
    margin:0 auto;
    top:-20%;
    left:-25%;
    z-index:1;
     /* align-items: stretch; */
`
const GalleryTextDiv = styled.div`
    display:flex;
    box-sizing:border-box;
    flex-direction:column;
    width:100%;
    height:100px;
    background-color:rgba(20,20,20,.8);
    color:whitesmoke;
    padding: 1vw 5vw;
    overflow:scroll;
`
const GalleryTextTitle = styled.h3`   
`
const ImageDivs = styled.div`
    display:flex;    
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,.8);
    width:20vw;
    height:40vw;
    border-radius:10px;
    overflow:hidden;
    margin:2vw;
    box-shadow: 2px 2px 10px rgba(0,0,0,.8);
`

const Image1 = styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`

const GallerySliderModile = () => {

  const galleries = useSelector(state => state.photo.galleries)

  return (
    <Window>
      <Container>
        {galleries?.map((item, idx) => (
          <Link1 key={idx} to={'/photoGallery/' + item.galTitle} state={item}>
            <GalleryItemDiv>
              <GalleryItemTitle>{item.galTitle}</GalleryItemTitle>
              <GalleryItem >
                <PhotoContainer>
                  <PhotoSlantWindow>
                    <PhotoSlantWindowEffect>
                      <GalleryTitle>
                        VIEW GALLERY
                      </GalleryTitle>
                    </PhotoSlantWindowEffect>
                    <PhotoSlantDiv>
                      {item?.photos?.map((photo, idx) => (
                        idx <= 10 &&
                        <ImageDivs key={idx}>
                          <Image1 src={photo.source} />
                        </ImageDivs>
                      ))}
                    </PhotoSlantDiv>
                  </PhotoSlantWindow>
                  <GalleryTextDiv>
                    <GalleryTextTitle> GALLERIES</GalleryTextTitle>
                    {item.galDescription}
                  </GalleryTextDiv>
                </PhotoContainer>
              </GalleryItem>
            </GalleryItemDiv>
          </Link1>
        ))}
      </Container>
    </Window>
  )
}

export default GallerySliderModile 