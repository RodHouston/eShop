import styled from "styled-components"
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    position:sticky;
    top:0;
    height: 15px;
    background-color: teal;
    display:flex;
    color: white;
    align-items: center; 
    justify-content: left;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 4px solid white;
    box-shadow: 0 5px 8px rgba(0,0,0,.3);
    
    z-index:10;
    width:100vw;
`
const LinkToDesigns= styled.span`
  text-decoration:underline;
  margin-left:5px;
  cursor: pointer;
    &:hover{
        transform: scale(1.1);        
    }
`
const NavMobile = () => {
const location = useLocation()

  let navigate = useNavigate();
  // console.log(navigate);
  return (
    <Container>    
       {location.pathname != "/" && 
        <LinkToDesigns  onClick={() => navigate(-1)}>GO BACK</LinkToDesigns>   
  }       
    </Container>
  )
}

export default NavMobile