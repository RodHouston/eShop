import { css } from 'styled-components'

const maxModileW = "1999px"
const maxModileH = maxModileW

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: ${maxModileW}){
            ${props}
        }
    `
}

export const deskTop = (props) => {
    return css`
        @media screen and (min-width: 2000px) {   
            ${props}
        }
    `
}
