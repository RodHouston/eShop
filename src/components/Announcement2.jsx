import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from "react"
import { useSelector } from "react-redux"


const Container = styled.div`
    display:flex;
    height: 7vw;
    background-color: ${props => props.mainColor};
    color: ${props => props.secColor};
    align-items: center; 
    justify-content: center;
    font-size: 3vw;
    font-weight: bold;
    border-bottom: 1vw solid white;
    box-shadow: 0 2vw 2vw rgba(0,0,0,.3);    
    width:100vw;
    overflow:hidden;
`
const Ad = styled.div`
    display:flex;
    width:100%;
    height:100%;
    flex-direction:row;     
    align-items: center; 
    justify-content: center;
    /* background-color:red; */
    margin:0 auto;
`

const Title = styled.div`    
    display:flex;
    flex-direction:row;  
    opacity: ${(props) => props.visible};  
    transform: rotateX(${(props) => props.slide});
     position:absolute;
     align-items: center; 
    justify-content: center;     
    transition: all 1s ease-in-out;     
`
const LinkContainer = styled.div`
    display: flex;
    transform: rotateX(${(props) => props.rotate});
    transition: all 1s ease-in-out; 
    flex-direction:row;
    width:100%;
    height:7vw;
    justify-content:center;
    align-items:center;
    position:absolute;
    /* background-color:${(props) => props.color}; */
    margin: 0 auto;
    overflow:hidden;
`
const LinkToDesigns = styled.p`
    text-decoration:underline;  
    margin-left:1vw;
    cursor: pointer;       
    transform: translateX(${(props) => props.slide});
    transition: all 2.5s ease-in-out;
    
    &:hover{
        transform: scale(1.1);        
    }
`

const Announcement2 = () => {

  const deals = [
    {
      ad: "Custom Prints Available!!! ",
      link: `/productlist2/graphics`,
      color:'IndianRed'
    },
    {
      ad: "BIG SALE on Boy's Clothing!!! ",
      link: `/productlist2/boys`,
      color:'teal'
    },
    {
      ad: "New Leggings Available!!! ",
      link: `/productlist2/ladies`,
      color:'Coral'
    }
  ]

  const delay = 5000;
  const [counter, setCounter] = useState(0)
  const timeoutRef = useRef(null);
  const [ifSkip, setIfSkip] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState(deals)
  const mainColor = useSelector((state) => state.theme.mainColor)
  const mainSecondaryColor = useSelector((state) => state.theme.mainSecondaryColor)
  const mainAccentColor = useSelector((state) => state.theme.mainAccentColor)

  function resetTimeout() {
    // console.log('inside timeout');
    if (timeoutRef.current) {

      clearTimeout(timeoutRef.current);
    }
  }


  useEffect(() => {
    resetTimeout();
    setIfSkip(false)
    if (counter <= 50) {
      setCounter(counter + 1)
      timeoutRef.current = setTimeout(
        () =>
          setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0),
        delay
      );
      // console.log(slideIndex);
      return () => {

        resetTimeout();
      };
    }
  }, [slideIndex]);

  //   <LinkContainer>
  //   <Link to={sliderItems[slideIndex]}>
  //     <LinkToDesigns>Click To See</LinkToDesigns>
  //   </Link>
  // </LinkContainer>

  return (
    <Container mainColor={mainColor} secColor={mainSecondaryColor}>
      <Ad>
        {sliderItems?.map((deal, idx) => (
          <LinkContainer rotate={slideIndex === idx ? "0" : "90deg"} key={idx} color={deal.color}>
            <Title visible={slideIndex === idx ? "1" : "0"} slide={slideIndex == idx ? "0" : "180deg"}>
              <Link to={sliderItems[idx].link}>
                {deal.ad}                
              </Link>
              <Link to={sliderItems[idx].link}>                
                <LinkToDesigns slide={slideIndex == idx ? "0" : "42vw"}>Click To See</LinkToDesigns>
              </Link>
            </Title>
            
          </LinkContainer>
        ))}
        </Ad>
        
      
    </Container>
  )
}

export default Announcement2