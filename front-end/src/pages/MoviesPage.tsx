import { ChangeEvent, useEffect, useState } from "react";
import Button from "../components/shared/Button/Button";
import MovieCardList from "../components/ui/Movie/MovieCard/MovieCardList";
import Movie from "../models/Movie";
import Modal, { ModalType } from "../components/shared/Modal/Modal";
import AddMovieForm from "../components/ui/Movie/Forms/AddMovieForm";
import { validateNumberInput, validateTextInput, validateUrlInput } from "../utils/validateInput";
import EditMovieForm from "../components/ui/Movie/Forms/EditMovieForm";
import DeleteConfirmation from "../components/shared/Form/DeleteConfirmation";
import SearchFilterForm from "../components/shared/Search/SearchFilterForm";
import { addNewMovie, getMovies } from "../services/MovieService";

let initialMovie = {
    id: '',
    title: '',
    duration: 0,
    image: '',
    genres: []
}

let initialAddMovie = {
    title: '',
    duration: 0,
    image: '',
    genreIds: []
}

let initialEditMovie = {
    id: '',
    title: '',
    duration: 0,
    image: '',
    genreIds: []
}

const MoviesPage = () => {

const [movies, setMovies] = useState<Movie[]>([]);
const [modalType, setModalType] = useState<ModalType>(''); 
const [warning, setWarning] = useState('');  
// const [movie, setMovie] = useState<Movie>(initialMovie)
const [editMovie, setEditMovie] = useState<Movie>(initialEditMovie);
const [addMovie, setAddMovie] = useState<Movie>(initialAddMovie);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [isButtonDisabled, setIsButtonDisabled] = useState(true);
const [checkedFilterLetters, setCheckedFilterLetters] = useState<string[]>([]);
const [searchTitle, setSearchTitle] = useState('')

useEffect(() => {
    fetchMovies();
    
}, []);


useEffect(() => {
    console.log('Selected movie:', selectedMovie);
}, [selectedMovie]);

useEffect(() => {
    console.log('use effect:', addMovie);
    
}, [addMovie])


const fetchMovies = () => {
    getMovies(checkedFilterLetters, searchTitle)
    .then((data: Movie[]) => {
        setMovies(data)        
    })
    .catch(error => {
        console.log(error.data);        
    })
}


const addInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    
        const newMovie : Movie = { ...addMovie, [name]: value } 
        setAddMovie(newMovie);
}   

const editInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (selectedMovie) {
        const movieToEdit : Movie = {...selectedMovie, [name]: value};
        setEditMovie(movieToEdit);
    }
}

const addSelectGenreHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenreIds = Array.from(e.target.selectedOptions).map(option => option.value);
    setAddMovie(prevMovie => ({
        ...prevMovie,
        genreIds: selectedGenreIds
    }));
}

const editSelectGenreHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGenreIds = Array.from(e.target.selectedOptions).map(option => option.value);
    console.log(selectedGenreIds);
    setEditMovie(prevMovie => ({
        ...prevMovie,
        genreIds: selectedGenreIds
    }));
}

const searchInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
    
    setIsButtonDisabled(false);
}

const validateMovieInput = (movie: Movie) => {    
    const textValidation = validateTextInput(movie?.title, {length: 30});
    
    const durationValidation = validateNumberInput(movie?.duration);
    
    const imageValidation = validateUrlInput(movie.image || '');

    if (!textValidation.isValid) {        
        setWarning(textValidation.errorMessage);
        return false;
    } 
    
    if (!durationValidation.isValid) {
        setWarning(durationValidation.errorMessage);
        return false;
    } 

    if (!imageValidation) {
        setWarning('Image URL is not valid');
        return false;               
    }  

    if(textValidation.isValid && durationValidation && imageValidation) {   
        return true;
    }   
}

const openModalHandler = (modalType: ModalType, movie?: Movie) => {
    setModalType(modalType);
    console.log('logging movie:', movie);
        
    if (movie != null) {
        setSelectedMovie(movie);        
    }
}

const closeModalHandler = () => {
    setModalType('');
    setSelectedMovie(null);
    setWarning('');
}

const deleteHandler = () => {
    const newMovies = movies.filter(m => m.id !== selectedMovie?.id);
    setMovies(newMovies);
    setSelectedMovie(null);
    closeModalHandler();
}

const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateMovieInput(editMovie);

    if (isValid) {        
        console.log(editMovie);  
        closeModalHandler();
    }
}

const addHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateMovieInput(addMovie); 
    console.log(addMovie);        
    if (isValid) {
        addNewMovie(addMovie); 
        fetchMovies();      
        closeModalHandler();     
    }
}

const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovies();
}

const letterSelectionHandler = (selectedLetter: string) => {
    if(checkedFilterLetters.includes(selectedLetter)) {
        setCheckedFilterLetters(() => {
            delete checkedFilterLetters[checkedFilterLetters.indexOf(selectedLetter)]
            return [...checkedFilterLetters].filter(Boolean)
        })
    } else {
        setCheckedFilterLetters([...checkedFilterLetters, selectedLetter])
    }      
    setIsButtonDisabled(false);                  
} 

    return (
        <main>      
            <SearchFilterForm onFormSubmit={searchHandler} value={searchTitle} onInput={searchInputHandler}  checked={checkedFilterLetters} onChange={letterSelectionHandler} isDisabled={isButtonDisabled} />
            
            <Button text='Add new movie' type='button' clickHandler={() => openModalHandler('add')} />
            
            <MovieCardList movies={movies}
            onOpenDelete={(movie: Movie) => openModalHandler('delete', movie)} 
            onOpenEdit={(movie: Movie) => openModalHandler('edit', movie)} />         
            
            <Modal isOpen={modalType !== ''} warningMessage={warning} onClick={closeModalHandler}>
                {
                modalType === 'add' ? 
                <AddMovieForm onFormSubmit={(e) => addHandler(e)} onSelect={addSelectGenreHandler} movie={addMovie} value={''} onChange={addInputHandler} />
                :
                modalType === 'edit' ?
                <EditMovieForm onFormSubmit={(e) => editHandler(e)} movie={editMovie} onChange={editInputHandler} onSelect={editSelectGenreHandler} /> :
                modalType === 'delete' ? 
                <DeleteConfirmation onConfirm={deleteHandler} onCancel={closeModalHandler} /> 
                : 
                <></>
                }
            </Modal>          
        </main>
    )
} 

export default MoviesPage;