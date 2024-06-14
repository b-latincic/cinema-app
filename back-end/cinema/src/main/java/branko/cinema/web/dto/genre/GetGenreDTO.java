package branko.cinema.web.dto.genre;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class GetGenreDTO {
    private UUID id;
    @NotBlank(message = "Genre name must not be blank")
    private String name;
}
