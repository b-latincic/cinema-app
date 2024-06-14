package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.GetGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;


@Component
public class GenreToGetGenreDTOPageConverter implements Converter<Page<Genre>, Page<GetGenreDTO>> {

    public GetGenreDTO convert(Genre genre) {
        GetGenreDTO dto = new GetGenreDTO();
        dto.setId(genre.getId());
        dto.setName(genre.getName());
        return dto;
    }

    @Override
    public Page<GetGenreDTO> convert(Page<Genre> genresPage) {
        return genresPage.map(this::convert);
    }
}
