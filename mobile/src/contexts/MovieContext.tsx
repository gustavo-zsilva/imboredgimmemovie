import React, { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps | null,
    likedMovies: MovieProps[],
    isLazyMovieOn: boolean,
    isRefreshingLikedMovies: boolean,
    isCurrentMovieLiked: boolean,
    handleGetRandomMovie: () => void,
    handleGetLikedMovies: () => void,
    handleAddToLikedMovies: () => void,
    handleSetMovie: (movie: MovieProps) => void,
    handleLazyMovie: () => void,
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
    adult: boolean,
}

export function MovieProvider({ children }: MovieProviderProps) {

    const [movie, setMovie] = useState<MovieProps | null>(null)
    const [likedMovies, setLikedMovies] = useState<MovieProps[]>([])
    const [isRefreshingLikedMovies, setIsRefreshingLikedMovies] = useState(false)
    const [isLazyMovieOn, setIsLazyMovieOn] = useState(false)
    const isCurrentMovieLiked = likedMovies.some(({ id }) => id === movie?.id)
    let intervalId: NodeJS.Timeout
    
    useEffect(() => {
        handleGetRandomMovie()
        handleGetLikedMovies()
    }, [])

    useEffect(() => {
        if (!isLazyMovieOn) return clearInterval(intervalId)

        intervalId = setInterval(() => {
            handleGetRandomMovie()
        }, 6000)

        return () => clearInterval(intervalId)
    }, [isLazyMovieOn])

    function handleGetRandomMovie() {
        setMovie(null)

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
            adult: rawDetails.data.adult,
        }
        setMovie(movieDetails)
    }

    async function handleAddToLikedMovies() {
        if (isCurrentMovieLiked) {
            const newLikedMovies = likedMovies.filter(({ id }) => id !== movie?.id)
            setLikedMovies(newLikedMovies)
            return
        }

        try {
            setLikedMovies([...likedMovies, movie])
            await AsyncStorage.setItem('@ibgm_likedMovies', JSON.stringify([...likedMovies, movie]))
        } catch (err) {
            console.error(err)
        }
    }

    async function handleGetLikedMovies() {
        try {
            setIsRefreshingLikedMovies(true)
            const rawLikedMovies = await AsyncStorage.getItem('@ibgm_likedMovies')

            if (rawLikedMovies !== null) {
                setLikedMovies(JSON.parse(rawLikedMovies))
            }
        } catch (err) {
            console.error(err)
        }

        setIsRefreshingLikedMovies(false)
    }

    function handleSetMovie(movie: MovieProps) {
        setMovie(movie)
    }

    function handleLazyMovie() {
        if (isLazyMovieOn) {
            return setIsLazyMovieOn(false)
        }

        setIsLazyMovieOn(true)
    }

    return (
        <MovieContext.Provider
            value={{
                movie,
                likedMovies,
                isLazyMovieOn,
                isRefreshingLikedMovies,
                isCurrentMovieLiked,
                handleGetRandomMovie,
                handleGetLikedMovies,
                handleAddToLikedMovies,
                handleSetMovie,
                handleLazyMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}