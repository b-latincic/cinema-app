import Genre from "../../../models/Genre";
import Button from "../Button/Button";
import { StyledDialog } from "./Dialog-styled";
import { ButtonContainer } from "./Form-styled";

interface DeleteFormProps {
    onCancel: () => void;
    onConfirm: (param?: Genre) => void;
}

const DeleteConfirmation = ({onConfirm, onCancel}: DeleteFormProps) => {
    return (      
        <div>
            <StyledDialog>Proceed with deleting?</StyledDialog>
            <ButtonContainer>
            <Button text="Yes" type="button" clickHandler={onConfirm} />
            <Button text="No" type="button" clickHandler={onCancel} />
            </ButtonContainer>
        </div>       
    )
}

export default DeleteConfirmation;
