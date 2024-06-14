package branko.cinema.service;

import branko.cinema.web.dto.genre.CreateGenreDTO;
import branko.cinema.web.dto.genre.GetGenreDTO;
import branko.cinema.web.dto.genre.UpdateGenreDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;


public interface GenreService {

    GetGenreDTO save(CreateGenreDTO createGenreDTO);
    GetGenreDTO update(UUID id, UpdateGenreDTO updateGenreDTO);
    GetGenreDTO findGenreById(UUID id);
    Page<GetGenreDTO> findAllGenres(List<String> firstLetters, String name, int pageNo);
    GetGenreDTO findGenreByName(String name);
    List<GetGenreDTO> findAllGenres();
    boolean delete(UUID id);
}
