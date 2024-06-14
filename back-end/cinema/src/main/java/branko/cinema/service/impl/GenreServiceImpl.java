package branko.cinema.service.impl;

import branko.cinema.exception.GenreNotFoundException;
import branko.cinema.model.Genre;
import branko.cinema.repository.GenreRepository;
import branko.cinema.service.GenreService;
import branko.cinema.service.MovieService;
import branko.cinema.web.dto.genre.CreateGenreDTO;
import branko.cinema.web.dto.genre.GetGenreDTO;
import branko.cinema.web.dto.genre.UpdateGenreDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;
    private final ConversionService conversionService;
    private final MovieService movieService;


    @Override
    public GetGenreDTO save(CreateGenreDTO createGenreDTO) {
        Genre genreToSave = conversionService.convert(createGenreDTO, Genre.class);
        Genre savedGenre = genreRepository.save(genreToSave);
        return conversionService.convert(savedGenre, GetGenreDTO.class);
    }

    @Override
    public GetGenreDTO update(UUID id, UpdateGenreDTO updateGenreDTO) {
        Genre genreToUpdate = genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));

        genreToUpdate.setName(updateGenreDTO.getName());
        Genre savedGenre = genreRepository.save(genreToUpdate);
        return conversionService.convert(savedGenre, GetGenreDTO.class);
    }


    @Override
    public GetGenreDTO findGenreById(UUID id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));

        return conversionService.convert(genre, GetGenreDTO.class);
    }

    @Override
    public Page<GetGenreDTO> findAllGenres(List<String> firstLetters, String name, int pageNo) {
        Page<Genre> genres = genreRepository.findAll(firstLetters, name, PageRequest.of(pageNo, 10));
        return genres.map(genre -> conversionService.convert(genre, GetGenreDTO.class));
    }


    @Override
    public GetGenreDTO findGenreByName(String name) {
        Genre genre = genreRepository.findByName(name)
                .orElseThrow(() -> new GenreNotFoundException(name));

        return conversionService.convert(genre, GetGenreDTO.class);
    }

    @Override
    public List<GetGenreDTO> findAllGenres() {
        return genreRepository.findAll()
                .stream()
                .map(genre -> conversionService.convert(genre, GetGenreDTO.class))
                .toList();
    }

    @Override
    public boolean delete(UUID id) {
        boolean doesGenreExist = genreRepository.existsById(id);
        if (!doesGenreExist) {
            throw new GenreNotFoundException(id);
        }

        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new GenreNotFoundException(id));

        genre.getMovies().forEach(movie ->
                movieService.deleteGenreFromMovie(movie.getId(), genre.getId())
        );
        genreRepository.deleteById(id);
        return true;
    }


}
