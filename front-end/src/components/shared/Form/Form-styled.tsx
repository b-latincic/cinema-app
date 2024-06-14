import styled from "styled-components";

export const StyledForm = styled.form`

display: flex;   
flex-direction: column;
gap: 10px;


font-size: 1em;
margin-top: 0.2em;  

.label {
    color: white;        
    }

.search-label {
    font-size: 1em;
    font-weight: bold;
}  

.fieldset {
    font-size: 1.2em;
    display: flex;
    flex-wrap: wrap;
    max-width: 50%;
}
`

export const Container = styled.main`
display: flex;
flex-direction: column;
gap: 10px;
`
export const ButtonContainer = styled.div`
    align-self: flex-start;
    margin-bottom: 10px;
`