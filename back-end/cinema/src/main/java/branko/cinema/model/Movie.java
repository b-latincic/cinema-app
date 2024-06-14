package branko.cinema.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@ToString
@Setter
@Getter
@Entity
@Table(name="movies")
public class Movie {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column
    private String originalTitle;

    @Lob // TODO: Take a look what it is, and BLOB as well
    @Column
    private String image;

    @Column(nullable = false)
    private int duration;

    @ManyToMany
    @JoinTable(name="movie_genre",
               joinColumns = @JoinColumn(name="movie_id"),
               inverseJoinColumns = @JoinColumn(name="genre_id"))
    private List<Genre> genres = new ArrayList<>();
}
