import {  Send } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";

const Container = styled.div`
 
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top:7vw;
  padding-bottom:7vw;
`

const Title = styled.h1`
    font-size:15vw;
    margin-bottom: 4vw;
`

const Desc = styled.div`
    font-size: 6vw;
    font-weight: 300;
    margin-bottom: 6vw;
    ${mobile({ textAlign: "center" })}
`


const InputContainer = styled.div`
    width: 50%;
    height: 12vw;
    background-color:white;
    display: flex;
    justify-content: space-between;
    border: .1vw solid lightgray;
    ${mobile({ width: "80%" })}
    font-size: 3vw;
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 4vw;
    font-size: 3vw;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
`




const Newletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates for your favorite products</Desc>
        <InputContainer>
            <Input placeholder='Your email'/>
            <Button>
                <Send/>
            </Button>
                
        </InputContainer>

    </Container>
  )
}

export default Newletter