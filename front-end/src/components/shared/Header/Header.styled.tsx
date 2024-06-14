import styled from "styled-components";

export const StyledHeader = styled.header `
    background-color: lightsteelblue;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;

    .button-wrapper {
        display: flex;
        gap: 5px
    }
    
`

export const StyledHeaderContent = styled.span `
    display: flex;
    width: 70%;
    justify-content: space-between;
`
