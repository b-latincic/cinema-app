import Movie from "../../../../models/Movie";
import Button from "../../../shared/Button/Button";
import { StyledHead, StyledSection } from "./MovieCard.styled";

interface MovieCardProps {
    movie: Movie
    onDeleteMovie: (movie: Movie) => void
    onEditMovie: (movie: Movie) => void
}

const MovieCard = ({movie, onDeleteMovie, onEditMovie}: MovieCardProps) => {
      
    return (
        <StyledSection>
            <img className="img" src={movie.image} alt='' />
            <StyledHead>
                {movie.title}
            </StyledHead>            
            <p>Duration: {movie.duration} minutes</p> 
            <p>genre: {movie.genres?.map(el => el.name)}</p>           
            <span className="button-wrap">
            <Button text='Delete' type='button' clickHandler={() => onDeleteMovie(movie)} /> 
            <Button text='Edit' type='button' clickHandler={() => onEditMovie(movie)} />   
            </span>       
        </StyledSection>
    )
}   

export default MovieCard;