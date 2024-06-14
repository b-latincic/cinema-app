package branko.cinema.exception;

import java.util.UUID;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException(UUID id) {
        super(String.format("Movie with id %s not found", id));
    }
}
