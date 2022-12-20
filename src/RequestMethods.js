import axios from "axios";


let BASE_URL = ""

if(process.env.NODE_ENV ==='development'){
    BASE_URL = "http://localhost:3008/api/" 
    // BASE_URL = "http://localhost:5001/estoreapi-main/us-central1/app/api" 
    // BASE_URL = "https://eshopapi.onrender.com/api"
}else(
    // BASE_URL = "https://classandsassy.herokuapp.com/api/"
    // BASE_URL = "http://localhost:5001/estoreapi-main/us-central1/app/api"
    BASE_URL = "https://eshopapi.onrender.com/api"
)

// const BASE_URL = "https://classyandsassyapi.netlify.app/.netlify/functions/api/"
// const BASE_URL = "https://classandsassy.herokuapp.com/api/"

let TOKEN =  JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user|| "{}")?.currentUser?.accessToken

//  try{
//      const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken ;
// // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user));
// // TOKEN === null ? TOKEN = "" : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken 
//  }catch(err){
//     const TOKEN = ''
//  }

    if (
     TOKEN
    ) {
       TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken;
    } else {  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user|| "{}")?.currentUser?.accessToken }
  
    // console.log(TOKEN);
export const publicRequest = axios.create({
    baseURL : BASE_URL,
})
export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers:{token: `Bearer ${TOKEN}`}
})