package branko.cinema.web.dto.movie;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class CreateMovieDTO {
    @NotBlank(message = "Movie title must not be blank")
    private String title;
    @Positive(message = "Duration must be a positive number")
    private String originalTitle;
    private int duration;
    private String image;
    private List<UUID> genreIds;

}
