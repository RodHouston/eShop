
import { useEffect, useState } from "react";
import styled from "styled-components"
import { userRequest } from "../RequestMethods";
import { mobile } from "../responsive";
// import { popularProducts } from "../data"
import Product from "./Product";

const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 10px;
    justify-content: space-between;  
    margin: 0 auto;   
    ${mobile({ 
      display: "flex",
      flexDirection:'column'
      })}
`

const Products = ({cat, gen, filters, sort}) => {
  
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    
  const getProduct = async () => {
    //  console.log('in products');
    //  console.log(gen);
    try {   
      if(gen ==='graphics') {
        const res = await userRequest.get(cat ? `designs?q=${cat}` :  "designs")      
        setProducts(res.data);  
      }else if(gen === undefined) {
        const res = await userRequest.get("products")      
        setProducts(res.data);  
      }else{
      const res = await userRequest.get(cat ? `products?q=${cat}` :  "products")
      setProducts(res.data.filter(item=> item.gender.includes(gen))); 
      }   
    } catch (err) {
    }
  }
  //  console.log(cat);
  getProduct()
  }, [cat, gen])

 useEffect(() => {
  cat && setFilteredProducts(products.filter(item=> Object.entries(filters).every(([key, value]) =>
    item[key].includes(value) )))
  },[cat, filters, products])



 useEffect(() => {
   if ((sort === 'newest')) {
     setFilteredProducts((prev) => 
     [...prev].sort((a,b) => a.createdAt - b.createdAt)
     )
   } else if ((sort === 'asc')) {
    setFilteredProducts((prev) => 
    [...prev].sort((a,b) => a.price - b.price)
    )
  } else {
    setFilteredProducts((prev) => 
    [...prev].sort((a,b) => b.price - a.price)
    )
  } 
 }, [sort])
//  console.log(gen);
//  console.log(cat);
//  console.log(products);
//  console.log(filteredProducts.length);
  return (
    <Container>
      {cat ? 
        <> 
          {filteredProducts.length > 0 ?
            <>
              {filteredProducts?.map((item, index) => ( 
                <Product key={index} item = {item} />  
              ))}            
            </>
          : 
            <h2> NO PRODUCTS FOUND </h2>
          }
        </>
      :
        <>        
          {products?.slice(0,8).map((item, index) => (
            <Product  item = {item} key={index + item._id}/>
          ))}
        </>
      }
    </Container>
  )
}

export default Products