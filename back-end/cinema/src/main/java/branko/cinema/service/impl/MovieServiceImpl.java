package branko.cinema.service.impl;

import branko.cinema.exception.MovieNotFoundException;
import branko.cinema.model.Genre;
import branko.cinema.model.Movie;
import branko.cinema.repository.GenreRepository;
import branko.cinema.repository.MovieRepository;
import branko.cinema.service.MovieService;
import branko.cinema.web.dto.movie.CreateMovieDTO;
import branko.cinema.web.dto.movie.GetMovieDTO;
import branko.cinema.web.dto.movie.UpdateMovieDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;
    private final ConversionService conversionService;

    @Transactional
    @Override
    public Page<GetMovieDTO> findAllMovies(List<String> firstLetters, String title, int pageNo) {
        // TODO: Remember to not have magic numbers -> Make 4 be some constant value
        Page<Movie> movies = movieRepository.findAll(firstLetters, title, PageRequest.of(pageNo, 4));
        return movies.map(movie -> conversionService.convert(movie, GetMovieDTO.class));
    }

    @Override
    public GetMovieDTO findMovieById(UUID id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));

        return conversionService.convert(movie, GetMovieDTO.class);
    }

    @Override
    public GetMovieDTO save(CreateMovieDTO createMovieDTO) {
        Movie movieToSave = conversionService.convert(createMovieDTO, Movie.class);
        List<Genre> genres = genreRepository.findAllById(createMovieDTO.getGenreIds());
        movieToSave.setGenres(genres);
        Movie savedMovie = movieRepository.save(movieToSave);
        return conversionService.convert(savedMovie, GetMovieDTO.class);
    }

    @Override
    public GetMovieDTO update(UUID id, UpdateMovieDTO updateMovieDTO) {
        Movie movieToUpdate = conversionService.convert(updateMovieDTO, Movie.class);
        Movie existingMovie = movieRepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException(id));

        List<Genre> genres = genreRepository.findAllById(updateMovieDTO.getGenreIds());
        updateMovie(existingMovie, movieToUpdate, genres);
        Movie savedMovie = movieRepository.save(existingMovie);
        return conversionService.convert(savedMovie, GetMovieDTO.class);
    }

    @Override
    public boolean deleteMovie(UUID id) {
        boolean doesMovieExist = movieRepository.existsById(id);
        if(!doesMovieExist) {
            throw new MovieNotFoundException(id);
        }

        movieRepository.deleteById(id);
        return true;
    }

    @Override
    @Transactional
    public boolean deleteGenreFromMovie(UUID movieId, UUID genreId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new RuntimeException("Genre not found"));

        if (movie.getGenres().remove(genre)) {
            movieRepository.save(movie);
            return true;
        }
        return false;
    }


    private void updateMovie(Movie existingMovie, Movie movieToUpdate, List<Genre> genres) {
        existingMovie.setTitle(movieToUpdate.getTitle());
        existingMovie.setDuration(movieToUpdate.getDuration());
        existingMovie.setImage(movieToUpdate.getImage());
        existingMovie.setGenres(genres);
    }

}

