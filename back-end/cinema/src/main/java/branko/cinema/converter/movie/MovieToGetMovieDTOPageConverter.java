package branko.cinema.converter.movie;

import branko.cinema.converter.genre.GenreToGetGenreDTOListConverter;
import branko.cinema.model.Movie;
import branko.cinema.web.dto.movie.GetMovieDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Component
public class MovieToGetMovieDTOPageConverter implements Converter<Page<Movie>, Page<GetMovieDTO>> {

    private final GenreToGetGenreDTOListConverter genreToGetGenreDTOListConverter;

    @Autowired
    public MovieToGetMovieDTOPageConverter(GenreToGetGenreDTOListConverter genreToGetGenreDTOListConverter) {
        this.genreToGetGenreDTOListConverter = genreToGetGenreDTOListConverter;
    }


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
    public Page<GetMovieDTO> convert(Page<Movie> movies) {
        return movies.map(this::convert);
    }
}
