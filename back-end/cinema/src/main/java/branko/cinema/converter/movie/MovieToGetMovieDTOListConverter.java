package branko.cinema.converter.movie;

import branko.cinema.converter.genre.GenreToGetGenreDTOListConverter;
import branko.cinema.model.Movie;
import branko.cinema.web.dto.movie.GetMovieDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class MovieToGetMovieDTOListConverter implements Converter<List<Movie>, List<GetMovieDTO>> {

    @Autowired
    private GenreToGetGenreDTOListConverter genreToGetGenreDTOListConverter;


    private GetMovieDTO convert(Movie movie) {
        GetMovieDTO dto = new GetMovieDTO();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setOriginalTitle(movie.getOriginalTitle());
        dto.setDuration(movie.getDuration());
        dto.setImage(movie.getImage());
        dto.setGenres(genreToGetGenreDTOListConverter.convert(movie.getGenres()));
        return dto;
    }
    @Override
    public List<GetMovieDTO> convert(List<Movie> movies) {
        return movies.stream()
                .map(movie -> convert(movie))
                .toList();
    }
}
