import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { openCats } from '../redux/sideMenuRedux';
import SideMenuSubCats from './SideMenuSubCats';


const MainCategoryDivs = styled.div`
    display: flex; 
    height: 60px;    
    width: 100%;
    flex-shrink:0;
    
    background-color: ${props => props.backgroundColor};
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
    /* overflow: ${props => props.overflow}; */
    /* background-color: rgba(0,0,0,.2); */
    /* background-color: yellow; */
    /* border-bottom: 2px solid rgba(0,0,0,.2); */
`
const DivWrappers = styled.div`
    display: flex; 
    flex-grow: 1;
    margin: auto 10px;
    align-items:center; 
`
const DivWrappersRight = styled.div`
    display: flex; 
    flex-grow: 1;
    margin: auto 10px;
    justify-content:right;   
`

const SideMenuCats = ({item, setOpen}) => {

    const [toggle, setToggle] = useState(false)
   

    const menuCat= useSelector(state => state.menu.category)
    const dispatch = useDispatch()

    const show = () => {    
        console.log('open show');      
        setToggle(!toggle);
        dispatch(openCats())
        
      };
  

    //   console.log('sidemenuCats');
    //   console.log(menu);
//    console.log(item.subCats[0].graphicShirt);
  return (
          <>       
            <MainCategoryDivs onClick={show} backgroundColor= {toggle ? 'rgba(0,0,0,.5)' : ' rgba(0,0,0,.2)'}>
                <DivWrappers>
                    {item.title}
                </DivWrappers>
                <DivWrappersRight>
                    {toggle ? <>
                        <ArrowForwardIosIcon style ={{color:"rgba(0,200,0,.8)", fontSize: 16, transform:'rotate(90deg)', transition:' all ease 1s'}}/>
                        </> : <>
                    <ArrowForwardIosIcon style ={{color:"rgba(0,0,0,.8)", fontSize: 16 , transition:' all ease 1s'}}/>
                    </>}
                </DivWrappersRight>
            </MainCategoryDivs>

           
           <CategoryDivsExpanded height={ toggle ? "calc(100%*3)" : "0px"} overflow={ toggle ? " " : "hidden"} opacity={toggle ? 1 : 0} >
                { item?.subCats?.map((it, index )=> (  
                                   
                        <SideMenuSubCats key={index} cat={item} subCat={it} toggle={toggle}/>   
                    
                ))  }                         
            </CategoryDivsExpanded>        
        
    </>
  )
}

export default SideMenuCats