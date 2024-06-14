package branko.cinema.repository;

import branko.cinema.model.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

public interface GenreRepository extends JpaRepository<Genre, UUID> {
    Optional<Genre> findByName(String name);


    @Query("SELECT g FROM Genre g WHERE " +
            "COALESCE(:firstLetters, '') = '' AND COALESCE(:name, '') = '' OR " +
            "COALESCE(:firstLetters, '') <> '' AND LOWER(SUBSTRING(g.name, 1, 1)) IN :firstLetters " +
            "AND COALESCE(:name,'') = '' OR " +
            "COALESCE(:name, '') <> '' AND g.name LIKE CONCAT('%', LOWER(:name), '%') AND COALESCE(:firstLetters, '') = '' OR " +
            "COALESCE(:firstLetters, '') <> '' AND COALESCE(:name, '') <> ''  " +
            "AND LOWER(SUBSTRING(g.name, 1, 1)) IN :firstLetters " +
            "AND LOWER(g.name) LIKE CONCAT('%', LOWER(:name), '%')" +
            "ORDER BY g.name ASC")
    Page<Genre> findAll(@Param("firstLetters") List<String> firstLetters , @Param("name") String name, Pageable pageable);






}
