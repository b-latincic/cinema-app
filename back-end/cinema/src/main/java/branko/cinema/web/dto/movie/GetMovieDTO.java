package branko.cinema.web.dto.movie;

import branko.cinema.web.dto.genre.GetGenreDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class GetMovieDTO {
    private UUID id;
    private String title;
    private String originalTitle;
    private int duration;
    private String image;
    private List<GetGenreDTO> genres;
}
