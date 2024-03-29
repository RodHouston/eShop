
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollToTop = () => {

  const [toTop, setToTop] = useState(false)

  useEffect(() => {
      window.addEventListener('scroll',  () => {
          if(window.scrollY > 100){
              setToTop(true)
          }else{
              setToTop(false)
          }      
        })
   
  }, []);




  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const scrollUp = () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      })
  }

 return(
        <>
        {toTop && ( 
            <button style = {{
                display:"flex",
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                bottom: '8vw',
                right: '8vw',
                height:'8vw',
                width:'8vw',
                fontSize:'8vw',
                backgroundColor: 'teal',
                zIndex: '3',
                borderRadius: '50%',
                opacity: '.8'
            }}
        onClick={scrollUp}><ArrowCircleUpIcon sx={{color: 'white'}}></ArrowCircleUpIcon></button>
        )}
        
        </>
  
 )
  }
  export default ScrollToTop
