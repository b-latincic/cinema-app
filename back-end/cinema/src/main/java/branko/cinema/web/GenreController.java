package branko.cinema.web;

import branko.cinema.service.GenreService;
import branko.cinema.web.dto.genre.CreateGenreDTO;
import branko.cinema.web.dto.genre.GetGenreDTO;
import branko.cinema.web.dto.genre.UpdateGenreDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping(value="/api/v1/genres")
@Validated
public class GenreController {
    private final GenreService genreService;


    @GetMapping
    public ResponseEntity<List<GetGenreDTO>> getGenres(@RequestParam(value="pageNo", defaultValue = "0") int pageNo,
                                                       @RequestParam(required = false) String name,
                                                       @RequestParam(required = false) List<String> firstLetters) {


        Page<GetGenreDTO> genres = genreService.findAllGenres(firstLetters, name, pageNo);
        return new ResponseEntity<>(genres.getContent(), HttpStatus.OK);
    }


    @GetMapping("/{name}")
    public ResponseEntity<GetGenreDTO> getGenre(@PathVariable String name) {
        GetGenreDTO genre = genreService.findGenreByName(name);
        return new ResponseEntity<>(genre, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GetGenreDTO> create(@Valid @RequestBody CreateGenreDTO createGenreDTO) {
        GetGenreDTO savedGenreDTO = genreService.save(createGenreDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGenreDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GetGenreDTO> update(@PathVariable UUID id, @Valid @RequestBody UpdateGenreDTO updateGenreDTO) {
        GetGenreDTO updatedGenre = genreService.update(id, updateGenreDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updatedGenre);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        boolean isDeleted = genreService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(isDeleted);
    }

}
