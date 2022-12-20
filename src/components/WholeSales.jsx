
import { useEffect, useState } from "react";
import styled from "styled-components"
import WholeSale from "../components/WholeSale";
import { userRequest } from "../RequestMethods";
// import { popularProducts } from "../data"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;  
    
   
`

const Designs = ({cat, filters, sort}) => {
  
  const [designs, setDesigns] = useState([])
  const [filteredDesigns, setFilteredDesigns] = useState([])

useEffect(() => {
 const getDesign = async () => {
   try {       
     const res = await userRequest.get(cat ? `designs?category=${cat}` :  "designs")
     setDesigns(res.data);     
   } catch (err) {
     
   }
 }
  
 getDesign()
}, [cat])

 useEffect(() => {
  cat && setFilteredDesigns(designs.filter(item=> Object.entries(filters).every(([key, value]) =>
    item[key].includes(value) )))
 },[cat, filters, designs])
 useEffect(() => {
   if ((sort === 'newest')) {
     setFilteredDesigns((prev) => 
     [...prev].sort((a,b) => a.createdAt - b.createdAt)
     )
   } else if ((sort === 'asc')) {
    setFilteredDesigns((prev) => 
    [...prev].sort((a,b) => a.price - b.price)
    )
  } else {
    setFilteredDesigns((prev) => 
    [...prev].sort((a,b) => b.price - a.price)
    )
  } 
 }, [sort])
  return (
    <Container>
        {cat ? filteredDesigns?.map((item, index) => (
            <WholeSale item = {item} key={item._id + index}/>)) : designs?.slice(0,8).map((item, index) => (
              <WholeSale item = {item} key={index + item._id}/>))
            }
    </Container>

  )
}

export default Designs