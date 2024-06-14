import { ChangeEvent } from "react";
import Button from "../../../../shared/Button/Button";
import Form from "../../../../shared/Form/Form";
import Input from "../../../../shared/Input/Input";

interface AddGenreFormProps {
    value: string | number
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
}

const AddGenreForm = ({value, onFormSubmit, onChange} : AddGenreFormProps) => {    
    return (       
        <Form onFormSubmit={onFormSubmit}>  
            <>   
            <label className="label" htmlFor="addGenreName">Enter genre name: </label>
            <Input type='text' name='addGenreName' placeholder="genre" value ={value} onChange={onChange} />    
            <div>
            <Button text='Add' type='submit' /> 
            </div>
            </> 
        </Form>        
    )
}

export default AddGenreForm;
