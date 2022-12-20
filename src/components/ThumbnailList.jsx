import styled from "styled-components"
import { Link } from 'react-router-dom'

import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setDotIndex, setMainPhoto, setThumbnails } from "../redux/photoRedux"
import { useState, useEffect } from "react"



const ThumbnailDiv = styled.div`
box-shadow: 2px 2px 8px rgba(0,0,0,.5);
display:flex;
justify-content:center;
align-items:center;
`
const ThumbnailList = styled.div`
padding: 0;
display:flex;
flex-direction:row;
list-style-type:none;
width: 100%;
margin:0 auto;
justify-content:center;
align-items:center;
/* padding:8px; */
/* position:relative;
right: 0%; */

`
const ThumbnailItems = styled.div`
margin: 8px;
`
const Thumbnail = styled.img`
    border: 2px solid ${props => props.color};
    width: 50px;
    box-shadow: 2px 2px 8px rgba(0,0,0,.5);

  :hover { 
    transform: scale(1.1);
    cursor:pointer;
    }
`
const Image = styled.img`
    height:75%;
    z-index:2;
`


export const ThumbNailList = (thumbNails) => {


    const dispatch = useDispatch()
    // console.log(thumbNails);
    const currentPhoto = useSelector(state => state.photo.currentPhoto)
    const [currPhotoBorder, setCurrPhotoBorder] = useState(thumbNails.dotIndex)
    const thumbNailPhotosRaw = useSelector(state => state.photo.photoThumbNails)
    const dotInde = useSelector(state => state.photo.dotIndex)

    const handlePhoto = (photo, idx) => {
        let newThumbs = []
        // console.log("here");
        thumbNails?.data?.map((thumb) => (
            newThumbs.push(thumb)
        ))
        // console.log(currentPhoto);
        // console.log(newThumbs);
        // newThumbs.splice(idx, 1, currentPhoto)

        setCurrPhotoBorder(idx)
        dispatch(setDotIndex(idx))
        dispatch(setMainPhoto(photo))
        dispatch(setThumbnails(newThumbs))     

    }
    useEffect(() => {

    }, []);

   
    const photos = thumbNails.data
    return (
        <ThumbnailDiv >
            <ThumbnailList>
                {photos?.map((photo, idx) => (
                    <ThumbnailItems key={idx} onClick={(e) => handlePhoto(photo, idx)}>
                        <Thumbnail
                            src={photo}
                            color={idx == thumbNails.dotIndex? "blue" : null }
                            alt={`Thumbnail ${idx} of ${thumbNails.length}`}
                        />
                    </ThumbnailItems>
                )
                )}
            </ThumbnailList>
        </ThumbnailDiv>
    )
}
