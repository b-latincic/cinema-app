import styled from "styled-components";

const StyledFooter = styled.footer `
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: lightsteelblue;
    padding: 10px 0;
`

export const StyledFooterContent = styled.span ` 
    width: 70%;
`

export default StyledFooter;