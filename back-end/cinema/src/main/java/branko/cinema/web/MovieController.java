package branko.cinema.web;

import branko.cinema.service.MovieService;
import branko.cinema.web.dto.movie.CreateMovieDTO;
import branko.cinema.web.dto.movie.GetMovieDTO;
import branko.cinema.web.dto.movie.UpdateMovieDTO;
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
@RequestMapping(value="/api/v1/movies")
@Validated
public class MovieController {
    private final MovieService movieService;


    // TODO: Take a look -> There is a way to pass the whole Pageable object that contains pageSize and pageNumber
    @GetMapping
    public ResponseEntity<List<GetMovieDTO>> getMovies(
            @RequestParam(value="pageNo", defaultValue = "0") int pageNo,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) List<String>firstLetters) {
        Page<GetMovieDTO> page = movieService.findAllMovies(firstLetters, title, pageNo);
        return new ResponseEntity<>(page.getContent(), HttpStatus.OK);
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<GetMovieDTO> getMovie(@PathVariable UUID id) {
        GetMovieDTO movie = movieService.findMovieById(id);
        return new ResponseEntity<>(movie, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GetMovieDTO> create(@Valid @RequestBody CreateMovieDTO createMovieDTO) {
        GetMovieDTO savedMovieDTO = movieService.save(createMovieDTO);
        return new ResponseEntity<>(savedMovieDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GetMovieDTO> update(@Valid @PathVariable UUID id,  @RequestBody UpdateMovieDTO updateMovieDTO) {
        GetMovieDTO updatedMovie = movieService.update(id, updateMovieDTO);
        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable UUID id) {
        boolean isDeleted = movieService.deleteMovie(id);
        return new ResponseEntity<>(isDeleted, HttpStatus.OK);
    }
}
