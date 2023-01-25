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
    font-size:3vw;
`
const Link1 = styled(Link)`
    color:rgba(215, 215, 215, 1);
    text-shadow: .5vw .5vw 2vw black;
    text-decoration:none;
`
const Container = styled.div`
    display: none;
    justify-content: space-between;
    padding:2vw;   
    overflow: scroll;      
    ${mobile({ display: "flex" })}  
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
`
const GalleryItemDiv = styled.div`
    display:flex;
    flex-direction:column;
    min-width: 100vw;
    background-color:coral;
    background-image: linear-gradient( rgba(225,225,225,.0), teal);  
`
const GalleryItemTitle = styled.h4` 
    margin-top: 2vw;
    margin-left: 2vw;
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
    opacity:80%;
    width:100%;
    height:100%;  
    overflow: hidden;  
`
const PhotoSlantWindowEffect = styled.div` 
    display:flex; 
    position: absolute;     
    width:100%;
    height:100%;  
    justify-content:center;
    align-items:center;
    box-shadow: .5vw .5vw 2vw rgba(0,0,0,.8) inset;    
    z-index:2;
`
const PhotoSlantDiv = styled.div`  
     column-count: 4; 
    column-gap: 3vw;     
    /* height:200vw; */
    
    /* background-color:red; */
    transform:rotate(325deg);
    margin:0 auto;
    position: absolute; 
    margin-top:25vw;
    /* top:0vw; */
    /* bottom:10vw; */
      left:0; 
    z-index:1;   
`
const PhotoSlantRows = styled.div`   
    margin-top: 2vw;
    padding-top: ${props => props.stag};   
`
const GalleryTextDiv = styled.div`
    display:flex;   
    flex-direction:column;
    width:100%;
    height:25vw;
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
    border-radius:2vw;
    overflow:hidden;
    margin:1vw;
    margin-top: ${props => props.stag} !important;
    box-shadow: .5vw .5vw 2vw rgba(0,0,0,.8);  
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
                    <PhotoSlantDiv >
                      {item?.photos?.map((photo, idx) => (
                        idx <= 10 &&      
                        <PhotoSlantRows key={idx} stag={idx===0| idx ===5 ? "16vw" : "0"}>                       
                            
                                
                              <ImageDivs>
                                <Image1 src={photo.source} />
                              </ImageDivs>  
                                              
                             
                              
                                 </PhotoSlantRows>   
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