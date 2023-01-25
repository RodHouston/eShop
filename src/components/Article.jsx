import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"


const Container = styled.div`    
    width:100vw;
    box-sizing: border-box;
    background-color: ${(props) => props.bg};
    display:flex;
    flex-direction:column;    
    align-items: center; 
    justify-content: center;   
    padding: 10vw;
    font-size:4vw;
    
`
const ArticleDiv = styled.article`
margin: 2vw 0;`

const ArticleTitle = styled.h2`
text-align: center;
margin-bottom: 2vw;
`
const ArticleText = styled.p`
 text-indent: 7vw;
 line-height:1.5;
 text-align: justify;
`
const LinkStyled = styled(Link)`
color:${(props) => props.color};
`

const ArticleDivRight = styled.article`
margin: 2vw 0;
text-align:center;
`
const ImageRight = styled.img` 
max-width:40vw;
max-height:10vh;
float: left;
margin-right: 2vw;
`
const ArticleTextRight = styled.p`
 /* text-indent: 7vw; */
 line-height:1.5;
 text-align: justify;
`


const Article = () => {

  const mainColor = useSelector((state) => state.theme.mainColor)
  const mainSecondaryColor = useSelector((state) => state.theme.mainSecondaryColor)
  const mainAccentColor = useSelector((state) => state.theme.mainAccentColor)
  return (
    <Container bg={mainSecondaryColor}>
      <ArticleDiv>
        <ArticleTitle>Top Stylish Tips For The Fashion Challenged</ArticleTitle>
        <ArticleText>
          Are you one of those people who have no idea what to wear? Do you find it difficult to plan your clothing choices for the
          following week or evenday? Do you have a tough time mixing andmatching colors? If so, then you will benefitgreatly from the advice
          in the <LinkStyled color={mainAccentColor} to="/">following fashion article.</LinkStyled>
        </ArticleText>
      </ArticleDiv>

      <ArticleDiv>
        <ArticleTitle>Fashion Evaluation Method for Clothing Recommendation Based on Weak Appearance Feature</ArticleTitle>
        <ArticleText>
          <LinkStyled to="/">Flip-flops</LinkStyled> are a comfortable type of footwear for casual occasions, but do not wear them to workor in formal situations.
          Look for classy but comfortable shoes with a low heel to wear to workeveryday. High heels should be reserved for formal occasions,
          especially if you will not need tostand or walk very much.A good fashion tip is to select your clothing for the day based on color.
          You don't want to stepoutside with your <LinkStyled to="/">shirt</LinkStyled> and <LinkStyled to="/">shorts</LinkStyled> clashing because they're complimentary colors. Experimentwith different
          color combinations and see which colors you like and which color combinationsyou don't like so much
        </ArticleText>
      </ArticleDiv>

      <ArticleDivRight>
        <ArticleTitle>Modern Chinese Folk Clothing Accessory-Buttons</ArticleTitle>
        <ImageRight src={"https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
        <ArticleTextRight>
          The structure and function of clothing buttons, to a great extent, influence the clothing modeling, covering function and
          use function. It is a sign of evolution of clothing. This article elaborates the <LinkStyled to="/productlist2/ladies">modern women's clothing</LinkStyled> buttons type, and the
          relationship between function and aesthetic culture connotation. The conclusion is button is an important organic part of clothing.
        </ArticleTextRight>
      </ArticleDivRight>
    </Container>
  )
}

export default Article