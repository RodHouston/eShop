import { useSelector } from "react-redux"
import styled from "styled-components"


const Container = styled.div`
    height:7vw;
    background-color: ${props =>props.color };
    display:flex;
    color: white;
    align-items: center; 
    justify-content: center;
    font-size: 3vw;
    font-weight: bold;
    width:100vw;
`


const Announcement = () => {
  const mainColor = useSelector((state) => state.theme.mainColor)
  return (
    <Container color={mainColor}>
        Super Deal! Free Shipping on Orders Over $50     
    </Container>
  )
}

export default Announcement