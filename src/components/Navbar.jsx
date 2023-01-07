import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation , useNavigate} from 'react-router-dom';
import { logout } from '../redux/apiCalls';
import { clearCart } from '../redux/cartRedux';
import { userRequest } from '../RequestMethods';
import { clearWish } from '../redux/wishRedux';
import SideMenu from './SideMenu';
import { categories } from '../data';
import Announcement2 from './Announcement2';
import DropdownMenu from './DropdownMenu';
import { openDropDownMenu } from '../redux/sideMenuRedux';
import NavMobile from './NavMobile';



const Container = styled.div`   
    position: relative;
    top:0;
    width:100vw;
    /* height: 60px; */
    /* z-index:2; */
    background-color: white;
    /* ${mobile({ height: '125px' })} */
`
const Wrapper = styled.div`
    padding: 5px 20px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* max-height:50px; */
    ${mobile({ padding: '10px 0', flexDirection: 'column'})}
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    
`
const SearchContainer = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`
const SearchDiv = styled.div`
    position: absolute;    
    height: 180px;
    width: 87%;
    padding: 10px;
    margin-left: 25px;
    top: 30px;
    left:0;
    background-color: rgba(0,0,0,.8);
  
    scrollbar-width: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
      }
`

const SearchResultsImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 10px;
`
const SearchResults = styled.p`
    color: white;
`
const SearchPair = styled.div`
    display:flex;
    flex-grow:0;
    flex-direction:column;
    /* position: relative; */
`
const Input = styled.input`
    border: none;
    // ${mobile({ width: "50px" })}
`
const LogoText = styled.h1`
    font-weight: bold;
    cursor:pointer; 
    ${mobile({ fontSize: '24px' })}
`
const Logo = styled.img`
    font-weight: bold;
    cursor:pointer; 
    width:50px;
    height:50px;
    ${mobile({ fontSize: '24px' })}
`
const Left = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    ${mobile({ display: 'none' })}
`
const Center = styled.div`
    flex:1;
    text-align: center;
    display:flex;
    flex-direction:row;
    align-items: center;    
    ${mobile({ flexDirection: 'column' })}
`
const Right = styled.div`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor:pointer;
    margin-left:25px;
    ${mobile({ fontSize: "12px", margin: '10px 20px' })}
`

const CatNavDiv = styled.div`
    height: 25px;
    /* background-color:red; */
    ${mobile({ display: 'none' })}
`
const CategoryLinks = styled.li`
    display: inline;    
    margin-left: 50px;
    margin-right: 50px;
    padding: 5px; 
    border-top-left-radius:5px;    
    border-top-right-radius:5px;    
    color:rgba(0,0,0,.5);
    transition:all ease-in-out .5s;
    background-color:${props => props.bg};
    cursor: pointer;
    &:hover{
        ${props => props.hov}
        transform: scale(1.1);
        color:rgba(0,0,0,.8);
    }
`
const NavUL = styled.ul`
    display:flex;
    justify-content:center;
    text-transform: capitalize;
    font-weight:520;
`
const SearchPairMobile = styled.div`
    display:flex;
    flex-grow:0;
    flex-direction:column;
    width:100%;
    padding: 10px; 
    /* background-color:red; */
    justify-content:center;
    align-items:center;
    /* position: relative; */
`
const SearchContainerMobile = styled.div`
    border: 1px solid lightgrey;
    box-shadow: 2px 2px 10px rgba(0,0,0,.2);
    border-radius: 5px;
    display: flex;
    width: 80vw;
    position: relative;
    justify-content:center;
    align-items: center; 
    padding: 5px;
`
const SearchDivMobile = styled.div`
    position: absolute;    
    height: 100vh;
    width: 100vw;
    padding: 10px;    
    top: 30px;
    left:0;
    background-color: rgba(0,0,0,.8);
    z-index:11;
  
    scrollbar-width: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
      }
`

const SearchResultsImageMobile = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 10px;
`
const SearchResultsMobile = styled.p`
    color: white;
`


const InputMobile = styled.input`
    border: none;
    // ${mobile({ width: "80vw" })}
`
const Navbar = () => {


    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const location = useLocation()


    //   const {isFetching, error} = useSelector((state) => state.user)

    const user = useSelector((state) => state.user.currentUser)
    const tempUser = useSelector((state) => state.user.tempUser)
    const toggle = useSelector((state) => state.menu.dropDownMenu)

    const [filteredProducts, setFilteredProducts] = useState([])
    const [wordSearch, setWordSearch] = useState('')

    const [cata, setCata] = useState([])
    const navigate = useNavigate()

    // const [toggle, setToggle] = useState(false)

    // console.log(location);

    const setOpenDropDown = (cat) => {

        if (cat.cat !== cata.cat && toggle) {
            setCata(cat)
        } else if (cat.cat !== cata.cat && !toggle) {
            setCata(cat)
            dispatch(openDropDownMenu(!toggle))
        } else if (cat.cat === cata.cat && !toggle) {
            dispatch(openDropDownMenu(toggle))
        } else if (cat.cat === cata.cat) {
            setCata('')
            dispatch(openDropDownMenu(!toggle))
        }
    }


    const handleChange = async (e) => {
        const searchword = e.target.value
        //     const filtPro = products.filter((pro, index) => {
        //         return (pro.title.toLowerCase().includes(searchword.toLowerCase()) || 
        //                 pro.desc.toLowerCase().includes(searchword.toLowerCase()) || 
        //                 pro.categories.includes(searchword.toLowerCase().trim()) || 
        //                 pro.color.includes(searchword.toLowerCase().trim()) 
        //   )  })     
        if (searchword === '') {
            setWordSearch('')
            //   setFilteredProducts([])
        } else {
            // setFilteredProducts(filtPro)
            setWordSearch(searchword)
        }
    }

    const handleClear = () => {
        setWordSearch('')
        setFilteredProducts([])

    }

    // console.log(searchword);

    const handleLogout = async (e) => {
        e.preventDefault()
        let isWorking = false
        try {
            isWorking = true;
            console.log("logginout");
            await dispatch(clearCart())
            await dispatch(clearWish())
            // dispatch(syncCart(myCart))
            await logout(dispatch)
            isWorking = false
        } catch (error) {

        }
        if(!isWorking){
        window.location.href = "/"
        }
    }


    //   useEffect(() => {
    //     const getMyCart = async () => {       
    //       try {      
    //         //   console.log(user);
    //         const res = await userRequest.get('/carts/find/Cart/'+ user._id)
    //         console.log(res);
    //         if (res.data === null) { setMyCart(cart) 
    //           }  else {setMyCart(res.data) }         
    //         //   console.log('first')
    //       } catch (error) {        
    //       }        
    //     }
    //     getMyCart()
    //     // dispatch(syncCart(myCart))

    //   }, [ quantity])

    //   useEffect(() => {
    //     let isSubscribed = true
    //     const getProduct = async () => {
    //       try {       
    //         const res = await userRequest.get( "products")
    //         if (isSubscribed) {
    //         setProducts(res.data);  
    //         }   
    //       } catch (err) {        
    //       }
    //     }     
    //     getProduct()
    //     return () => isSubscribed = false
    //    }, [])
    //   console.log(user);




    useEffect(() => {
        const getProduct = async () => {
            if (wordSearch === '') {
                setFilteredProducts([]);
            } else {
                try {
                    const res = await userRequest.get(wordSearch ? `products?q=${wordSearch}` : "products")
                    setFilteredProducts(res.data);
                } catch (err) {
                }
            }
        }
        if (toggle === false) {
            setCata('')
        }
        //  console.log(categories);
        // console.log('in nav');
        getProduct()
    }, [wordSearch, toggle, cart])


    //    console.log('in navbar');
    // <SideMenu />
    return (
        <>
            <Container>
                <Wrapper>
                    <Left>                       
                        <Language>
                            EN
                        </Language>
                        <SearchPair>
                            <SearchContainer>
                                <Input placeholder='SEARCH' value={wordSearch} onChange={handleChange} />
                                {!wordSearch ? <Search style={{ color: 'grey', fontSize: 16 }} /> :
                                    <CloseIcon style={{ color: 'grey', fontSize: 16, cursor: 'pointer' }} onClick={handleClear} />}
                            </SearchContainer>
                            {filteredProducts.length > 0 && (
                                <SearchDiv>
                                    {filteredProducts.slice(0, 5).map((pro, index) => (
                                        <div key={index} onClick={() => { window.location.href = `/product/${pro._id}` }} >
                                            <SearchResultsImage src={pro.img} />
                                            <SearchResults key={index + pro.title}>{pro.title}</SearchResults>
                                        </div>
                                    ))}
                                </SearchDiv>)}
                        </SearchPair>

                    </Left>
                    <Center onClick={() => { window.location.href = "/" }}>
                        <Logo src='../Photos/c&Slogo.png'></Logo>
                        <LogoText >Classy & Sassy</LogoText>

                    </Center>
                    <Right>
                        {!tempUser ? <>
                            <p>Welcome {user.username}</p>

                            {user.isWholesale ? <>
                                <Link to="/wholesalelist">
                                    <MenuItem>
                                        Wholesale
                                    </MenuItem>
                                </Link>
                            </> :
                                null
                            }
                        </> : <>
                            <Link to="/register">
                                <MenuItem>
                                    Register
                                </MenuItem>
                            </Link>
                            <Link to="/login">
                                <MenuItem>
                                    Login
                                </MenuItem>
                            </Link>
                        </>
                        }
                        {!tempUser ? <>
                            <MenuItem onClick={handleLogout}>
                                LogOut
                            </MenuItem>
                        </>
                            : null}
                        <MenuItem onClick={() => { window.location.href = "/cart" }}>
                            <Badge badgeContent={cart && cart.products.length} overlap="rectangular" color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>

                    </Right>
                    <SearchPairMobile>
                            <SearchContainerMobile>
                                <InputMobile placeholder='SEARCH' value={wordSearch} onChange={handleChange} />
                                {!wordSearch ? <Search style={{ color: 'grey', fontSize: 16 }} /> :
                                    <CloseIcon style={{ color: 'grey', fontSize: 16, cursor: 'pointer' }} onClick={handleClear} />}
                            </SearchContainerMobile>
                            {filteredProducts.length > 0 && (
                                <SearchDivMobile>
                                    {filteredProducts.slice(0, 5).map((pro, index) => (
                                        <div key={index} onClick={() => { window.location.href = `/product/${pro._id}` }} >
                                            <SearchResultsImageMobile src={pro.img} />
                                            <SearchResultsMobile key={index + pro.title}>{pro.title}</SearchResultsMobile>
                                        </div>
                                    ))}
                                </SearchDivMobile>)}
                        </SearchPairMobile>
                </Wrapper>
                <CatNavDiv>
                    <NavUL>
                        {categories.map((cat, index) => (
                            
                            <CategoryLinks key={index} 
                            bg={cat.cat === cata.cat && 'teal'} 
                            onClick={(e) => { setOpenDropDown(cat) }}                           
                            >                                
                                {cat.cat}        
                            </CategoryLinks>
                           
                        ))}
                    </NavUL>
                    <DropdownMenu cat={cata} />
                </CatNavDiv>       
            </Container>
        </>
    )
}

export default Navbar