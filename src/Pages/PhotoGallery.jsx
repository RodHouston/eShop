import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
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
    box-sizing:border-box;
    display: flex;
    flex-wrap: wrap;
    flex-direction:row;
    padding: 0 10px;
    margin: 0 16px 16px 16px;
`
const GalleryUL = styled.div`    
    /* display: grid;
    grid-template-columns: repeat(4, 1fr);    
    grid-template-rows: auto;
    gap:.025em ;
    align-items: stretch;
    */
    list-style: none;


    box-sizing:border-box;
    padding:0;
    line-height: 0;
  
   column-count: 3;
   column-gap: 0px;
   
   
`
const GalleryLI = styled.div` 
    /* display: block;
    height: ${props => props.height};    
    grid-column: span ${props => props.colSize};
    grid-row: span ${props => props.rowSize}; */
    margin:2px;
`
// const ImageDivs = styled.div`
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     background-color:rgba(0,0,0,.8);
//     width: 200px;
//     height: 200px;
//     background-image: url(${props => props.src});
//     background-repeat:no-repeat;
//     background-size: cover;   
//     margin:5%;
// `
const ImageComponent = styled.img`
    /* margin:1vw;
    padding: 10px;    */
    /* width:auto; 
    max-width:45vw;
    max-height:20vw;     */
    /* word-wrap: break-word;
    box-sizing: border-box;
    border: 1px solid #ccc;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; */
  width: 100% !important;
  height: auto !important;
`

const ModalContainer = styled.div` 
    width:100vw;
    height:100%;
    background-color:rgba(0,0,0,.8);
    position:fixed;
    top:0;
    left:0;
    z-index:10;
    display:${(props) => props.display};
`
const ModalContent = styled.div`
    display:flex;
    width:95vw;
    height:95vh;
    position: relative;
    margin:0 auto;
`
const ModalImage = styled.div`
    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    width:100vw;
    max-height:100%;
    position: relative;
`
const TESTSIZE = styled.h2` 
    color:red;
    z-index:12;
`


const PhotoGallery = () => {

    const location = useLocation()
    const galleries = useSelector((state) => state.global.galleries)    
    const gallery = location.state
    const [showModal, setShowModal] = useState(-1)
    const [newGal, setNewGal] = useState(gallery);

    return (
        <Container>
            <h1>{newGal?.galTitle}</h1>
            <GalleryContainer>                
                    <GalleryUL>
                        {gallery?.photos.map((photo, idx) => (
                            <GalleryLI key={idx} >
                                <ImageComponent src={photo.source} key={idx} onClick={() => setShowModal(idx)}>
                                </ImageComponent >
                                <ModalContainer display={showModal === idx ? "flex" : "none"} onClick={() => setShowModal(-1)}>
                                    <ModalContent >
                                        <ModalImage src={photo.source}></ModalImage>
                                    </ModalContent>
                                </ModalContainer>
                            </GalleryLI>
                        ))
                        }
                    </GalleryUL>
            </GalleryContainer>
        </Container>
    )
}

export default PhotoGallery