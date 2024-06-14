import styled from "styled-components";

const StyledModal = styled.dialog ` 
position: fixed;  
z-index: 1; 
left: 0%;
top: 50%;
transform: translate(0, -50%);
float: left;
width: 500px; 
height: 500px; 
overflow: auto;   
background-color: rgba(0,0,0,0.4); 

.closeButton {
    position: absolute;
    bottom: 5%; 
    right: 5%; 
    padding: 0.4em 0.6em;
    background-color: white;
    border: none;
    cursor: pointer;
}
.warning {
    color: red;
    font-weight: bold;
    margin-bottom: 10px;
}
`

export default StyledModal;