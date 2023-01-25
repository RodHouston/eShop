
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { userRequest } from "../RequestMethods";
import { mobile } from "../responsive";
// import { popularProducts } from "../data"

import StarIcon from '../utilities/StarIcon';


const Info = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /* z-index: 3; */
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items:center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s ease;  
   
`

const Container = styled.div`
     box-sizing:border-box;   
     margin:1vw auto;
     padding-top:5vw;
     height: 120vw;
     width:100vw;   
     display: flex;
     flex-direction:row;
     flex-wrap: wrap;
     justify-content:center;
     align-items:center;    
     border: .2vw solid rgba(0,0,0,.2);
     position: relative;
     /* overflow: scroll;    */
     background-color:GhostWhite;       
     ${mobile({
  display: "flex",
  flexDirection: 'row',
  height: '105vw',
  width: '100vw'
})}
`
const OnSaleMessage = styled.p`
    font-size: 3.5vw;
    font-weight: bold;
    color: teal;
    margin-bottom: 1vw;
`
const ProductDiv = styled.div`
position:relative; 
margin:1vw;
height: 20vw;
width:20vw;   
border: .2vw solid rgba(0,0,0,.2);
position: relative;
background-color:rgba(0,128,128.2);
box-shadow: .2vw .2vw 1vw rgba(0,0,0,.5);
${mobile({
  display: "flex",
  flexDirection: 'row',
  height: '40vw',
  width: '40vw'
})}
`
const Link1 = styled(Link)` 
 text-decoration:none; 
`
const ProductDivIn = styled.div`
display: flex;
flex-direction:row;
flex-wrap: wrap;
box-sizing:border-box;  
position:relative; 
height: 100%;
width:100%;   
justify-content:center;
align-items:center;
overflow:hidden;
&:hover ${Info}{
    opacity:1;
}`

const Image = styled.img`
    height:70%;
    /* z-index:2; */
`
const SaleIconDiv = styled.div`
    display:flex;
    position:absolute;
    flex-shrink:1;
    top:-1vw;
    right:-3vw;
    width: 40%;
    height:20%;
    transform: rotate(25deg);
    border-radius: 50%;   
    justify-content: center;   
    transition: all 0.5s ease;
    z-index:1; 
    `
const SaleIcon = styled.div`
    display:flex;   
    width: 100%;
    height: 100%;   
    border-radius: 50%;
    border: .2vw solid rgba(225, 225, 225, 1) ;
    background-color: rgba(255,127,80,.7);
    box-shadow: .2vw .2vw 1vw rgba(0,0,0,.8);
    color:white;
    /* font-size: 2vw; */
    font-weight:bolder;
    align-items:center;
    justify-content: center;   
    cursor: pointer;
    &:hover{
        background-color: rgb(202, 202, 202) ;
        transform: scale(1.1);     
    }
    ${mobile({
  fontSize: '4.2vw'
})}
    `
const Icon = styled.div`
    width: 8vw;
    height:8vw;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items:center;
    justify-content: center;
    margin: 1vw;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover{
        background-color: rgb(202, 202, 202) ;
        transform: scale(1.1);
    }
`
const InfoDiv = styled.div`
    display: flex;
    position:relative;
    flex-direction:column;
    box-sizing:border-box;
    padding: 1vw;
    width: 100%;
    height: 50%;
    font-size: 3.5vw;
    /* background-color:rgba(0,0,0,.2); */
`
const Price = styled.p`
   
    font-weight: bold;
    color: teal;
    margin-bottom:1vx;
`
const SalePrice = styled.p`    
    font-weight: bold;
    color: red;
    margin-bottom: 1vw;
`
const RegPrice = styled.p`
    font-size: 3vw;
    text-decoration: line-through;
    margin-bottom: 2vw;
`
const Title = styled.p`
    
    font-weight: bold;
    color:rgba(0,0,0,.6);    
`
const Desc = styled.p`    
    font-weight: bold;      
`

const RatingsDiv = styled.div`
  display:flex;
  flex-direction:row;
  /* width:40%; */  
  font-size:.75rem;
  `
const StarDiv = styled.div`
  display:flex;
  flex-direction:row;
  margin-left:2vw;
  `
const Stars = styled.div`
  margin-right: 1vw;
  
  `
const RatingText = styled.p`
  
  `


const OnSaleProducts = ({ cat, gen, filters, sort }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])


  const [ratings, setRatings] = useState(['', '', '', '', ''])
  const [stars, setStars] = useState([])
  const [ratingTotal, setRatingTotal] = useState([])
  

  
  useEffect(() => {

    const getProduct = async () => {
     
     let res = {}
      try {
       res = await userRequest.get("products")       
      } catch (err) {
        console.log(err);
      }
      const filteredProduct = res.data?.filter(item => item.onSale == true)
      const ratingValue = []
      const ratTotal = []

      filteredProduct?.map((pro, idx) => {
        let ratingSum = 0;
        let rateTotal = 0;
        pro.ratings?.map((ratings, idx) => {
          rateTotal++
          ratingSum += ratings.rating
        })
        ratTotal[idx] = rateTotal
        ratingValue[idx] = ratingSum / rateTotal
      })
  
      setRatingTotal(ratTotal)
      setStars(ratingValue)   
  
      let randFilterProduct = []
      let tracker = []   

      while (tracker.length < 4) {
        let idx = Math.floor(Math.random() * 5)  
  
        if (!tracker?.includes(idx)) {
          randFilterProduct.push(filteredProduct[idx])
          tracker.push(idx)
        }
      }
      setFilteredProducts(randFilterProduct)  
    }
    getProduct()
  
  }, [])
 


  return (
    <Container>
      <OnSaleMessage>Check Out The Savings On These Great Products</OnSaleMessage>
      {filteredProducts?.slice(0, 8).map((item, idx) => (
        <ProductDiv key={idx}>
          <Link1 to={item?.isDesign ? `/wholesale/${item?._id}` : `/product/${item?._id}`} state={item}>
            <SaleIconDiv>
              <SaleIcon>
                ${item?.salePrice?.toFixed(2)}
              </SaleIcon>
            </SaleIconDiv>
            <ProductDivIn key={idx}>
              <Image src={item?.img} />


              <InfoDiv>
                <Title>{item?.title}</Title>
                <RatingsDiv>
                  <>
                    <RegPrice>${item?.price.toFixed(2)}</RegPrice>
                    <StarDiv>
                      {
                        ratings?.map((star, i) => (
                          i < stars[idx] ?
                            <Stars key={i}>
                              <StarIcon color="coral" size={'2vw'} />
                            </Stars>
                            :
                            <Stars key={i + idx}>
                              <StarIcon color="white" size={'2vw'} />
                            </Stars>
                        ))}
                      ({ratingTotal[idx]})
                    </StarDiv>
                  </>
                </RatingsDiv>
              </InfoDiv>

            </ProductDivIn>
          </Link1>
        </ProductDiv>
      ))}

    </Container>
  )
}

export default OnSaleProducts