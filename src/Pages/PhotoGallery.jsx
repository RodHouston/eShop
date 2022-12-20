import styled from 'styled-components'
import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

const Container = styled.div`
    margin-top:40px;    
    width:100vw;
    display:flex;
    flex-direction:column;
    background-color: teal;
    justify-content:center;
    align-items:center;
`
const GalleryContainer = styled.div` 
    width:100%;
    justify-content:center;
    display: flex;
    flex-wrap: wrap;
    flex-direction:row;
    padding: 0 2px;
    margin: 0 16px 16px 16px;
`
const ImageDivs = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,.8);
    width: 200px;
    height: 200px;
    background-image: url(${props => props.src});
    background-repeat:no-repeat;
    background-size: cover;   
    /* margin:5%; */
`
const Image = styled.img`
    margin:1vw;
    padding: 10px;   
    width:auto; 
    /* max-width:45vw; */
   max-height:40vw;    
    word-wrap: break-word;
    box-sizing: border-box;
    border: 1px solid #ccc;
`
const PhotoGallery = () => {

 const location = useLocation()   
const gallery = location.state
console.log(gallery);
  return (
    <Container>        
       <h1>{gallery.galTitle}</h1>
       <GalleryContainer>
        {gallery.photos.map((photo, idx) => (
            <Image src={photo.source} key={idx}>                
            </Image>
        ))           
        }
        </GalleryContainer>
    </Container>
  )
}

export default PhotoGallery