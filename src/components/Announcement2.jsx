import styled from "styled-components"
import { Link } from 'react-router-dom'

const Container = styled.div`
    height: 30px;
    background-color: teal;
    display:flex;
    color: white;
    align-items: center; 
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 4px solid white;
    box-shadow: 0 5px 8px rgba(0,0,0,.3);
`
const LinkToDesigns= styled.span`
  text-decoration:underline;
  margin-left:5px;
  cursor: pointer;
    &:hover{
        transform: scale(1.1);        
    }
`
const Announcement2 = () => {
  return (
    <Container>
      
      Custom Prints Available!!! 
      <Link to={`/productlist2/graphics`} state={"graphics"}>
        <LinkToDesigns >Click To See</LinkToDesigns>   
      </Link>
       
    </Container>
  )
}

export default Announcement2