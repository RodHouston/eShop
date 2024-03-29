import styled from "styled-components"

import { FavoriteBorderOutlined, Search, ShoppingCartOutlined } from '@material-ui/icons'
import { Link } from "react-router-dom"
// import { addProduct } from "../redux/cartRedux"
// import { useDispatch } from "react-redux"

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
    height: 80vw;
    width:60vw;   
    display: flex;
    flex-direction:column;
    /* justify-content:center; */
    align-items:center;
    background-color:#f5fbfd;
    border: .2vw solid rgba(0,0,0,.2);
    position: relative;
    overflow: hidden;

    &:hover ${Info}{
        opacity:1;
    }
`
const Circle = styled.div`
    width:50vw;
    height: 50vw;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    height:75%;
    /* z-index:2; */
`

const Icon = styled.div`
    width: 7.5vw;
    height:7.5vw;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items:center;
    justify-content: center;
    margin: 2vw;
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
    
    /* background-color:rgba(0,0,0,.2); */
`
const Price = styled.p`
    font-size: 3.5vw;
    font-weight: bold;
    color: teal;
    margin-bottom: 1vw;
`
const SalePrice = styled.p`
    font-size: 3.5vw;
    font-weight: bold;
    color: red;
    margin-bottom: 1vw;
`
const RegPrice = styled.p`
    font-size: 3vw;
    text-decoration: line-through;
    margin-bottom: 1vw;
`
const Title = styled.p`
    font-size:3vw;
    font-weight: bold;
    color:rgba(0,0,0,.6);    
`
const Desc = styled.p`
    font-size:3vw;
    font-weight: bold;      
`

const Product = ({item}) => {

    // const dispatch = useDispatch()

    const handleAddToCart = async () => {      
        // dispatch(addProduct({...product, quantity, color, size}))
    }


  return (
      <>
     
    <Container>      
      
        <Image src={item.img}/>
        <Link to={ item.isDesign ? `/wholesale/${item._id}` :`/product/${item._id}`} state={item}>
        <Info>
            <Icon onClick={handleAddToCart}>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon>                
                <Search style ={{color:'grey', fontSize: 16}}/>                
            </Icon>                    
        </Info>
        </Link>
        <InfoDiv>
           {item.onSale ? <><SalePrice>${item.salePrice?.toFixed(2)} on sale</SalePrice> 
            <RegPrice>${item.price.toFixed(2)}</RegPrice> </> : <Price>${item.price?.toFixed(2)}</Price> }
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
        </InfoDiv>
    </Container>
    </>
  )
}

export default Product