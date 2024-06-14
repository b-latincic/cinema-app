import axios from 'axios';
import Genre from '../models/Genre';
import { UUID } from 'crypto';

var CinemaAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});


export const getGenres = (firstLetters: String[], genreName: String) => {
    const firstLettersString = firstLetters.join();
    
    return CinemaAxios.get('/genres', {
        params: {
          ...firstLettersString && ({firstLetters: firstLettersString.toLowerCase()}),
          name: genreName 
        }
      })
        .then((res) => res.data)
        .catch((error) => {
          console.log(error.message);
        });
}

export const addGenre = (genreName: String) => {
    let params = {
        "name": genreName
    }
     return CinemaAxios.post('/genres', params)
    .then(res => {
        console.log(res.data);        
    })
    .catch(error => {
        console.log(error.message);        
    })
}

export const deleteGenre = (param?: UUID) => {
    return CinemaAxios.delete('/genres/' + param )
    .then(() => {
        console.log('Deleted!');        
    })
    .catch(error => {
        console.log(error.message);        
    })
}

export const editGenre = (genre: Genre | null, genreName: String) => {
    return CinemaAxios.put("/genres/" + genre?.id, 
        {
            "name": genreName
        }
    )
    .then(() => {
        console.log("Edited"); 
    })
    .catch((error) => {
        console.log(error.message);        
    })
}

export default CinemaAxios;