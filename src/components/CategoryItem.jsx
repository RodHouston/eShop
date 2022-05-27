import styled from 'styled-components'
import React from 'react'
import { mobile } from '../responsive'
import { Link } from 'react-router-dom'


// const Container = styled.div`
    
// `
const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height: "20vh" })}
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
    margin-bottom: 20px;
    text-shadow: 2px 2px 8px black;
   
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: grey;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 2px 2px 5px black;
    opacity: .7;
`



const CategoryItem = ({item}) => {
  return (
    <Container>
        
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

