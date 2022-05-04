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
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items:center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s ease;
   
`

const Container = styled.div`
    flex:1;
    margin:5px;
    min-width:280px;
    height: 350px;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color:#f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity:1;
    }
`
const Circle = styled.div`
    width:200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`
const Image = styled.img`
    height:75%;
    z-index:2;
`

const Icon = styled.div`
    width: 40px;
    height:40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items:center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover{
        background-color: rgb(202, 202, 202) ;
        transform: scale(1.1);
    }
`

const Product = ({item}) => {

    // const dispatch = useDispatch()

    const handleAddToCart = async () => {      
        // dispatch(addProduct({...product, quantity, color, size}))
    }


  return (
    <Container>
        <Circle/>
        <Image src={item.img}/>
        <Info>
            <Icon onClick={handleAddToCart}>
                <ShoppingCartOutlined/>
            </Icon>
            <Icon>
                <Link to={`/product/${item._id}`}>
                <Search style ={{color:'grey', fontSize: 16}}/>
                </Link>
            </Icon>
            <Icon>
                <FavoriteBorderOutlined/>
            </Icon>            
        </Info>
    </Container>
  )
}

export default Product