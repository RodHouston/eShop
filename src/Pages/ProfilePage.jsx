import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios'
import { userRequest } from '../RequestMethods'
import { useNavigate } from 'react-router-dom'
import { clearCart, syncCart } from '../redux/cartRedux'
import { Link } from "react-router-dom"




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

    border: ${props => props.type === 'filled' && 'none'};
    background-color: ${props => props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props => props.type === 'filled' && 'white'};
    
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
  ${mobile({
  width: "25vw"
})}
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
  border: 2px solid black;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid rgba(0,0,0.5);
  margin-bottom:20px;
`;
const QuantityPriceDiv = styled.div` 
${mobile({
  display: "flex"
})}
`
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
  font-weight: bold;
  ${mobile({
  marginLeft: "20px",
  marginBottom: "20px"
})}
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
 transition: all ease-in-out 1s;
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
  border-radius: 10px;
  margin-bottom:15px;
`;
const Button2 = styled.button`
  width: 100px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin:10px;
  border-radius: 10px;
`;
const PayPalDiv = styled.div`
  position: relative;
  z-index:1;
`

const ProfilePage = () => {

  const cart = useSelector(state => state.cart)
  const wish = useSelector(state => state.wish)
  const currProduct = useSelector(state => state.menu.currProduct)

  console.log(cart);

  const user = useSelector((state) => state.user.currentUser)
  const tempUser = useSelector((state) => state.user.tempUser)

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate()
  // const [myCart, setMyCart] = useState(cart)
  const [myWish, setMyWish] = useState(wish)
  const [shipping, setShipping] = useState(5.90)
  const [shippingDisc, setShippingDisc] = useState(5.90)
  const [toggle, setToggle] = useState(false)


  const [isLoading, setIsLoading] = useState(true)


  const currency = "USD";

  const [PKEY, setPKEY] = useState('')
  //  console.log(currProduct);


  const dispatch = useDispatch()


  const makeOrder = async () => {

    try {
      await userRequest.post("/orders",
        {
          cart
        }
      )
    } catch (error) {

    }
  }

  const deleteCart = async () => {
    try {
      await userRequest.delete(`/carts/${cart.id}/${user._id}/Cart`, { user })
    } catch (error) {
    }
    dispatch(clearCart())
    window.location.href = "/"
  }

  const handleItemCount = async (productId, action, quan) => {
    console.log(action);
    let res = {}
    // update cart
    try {
      res = await userRequest.put(`/carts/item/${cart.id}/${user._id}/${productId}/Cart/${action}/${quan}`, cart)
      // console.log(res);   
    } catch (error) {
    }
    // setMyCart(myCart)
    if (cart.total >= 50) {
      setShippingDisc(shipping)
      setShipping(shipping)
    } else (
      setShippingDisc(0)
    )
    dispatch(syncCart(res.data))
    // window.location.href="/cart"  
  }
  const onToken = (token) => {
    setStripeToken(token)
    console.log(token);
  }

  const showOrder = (details) => {
    console.log(details);
  }

  useEffect(() => {
    const getPKEY = async () => {
      
   if(!tempUser){  
      try {
        // console.log('try PKEY');
        const res = await userRequest.get('/orders/PKEY/' + user?._id)
        // console.log(res.data) 
        setPKEY(res.data)
        setIsLoading(false)
      } catch (error) {
      }
    }
    setIsLoading(false)
    }
    
    getPKEY()
  }, [PKEY, user?._id])

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await userRequest.post("/orders",
          {
            cart
          }
        )
      } catch (error) {

      }
      // try {    

      //   // axios.post(
      //   //   "http://localhost:3000/api/checkout/payment",

      //     const res= await userRequest.post("/checkout/payment",
      //     {
      //         tokenId: stripeToken.id, 
      //         amount: cart.total * 100,                
      //     }             
      //  )

      //  console.log(res.data); 
      //  navigate('/success', {state: {data:res.data}})
      // } catch (err) {
      //     console.log("this is the error " + err);
      // }
    }
    //     <StripeCheckout 
    //     name="SAssy" 
    //     image="../../Photos/c&slogo.png"
    //     billingAddress
    //     shippingAddress
    //     description={`Your total is $${(cart.amount + (shipping)).toFixed(2)}`}
    //     amount= {cart.total*100}
    //     token={onToken}
    //     stripeKey= {KEY}
    //     >
    //     <Button style={{
    //             color: 'white',
    //             backgroundColor: 'black'                      
    //         }}>
    //         Pay
    //     </Button>

    // </StripeCheckout>             

    // stripeToken && cart.total >= 1 && makeRequest()
  }, [stripeToken, cart.total, navigate, cart])


  return (
    <>
      {!isLoading &&
        <Container>
          <Wrapper>
            <Title>YOUR Profile</Title>
            <Top>
              {currProduct === undefined ? <Link to={`/productlist/${currProduct?.subCategories[0]}`} state={currProduct?.gender[0]}>
                <TopButton >CONTINUE SHOPPING</TopButton>
              </Link>
                :
                <Link to={`/`} >
                  <TopButton >CONTINUE SHOPPING</TopButton>
                </Link>}
              <TopButton onClick={deleteCart}>CLEAR CART</TopButton>
              <TopTexts>
                <TopText>CART ITEMS ({cart && cart.products.length})</TopText>
                <TopText onClick={() => { window.location.href = "/wishlist" }}>Your Wishlist ({myWish && myWish.products.length})</TopText>
              </TopTexts>
              <TopButton onClick={makeOrder} type='filled'>CHECK OUT</TopButton>

            </Top>
            <Bottom>

              <Info>
                {!user ?
                  <>
                    <p>Sign in to view cart</p>
                    <Button2 disabled={toggle} onClick={() => { window.location.href = "/login" }}>SIGN IN</Button2>
                    <Button2 disabled={toggle} onClick={() => { window.location.href = "/register" }}>REGISTER</Button2>
                  </>
                  : <>
                    {cart && cart.products.length === 0
                      ?
                      <p>No Items in Cart</p>
                      :
                      cart && cart.products?.map((product, index) => (
                        <Product key={product._id + index}>
                          <ProductDetail>
                            <Link
                              to={product.isDesign === true ? `/wholesale/${product._id}` : `/product/${product._id}`}
                              state={product.productItem}>
                              <Image src={product.img} />
                            </Link>
                            <Details>
                              <ProductName>
                                <b>Product:</b> {product.title}
                              </ProductName>
                              <ProductId>
                                <b>ID:</b> {product._id}
                              </ProductId>
                              <ProductColor color={product.color} />
                              <ProductSize>
                                <b>Size:</b> {product.isDesign}
                              </ProductSize>
                            </Details>
                          </ProductDetail>
                          <PriceDetail>
                            <QuantityPriceDiv>
                              <ProductAmountContainer>

                                <Remove onClick={() => { handleItemCount(index, 'sub', 1) }} />
                                <ProductAmount>Qty: {product.quantity}</ProductAmount>
                                <Add onClick={() => { handleItemCount(index, 'add', 1) }} />
                              </ProductAmountContainer>
                              <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                            </QuantityPriceDiv>
                            <Button disabled={toggle} onClick={() => {
                              setToggle(true);
                              handleItemCount(index, 'delete', product.quantity).then(() => setToggle(false))
                            }}>Remove</Button>

                          </PriceDetail>
                        </Product>
                      ))}
                  </>
                }
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total === 0 || cart.total === undefined ? 0 : cart.total?.toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total === 0 || cart.total === undefined ? 0 : shipping.toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>-$ {cart.total === 0 || cart.total === undefined ? 0 : shippingDisc.toFixed(2)}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total === 0 || cart.total === undefined ? 0 : (cart.total + (shipping - shippingDisc)).toFixed(2)}</SummaryItemPrice>
                </SummaryItem>

           
              </Summary>
            </Bottom>
          </Wrapper>
        </Container>}
    </>
  )
}

export default ProfilePage