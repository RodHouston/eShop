import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeDropDownMenu, openDropDownMenu } from '../redux/sideMenuRedux'


const DropDownDiv = styled.div`
    display:flex;
    flex-direction:column;
    position: relative;
    width:100%;
    /* margin-top: 5px; */
    height:${props => props.height};
    background-color: white;
    transition:all ease-in-out .5s;
    border-bottom: 2px solid teal;
    /* opacity: ${props => props.opacity}; */
`
const SubDiv = styled.div`
    display:flex;
    position: relative;
    width:80%; 
    margin: 0 auto;
    /* padding-bottom: 5px;     */
    height:${props => props.height};
    /* background-color: white; */
    transition:all ease-in-out .8s;
    opacity: ${props => props.opacity};
`
const SubCatsDiv = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    position: relative;
    box-sizing:border-box;  
    padding:5px;
    margin:0 auto;
    margin-bottom:5px;
    text-align:center;
    overflow:hidden;
    /* background-color: blue; */
    transition:all ease-in-out .5s;   
`
const LinkDiv = styled.div`
    display:flex;
    height: 100%;
    width:100%;
    flex-direction:column;   
    text-align:left; 
    line-height:2;
    flex-wrap: wrap;
    
    position:relative;
`
const LinkName = styled.p`
    text-decoration: none;
`

const MenuTitleDiv = styled.div`
    height: 35px;
    background-color: teal;
    display:flex;
    color: white;
    align-items: center; 
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    
      
`
const SubTitles = styled.div`    
    border-bottom: 2px solid teal;
`

const DropdownMenu = ({ cat }) => {

    const toggle = useSelector((state) => state.menu.dropDownMenu)
    const dispatch = useDispatch()

    // console.log(cat);
    return (

        <DropDownDiv
            onMouseLeave={(e) => { dispatch(closeDropDownMenu(false)) }}
            height={toggle ? '200px' : ' 0px'} >
            <MenuTitleDiv >

                <Link to={`/productlist2/${cat.cat}`}
                    onClick={(e) => { dispatch(openDropDownMenu(!toggle)) }}
                    state={cat.cat}>
                    {cat.cat &&
                        <LinkName>view all {cat.cat} items</LinkName>
                    }
                </Link>
            </MenuTitleDiv>
            <SubDiv height={toggle ? '160px' : ' 0px'}
                opacity={toggle ? '1' : ' 0'} >
                {
                    cat?.subCats?.map((sub, index) => (
                        <SubCatsDiv key={index}  >
                            <SubTitles>{sub.subTitle}</SubTitles>
                            <LinkDiv >
                                {Object?.values(sub)[0]?.map((it, index) => (
                                    <Link key={index} to={`/productlist/${it}`}
                                        onClick={(e) => { dispatch(openDropDownMenu(!toggle)) }}
                                        state={cat.cat}>
                                        <LinkName>{it}</LinkName>
                                    </Link>
                                ))}
                            </LinkDiv>
                        </SubCatsDiv>
                    ))}
            </SubDiv>
        </DropDownDiv>
    )
}

export default DropdownMenu