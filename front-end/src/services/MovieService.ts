import axios from "axios";
import Movie from "../models/Movie";
import { UUID } from "crypto";

var CinemaAxios = axios.create({    
    baseURL: 'http://localhost:8080/api/v1',
  });
  
  export const getMovies = (firstLetters: String[], searchTitle: String) => {
    const firstLettersString = firstLetters.join();

   return firstLettersString === '' ?

    CinemaAxios.get('/movies', {
        params: {
            title: searchTitle
        }
    })
    .then((res) => res.data)   
    .catch(error => {
        console.log(error.message);        
    })
    :
    CinemaAxios.get('/movies', {
        params: {
            firstLetters: firstLettersString.toLowerCase(),
            title: searchTitle
        }
    })

  }

  export const addNewMovie = async (movie: Movie | null) => {
    try {
          const res = await CinemaAxios.post('/movies', movie);
          return res.data;
      } catch (error: any) {
          console.log(error.message);
          return [];
      }
  }

  export const editExistingMovie = (movie: Movie, movieId: UUID) => {
    CinemaAxios.put('/movies' + movieId, {
        title: movie.title,
        duration: movie.duration,
        image: movie.image,
        genreIds: movie.genreIds
    })
    .then(() => {
        console.log("Movie edited!");        
    })
    .catch(error => {
        console.log(error.message);
    })
  }

  export const deleteMovie = () => {
    
  }

  
export default CinemaAxios;