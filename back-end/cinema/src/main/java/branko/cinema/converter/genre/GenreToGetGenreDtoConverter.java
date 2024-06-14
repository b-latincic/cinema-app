package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.GetGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GenreToGetGenreDtoConverter implements Converter<Genre, GetGenreDTO> {

    @Override
    public GetGenreDTO convert(Genre genre) {
        GetGenreDTO dto = new GetGenreDTO();
        dto.setId(genre.getId());
        dto.setName(genre.getName());
        return dto;
    }
}
