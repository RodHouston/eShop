import axios from "axios";

const BASE_URL = "http://localhost:3000/api/"

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
  

export const publicRequest = axios.create({
    baseURL : BASE_URL,
})
export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers:{token: `Bearer ${TOKEN}`}
})