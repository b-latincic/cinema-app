import { ChangeEvent, useEffect, useState } from "react"
import Button from "../../../shared/Button/Button"
import Form from "../../../shared/Form/Form"
import Input from "../../../shared/Input/Input"
import Movie from "../../../../models/Movie"
import { getGenres } from "../../../../services/GenreService"
import Genre from "../../../../models/Genre"

interface EditMovieForm {
    movie: Movie
    onFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void 
    onSelect: (e: ChangeEvent<HTMLSelectElement>) => void
    placeholder?: string
}

const EditMovieForm = ({movie, onFormSubmit, onChange, onSelect} : EditMovieForm) => {
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
        <label className="label" htmlFor="addMovieName">Enter movie name: </label><br/>
        <Input type='text' name='title' value={movie.title} onChange={onChange} /><br/>             
        <label className="label" htmlFor="duration">Enter movie duration: </label><br/>
        <Input type='number' name='duration' value={movie.duration} onChange={onChange} /><br/>
        <label className="label" htmlFor="img">Enter image URL: </label><br/>
        <Input type='text' name='img' value={movie.image} onChange={onChange} /> <br/>  
        <select onChange={onSelect} multiple size={genres.length}>
            {genres &&
                genres.map((genre: Genre) => 
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                )
            }
        </select>
        <div>            
            <Button text='Edit' type='submit' /> 
        </div>
        </>            
    </Form>
    )
}

export default EditMovieForm