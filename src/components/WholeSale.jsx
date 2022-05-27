import styled from "styled-components"
import {Search} from '@material-ui/icons'
import { Link } from "react-router-dom"

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
    box-sizing:border-box;
    flex:1;
    margin:5px;
    min-width:280px;
    height: 350px;
    display: flex;
    flex-direction:column;
    /* justify-content:center; */
    align-items:center;
    background-color:#f5fbfd;
    border: 2px solid rgba(0,0,0,.2);
    position: relative;
    overflow: hidden;

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
const InfoDiv = styled.div`
    display: flex;
    position:relative;
    flex-direction:column;
    box-sizing:border-box;
    padding: 5px;
    width: 100%;
    height: 50%;
    
    /* background-color:rgba(0,0,0,.2); */
`
const Price = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: red;
    margin-bottom: 5px;
`
const RegPrice = styled.p`
    font-size: 14px;
    text-decoration: line-through;
    margin-bottom: 5px;
`
const Title = styled.p`
    font-size:12px;
    font-weight: bold;
    color:rgba(0,0,0,.6);    
`
const Desc = styled.p`
    font-size:14px;
    font-weight: bold;      
`
const WholeSale = ({item}) => {

   return (
    <Container>
        <Circle/>        
        <Image src={item.img}/>        
        <Link to={`/wholesale/${item._id}`}>
        <Info>            
            <Icon>                
                <Search style ={{color:'grey', fontSize: 16}}/>                
            </Icon>                    
        </Info>
        </Link>
        <InfoDiv>
           <Price>${item.price.toFixed(2)}</Price>  
            <RegPrice>${item.price.toFixed(2)}</RegPrice>
            <Title>{item.title}</Title>
            <Desc>{item.desc}</Desc>
        </InfoDiv>
       
    </Container>
  )
}

export default WholeSale