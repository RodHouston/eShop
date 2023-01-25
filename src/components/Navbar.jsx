import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import NavBarCategories from './NavBarCategories';
import { height } from '@mui/system';
import { setIsDarkTheme, setMainAccentColor, setMainColor, setMainSecondaryColor } from '../redux/themeRedux';



const Container = styled.div`   
    position: relative;
    top:0;
    width:100vw; 
    background-color: white; 
    font-size: 4.5vw;
`
const Wrapper = styled.div`
    padding: 0 6vw;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    ${mobile({ padding: '1vw 0', flexDirection: 'column' })}
`
const Language = styled.span`
    font-size: 3vw;
    cursor: pointer;
    
`
const SearchContainer = styled.div`
    border: .1vw solid lightgrey;
    display: flex;
    position: relative;
    align-items: center;
    margin-left: 6.5vw;
    padding: 1vw;
`
const SearchDiv = styled.div`
    position: absolute;    
    height: 42vw;
    width: 87%;
    padding: 2vw;
    margin-left: 6vw;
    top: 7vw;
    left:0;
    background-color: rgba(0,0,0,.8); 
    
`

const SearchResultsImage = styled.img`
    height: 8vw;
    width: 8vw;
    border-radius: 2vw;
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
    // ${mobile({ width: "8vw" })}
`
const LogoText = styled.h1`
    font-weight: bold;
    cursor:pointer; 
    ${mobile({ fontSize: '6.5vw' })}
`
const Logo = styled.div`    
    cursor:pointer; 
    display:flex;
    justify-content:center;
    align-items:center;
    width:8vw;
    height:8vw;
    background-color:red;
    border-radius:50%;
    background-image: url(${props => props.src});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: .5vw .5vw 1vw rgba(0,0,0,.2);
    ${mobile(
    {
        marginRight: "3vw"
    })}
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
const WelcomeText = styled.div`   

`
const WelcomeUserName = styled.span` 
    color: ${props => props.color};
`

const MenuItem = styled.div`
    /* font-size: 4vw; */
    cursor:pointer;
    margin-left:6.5vw;
    ${mobile({ margin: '2vw 4vw' })}
`

const CatNavDiv = styled.div`
    height: 12vw;
    /* background-color:red; */
    bottom:0;
    z-index:12;
    ${mobile({ display: 'none' })}
`
const CategoryLinks = styled.li`
    display: inline;    
    margin-left: 8vw;
    margin-right: 8vw;
    padding: 1vw; 
    border-top-left-radius:1vw;    
    border-top-right-radius:1vw;    
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
    flex-direction:row;
    width:100%;
    padding: 2vw;   
    justify-content:center;
    align-items:center;
    margin-bottom:3vw;
`
const SearchContainerMobile = styled.div`
    border: .1vw solid lightgrey;
    box-shadow: .5vw .5vw 1vw rgba(0,0,0,.2);
    border-radius: 1vw;
    display: flex;
    flex-grow:1;
    /* width: 80vw; */
    position: relative;
    justify-content:space-between;
    align-items: center; 
    padding: 1vw;
    
`
const SearchDivResultsMobile = styled.div`
    position: absolute;    
    height: 100vh;
    width: 100vw;
    padding: 2vw;    
    top: 7vw;
    left:0;
    background-color: rgba(0,0,0,.8);
    z-index:11;  
    
`
const SearchResultsImageMobile = styled.img`
    height: 8vw;
    width: 8vw;
    border-radius: 2vw;
    color:blue;
`
const SearchResultsMobile = styled.p`
    color: white;
`
const InputMobile = styled.input`
   
    border: none;
    height: "2vw";
    font-weight: bold;
    ${mobile({
    // width: "80vw",
    height: "6vw",
    fontSize: "3vw",
})}
`
const MobilCartLogoDiv = styled.div` 
display:flex;
justify-content:center;
align-items:center;
width:8vw;
height:8vw;
background-color: ${props => props.mainColor};
border-radius: 50%;
margin-left:3vw;
`
const MobileFooterMenu = styled.div`
    display: none;
    flex-direction:row;
    position:fixed;
    bottom:0;
    width:100vw;
    height: 12vw;
    background-color:${props => props.mainColor};
    bottom:0;
    z-index:12;
    padding:1vw;
    justify-content:space-evenly;
    ${mobile({ display: "flex" })}
`
const HomeSVG = styled.svg` 
    width:10vw;
    height:10vw;
    fill:${props => props.accentColor};
`
const ProfileSVG = styled.svg` 
    width:10vw;
    height:10vw;
    fill:${props => props.accentColor};
`
const ThemeButton = styled.button` 
    background-color: ${props => props.accentColor};
    width:10vw;
    height:10vw;
`

const Navbar = () => {


    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()


    //   const {isFetching, error} = useSelector((state) => state.user)

    const user = useSelector((state) => state.user.currentUser)
    const tempUser = useSelector((state) => state.user.tempUser)
    const toggle = useSelector((state) => state.menu.dropDownMenu)

    const [filteredProducts, setFilteredProducts] = useState([])
    const [wordSearch, setWordSearch] = useState('')

    const [cata, setCata] = useState([])


    const isDarkTheme = useSelector((state) => state.theme.isDarkTheme)
    const mainColor = useSelector((state) => state.theme.mainColor)
    const mainSecondaryColor = useSelector((state) => state.theme.mainSecondaryColor)
    const mainAccentColor = useSelector((state) => state.theme.mainAccentColor)
    const lightMainColor = useSelector((state) => state.theme.lightMainColor)
    const lightSecondaryColor = useSelector((state) => state.theme.lightSecondaryColor)
    const lightAccentColor = useSelector((state) => state.theme.lightAccentColor)
    const darkMainColor = useSelector((state) => state.theme.darkMainColor)
    const darkSecondaryColor = useSelector((state) => state.theme.darkSecondaryColor)
    const darkAccentColor = useSelector((state) => state.theme.darkAccentColor)
    // const [toggle, setToggle] = useState(false)



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
        if (searchword === '') {
            setWordSearch('')
        } else {
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
            await logout(dispatch)
            isWorking = false
        } catch (error) {

        }
        if (!isWorking) {
            window.location.href = "/"
        }
    }

    const handleTheme = () => {
        dispatch(setIsDarkTheme(!isDarkTheme))
        if (isDarkTheme) {
            console.log("inside useEffect");
            dispatch(setMainColor(darkMainColor))
            dispatch(setMainSecondaryColor(darkSecondaryColor))
            dispatch(setMainAccentColor(darkAccentColor))
        } else {
            dispatch(setMainColor(lightMainColor))
            dispatch(setMainSecondaryColor(lightSecondaryColor))
            dispatch(setMainAccentColor(lightAccentColor))
        }
    }


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
        getProduct()
    }, [wordSearch, toggle, cart])


    //    console.log('in navbar');
    // <SideMenu />
    return (
        <>
            <Container>
                <Wrapper>
                    {!mobile ?
                        <>
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
                                    <WelcomeText>
                                        Welcome &nbsp;
                                        <WelcomeUserName color={mainColor}>{user?.username}</WelcomeUserName>
                                    </WelcomeText>

                                    {user?.isWholesale ? <>
                                        <Link to="/wholesalelist">
                                            <MenuItem>
                                                Wholesale
                                            </MenuItem>
                                        </Link>
                                    </>
                                        :
                                        null
                                    }
                                </>
                                    :
                                    <>
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
                                <CatNavDiv>
                                    <NavUL>
                                        {categories?.map((cat, index) => (
                                            <CategoryLinks key={index} bg={cat.cat === cata.cat && { mainColor }}
                                                onClick={(e) => { setOpenDropDown(cat) }}
                                            >
                                                {cat.cat}
                                            </CategoryLinks>
                                        ))}
                                    </NavUL>
                                    <DropdownMenu cat={cata} />
                                </CatNavDiv>
                            </Right>
                        </>
                        :
                        // MOBILE NAV SECTION

                        <SearchPairMobile>
                            <Logo src='../Photos/c&Slogo.png' onClick={() => { window.location.href = "/" }}></Logo>
                            <SearchContainerMobile>
                                <InputMobile placeholder='SEARCH' value={wordSearch} onChange={handleChange} />
                                {!wordSearch ? <Search style={{ color: 'grey', fontSize: `${mobile ? '4vw' : '3vw'}` }} /> :
                                    <CloseIcon style={{ color: 'grey', fontSize: 16, cursor: 'pointer' }} onClick={handleClear} />}
                            </SearchContainerMobile>
                            <MobilCartLogoDiv onClick={() => { window.location.href = "/cart" }} mainColor={mainColor}>
                                    <Badge badgeContent={cart && cart.products.length} overlap="rectangular" color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </MobilCartLogoDiv>
                            {filteredProducts.length > 0 && (
                                <SearchDivResultsMobile>
                                    {filteredProducts.slice(0, 5).map((pro, index) => (
                                        <div key={index} onClick={() => { window.location.href = `/product/${pro._id}` }} >
                                            <SearchResultsImageMobile src={pro.img} />
                                            <SearchResultsMobile key={index + pro.title}>{pro.title}</SearchResultsMobile>
                                        </div>
                                    ))}
                                </SearchDivResultsMobile>
                            )}
                        </SearchPairMobile>
                    }
                    <NavBarCategories />
                </Wrapper>

                <MobileFooterMenu mainColor={mainColor}>
                    <HomeSVG viewBox="0 0 24 24" accentColor={mainAccentColor}
                        onClick={() => { window.location.href = "/" }}>
                        <path d="M3 10v11h6v-7h6v7h6v-11L12,3z" />
                    </HomeSVG>
                    <ThemeButton onClick={handleTheme}>CHANGE</ThemeButton>
                    <Link to="/profile">
                        <ProfileSVG
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            accentColor={mainAccentColor}
                        >
                            <circle cx="12" cy="8" r="5" />
                            <path d="M3,21 h18 C 21,12 3,12 3,21" />
                        </ProfileSVG>
                    </Link>
                </MobileFooterMenu>

            </Container>
        </>
    )
}

export default Navbar