import StyledModal from "./Modal.styled"

export type ModalType = 'add' | 'edit' | 'delete' | ''

interface ModalProps {
    isOpen: boolean
    warningMessage: string
    children: JSX.Element
    onClick?: () => void
}

const Modal = ({isOpen, warningMessage, children, onClick}: ModalProps) => {
    return (       
        <StyledModal 
            open={isOpen}>  
            {children}  
            {warningMessage &&          
                <p className="warning">{warningMessage}</p> 
            }
            <button className="closeButton" onClick={onClick}>Close</button>         
        </StyledModal>
    )
}

export default Modal;
