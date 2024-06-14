import { StyledForm } from "./Form-styled";

export interface FormProps {
    children: JSX.Element;
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}

const Form = ({onFormSubmit, children}: FormProps) => {
    return( 
        <StyledForm onSubmit={onFormSubmit}>
            {children}
        </StyledForm> 
    )   
}

export default Form;