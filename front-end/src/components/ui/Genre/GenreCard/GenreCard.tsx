import Genre from "../../../../models/Genre";
import Button from "../../../shared/Button/Button";
import { StyledHead, StyledSection } from "./GenreCard.styled";

interface GenreCardProps {
    genre: Genre
    onDeleteGenre: (genre: Genre) => void
    onEditGenre: (genre: Genre) => void
}

const GenreCard = ({genre, onDeleteGenre, onEditGenre}: GenreCardProps) => {
    return (
        <StyledSection>
            <StyledHead>{genre.name}</StyledHead> 
            <span className="button-wrap">           
            <Button text='Delete' type='button' clickHandler={() => onDeleteGenre(genre)} />
            <Button text='Edit' type='button' clickHandler={() => onEditGenre(genre)} />
            </span>
        </StyledSection>
    )
}

export default GenreCard;
