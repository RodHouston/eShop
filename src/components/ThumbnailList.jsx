import styled from "styled-components"
import { Link } from 'react-router-dom'

import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setMainPhoto, setThumbnails } from "../redux/photoRedux"
import { useEffect } from "react"


    
const ThumbnailDiv = styled.div`

display:flex;
`
const ThumbnailList = styled.ul`
list-style-type:none;
width: 100%;
padding:8px;
`
const ThumbnailItems = styled.li`
margin: 8px;
`
const Thumbnail = styled.img`
    width: 50px;
    box-shadow: 2px 2px 8px rgba(0,0,0,.5);
`
const Image = styled.img`
    height:75%;
    z-index:2;
`


export const ThumbNailList = (thumbNails) => {  
    const dispatch = useDispatch()

    const currentPhoto = useSelector(state => state.photo.currentPhoto)
    // const [currPhoto, setCurrPhoto] = useState(currentPhoto)
 
    const handlePhoto = (photo, idx) => {
        let newThumbs = []
        console.log("here");  
        thumbNails.data.map((thumb) =>{
            newThumbs.push(thumb)
        })
        console.log(currentPhoto);
        console.log(newThumbs);
        newThumbs.splice(idx, 1, currentPhoto)
        

        dispatch(setMainPhoto(photo))  
        dispatch(setThumbnails(newThumbs))
       
      }
      useEffect(() => {
          
      }, []);
      
    // console.log(thumbNails);
    const photos = thumbNails.data
    return (
        <ThumbnailDiv >
            <ThumbnailList>

            {photos?.map((photo, idx) => (            
             <ThumbnailItems key={idx} onClick={(e)=> handlePhoto(photo, idx)}>
                    <Thumbnail
                        src={photo}
                         alt={`Thumbnail ${idx} of ${thumbNails.length}` }                      
                    />
                </ThumbnailItems>
             )
            )}                
            </ThumbnailList>
        </ThumbnailDiv>
    )
}
