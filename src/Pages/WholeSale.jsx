
import { Add, Remove } from '@material-ui/icons'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { syncCart } from '../redux/cartRedux'
import { publicRequest, userRequest} from '../RequestMethods'
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux'
import { syncWish } from '../redux/wishRedux';
import { setCurrProduct } from '../redux/sideMenuRedux';
import Zoom from 'react-img-zoom';




const Container = styled.div`
    
`

const Wrapper = styled.div`
  padding: 50px;
  display: flex; 
  
  ${mobile({ padding: "10px", flexDirection:"column" })}
`

const ImgContainer = styled.div`
  display:flex;
  max-width: 600px;
  max-height: 80vh;
  justify-content:center;
  align-items:center;
  flex: 1;
  border: 2px solid ${props => props.color};
  z-index:2;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover; 
  
  ${mobile({ height: "40vh" })}
`
const Title = styled.h1`
  font-weight: 200;
`

const Desc = styled.p`
  margin: 20px 0px;
`

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px; 
  ${mobile({ padding: "10px" })}
`
const FilterContainer = styled.div`
    width:50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`

const Filter = styled.div`
    display: flex;
    align-items:center;
`

const FilterTitle = styled.span`
    font-size:20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius:50%;
    background-color: ${props => props.color};
    // border: 2px solid black;
    box-shadow: 2px 2px 2px rgba(0,0,0,.3), -2px 2px 2px rgba(0,0,0,.3);
    margin: 0 5px;
    cursor: pointer;
    &:hover{
      transform: scale(1.2);
  }
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;    
`

const FilterSizeOption = styled.option`
`
const AddContainer = styled.div`
    display: flex;
    align-items:center;
    width: 50%;
    justify-content:center;
    ${mobile({ width: "100%" })}
`
const AmountContainer = styled.div`
    display: flex;
    align-items:center;
    font-weight: 700;
    justify-content:center;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius:10px;
    border: 1px solid teal;
    display: flex;
    justify-content: center;
    align-items:center;
    margin: 0px 5px;
`
    
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`
const CartPreviewShade = styled.div`
height: ${props =>props.type === 'open' ? '100%' : '0'};
width: 100%;
position: fixed;
background-color: rgba(0,0,0,.8);
// background-color: red;
top: 0;
left: 0;
z-index:2;
// transform: translate(-50%, 0);
`
const CartPreview = styled.div`
height: 60%;
width: 60%;
overflow: hidden;
position: fixed;
background-color: rgba(0,0,0,.8);
align-items: center;
justify-content: center;
// margin: 0 auto;
top: 50%;
left: 50%;
z-index:2;
transform: translate(-50%, ${props =>props.type === 'open' ? '0' : '1000px'});
transition: all ease 1s;
bottom: 0;
border-top-right-radius: 20px;
border-top-left-radius: 20px;
${mobile({ width: "100%", transform: `translate(0, ${props =>props.type === 'open' ? '0' : '1000px'})`})}
`

const Notification = styled.p`
  display:flex;
  align-items:center;
  margin: 10px;
  color:green;
  font-weight: bold;
  justify-content: center;
`
const PreviewContent = styled.div`
display:flex;
flex-direction:column;
height:100%;
width: 100%;
align-items:center;
background-color: teal;

`
const PreviewContentDiv = styled.div`
height:40%;
width: 100%;
display: flex;
justify-content: center;
// background-color: yellow;
padding: 20px;
box-sizing: border-box;
border-top: 2px solid black;
`
const PreviewImg = styled.img`
  width:60px;
  height: 60px;
  border-radius: 15px;
  margin: 10px;
`
const PreDescDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const PreTitle = styled.h1`
  font-weight: 200;
`

const PreDesc = styled.p`
  margin: 20px 0px;
`

const PrePrice = styled.span`
  font-weight: 100;
  font-size: 40px;
`
const ToCart = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 20px;
  background-color: lightblue;
  cursor:pointer;
`
const WholeSale = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const img = location.state.img

    const [product, setProduct] = useState([])  
    const [quantity, setQuantity] = useState(1)
    const [newQuantity, setNewQuantity] = useState(1)
    const [color, setColor] = useState(product.color && product.color[0])
    const [size, setSize] = useState(product.size && product.size[0])

    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user.currentUser)
    const cart = useSelector(state => state.cart)
    const wish = useSelector(state => state.wish)
    const [myCart, setMyCart] = useState(cart)
    const [myWish, setMyWish] = useState(wish)
    const [mess, setMess] = useState('')

    const [toggle, setToggle] = useState(false)
    const [preview, setPreview] = useState('close')
    const [preBtn, setPreBtn] =useState('')


    const [isSubscribed, setIsSubscribed] = useState(true)

   
    const handleQuantity = (type) => {
        if(type === 'sub'){
           newQuantity > 1 && setNewQuantity(newQuantity-1)
           quantity > 1 && setQuantity(quantity-1)
        }else {
        setNewQuantity(newQuantity+1)
        setQuantity(quantity+1)
    }}


    const handleAddToCart = async (item, location) => {       
      setToggle(true)
       
      let match = false
      let quant = false
      let loc = ''
      let i = ''
      let res = {}
      if(location === 'Cart'){
        loc = myCart
        setPreBtn('cart')
      }else if(location === 'Wish'){
        loc = myWish
        setPreBtn('wishlist')
      }      

      setPreview('open')     
      setMess(`Successfully added to ${location}`)
      loc.products.map((product, index) => { 
         if(product._id === item._id && product.color === color && product.size === size){           
            console.log('match')
            setMess(`Item Already In ${location}`)
            match= true 
            i= index           
          }
          if(match &&  product.quantity !== quantity){             
            let newQuant = quantity +  product.quantity
            setMess('Item quantity change')
            setQuantity(newQuant)            
            quant = true    
             }  else if(match &&  product.quantity === quantity) {
               console.log('here');
               setMess(`Item Already In ${location}`)
             }   
            return true
      }
      )

      if (!match){
        console.log('in no match');
        try {            
          res =  await userRequest.put(`/carts/${loc.id}/${user._id}/${location}`, {...product, quantity, color, size})
            console.log(res);  
        } catch (error) {    
      }
    }

      
      console.log(res)
      if(quant){
        console.log('add to quaintity');
        try {     
           res = await userRequest.put(`/carts/item/${loc.id}/${user._id}/${i}/${location}/add/${quantity}`, cart)
          
         } catch (error) {    
       }
      }
      setToggle(false)
      if (res.data){
        if(location === 'Cart'){
        dispatch(syncCart(res.data))
      }else if(location === 'Wish'){
        dispatch(syncWish(res.data))
      }  }
    
  }    
   
    const handleToggle = () => {
      console.log('toggle');
      setPreview('close')
    }




    // useEffect(() => {
      
    //     const getMyCart = async () => {      
    //       try {      
    //         const res = await userRequest.get('/carts/find/Cart/'+ user._id)
    //         // console.log(res);
    //         if (res.data === null & isSubscribed) { setMyCart(cart) 
    //           }  else {setMyCart(res.data) }         
            
    //       } catch (error) {
            
    //       }        
    //       try {      
    //         const wish = await userRequest.get('/carts/find/Wish/'+ user._id)
    //         // console.log(res);
    //         if (wish.data === null) { setMyWish(myWish) 
    //           }  else {setMyWish(wish.data) }         
            
    //       } catch (error) {
            
    //       }        
    //     }
    //     getMyCart()
    //     return () => setIsSubscribed(false)
    //   }, [cart, wish,myWish, user?._id, mess, isSubscribed])



    useEffect(() => {
     
        const getDesign = async ()=>{
            try {                          
                const res = await publicRequest.get("/designs/find/" +id)    
                dispatch(setCurrProduct(res.data))  
                if (isSubscribed) {
                await setProduct(res.data)
                
                setSize(res.data.size[0])
                setColor(res.data.color[0])   
                           
                }
            } catch (error) {
                
            }
        }
        // console.log(product);
        getDesign()
        setIsSubscribed(false)
      }, [id, isSubscribed])
      
    //   console.log();
    //   console.log(product.color && product.color[1]);
    //   console.log('color ' + color);
    //   console.log(product.size && product.size[1]);
    //   console.log('size ' + size);
      
  return (


    <Container >
    
      <Wrapper >
            <ImgContainer color={color} >
            <Zoom
              img={img}
              zoomScale={3}
              width={400}
              height={400}
              transitionTime={0.5}
            />
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title} #{product.stockNumber}</Title>
                <Desc>
                {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color:</FilterTitle>
                        {product.color?.map((c, index)=>(
                            <FilterColor color={c} key={c+ index} onClick={() => setColor(c)} />
                        ))}                      
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange= {(e) => setSize(e.target.value)} >
                            {product.size?.map((s, index)=>(
                                <FilterSizeOption key={s +index} >{s}</FilterSizeOption>
                            ))}                          
                         </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=> handleQuantity('sub')}/>
                        <Amount>
                           {newQuantity}
                        </Amount>
                        <Add onClick={()=> handleQuantity('add')}/>
                    </AmountContainer> 
                                     
                    <Button  disabled= {toggle}  onClick={()=>{ setToggle(true);
                          handleAddToCart(product,'Cart').then(() => setToggle(false))}}>ADD TO CART</Button>
                    <Button  disabled= {toggle}  onClick={()=>{ setToggle(true);
                          handleAddToCart(product, 'Wish').then(() => setToggle(false))}}>ADD TO WISH</Button>
                                      
                </AddContainer>
            </InfoContainer>      
        </Wrapper>     


        <CartPreviewShade type={preview} onClick={()=> handleToggle('close')}>
        </CartPreviewShade>
          <CartPreview type={preview}>
                <Notification>
                 <CheckCircleOutlineIcon/>
                  {mess}
                </Notification>
                <PreviewContent>
                  <PreviewContentDiv>
                    <PreviewImg src={product.img}/>
                    <PreDescDiv>
                      <PreTitle>{product.title}</PreTitle>
                      <PreDesc>
                        {product.desc}
                      </PreDesc>
                    </PreDescDiv>
                    <PrePrice>$ {product.price}</PrePrice>
                  </PreviewContentDiv>
                  <ToCart onClick={() => {window.location.href=`/${preBtn}`}}>Go To Cart</ToCart>
                </PreviewContent>
              </CartPreview>                
       
    </Container>
  )
}

export default WholeSale 