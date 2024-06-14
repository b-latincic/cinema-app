import styled from "styled-components";

const StyledButton = styled.button `
    color: white;
    background-color: #438c7c;
    font-family: Botthanie;
    font-size: 1.2em;
    border: 2px solid  #336154;
    border-radius: 3px;        
    &:disabled {
        background-color: #a9a9a9;
        border: 2px solid #7a7a7a;
    }
`

export default StyledButton;