package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.CreateGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CreateGenreDTOToGenreConverter implements Converter<CreateGenreDTO, Genre> {

    @Override
    public Genre convert(CreateGenreDTO dto) {
        Genre genre = new Genre();
        genre.setName(dto.getName());
        return genre;
    }
}
