import styled from 'styled-components'
import React, {useState} from 'react'
import Products from '../components/Products'
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom'
import {categories} from '../data'


const Container = styled.div`
    margin-top:40px;
    
`
const Title = styled.h1`
    margin: 20px;
    text-transform: capitalize;
    text-align:center;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDiv = styled.div`
    display: flex;
    width:80%;
    align-items:center;
    margin: 0 auto;
`

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ContentContainer = styled.div`
   display:flex;
   flex-direction:row;
`
const SideBarDiv= styled.div`
    box-sizing:border-box;
    /* background-color:red; */
    width:200px;
    min-height:100%;
    padding-left: 40px;
    ${mobile({ display: "none" })}
`
const CatTitle = styled.div`
    font-weight:bold;
`
const Cat = styled.div`
    display:flex;   
    flex-direction:column;
    /* background-color:yellow; */
    margin:5px;
`

const ProductList2 = () => {

    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")

    const location = useLocation()
    const cat = location.pathname.split('/')[2].replaceAll('%20', ' ')
    const gen = cat === 'graphics' ? 'all' : cat;
    const data = categories.find(item=> item?.cat?.includes(cat))
    const sub = data?.subCats
    
// console.log(gen);
// console.log(sub);
    const handleFilters = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        if (value === 'all'){            
            setFilters(({ [name]: value, ...filters }) => filters)
        } else{
            setFilters({...filters,[e.target.name]: value})
        }
    }
  
  return (
    <Container>
        
        <Title> {cat}</Title>
                    
        
        <FilterContainer>
            <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name='color' onChange={handleFilters}>
                <Option disabled >
                Color
                </Option>
                <Option>all</Option>
                <Option>white</Option>
                <Option>black</Option>
                <Option>red</Option>
                <Option>blue</Option>
                <Option>yellow</Option>
                <Option>green</Option>
                <Option>pink</Option>
                <Option>other</Option>
            </Select>
            <Select name='size' onChange={handleFilters}>
                <Option disabled >
                Size
                </Option>
                <Option>all</Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
                <Option>XXL</Option>
                <Option>XXXL</Option>
                <Option>Other</Option>
            </Select>
            </Filter>
            <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={e=> setSort(e.target.value)}>
                <Option value="newest">Newest</Option>
                <Option value="asc">Price (asc)</Option>
                <Option value="desc">Price (desc)</Option>
            </Select>
            </Filter>
        </FilterContainer>
        <ContentContainer>
            <SideBarDiv>
                {sub?.map((cats, index) => (
                    <div key={index}>
                    <CatTitle >{Object.values(cats)[1]}</CatTitle>
                    <Cat>{Object.values(cats)[0]?.map((cat, index) => (
                       <p key={index}>{cat}</p> 
                    ))}</Cat>
                    </div>
                ))}
            </SideBarDiv>
            <ProductDiv>
                <Products cat={gen} gen={cat} filters={filters} sort={sort}/>
            </ProductDiv>
        </ContentContainer>
    </Container>
  )
}

export default ProductList2