import { createContext, ReactNode, useState, KeyboardEvent } from "react";
import axios from 'axios'
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    movieRecommendations: MovieProps[],
    handleSearchMovie: () => void,
    handleGetRandomMovie: () => void,
    handleChangeMovie: (newMovie: MovieProps) => void,
}

type MovieProps = {
    title: string,
    id: number,
    original_title: string,
    overview: string,
    adult: boolean,
    release_date: string,
    runtime: number,
    genre_ids: number[],
    vote_average: number,
    popularity: number,
    poster_path: string,
}

type MovieProvider = {
    children: ReactNode,
    defaultMovie: MovieProps,
}

export function MovieProvider({ children, defaultMovie }: MovieProvider) {

    const [movie, setMovie] = useState<MovieProps>(() => defaultMovie)
    const [movieRecommendations, setMovieRecommendations] = useState<MovieProps[]>([])

    async function handleGetMovieRecommendations() {
        const response = await api.get(`/movie/${movie.id}/recommendations`)

        setMovieRecommendations(response.data.results.slice(0, 5))
    }

    function handleChangeMovie(newMovie: MovieProps) {
        setMovie(newMovie)
    }

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=watch ${movie.title}`)

        handleGetMovieRecommendations()

        console.log(movieRecommendations)
    }

    async function handleGetRandomMovie() {
        try {
            setMovieRecommendations([])

            const page = Math.floor(Math.random() * 500)
            const movie = Math.floor(Math.random() * 20)
            
            const response = await api.get('/movie/popular', {
                params: {
                    page,
                }
            })

            const randomMovie = response.data.results[movie]

            setMovie(randomMovie)
        } catch (err) {
            console.error(err)
        } 
    }

    return (
        <MovieContext.Provider
            value={{
                movie,
                handleSearchMovie,
                handleGetRandomMovie,
                movieRecommendations,
                handleChangeMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}