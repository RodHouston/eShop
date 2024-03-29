import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import StarIcon from '../utilities/StarIcon';
import { syncCart } from '../redux/cartRedux'
import { syncWish } from '../redux/wishRedux';
import { useLocation } from 'react-router-dom'
import { Add, Remove } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { ThumbNailList } from '../components/ThumbnailList';
import { publicRequest, userRequest } from '../RequestMethods'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { setDotIndex, setMainPhoto, setThumbnails } from '../redux/photoRedux';

const Container = styled.div`
    ${mobile({ paddingTop: "50px" })}
`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;   
  ${mobile({ padding: "10px", flexDirection: "column" })}
`
const ImgContainer = styled.div`
  display:flex;
  max-width: 600px;
  max-height: 80vh;
  justify-content:center;
  align-items:center;
  flex: 1;
  border: 2px solid ${props => props.color};
`
const Image = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover; 
  margin:0 auto;
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
const RegPrice = styled.span`
  font-weight: 100;
  font-size: 30px; 
  background: linear-gradient(to left top, transparent 47.75%, currentColor 49.5%, transparent 52.25%);
`
const SalePrice = styled.span`
  font-weight: 100;
  font-size: 40px;
  color: red;
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
height: ${props => props.type === 'open' ? '100%' : '0'};
width: 100%;
position: fixed;
background-color: rgba(0,0,0,.8);
top: 0;
left: 0;
z-index:2;
`
const CartPreview = styled.div`
height: 60%;
width: 60%;
overflow: hidden;
position: fixed;
background-color: rgba(0,0,0,.8);
align-items: center;
justify-content: center;
top: 50%;
left: 50%;
z-index:2;
transform: translate(-50%, ${props => props.type === 'open' ? '0' : '1000px'});
transition: all ease 1s;
bottom: 0;
border-top-right-radius: 20px;
border-top-left-radius: 20px;
${mobile({ width: "100%", transform: `translate(0, ${props => props.type === 'open' ? '0' : '1000px'})` })}
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
const ThumbnailDiv = styled.div`
display:flex;
`
const ThumbnailList = styled.ul`
list-style-type:none;
width: 100%;
padding:8px;
`
const ThumbnailItems = styled.li`
margin: 8px;
`
const Thumbnail = styled.img`
    width: 50px;
    box-shadow: 2px 2px 8px rgba(0,0,0,.5);
`
const DotDiv = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
  /* background-color: red; */
    /* position:absolute; */
    top: 5vh;
    left:0;
    right:0;
    padding-bottom:10px;    
    `

const Dots = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%; 
  border: 2px solid darkgray;
  cursor: pointer;
  margin: 10px 7px 0px;  
  background-color: ${props => props.bgColor};
  `
const RatingsDiv = styled.div`
  display:flex;
  flex-direction:row;
  `
const Stars = styled.div`
  margin-right: 10px;
  `

const Product = () => {

  const dispatch = useDispatch()
  const location = useLocation()  
 
  
  const cart = useSelector(state => state.cart)
  const wish = useSelector(state => state.wish)
  const user = useSelector((state) => state.user.currentUser)

  const [myCart, setMyCart] = useState(cart)
  const [myWish, setMyWish] = useState(wish)

  const [quantity, setQuantity] = useState(1)
  const [newQuantity, setNewQuantity] = useState(1)
  const [product, setProduct] = useState(location.state)
  const [color, setColor] = useState(product?.color && product?.color[0])
  const [size, setSize] = useState(product?.size && product?.size[0])
  
  
  const [dotIndex, setDotInde] = useState(0)
  const dotInde = useSelector(state => state.photo.dotIndex)
  const currentPhoto = useSelector(state => state.photo.currentPhoto)
  const [thumbNailPhotos, setThumbNailPhotos] = useState([product.img, ...product.morePhotos])

 
  const [stars, setStars] = useState(0)
  const [ratingTotal, setRatingTotal] = useState(0)
  const [ratings, setRatings] = useState(['', '', '', '', ''])
   
  const [mess, setMess] = useState('')
  const [preBtn, setPreBtn] = useState('')
  const [toggle, setToggle] = useState(false)
  const [preview, setPreview] = useState('close')
  const [isSubscribed, setIsSubscribed] = useState(true)

  const minSwipeDistance = 50
  const [touchEnd, setTouchEnd] = useState(null)
  const [touchStart, setTouchStart] = useState(null)

  const onTouchStart = (e) => {
    setTouchEnd(null) 
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    // console.log('swipe', isLeftSwipe ? 'left' : 'right')
    if (isRightSwipe) {
      const idx = dotIndex > 0 ? dotIndex - 1 : thumbNailPhotos.length - 1
      dispatch(setDotIndex(idx))
      setDotInde(idx)
      dispatch(setDotIndex(idx))
      dispatch(setMainPhoto(thumbNailPhotos[idx]))
    }
    if (isLeftSwipe) {
      const idx = dotIndex < thumbNailPhotos.length - 1 ? dotIndex + 1 : 0
      dispatch(setDotIndex(idx))
      setDotInde(idx)
      dispatch(setDotIndex(idx))
      dispatch(setMainPhoto(thumbNailPhotos[idx]))
    }
  }
  const handleDotTouch = (idx) => {
    dispatch(setDotIndex(idx))
    setDotInde(idx)
    dispatch(setDotIndex(idx))
    dispatch(setMainPhoto(thumbNailPhotos[idx]))
  }

  const handleQuantity = (type) => {
    if (type === 'sub') {
      newQuantity > 1 && setNewQuantity(newQuantity - 1)
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setNewQuantity(newQuantity + 1)
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = async (item, location) => {
    setToggle(true)
    let match = false
    let quant = false
    let loc = ''
    let idx = ''
    let res = {}
    if (location === 'Cart') {
      loc = myCart
      setPreBtn('cart')
    } else if (location === 'Wish') {
      loc = myWish
      setPreBtn('wishlist')
    }

    setPreview('open')
    setMess(`Successfully added to ${location}`)
    loc.products?.map((product, index) => {

      if (product._id === item._id && product.color === color && product.size === size) {
        console.log('match')
        setMess(`Item Already In ${location}`)
        match = true
        idx = index
      }


      if (match && product.quantity !== quantity) {
        let newQuant = quantity + product.quantity
        setQuantity(newQuant)
        quant = true
        idx = index
      } else if (match && product.quantity === quantity) {
       
        setMess(`Item Already In ${location}`)
      }
      return true
    }
    )
    if (!match) {
      try {
        console.log('here in no match');
        res = await userRequest.put(`/carts/${loc.id}/${user._id}/${location}`, { ...product, productItem: product, quantity, color, size })
      } catch (error) {
      }
    }
    console.log(quant)
    if (quant) {     
      console.log('add to quaintity');
      console.log(idx);
      try {
        res = await userRequest.put(`/carts/item/${loc.id}/${user._id}/${idx}/${location}/add/${quantity}`, cart)
        // console.log(res);   
      } catch (error) {
      }
    }
    setToggle(false)

    if (res.data) {
      if (location === 'Cart') {
        dispatch(syncCart(res.data))
      } else if (location === 'Wish') {
        dispatch(syncWish(res.data))
      }
    }
  }

  const handleToggle = () => {
    setPreview('close')
  }



  useEffect(() => {
    const getProduct = async () => {
      dispatch(setMainPhoto(product.img))
      let ratingSum = 0;
      let rateTotal =0;
      try {         
        if (isSubscribed) {          
          product.ratings?.map((rating) => {           
            rateTotal++          
              ratingSum += rating.rating           
          })
        
          const ratingValue = ratingSum/rateTotal   
          setRatingTotal(rateTotal)       
          setStars(ratingValue)      
         
          if (product?.morePhotos) {    
            dispatch(setThumbnails(product.morePhotos))
          } else {
            dispatch(setThumbnails([]))
          }
        }
      } catch (error) {
      }
    }
    getProduct()
    setIsSubscribed(false)
  }, [dispatch, isSubscribed])

  
  return (

    <Container >
      {!isSubscribed &&
        <>
          <Wrapper >
            <ImgContainer color={color} onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}>
              <Image
                src={currentPhoto}
              />
            </ImgContainer > 
            <ThumbNailList data={thumbNailPhotos} dotIndex={dotInde} />
            <DotDiv>
              {thumbNailPhotos?.map((_, idx) => (
                <Dots
                  key={idx}
                  bgColor={dotInde === idx ? "teal" : "#c4c4c4"}
                  onClick={() => {
                    handleDotTouch(idx);
                  }}
                ></Dots>
              ))}
            </DotDiv>
            <InfoContainer>
              <Title>{product.title}</Title>
              <RatingsDiv>
                {ratings?.map((star, idx) => (
                  idx < stars ?                
                  <Stars key={idx}>
                    <StarIcon color="teal" size={'4vw'}/>
                  </Stars>                  
                  : 
                  <Stars key={idx}>
                    <StarIcon color="white" size={'4vw'}/>
                  </Stars>                  
                ))}
                ({ratingTotal} customer reviews)

              </RatingsDiv>
              <Desc>
                {product.desc}
              </Desc>
              {product.onSale ? <> <SalePrice>$ {product.salePrice}</SalePrice> on sale from <RegPrice>$ {product.price}</RegPrice> </> : <Price>$ {product.price}</Price>}
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color:</FilterTitle>
                  {product.color?.map((c, index) => (
                    <FilterColor color={c} key={c + index} onClick={() => setColor(c)} />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(e) => setSize(e.target.value)} >
                    {product.size?.map((s, index) => (
                      <FilterSizeOption key={s + index} >{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity('sub')} />
                  <Amount>
                    {newQuantity}
                  </Amount>
                  <Add onClick={() => handleQuantity('add')} />
                </AmountContainer>

                <Button disabled={toggle} onClick={() => {
                  setToggle(true);
                  handleAddToCart(product, 'Cart').then(() => setToggle(false))
                }}>ADD TO CART</Button>
                <Button disabled={toggle} onClick={() => {
                  setToggle(true);
                  handleAddToCart(product, 'Wish').then(() => setToggle(false))
                }}>ADD TO WISH</Button>
              </AddContainer>

            </InfoContainer>
          </Wrapper>

          <CartPreviewShade type={preview} onClick={() => handleToggle('close')}>
          </CartPreviewShade>
          <CartPreview type={preview}>
            <Notification>
              <CheckCircleOutlineIcon />
              {mess}
            </Notification>
            <PreviewContent>
              <PreviewContentDiv>
                <PreviewImg src={product.img} />
                <PreDescDiv>
                  <PreTitle>{product.title}</PreTitle>

                  <PreDesc>
                    {product.desc}
                  </PreDesc>
                </PreDescDiv>
                <PrePrice>$ {product.price}</PrePrice>
              </PreviewContentDiv>
              <ToCart onClick={() => { window.location.href = `/${preBtn}` }}>Go To Cart</ToCart>
            </PreviewContent>
          </CartPreview>
        </>
      }
    </Container>
  )
}

export default Product