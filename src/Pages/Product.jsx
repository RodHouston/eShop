
import { Add, Remove } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newletter from '../components/Newletter'
import { addProduct, clearCart } from '../redux/cartRedux'
import { publicRequest} from '../RequestMethods'
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux'


const Container = styled.div`
    
`

const Wrapper = styled.div`
  padding: 50px;
  display: flex; 
  ${mobile({ padding: "10px", flexDirection:"column" })}
`

const ImgContainer = styled.div`
  flex: 1;
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
    margin: 0 5px;
    cursor: pointer;
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

const Product = () => {

    const location = useLocation()
    const id = location.pathname.split('/')[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(product.color && product.color[0])
    const [size, setSize] = useState(product.size && product.size[0])

    const dispatch = useDispatch()
    
    const user = useSelector((state) => state.user.currentUser)
    // const [myCart, setMyCart] = useState('')

   
    const handleQuantity = (type) => {
        if(type === 'sub'){
           quantity > 1 && setQuantity(quantity-1)
        }else {
        setQuantity(quantity+1)
    }}
    const handleAddToCart = async () => {
        //update cart
        // try {    
        //     console.log('here');  
        //     console.log(color);
        //     const res = await setColor(product.color[0])
            
            
            
        //   } catch (error) {
            
        //   }
        
        dispatch(addProduct({...product, quantity, color, size}))
    }
    const saveCart = async () => {
        //update cart
        console.log(user._id);
        // try {    
        //     console.log('save');  
        //     const res = await userRequest.post('/carts/', 
        //     {
        //     "userId" : {user._id},
        //     "products": [
        //         {
        //             "productId": "62698fb6e5011c48fe15a425",
        //             "quantity": "3"
        //         }
        //     ], "amount": 75,
        //     "address" : "111118 Test Ave, Tester, Va. 22153"
        // })
        //    console.log(res);
        //     // setMyCart(res.data)
            
        //   } catch (error) {
        //     console.log(error);
        //   }
        // dispatch(addProduct({...product, quantity, color, size}))
    }


    const handleClearCart = () => {
        //update cart
        dispatch(clearCart())
    }
    useEffect(() => {
        const getProduct = async ()=>{
            try {
                const res = await publicRequest.get("/products/find/" +id)
                setProduct(res.data)
                // console.log(res.data.size);
                setSize(res.data.size[0])
                setColor(res.data.color[0])
            } catch (error) {
                
            }
        }
        
        getProduct()
        
      }, [id])
      
    //   console.log();
    //   console.log(product.color && product.color[1]);
    //   console.log('color ' + color);
    //   console.log(product.size && product.size[1]);
    //   console.log('size ' + size);
      
  return (


    <Container>
        <Navbar/>
       <Announcement/>
       <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Desc>
                {product.desc}
                </Desc>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Color:</FilterTitle>
                        {product.color?.map((c)=>(
                            <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                        ))}                      
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange= {(e) => setSize(e.target.value)} >
                            {product.size?.map((s)=>(
                                <FilterSizeOption key={s} >{s}</FilterSizeOption>
                            ))}
                            
                            
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>
                    <AmountContainer>
                        <Remove onClick={()=> handleQuantity('sub')}/>
                        <Amount>
                           {quantity}
                        </Amount>
                        <Add onClick={()=> handleQuantity('add')}/>
                    </AmountContainer>
                    
                    <Button onClick={handleAddToCart}>ADD TO CART</Button>
                    <Button onClick={handleClearCart}>CLEAR CART</Button>
                    <Button onClick={saveCart}>SAVE CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>        
        <Newletter/>
        <Footer/>
    </Container>
  )
}

export default Product