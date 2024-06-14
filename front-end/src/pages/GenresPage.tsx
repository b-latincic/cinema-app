
import { ChangeEvent, useEffect, useState } from "react";
import Genre from "../models/Genre";
import GenreCardList from "../components/ui/Genre/GenreCard/GenreCardList";
import Button from "../components/shared/Button/Button";
import Modal, { ModalType } from "../components/shared/Modal/Modal";
import AddGenreForm from "../components/ui/Genre/GenreCard/Forms/AddGenreForm";
import EditGenreForm from "../components/ui/Genre/GenreCard/Forms/EditGenreForm";
import { containsDuplicates, validateTextInput } from "../utils/validateInput";
import DeleteConfirmation from "../components/shared/Form/DeleteConfirmation";
import SearchFilterForm from "../components/shared/Search/SearchFilterForm";
import { addGenre, deleteGenre, editGenre, getGenres } from "../services/GenreService";

type OperationType = 'add' | 'edit'

const GenresPage = () => {
    const [genres, setGenres] = useState<Genre[]>([]); 
    const [searchGenreName, setSearchGenreName] = useState('')
    const [genreName, setGenreName] = useState('');
    const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
    const [modalType, setModalType] = useState<ModalType>('');
    const [warning, setWarning] = useState('');
    const [checkedFilterLetters, setCheckedFilterLetters] = useState<string[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  
    useEffect(() => {
        fetchGenres();      
    }, [])
    
    const fetchGenres = () => {
        getGenres(checkedFilterLetters, searchGenreName)
        .then((data: Genre[]) => {
            setGenres(data);                              
        })
        .catch(error => {
            console.log(error.data);                
        })    
    }


    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchGenreName(e.target.value);
        setIsButtonDisabled(false);
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {        
        setGenreName(e.target.value);
    }

    const openModalHandler = (modalType: ModalType, genre?: Genre) => {
        setModalType(modalType);
        
        if (genre != null) {
            setSelectedGenre(genre);
        }     
    }

    const closeModalHandler = () => {
        setModalType('');
        setGenreName('');
        setWarning('');
        setSelectedGenre(null);        
    }     

    const deleteHandler = async () => {
        console.log(selectedGenre);
        await deleteGenre(selectedGenre?.id);
        fetchGenres();
        closeModalHandler();
    }

    const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateGenreInput(e, 'edit');

        if (isValid) {
            await editGenre(selectedGenre, genreName);            
            fetchGenres();
            closeModalHandler();
        }
    }

    const addHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateGenreInput(e, 'add');

        if (isValid) {
            await addGenre(genreName);           
            fetchGenres();
            closeModalHandler(); 
        }
    }

    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchGenres();   
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

    const validateGenreInput = (e:React.FormEvent<HTMLFormElement>, operationType: OperationType) => {
        e.preventDefault();

        const textValidation = validateTextInput(genreName);
        const genreNames = genres.map((g) => g.name);
        const isDuplicate = containsDuplicates(genreNames, genreName);

        if(!textValidation.isValid) {
            setWarning(textValidation.errorMessage);
            return false;
        }

        if (isDuplicate) {
            setWarning("Genre already exists!");
            return false;
        }

        if (textValidation.isValid && !isDuplicate) {
            return true;
        }           
    }

    
    return(
        <main>
            <SearchFilterForm onFormSubmit={searchHandler} value={searchGenreName} onInput={searchInputHandler}  checked={checkedFilterLetters} onChange={letterSelectionHandler} isDisabled={isButtonDisabled} />
           
            <Button text='Add new genre' type='button' clickHandler={() => openModalHandler('add')} />

            <GenreCardList 
            genres={genres} 
            onOpenDelete={(genre:Genre) => openModalHandler('delete', genre)} 
            onOpenEdit={(genre: Genre) => openModalHandler('edit', genre)}
            />
           
            <Modal isOpen={modalType !== ''} warningMessage={warning} onClick={closeModalHandler}>
                {
                modalType === 'add' ? 
                <AddGenreForm onFormSubmit={(e) => addHandler(e)} value={genreName} onChange={inputHandler} /> : 
                modalType === 'edit' ? 
                <EditGenreForm  onFormSubmit={(e) => editHandler(e)} value={genreName} onChange={inputHandler} placeholder={selectedGenre?.name} /> :
                modalType === 'delete' ? <DeleteConfirmation onConfirm={deleteHandler} onCancel={closeModalHandler} /> : <></>
                }
            </Modal>            
        </main>
    )
}

export default GenresPage;
