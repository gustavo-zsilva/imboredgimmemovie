import { createContext, ReactNode, useState, KeyboardEvent } from "react";
import axios from 'axios'
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    handleSearchMovie: () => void,
    getNewMovie: () => void,
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

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=watch ${movie.title}`)
    }

    async function getNewMovie() {
        try {
            const page = Math.floor(Math.random() * 500)
            const movie = Math.floor(Math.random() * 20)
            
            const response = await api.get('/movie/popular', {
                params: {
                    page,
                    api_key: process.env.API_KEY,
                }
            })

            const randomMovie = response.data.results[movie]

            console.log(randomMovie)

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
                getNewMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}