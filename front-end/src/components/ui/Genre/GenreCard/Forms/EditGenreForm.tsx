import { ChangeEvent } from "react";
import Button from "../../../../shared/Button/Button";
import Form from "../../../../shared/Form/Form";
import Input from "../../../../shared/Input/Input";

interface EditGenreFormProps {  
    value: string | number    
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
    placeholder?: string
}

const EditGenreForm = ({value, onFormSubmit, onChange, placeholder} : EditGenreFormProps) => {
    return (
        <Form onFormSubmit={onFormSubmit}>  
            <>         
                <label className="label" htmlFor="editGenreName">Enter genre name: </label>
                <Input type='text' name='editGenreName' placeholder={placeholder} value={value} onChange={onChange} />    
                <div>
                <Button text='Edit genre' type='submit' /> 
                </div>
            </>
        </Form>
    )
}

export default EditGenreForm;