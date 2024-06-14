package branko.cinema.converter.movie;

import branko.cinema.converter.genre.GenreToGetGenreDTOListConverter;
import branko.cinema.model.Movie;
import branko.cinema.web.dto.movie.GetMovieDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MovieToGetMovieDTOConverter implements Converter<Movie, GetMovieDTO> {

    private final GenreToGetGenreDTOListConverter genreToGetGenreDTOListConverter;

    @Override
    public GetMovieDTO convert(Movie movie) {
        GetMovieDTO dto = new GetMovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setOriginalTitle(movie.getOriginalTitle());
        dto.setDuration(movie.getDuration());
        dto.setImage(movie.getImage());
        dto.setGenres(genreToGetGenreDTOListConverter.convert(movie.getGenres()));
        return dto;
    }

}
