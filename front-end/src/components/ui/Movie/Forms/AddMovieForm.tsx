import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../shared/Button/Button";
import Form from "../../../shared/Form/Form";
import Input from "../../../shared/Input/Input";
import Movie from "../../../../models/Movie";
import Genre from "../../../../models/Genre";
import { getGenres } from "../../../../services/GenreService";

interface AddMovieForm {    
    movie: Movie
    value: string | number
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
    onSelect: (e: ChangeEvent<HTMLSelectElement>) => void
}

const AddMovieForm = ({movie, onSelect, onFormSubmit, onChange} : AddMovieForm) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        const fetchGenres = async () => {
            const genres = await getGenres([],'')
            setGenres(genres)
            console.log(genres);            
        }
        fetchGenres()
    }, [])
    
    return (
        <Form onFormSubmit={onFormSubmit}>
            <>
            <label className='label' htmlFor="addMovieName">Title: </label><br/>
            <Input type='text' name='title' placeholder="title" value={movie.title} onChange={onChange} /><br/>             
            <label className='label' htmlFor="duration">Duration: </label><br/>
            <Input type='number' name='duration' placeholder="duration" value={movie.duration} onChange={onChange} /><br/>
            <label className='label' htmlFor="img">Image URL: </label><br/>
            <Input type='text' name='image' placeholder="image URL" value={movie.image} onChange={onChange} /> <br/>  
            <select onChange={onSelect} multiple size={genres.length}>
            {genres &&
                genres.map((genre: Genre) => 
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                )
            }
        </select>
            <div>
            <Button text='Add' type='submit' /> 
            </div>
            </>            
        </Form>
    )
}

export default AddMovieForm;