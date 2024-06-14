package branko.cinema.exception;


import java.util.UUID;

public class GenreNotFoundException extends RuntimeException {
    public GenreNotFoundException(UUID id) {
        super(String.format("Genre with ID %s not found", id));
    }
    public GenreNotFoundException(String name) {
        super(String.format("Genre with name %s not found", name));
    }
}
