package branko.cinema.exception;

public class GenreAlreadyExistsException extends RuntimeException {
    public GenreAlreadyExistsException(String name) {
        super(String.format("Genre with name %s already exists", name));
    }
}
