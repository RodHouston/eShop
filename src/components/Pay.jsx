import axios from 'axios';
import React , { useState, useEffect  } from 'react'


import StripeCheckout from 'react-stripe-checkout';

const KEY = 'pk_test_51KtGN3AkMYFXtHLuKRHncfevzOCeOYYgb9YVjpontlkVns7Oyei80bmI7ZWNKGzs6jYycEmLW1ffMCiMSaXxdje200B3fxA6Ch'

const Pay = () => {
    
    const [stripeToken, setStripeToken] = useState(null);

  

    const onToken = (token) =>{
        setStripeToken(token)
        console.log(token);
    }
    useEffect(() => {         
        const makeRequest = async () =>{
            try {                
                const res= await axios.post(
                    "http://localhost:3000/api/checkout/payment",
                {
                    tokenId: stripeToken.id, 
                    amount: 2000,                
                }             
             )
             console.log(res.data); 
             
            } catch (err) {
                console.log("this is the error " + err);
            }
        }
        stripeToken && makeRequest()
    },[stripeToken])


  return (
    <div
        style={{
            height: "100vh",
            display: "flex",
            alignItems: 'center',
            justifyContent: "center"
        }}
    >
        {stripeToken ? (<span>Proccessing. Please wait...</span>) : (
        <StripeCheckout 
            name="SAssy" 
            image="../../Photos/logo.png"
            billingAddress
            shippingAddress
            description=' Your total is $20'
            amount={2000}
            token={onToken}
            stripeKey= {KEY}
            >
            <button style={
                {
                    color: 'white',
                    backgroundColor: 'black'
                
                }}>
                Pay
            </button>
        </StripeCheckout>
        )}
    </div>
  )
}

export default Pay