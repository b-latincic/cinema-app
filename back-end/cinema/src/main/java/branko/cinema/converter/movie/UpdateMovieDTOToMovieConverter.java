package branko.cinema.converter.movie;

import branko.cinema.model.Movie;
import branko.cinema.web.dto.movie.UpdateMovieDTO;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UpdateMovieDTOToMovieConverter implements Converter<UpdateMovieDTO, Movie> {

    @Override
    public Movie convert(UpdateMovieDTO dto) {
        Movie movie = new Movie();
        movie.setId(dto.getId());
        movie.setTitle(dto.getTitle());
        movie.setDuration(dto.getDuration());
        movie.setOriginalTitle(dto.getOriginalTitle());
        movie.setImage(dto.getImage());
        return movie;
    }
}

