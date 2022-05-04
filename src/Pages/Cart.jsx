import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { mobile } from "../responsive";

import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios'
import { userRequest } from '../RequestMethods'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/cartRedux'
import { Link } from "react-router-dom"

const KEY = 'pk_test_51KtGN3AkMYFXtHLuKRHncfevzOCeOYYgb9YVjpontlkVns7Oyei80bmI7ZWNKGzs6jYycEmLW1ffMCiMSaXxdje200B3fxA6Ch'
//const KEY = process.env.STRIPE_KEY 

const Container = styled.div`

`
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
  `

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    cursor: pointer;
    margin: 0 10px;

    border: ${props =>props.type === 'filled' && 'none'};
    background-color: ${props =>props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props =>props.type === 'filled' && 'white'};
    
`
const TopTexts = styled.div`
    display: flex;
    ${mobile({ display: "none" })}
`

const TopText = styled.div`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

// const Hr = styled.hr`
//   background-color: #d3d3d3;
//   border: none;
//   height: 1px;
// `;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const cart = useSelector(state => state.cart)
  const user = useSelector((state) => state.user.currentUser)
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate()
  const [myCart, setMyCart] = useState(cart)

  const dispatch = useDispatch()

  
  const saveCart = async () => {
    //update cart
    console.log(cart.products);
    // console.log(myCart.products);
    try {    
        console.log('save');  
        const res = await userRequest.post('/carts/', 
        {
        "userId" : user._id,
        "products": cart.products, 
        "amount": cart.total,
        "address" : "111118 Test Ave, Tester, Va. 22153"
    })
       console.log(res);
        // setMyCart(res.data)
        
      } catch (error) {
        console.log(error);
      }
    
}

const handleClearCart = async () => {
  // console.log(myCart._id);
  //update cart
  try {
      
     await userRequest.delete(`/carts/${myCart._id}/${user._id}`, {user})
    // console.log(res);
    
    
  } catch (error) {
    
  }
  dispatch(clearCart())
  window.location.href="/cart"
}



    const onToken = (token) =>{
        setStripeToken(token)
        console.log(token);
    }

    useEffect(() => {
      const getMyCart = async () => {      
        try {      
          const res = await userRequest.get('/carts/find/'+ user._id)
          // console.log(res);
          if (res.data === null) { setMyCart(cart) 
            }  else {setMyCart(res.data) }         
          
        } catch (error) {
          
        }        
      }
      getMyCart()
    }, [cart, user?._id])

    useEffect(() => {      
        
        const makeRequest = async () =>{
            try {        
              
              // axios.post(
              //   "http://localhost:3000/api/checkout/payment",
                
                const res= await userRequest.post("/checkout/payment",
                {
                    tokenId: stripeToken.id, 
                    amount: cart.total * 100,                
                }             
             )
             console.log(res.data); 
             navigate('/success', {state: {data:res.data}})
            } catch (err) {
                console.log("this is the error " + err);
            }
        }
        
        stripeToken && cart.total >= 1 && makeRequest()
        
    },[stripeToken, cart.total, navigate, ])
    // console.log(cart);


  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <Title>YOUR CART</Title>
            <Top>
             <Link to={`/productlist/shirt`}>
                <TopButton >CONTINUE SHOPPING</TopButton>
                </Link>
                <TopButton onClick={handleClearCart}>CLEAR CART</TopButton>
                    <TopButton onClick={saveCart}>SAVE CART</TopButton>
                <TopTexts>
                    <TopText>CART ITEMS ({myCart && myCart.products.length})</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type='filled'>CHECK OUT</TopButton>
                
            </Top>
            <Bottom>
            
            <Info>
                {myCart && myCart.products.length=== 0 ? <><p>No Items in Cart</p></> : myCart && myCart.products.map((product, index)=>(                
                <Product key={product._id + index}>
                <ProductDetail>
                    <Image src={product.img}/>
                     <Details>
                    <ProductName>
                        <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                        <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                        <b>Size:</b> {product.size}
                    </ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                </PriceDetail>
                </Product>
                ))}
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout 
                  name="SAssy" 
                  image="../../Photos/logo.png"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total*100}
                  token={onToken}
                  stripeKey= {KEY}
                  >
                  <Button style={
                      {
                          color: 'white',
                          backgroundColor: 'black'
                      
                      }}>
                      Pay
                  </Button>
                  
              </StripeCheckout>
            </Summary>
            </Bottom>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Cart