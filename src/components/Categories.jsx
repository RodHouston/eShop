import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { categories } from '../data'
import CategoryItem from './CategoryItem'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../redux/globalRedux'
import { publicRequest } from '../RequestMethods'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding:20px;
    ${mobile({ padding: "0px", flexDirection: "column" })}
    
`;


const Categories = () => {

  const categories1 = useSelector((state) => state.global.categories)
  const [cats, setCats] = useState([])
  const dispatch = useDispatch()

  if (categories1.length === 0) {
    dispatch(setCategories(categories))
  }

  return (
    <Container>
      {categories1?.map((item, index) => (
        <CategoryItem item={item} key={index} />
      ))}
    </Container>
  )
}

export default Categories