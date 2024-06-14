package branko.cinema.converter.genre;

import branko.cinema.model.Genre;
import branko.cinema.web.dto.genre.GetGenreDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GenreToGetGenreDTOListConverter implements Converter<List<Genre>, List<GetGenreDTO>> {

    public GetGenreDTO convert(Genre genre) {
        GetGenreDTO dto = new GetGenreDTO();
        dto.setId(genre.getId());
        dto.setName(genre.getName());
        return dto;
    }

    @Override
    public List<GetGenreDTO> convert(List<Genre> genres) {
        return genres.stream()
                .map(this::convert)
                .toList();
    }
}
