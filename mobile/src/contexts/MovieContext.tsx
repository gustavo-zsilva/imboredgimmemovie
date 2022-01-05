import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps | null,
    handleGetRandomMovie: () => void,
}

type MovieProviderProps = {
    children: ReactNode,
}

type Genres = {
    id: string,
    name: string,
}[]

type MovieProps = {
    title: string,
    vote_average: number,
    id: number,
    poster_path: string | null,
    overview: string,
    genres: Genres,
    release_date: string,
    runtime: number,
}

export function MovieProvider({ children }: MovieProviderProps) {

    const [movie, setMovie] = useState<MovieProps | null>(null)

    
    useEffect(() => {
        handleGetRandomMovie()
    }, [])

    function handleGetRandomMovie() {
        const randomPage = Math.floor(Math.random() * 500)
        const randomMovie = Math.floor(Math.random() * 20)

        
        api.get('/movie/popular', {
            params: {
                page: randomPage,
            }
        }).then(response => {
            const id = response.data.results[randomMovie].id
            handleGetMovieDetails(id)
        }).catch(err => {
            console.error(err)
        })
    }

    async function handleGetMovieDetails(id: number) {
        const rawMovieDetails = await api.get<MovieProps>(`/movie/${id}`)
        setMovie(rawMovieDetails.data)
    }

    return (
        <MovieContext.Provider
            value={{
                movie,
                handleGetRandomMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}