import Genre from "./Genre"

type Movie = {
    id?: string
    duration: number
    title: string
    image: string
    originalTitle?: string
    genres?: Genre[]
    genreIds?: string[]
}

export default Movie;