package branko.cinema.converter.movie;

import branko.cinema.model.Movie;
import branko.cinema.web.dto.movie.CreateMovieDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class CreateMovieDTOToMovieConverter implements Converter<CreateMovieDTO, Movie> {




    @Override
    public Movie convert(CreateMovieDTO dto) {
        Movie movie = new Movie();
        movie.setTitle(dto.getTitle());
        movie.setOriginalTitle(dto.getOriginalTitle());
        movie.setDuration(dto.getDuration());
        movie.setImage(dto.getImage());

        return movie;
    }
}
