import { createContext, ReactNode, useState } from "react";
import axios from 'axios'
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    handleSearchMovie: () => void,
    getNewMovie: () => void,
}

type MovieProps = {
    Title: string,
    Year: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Actors: string,
    Plot: string,
    Awards: string,
    Poster: string,
}

type MovieProvider = {
    children: ReactNode,
    defaultMovie: MovieProps,
}

type TMDBMovieProps = {
    title: string,
}

type TMDBPageProps = {
    results: TMDBMovieProps[]
}

export function MovieProvider({ children, defaultMovie }: MovieProvider) {

    const [movie, setMovie] = useState<MovieProps>(() => defaultMovie)

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=watch ${movie.Title}`)
    }

    async function getNewMovie() {

        const page = Math.floor(Math.random() * 500)
        const movie = Math.floor(Math.random() * 20)

        const randomPage = await axios.get<TMDBPageProps>(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                page,
            }
        })

        const randomMovie = randomPage.data.results[movie].title

        const response = await api.get('/', {
            params: {
                t: randomMovie,
                type: 'movie',
            }
        })

        setMovie(response.data)
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