import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"


const Container = styled.div`
   height:7.5vw;
    /* background-color: teal; */
    display:flex;
    color: white;
    align-items: center; 
    justify-content: start;    
    overflow:hidden;  
    /* position: relative; */
    width:100vw;
    margin-bottom:3vw;
`
const ContainerExtended = styled.div` 
    display:flex; 
    overflow:scroll;
`
const CatDiv = styled.div` 
    display:flex;
    justify-content:center;
    align-items:center;
    width:20vw;
    height:7.5vw;
    background-color:${props => props.mainColor};
    margin:0 2vw;
    border-radius: 10vw;
    color: ${props => props.accentColor};
    `

const CatTitle = styled.p` 
    font-size: 2vw;
    font-weight: bold;
`
const StyledLink = styled(Link)`  
  text-decoration: none;
  margin: 1rem;
  position: relative;

  
`;

const NavBarCategories = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const categories = useSelector((state) => state.global.categories)
  const [activeCat, setActivCat] = useState('')
  const mainColor = useSelector((state) => state.theme.mainColor)
  const mainSecondaryColor = useSelector((state) => state.theme.mainSecondaryColor)
  const mainAccentColor = useSelector((state) => state.theme.mainAccentColor)

  useEffect(() => {
    const getActive = () =>{
      console.log(location);
      setActivCat(location?.pathname?.split('/')[2]?.replaceAll('%20', ' '))
      
    }
    getActive()
  }, [location])
  

  

  const cat = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  return (
    <Container>
      <ContainerExtended>
        {categories?.map((c, idx) => (
          <StyledLink
            key={idx} to={`/productlist2/${c.cat}`} state={c.cat}>
            <CatDiv mainColor={activeCat === c.cat ? mainAccentColor : mainColor}
              accentColor={activeCat === c.cat ? mainColor : mainAccentColor}
              onClick={(e) => setActivCat(c.cat)}>
              <CatTitle>{c.title}</CatTitle>
            </CatDiv>
          </StyledLink>
        ))}
      </ContainerExtended>
    </Container>
  )
}

export default NavBarCategories