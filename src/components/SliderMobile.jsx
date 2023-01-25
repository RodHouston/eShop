import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import styled, { keyframes } from 'styled-components'
// import { sliderItems } from '../data'
import { userRequest } from '../RequestMethods';
import { mobile } from "../responsive";
import FadeIn from '../utilities/FadeIn';
import CategoriesMobile from './CategoriesMobile';


const Container = styled.div`
    width: 100vw;
    height: 60vh;
    display: none;
    background-color: coral;
    position: relative;
    overflow:hidden;
    ${mobile({ display: "block" })};      
    /* z-index:1; */
`
const ContainerEffect = styled.div`
    width: 100vw;
    height: 60vh;
    display: none;   
    position: absolute;    
    overflow:hidden;
    
    ${mobile({ display: "block" })};  
   z-index:1;
`
const Arrow = styled.div`
    width: 8vw;
    height: 8vw;
    background-color: whitesmoke;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content:center;
    position: absolute;
    top:0;
    bottom: 0; 
    margin: auto;
    left: ${props => props.direction === 'left' && '2vw'};
    right: ${props => props.direction === 'right' && '2vw'};
    cursor: pointer;
    opacity: .1;
    z-index:1;    
`
const Wrapper = styled.div`
    height: 100%;
    width:100vw;
    display:inline-block;
    /* transform: translateX(${(props) => props.slideIndex * -100}vw); */
    transition: all 2500ms ease-in-out;  
    position: relative;
`
const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};
    transition: all ${props => props.skip} ease-in-out;
    opacity: ${(props) => props.visible};
    position: absolute;
`
const ImgContainer = styled.div`
    height: 100%;
    max-width: 100vw;
    flex:1;
    display: flex;
    justify-content: center;
    
`
const Image = styled.img`
    height: 80%;   
    position: relative; 
    /* transform: scale(${(props) => props.scale}); */
    transition: all 1s ease-in-out;
`
const InfoContainer = styled.div`
    padding: 8vw;
    flex:1;    
    position: absolute;  
    opacity:.5;
`
const Title = styled.h1`
    font-size: 14vw;
    position: absolute;      
    transform: translateX(${(props) => props.slide});
    transition: all 2s ease-in-out;
`
const Desc = styled.p`
    margin: 8vw 0vw;
    font-size:4vw;
    font-weight: bold;
    letter-spacing: .8vw;
    color:white;
    /* z-index:2;   */
    transform: translateX(${(props) => props.slide});
    transition: all 2.5s ease-in-out;
`
const Button = styled.button`
    padding: 2vw;
    font-size: 4vw;
    background-color: transparent;
    cursor: pointer;
`
const DotDiv = styled.div`
    display: flex;
    align-items:center;
    justify-content:center;
  /* background-color: red; */
    position:absolute;
    top: 5vh;
    left:0;
    right:0;
    padding-bottom:2vw;
    z-index:1;
    `

const Dots = styled.div`
  height: 2vw;
  width: 2vw;
  border-radius: 50%;
  cursor: pointer;
  margin: 2vw 1.5vw 0vw;  
  background-color: ${props => props.bgColor};
  
  `


const SliderMobile = (sliderItemsIn) => {

    const delay = 4000;
    const [counter, setCounter] = useState(0)
    const [ifSkip, setIfSkip] = useState(false)
    const [visible, setVisible] = useState(false);
    const [touchEnd, setTouchEnd] = useState(null)
    const [slideIndex, setSlideIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null)
    const [sliderItems, setSliderItems] = useState(sliderItemsIn.sliderItemsIn)

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50

    const onTouchStart = (e) => {
        setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)

    const handleClick = async (direction) => {
        setIfSkip(true)
        if (direction === 'left') {

            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
            resetTimeout();
        } else {

            setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0)
            resetTimeout();
        }
    }
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance
        if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right')
        setIfSkip(true)
         isRightSwipe && setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2) 
        isLeftSwipe && setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0) 
        resetTimeout();
    }

    const APItest = async () => {
        try {
            const test = await userRequest.get('/')
            console.log(test);
        } catch (err) {
            console.log(err);
        }
    }
    /////////////////////ANIMATE SLIDER //////////////////////////////////////  
    function toggleVisibility() {
        console.log("in toggle");
        setVisible((state) => !state);
    }
    const timeoutRef = useRef(null);

    function resetTimeout() {
        // console.log('inside timeout');
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        setIfSkip(false)
        if (counter <= 17) {
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
    ///////////////////////////////////////////////////////////

    return (
        <Container >
            <ContainerEffect onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}>
            </ContainerEffect>
            <Arrow direction='left' onClick={() => handleClick('left')} visible={visible} >
                <ArrowLeftOutlined>
                </ArrowLeftOutlined>
            </Arrow>
            <DotDiv className="slideshowDots">
                {sliderItems?.map((_, idx) => (
                    <Dots
                        key={idx}
                        bgColor={slideIndex === idx ? "teal" : "#c4c4c4"}
                        onClick={() => {
                            setSlideIndex(idx);
                        }}
                    ></Dots>
                ))}
            </DotDiv>
            {<Wrapper slideIndex={slideIndex}  >
                {sliderItems?.map((item, idx) => (
                    <Slide bg={item.bg} key={item.id} skip={ifSkip ? '500ms' : '3000ms'} visible={slideIndex === idx ? "1" : "0"}>
                        <ImgContainer>
                            <InfoContainer>
                                <Title slide={slideIndex == idx ? "0" : "200vw"}>
                                    {item.title}
                                </Title >
                                <Desc slide={slideIndex == idx ? "0" : "-200vw"}>
                                    {item.desc}
                                </Desc>
                            </InfoContainer>
                            <Image src={item.img} scale={slideIndex === idx ? "1" : "0"}/>
                        </ImgContainer>
                    </Slide>
                ))}
            </Wrapper>}
            <Arrow direction='right' onClick={() => handleClick('right')} visible={visible}>
                <ArrowRightOutlined>
                </ArrowRightOutlined>
            </Arrow>
            <CategoriesMobile />

        </Container>
    )
}

export default SliderMobile