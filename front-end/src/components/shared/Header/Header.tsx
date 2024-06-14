import Button from "../Button/Button";
import { StyledHeader, StyledHeaderContent } from "./Header.styled";

const Header = () => {
    return (
        <StyledHeader>
            <StyledHeaderContent className="">    
                <nav>Logo</nav>            
                <div className="button-wrapper"> 
                    <Button text='Register' type='button' clickHandler={() => console.log('register')} />
                    <Button text='Login' type='button' clickHandler={() => console.log('login')} />
                </div>
            </StyledHeaderContent>
        </StyledHeader>
    )
}

export default Header;
