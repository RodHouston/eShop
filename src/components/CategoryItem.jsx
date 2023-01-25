import styled from 'styled-components'
import React from 'react'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'


// const Container = styled.div`
    
// `
const Container = styled.div`
    flex: 1;
    margin: 1vw;
    height: 100px;
    position: relative;
    font-size:4vw;

`
const ContainerEffect = styled.div`
    position: absolute;
    width: 100%;
    height: 100%; 
    top:0;
    left:0;    
    background-image: radial-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,1));
    
    
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "50vw" })}
`
const Info = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%; 
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    text-align:center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 6vw;
    text-shadow: .5vw .5vw 2vw black;
   
`
const Button = styled.button`
    border: none;
    padding: 2vw;
    background-color: white;
    font-size:4vw;
    cursor: pointer;
    font-weight: 600;
    box-shadow: .5vw .5vw 2vw black;
    opacity: .7;
`



const CategoryItem = ({item}) => {
    
  return (
    <Container>
        <ContainerEffect></ContainerEffect>
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

export default CategoryItem

