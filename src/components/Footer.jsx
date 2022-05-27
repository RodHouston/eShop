import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";


const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`


const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer= styled.div`
    display:flex;
`

const SocialIcon = styled.div`
width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`


const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`
const Title = styled.h3`
    
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
`
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;
const LogoText = styled.h1`
    font-weight: bold;
    cursor:pointer; 
    ${mobile({fontSize : '24px'})}
`
const Logo = styled.img`
    font-weight: bold;
    cursor:pointer; 
    width:50px;
    height:50px;
    ${mobile({fontSize : '24px'})}
`
const LogoDiv = styled.div`
    flex:1;
    text-align: center;
    display:flex;
    flex-direction:row;
    align-items: center;    
    ${mobile({flexDirection : 'column'})}
`


const Footer = () => {


// console.log('footer')
  return (
    <Container>
        <Left>
        <LogoDiv>
                <Logo src='../Photos/c&Slogo.png'></Logo>
                <LogoText onClick={() => {window.location.href="/"}}>Classy & Sassy</LogoText>
                
            </LogoDiv>
            <Desc>
                There are many variations of passages of Lorem Ipsum available, but
                the majority have suffered alteration in some form, by injected
                humour, or randomised words which don’t look even slightly believable.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
           <ListItem><a href='/'>Home</a></ListItem>
            <ListItem><a href='/cart'>Cart</a></ListItem>            
            <ListItem><a href='/productlist2/men'>Men Fashion</a></ListItem>
            <ListItem><a href='/productlist2/ladies'>Women Fashion</a></ListItem>
            <ListItem><a href='/productlist2/boys'>Boy's Fashion</a></ListItem>
            <ListItem><a href='/productlist2/girls'>Girl's Fashion</a></ListItem>
            <ListItem><a href='/productlist2/unisex'>Unisex Fashion</a></ListItem>
            <ListItem><a href='/productlist2/graphics'>Print Designs</a></ListItem>
            <ListItem><a href='/'>Accessories</a></ListItem>
            <ListItem><a href='/'>My Account</a></ListItem>
            <ListItem><a href='/'>Order Tracking</a></ListItem>        
            <ListItem><a href='/'>Wholesale</a></ListItem>        
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/> 1234 Fake Drive Fort Walton Beach Florida 32547
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight:"10px"}}/> +1 555-555-5555
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight:"10px"}} /> contact@fake.com
            </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>


    </Container>
  )
}

export default Footer