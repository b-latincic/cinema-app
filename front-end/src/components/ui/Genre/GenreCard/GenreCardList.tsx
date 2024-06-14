import Genre from "../../../../models/Genre";
import GenreCard from "./GenreCard";
import { StyledList, StyledListItem } from "./GenreCard.styled";


interface CardListProps {
    genres: Genre[],
    onOpenDelete: (genre: Genre) => void
    onOpenEdit: (genre: Genre) => void
}

const GenreCardList = ({genres, onOpenDelete, onOpenEdit}: CardListProps) => {
    return (
        <StyledList>
            {genres.map((genre) => 
                <StyledListItem key={genre.name}> 
                   <GenreCard genre={genre} onDeleteGenre={onOpenDelete} onEditGenre={onOpenEdit} />
                </StyledListItem>
             )}             
        </StyledList>
    )
}

export default GenreCardList;
