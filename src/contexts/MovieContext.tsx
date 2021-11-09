import { createContext, ReactNode, useState } from "react";
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

export function MovieProvider({ children, defaultMovie }: MovieProvider) {

    const [movie, setMovie] = useState<MovieProps>(() => defaultMovie)

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=${movie.Title} watch`)
    }

    async function getNewMovie() {
        const response = await api.get('/', {
            params: {
                i: 'tt1285016',
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