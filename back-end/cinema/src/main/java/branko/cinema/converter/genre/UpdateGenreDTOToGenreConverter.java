package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.UpdateGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UpdateGenreDTOToGenreConverter implements Converter<UpdateGenreDTO, Genre> {


    @Override
    public Genre convert(UpdateGenreDTO dto) {
        Genre genre = new Genre();
        genre.setId(dto.getId());
        genre.setName(dto.getName());
        return genre;
    }
}
