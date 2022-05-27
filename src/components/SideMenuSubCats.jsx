import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { closeMenu } from '../redux/sideMenuRedux';

const MainCategoryDivs = styled.div`
    display: flex; 
    height: ${props => props.height};
    transition: all ease-in-out .5s;
    width: 100%;
    flex-shrink:0;
    z-index:5;
    background-color: ${props => props.backgroundColor};
    border-bottom: 2px solid rgba(0,0,0,.2);
`
const CategoryDivs = styled.div`
    display: flex; 
    height: ${props => props.height};  
    transition: all ease-in-out .5s; 
    width: 100%;
    flex-shrink:0;
    z-index:5;
    background-color: rgba(0,0,0,.2);
    border-bottom: 2px solid rgba(0,0,0,.2);
`
const CategoryDivsExpanded = styled.div`
    display: flex; 
    flex-direction: column;
    opacity:${props => props.opacity};
    /* height: calc(100vh - 500px); */
    max-height: ${props => props.height};
    transition: all ease-in-out .5s;
    width: 100%;
    overflow-y: scroll;
    /* background-color: rgba(0,0,0,.2); */
    background-color: white;
    /* border-bottom: 2px solid rgba(0,0,0,.2); */
`
const DivWrappers = styled.div`
    display: flex; 
    flex-grow: 1;
    margin: auto 10px;
    align-items:center; 
    text-transform: capitalize;
`
const DivWrappersRight = styled.div`
    display: flex; 
    flex-grow: 1;
    margin: auto 10px;
    justify-content:right;   
`   
const SideMenuSubCats = ({subCat, toggle, cat}) => {

    // const [toggle1, setToggle1] = useState(toggle)
    const [openSubCats, setOpenSubCats] = useState(false)

    const gen = cat.cat

    const menu= useSelector(state => state.menu)

    const dispatch = useDispatch()

    const openSub = () => {        
        setOpenSubCats(!openSubCats)
        // setToggle1(!toggle);
        
      };
      const closeMenus = () => {
        setOpenSubCats(!openSubCats)
        dispatch(closeMenu())
        
        console.log(menu);
      }

      
 
  return (
          <>       
               <MainCategoryDivs height={ toggle ? "60px" : "0px"} onClick={(e)=>openSub()} backgroundColor= { 'white'} >
                        <DivWrappers>
                        {subCat.subTitle} 
                        </DivWrappers>
                        <DivWrappersRight>
                        {openSubCats ? <>
                        <ArrowForwardIosIcon style ={{color:"rgba(0,215,0,.8)", fontSize: 16, transform:'rotate(90deg)', transition:' all ease 1s'}}/>
                            </> : <>
                        <ArrowForwardIosIcon style ={{color:"rgba(0,0,0,.8)", fontSize: 16 , transition:' all ease 1s'}}/>
                        </>}
                        </DivWrappersRight>
                    </MainCategoryDivs>  
                    
    <CategoryDivsExpanded  height={ openSubCats ? "calc(61px*5)" : "0px"} overflow={ openSubCats ? " " : "hidden"} opacity={openSubCats ? 1 : 0} >
                        
    {Object.values(subCat)[0].map((it, index )=> (  
                <CategoryDivs key={index} height={ openSubCats ? "60px" : "0px"}  >
                    <Link to={`/productlist/${it}`} onClick={closeMenus}  state={gen}>
                    <DivWrappers>
                    {it}
                    </DivWrappers>
                    <DivWrappersRight>
                
                    </DivWrappersRight>
                    </Link>
                </CategoryDivs>  
                

    ))}
            
            
            </CategoryDivsExpanded>    

          
        
    </>
  )
}

export default SideMenuSubCats