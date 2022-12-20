import styled from "styled-components"
import { Link } from 'react-router-dom'
import { useRef, useState, useEffect } from "react"


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
    width:100vw;
`
const Ad = styled.div`
    display:flex;
    flex-direction:row;     
    align-items: center; 
    justify-content: center;
    /* background-color:red; */
    margin:0 auto;
`

const MapContainer = styled.div`     
    display:flex;
    height:30px;
    width:200px;   
    position:relative;
    align-items: center; 
    justify-content: center;
`
const Title = styled.div`   
    display:flex;
    opacity: ${(props) => props.visible};
    /* height:${(props) => props.slide};   */
    /* transform: translateX(${(props) => props.slide});   */
    transform: rotateX(${(props) => props.slide});
     position:absolute;
     align-items: center; 
    justify-content: center;     
    transition: all 1s ease-in-out; 
     /* position:absolute;
    overflow:hidden; 
    white-space:nowrap;
    background-color:black; */
`
const LinkContainer = styled.div`
display:flex;
`
const LinkToDesigns = styled.p`
    /* text-decoration:underline;  
    margin-left:5px;
    cursor: pointer;       */
    /* transform: translateX(${(props) => props.slide});
    transition: all 2.5s ease-in-out; */
    
    &:hover{
        transform: scale(1.1);        
    }
`

const Announcement2 = () => {

  const deals = [
    {
      ad: "Custom Prints Available!!! ",
      link: `/productlist2/graphics`
    },
    {
      ad: "BIG SALE on Boy's Clothing!!! ",
      link: `/productlist2/boys`
    },
    {
      ad: "New Leggings Available!!! ",
      link: `/productlist2/ladies`
    }
  ]

  const delay = 5000;
  const [counter, setCounter] = useState(0)
  const timeoutRef = useRef(null);
  const [ifSkip, setIfSkip] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState(deals)


  function resetTimeout() {
    // console.log('inside timeout');
    if (timeoutRef.current) {

      clearTimeout(timeoutRef.current);
    }
  }


  // useEffect(() => {
  //   resetTimeout();
  //   setIfSkip(false)
  //   if (counter <= 17) {
  //     setCounter(counter + 1)
  //     timeoutRef.current = setTimeout(
  //       () =>
  //         setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0),
  //       delay
  //     );
  //     // console.log(slideIndex);
  //     return () => {

  //       resetTimeout();
  //     };
  //   }
  // }, [slideIndex]);

//   <LinkContainer>
//   <Link to={sliderItems[slideIndex]}>
//     <LinkToDesigns>Click To See</LinkToDesigns>
//   </Link>
// </LinkContainer>

  return (
    <Container>
      <Ad>        
          {sliderItems.map((deal, idx) => (
            <div key={idx}>            
              <Title  visible={slideIndex === idx ? "1" : "0"} slide={slideIndex == idx ? "0" : "180deg"}>
              <Link to={sliderItems[idx].link}>
                {deal.ad}
                </Link>
              </Title>             
            </div>
          ))}         
      </Ad>
    </Container>
  )
}

export default Announcement2