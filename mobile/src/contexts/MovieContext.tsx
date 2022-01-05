import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps | null,
    handleGetRandomMovie: () => void,
    handleAddToLikedMovies: () => void,
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
    const [likedMovies, setLikedMovies] = useState<MovieProps[]>([])

    
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
        const rawDetails = await api.get<MovieProps>(`/movie/${id}`)
        const movieDetails = {
            title: rawDetails.data.title,
            overview: rawDetails.data.overview,
            id: rawDetails.data.id,
            poster_path: rawDetails.data.poster_path,
            release_date: rawDetails.data.release_date,
            runtime: rawDetails.data.runtime,
            vote_average: rawDetails.data.vote_average,
            genres: rawDetails.data.genres,
        }
        setMovie(movieDetails)
    }

    async function handleAddToLikedMovies() {
        if (likedMovies.some(({ id }) => movie.id === id)) {
            const newLikedMovies = likedMovies.filter(({ id }) => id !== movie.id)
            setLikedMovies(newLikedMovies)
            return
        }

        try {
            await AsyncStorage.setItem('@ibgm_likedMovies', JSON.stringify([...likedMovies, movie]))
            setLikedMovies([...likedMovies, movie])
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <MovieContext.Provider
            value={{
                movie,
                handleGetRandomMovie,
                handleAddToLikedMovies,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}