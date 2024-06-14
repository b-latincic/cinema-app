package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.GetGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GetGenreDTOToGenreConverter implements Converter<GetGenreDTO, Genre> {


    @Override
    public Genre convert(GetGenreDTO dto) {
        Genre genre = new Genre();
        genre.setId(dto.getId());
        genre.setName(dto.getName());
        return genre;
    }
}
