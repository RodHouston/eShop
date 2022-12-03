import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { mobile } from "../responsive";
// import axios from 'axios'
import { userRequest } from '../RequestMethods'
import { Link } from "react-router-dom"
import { clearWish, syncWish } from '../redux/wishRedux'
import { syncCart } from '../redux/cartRedux'



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
  border: 2px solid black;
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


const Button = styled.button`
  width: 100%;
  height: 50px;
  margin: 10px;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Wishlist = () => {

  const cart = useSelector(state => state.cart)
  const wish = useSelector(state => state.wish)
  const user = useSelector((state) => state.user.currentUser)  
  const [myCart, setMyCart] = useState('')
  const [myWish, setMyWish] = useState('')
  const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch()

  


      
  const handleDeleteItem = async (productId, action) => {
    console.log(action);
    // update cart
    let res = {}
    try {      
       res =  await userRequest.put(`/carts/item/${myWish._id}/${user._id}/${productId}/Wish/${action}/1`, wish)
      // console.log(res);   
      } catch (error) {    
    }
    // setMyCart(myCart)
    await dispatch(syncWish(res.data))
    window.location.href="/wishlist"  
  }
      
  const handleAddToCart = async (item) => {    
   
    try {            
     const res = await userRequest.put(`/carts/${myCart._id}/${user._id}/Cart`, item)
     dispatch(syncCart(res.data))
    } catch (error) {    
    }
    window.location.href="/cart"  
    // dispatch(syncCart(myCart))
  }
    const deleteWish = async () => {      
      try {      
         await userRequest.delete(`/carts/${myWish._id}/${user._id}/Wish`, {user})
        // console.log(res);   
        } catch (error) {    
      }
      dispatch(clearWish())
    //  window.location.href="/"  
    }


    // console.log(myCart);

    useEffect(() => {
      const getMyCart = async () => {      
        try {      
          const res = await userRequest.get('/carts/find/Cart/'+ user._id)                 
          setMyCart(res.data) 
          const wish = await userRequest.get('/carts/find/Wish/'+ user._id)                   
          
          setMyWish(wish.data) 
          dispatch(syncWish(wish.data)) 
        } catch (error) {          
        }        
      }
      try {      
        
      } catch (error) {          
      } 
      getMyCart()
      
    }, [cart, dispatch, user?._id])

    // console.log('Wishlist');
    // console.log(myCart);
    // console.log(wish);
    


  return (
    <Container>
           <Wrapper>
            <Title>YOUR WISHLIST</Title>

            <Top>
             <Link to={`/productlist/shirt`}>
                <TopButton >CONTINUE SHOPPING</TopButton>
                </Link>             
                    
                <TopButton onClick={deleteWish}>Delete List</TopButton>
                <TopTexts>
                  <Link to={`/cart`}>
                    <TopText>CART ITEMS ({myCart && myCart.products?.length})</TopText>
                  </Link>
                    <TopText>Your Wishlist ({myWish && myWish.products?.length})</TopText>
                </TopTexts>
                <TopButton type='filled'>CHECK OUT</TopButton>
                
            </Top>
            <Bottom>
            
            <Info>
                {myWish && myWish.products?.length=== 0 ? <><p>No Items in List</p></> : myWish && myWish.products?.map((product, index)=>(                
                <Product key={product._id + index}>
                <ProductDetail>
                  <Link to={ product.isDesign ? `/wholesale/${product._id}` :`/product/${product._id}`} state={product}>
                      <Image src={product.img}/>
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
                <Button disabled= {toggle}  onClick={()=>{ setToggle(true);
                          handleAddToCart(product).then(() => setToggle(false))}}>ADD TO CART</Button>
                <Button disabled= {toggle}  onClick={()=>{ setToggle(true);
                          handleDeleteItem(index, 'delete').then(() => setToggle(false))}}>REMOVE FROM LIST </Button>
                </Product>
                ))}
            </Info>
           
            </Bottom>
        </Wrapper>
        
    </Container>
  )
}

export default Wishlist