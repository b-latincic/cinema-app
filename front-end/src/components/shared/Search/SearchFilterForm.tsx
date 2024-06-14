import { ChangeEvent } from "react";
import Button from "../Button/Button";
import Form from "../Form/Form";
import Input from "../Input/Input";
import { ButtonContainer, Container } from "../Form/Form-styled";

interface SearchFormProps {
    checked: string[]
    value: string | number
    isDisabled: boolean
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    onInput: (e: ChangeEvent<HTMLInputElement>) => void 
    onChange: (selectedLetter: string) => void
}

const alphabet : string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const SearchFilterForm = ({checked, value, isDisabled, onFormSubmit, onInput, onChange} : SearchFormProps) => {
    return (      
        <Form onFormSubmit={onFormSubmit}>  
            <Container>   
            <label className="search-label" htmlFor="searchValue">Enter value: </label>
            <Input type='text' name='searchValue' placeholder="Search" value={value} onChange={onInput} />    
            
            <p>Filter by first letter: </p>
            <fieldset className="fieldset">
                {alphabet.map((el) => { 
                    const isChecked = checked.includes(el)
                    return (
                    <span key={el}>
                        <input 
                            type="checkbox" 
                            name={el}
                            value={el} 
                            onChange={() => onChange(el)}
                            checked={isChecked}
                        />
                        <label>{el}</label>
                    </span>
                )})}
            </fieldset>
            <ButtonContainer>
            <Button disabled={isDisabled} text='Apply filter' type='submit' /> 
            </ButtonContainer>
            </Container> 
        </Form>
    )
}

export default SearchFilterForm;