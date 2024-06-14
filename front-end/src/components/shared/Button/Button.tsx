import StyledButton from "./Button.styled";

export type ButtonType = 'submit' | 'reset' | 'button'; 

export interface ButtonProps {
    text: string,
    type: ButtonType,
    disabled?: boolean
    clickHandler?: () => void,
}

const Button = ({ disabled, text, type, clickHandler}: ButtonProps) => {
    return (
        <StyledButton disabled={disabled} onClick={clickHandler} type={type}>
            {text}
        </StyledButton>
    )
}

export default Button;
