import styled from 'styled-components'
import React from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItemMobile'
import { mobile } from '../responsive'
import { useSelector } from 'react-redux'

const Window = styled.div`
width: 100vw;
overflow: hidden;
overflow-x: scroll;
position:absolute;
bottom:0;
z-index:5;
`
const Container = styled.div`
    display: none;
    width: ${(props) => props.width}vw;
    position: relative;
    justify-content: space-between;
    /* padding:20px; */
    background-image: linear-gradient( rgba(225,225,225,.0), rgba(225,225,225,1));
    overflow: hidden;   
    ${mobile({ display: "flex"})} 
  
`


const CategoriesMobile = () => {
  
  const categories1 = useSelector((state) => state.global.categories)

  return (
    <Window>
      <Container width= {categories1.length*40}>
        {categories1.map((item, index) => (
          <CategoryItem item={item} key={item._id + index} />
        ))}
      </Container>
    </Window>
  )
}

export default CategoriesMobile