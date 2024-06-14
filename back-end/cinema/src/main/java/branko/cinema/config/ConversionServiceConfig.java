package branko.cinema.config;

import branko.cinema.converter.genre.CreateGenreDTOToGenreConverter;
import branko.cinema.converter.genre.GenreToGetGenreDTOListConverter;
import branko.cinema.converter.genre.GenreToGetGenreDTOPageConverter;
import branko.cinema.converter.genre.GenreToGetGenreDtoConverter;
import branko.cinema.converter.movie.*;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.support.DefaultFormattingConversionService;

@RequiredArgsConstructor
@Configuration
public class ConversionServiceConfig {
    private final GenreToGetGenreDTOListConverter genreToGetGenreDTOListConverter;

    @Bean
    public DefaultFormattingConversionService conversionService() {
        DefaultFormattingConversionService conversionService = new DefaultFormattingConversionService();

        // Genre
        conversionService.addConverter(new CreateGenreDTOToGenreConverter());
        conversionService.addConverter(new GenreToGetGenreDtoConverter());
        conversionService.addConverter(new GenreToGetGenreDTOListConverter());
        conversionService.addConverter(new GenreToGetGenreDTOPageConverter());

        // Movie
        conversionService.addConverter(new CreateMovieDTOToMovieConverter());
        conversionService.addConverter(new UpdateMovieDTOToMovieConverter());
        conversionService.addConverter(new MovieToGetMovieDTOListConverter());
        conversionService.addConverter(new MovieToGetMovieDTOPageConverter(genreToGetGenreDTOListConverter));
        conversionService.addConverter(new MovieToGetMovieDTOConverter(genreToGetGenreDTOListConverter));

        return conversionService;
    }
}
