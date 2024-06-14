package branko.cinema.service;

import branko.cinema.web.dto.movie.CreateMovieDTO;
import branko.cinema.web.dto.movie.GetMovieDTO;
import branko.cinema.web.dto.movie.UpdateMovieDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface MovieService {
    GetMovieDTO findMovieById(UUID id);
    GetMovieDTO save(CreateMovieDTO createMovieDTO);
    GetMovieDTO update(UUID id, UpdateMovieDTO updateMovieDTO);
    boolean deleteMovie(UUID id);
    boolean deleteGenreFromMovie(UUID movieId, UUID genreId);
    Page<GetMovieDTO> findAllMovies(List<String> firstLetters, String title, int pageNo);
}
