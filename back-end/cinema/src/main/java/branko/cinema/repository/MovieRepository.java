package branko.cinema.repository;

import branko.cinema.model.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface MovieRepository extends JpaRepository<Movie, UUID> {

    // TODO: Take a look (we do not have to do this): Specificaitons: https://docs.spring.io/spring-data/jpa/reference/jpa/specifications.html
    // Specifications are another way to construct queries so you don't need to write queries like this
    @Query("SELECT m FROM Movie m WHERE " +
            "COALESCE(:firstLetters, '') = '' AND COALESCE(:title, '') = '' OR " +
            "COALESCE(:firstLetters, '') <> '' AND LOWER(SUBSTRING(m.title, 1, 1)) IN :firstLetters " +
            "AND COALESCE(:title,'') = '' OR " +
            "COALESCE(:title, '') <> '' AND LOWER(m.title) LIKE CONCAT('%', LOWER(:title), '%') AND COALESCE(:firstLetters, '') = '' OR " +
            "COALESCE(:firstLetters, '') <> '' AND COALESCE(:title, '') <> ''  " +
            "AND LOWER(SUBSTRING(m.title, 1, 1)) IN :firstLetters " +
            "AND LOWER(m.title) LIKE CONCAT('%', LOWER(:title), '%')" +
            "ORDER BY m.title ASC")
    Page<Movie> findAll(@Param("firstLetters") List<String> firstLetters,
                        @Param("title") String title,
                        Pageable pageable);

}
