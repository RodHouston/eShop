import styled from 'styled-components'
import React from 'react'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'



const Container = styled.div`
    flex: 1;
    margin: 5px;
    /* height: 50vh; */
    width: calc(100vw - 3);
    position: relative;
    border-radius: 15px;
  
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
    box-shadow: -1px 1px 10px black;
`
const Info = styled.div`
    position: absolute;
    top:0;
    left:0;
    height: 100%;
    width:100%;   
    display: flex;
    /* background-color:purple; */
    flex-direction:column;
    align-items: center;
    justify-content: center;
    text-align:center;
    
` 
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    text-shadow: 2px 2px 8px black;
   
`
const Button = styled.button`
    border: none;
    /* width:20vw;
    height: 5vw; */
    padding: 10px;
    background-color: white;
    color: grey;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 2px 2px 5px black;
    opacity: .7;
`


const CategoryItemMobile = ({item}) => {
  return (
    <Container >        
        <Link to={`/productlist2/${item.cat}`} state={item.cat}>
        <Image src={item.img}/>
        <Info>  
            <Title>
                {item.title}
            </Title>
            <Button>SHOP NOW</Button>
        </Info>
        </Link>
    </Container>
  )
}

export default CategoryItemMobile

