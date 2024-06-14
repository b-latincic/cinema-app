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
public class UpdateMovieDTO {
    private UUID id;
    @NotBlank(message = "Title must not be blank")
    private String title;
    private String originalTitle;
    private String image;
    @Positive(message="Duration must be a positive number")
    private int duration;
    private List<UUID> genreIds;
}
