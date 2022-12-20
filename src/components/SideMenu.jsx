import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import { mobile } from "../responsive";
import Footer from './Footer';
import { categories } from '../data'
import SideMenuCats from './SideMenuCats';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { openMainMenu } from '../redux/sideMenuRedux';





const MainContainer = styled.div`
    display: flex;
    position: fixed;
    overflow:scroll;   
    height: 100vh;
    width: 25vw;
    top: 0;
    left:0;
    flex-direction: column;

    transform: ${props => props.translate};
    transition: all ease-in-out .5s;
    ${mobile({ flexDirection: "column" })}
    z-index:11;
`

const Container = styled.div`
    display: flex;
    position: fixed;
    overflow:scroll;   
    height: 100vh;
    width: 25vw;
    top: 0;
    left:0;
    flex-direction: column;
    background-color: rgba(255,255,255,.8);
    ${mobile({ flexDirection: "column" })}
    
`


const ContainerShade = styled.div`
    display: flex;
    position: fixed; 
    /* z-index: 1; */
    height: 100vh;
    width: 100vw;
    overflow:hidden;
    top: 0;
    left:0;
    background-color: rgba(0,0,0,0.8);
    ${mobile({ flexDirection: "column" })}
    
`

const ContainerDiv = styled.div`
    display: flex;
    position: fixed;
 
    height: 100vh;
    width: 100vw;
    overflow:hidden;
   
    top: 0;
    left:0;
    transform: ${props => props.translate};
    transition: all ease-in-out .5s;
`



const MenuIconDiv = styled.div`
    display:flex;
    position: sticky;
    border-radius:50%;
    justify-content:center;
    align-items:center;
    height: 30px;
    width: 30px;
    padding:5px;
    top: 80px;
    left:0;
    z-index:12;
    ${mobile({ position: "fixed" })}
    /* background-color: rgba(0,0,0,.2); */
    /* border-bottom: 2px solid rgba(0,0,0,.2); */
`


// console.log('sidemenu');

const SideMenu = () => {

    const menu = useSelector(state => state.menu.mainMenu)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(menu)

    const openMenu = () => {
        dispatch(openMainMenu())
        setOpen(menu);
    };

    useEffect(() => {
        if (menu) {
            document.body.style.overflow = 'hidden'
        } else (
            document.body.style.overflow = 'scroll'
        )
    }, [menu])

    useEffect(() => {

    }, [menu])
    return (

        <>
            <MenuIconDiv>
                <MenuIcon onClick={openMenu} />
            </MenuIconDiv>
            <MainContainer translate={menu ? "" : 'translateX(-100vw)'}>

                <ContainerDiv translate={menu ? "" : 'translateX(-100vw)'}>
                    <ContainerShade onClick={openMenu} translate={menu ? " " : 'translateX(-100vw)'}>

                    </ContainerShade>
                    <Container>

                        SideMenu Login Account
                        {categories?.map((item, index) => (

                            <SideMenuCats key={index} item={item} setOpen={menu} />

                        ))}

                        <Footer />
                    </Container>

                </ContainerDiv>
            </MainContainer>
        </>
    )
}

export default SideMenu