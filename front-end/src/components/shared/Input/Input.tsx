import { ChangeEvent, ComponentPropsWithoutRef } from "react"
import { StyledInput } from "./Input-styled";

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
    type:'text' | 'number' | 'email' | 'password'
    // name: string
    // value: string | number
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void
    // placeholder?: string
}

const Input = ({type, name, value, onChange, placeholder} : InputProps) => {
    return (
        <StyledInput type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    )
}

export default Input;