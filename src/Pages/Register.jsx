import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { useEffect, useState } from "react";


import { useDispatch } from "react-redux";
import axios from 'axios';
import { publicRequest, userRequest } from '../RequestMethods';




const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.input`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;    
`;

const Button2 = styled.input`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer; 
    opacity: 80%;   
`;

const Register = () => {

    const userModel = {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        city: "",
        state: "",
        zipcode: "",
        address: "",
        password: "",
        cart: "",
        orders: [],
        isAdmin: false,
        isWholesale: false,
        img: '../photos/proPic.jpeg'
    }

    const [user, setUser] = useState(userModel)
    const [isWorking, setIsWorking] = useState(false)

    const handleFields = (e)  => {        
        console.log(e.name);
        const placeholder = e.name
        const val = e.value
        setUser({
            ...user,
            [placeholder]: val
        })       
       
    }

    const handleConfirmPass =  () => {

    }
    const createUser = async (e) => {
        e.preventDefault()  
        console.log(user);
        let res = ''
        try{
            if(!isWorking){
                setIsWorking(true)
                res = await publicRequest.post("users/createUser", user)
            }           
        }catch(err){
            console.log(err);
        }
        console.log("done working");
        console.log(res);
        setIsWorking(false)
    }

    useEffect(() => {

    },[isWorking])

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" name= "username" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="email" name= "email"  onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="first name" name= "firstname"  onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="last name" name= "lastname" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="city" name= "city" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="state" name= "state" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="zipcode" name= "zipcode" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="password" name= "password" onChange={(e) => handleFields(e.target)}/>
                    <Input placeholder="confirm password" name= "username" onChange={(e) => handleConfirmPass(e.target)}/>
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    {isWorking ? 
                    <Button2 type="submit" value="Create" disabled onClick={createUser}></Button2>   
                    : 
                    <Button type="submit" value="Create"  onClick={createUser}></Button>   }
                                     
                </Form>
            </Wrapper>

        </Container>
    )
}

export default Register