import Genre from "../../../../models/Genre";
import Movie from "../../../../models/Movie";
import MovieCard from "./MovieCard";
import { StyledList, StyledListItem } from "./MovieCard.styled";

interface MovieListProps {
    movies: Movie[]
    onOpenDelete: (movie: Movie) => void
    onOpenEdit: (movie: Movie) => void
}

const MovieCardList = ({movies, onOpenDelete, onOpenEdit} : MovieListProps) => {
    return (
        <StyledList>
            {movies.map((movie) => 
                <StyledListItem key={movie.id}>
                    <MovieCard movie={movie} onDeleteMovie={onOpenDelete} onEditMovie={onOpenEdit} />
                </StyledListItem> 
            )}
        </StyledList>
    )
}

export default MovieCardList;