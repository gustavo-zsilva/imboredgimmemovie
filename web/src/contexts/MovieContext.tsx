import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    movieRecommendations: MovieProps[],
    likedMovies: MovieProps[],
    isCurrentMovieLiked: boolean,
    isLazyMovie: boolean,
    handleSearchMovie: () => void,
    handleGetRandomMovie: () => void,
    handleChangeMovie: (newMovie: MovieProps) => void,
    handleAddToLikedMovies: () => void,
    handleLazyMovie: () => void,
}

type MovieProps = {
    title: string,
    id: number,
    original_title: string,
    overview: string,
    adult: boolean,
    release_date: string,
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
    const [likedMovies, setLikedMovies] = useState<MovieProps[]>([])
    const [isLazyMovie, setIsLazyMovie] = useState(false)
    const isCurrentMovieLiked = likedMovies.some(({ id }) => id === movie.id)
    const intervalId = useRef<NodeJS.Timeout>(null)
    const playAudio = (url: string) => {
        const audio = new Audio(url)
        audio.volume = 0.1
        audio.play()
    }
    
    function handleLazyMovie() {
        if (isLazyMovie) {
            setIsLazyMovie(false)
            clearInterval(intervalId.current)
            return
        }

        playAudio('/assets/long-pop.wav')
        intervalId.current = setInterval(() => {
            handleGetRandomMovie()
        }, 8000)

        setIsLazyMovie(true)
    }

    async function handleGetMovieRecommendations() {
        const response = await api.get(`/movie/${movie.id}/recommendations`)

        setMovieRecommendations(response.data.results.slice(0, 5))
    }

    function handleChangeMovie(newMovie: MovieProps) {
        setMovie(newMovie)
    }

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=watch ${movie.title}`)
        
        playAudio('/assets/dry-pop.wav')
        handleGetMovieRecommendations()
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

    function handleAddToLikedMovies() {
        if (likedMovies.some(({ id }) => id === movie.id)) {
            const newLikedMovies = likedMovies.filter(({ id }) => id !== movie.id)
            setLikedMovies(newLikedMovies)
            playAudio('/assets/electric-pop.wav')
            return
        }

        setLikedMovies([...likedMovies, movie])
        playAudio('/assets/soap-bubble-pop.wav')
    }

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('ibgm.likedMovies')) || []
        setLikedMovies(savedMovies)
    }, [])

    useEffect(() => {
        localStorage.setItem('ibgm.likedMovies', JSON.stringify(likedMovies))
    }, [likedMovies])

    return (
        <MovieContext.Provider
            value={{
                movie,
                handleSearchMovie,
                handleGetRandomMovie,
                movieRecommendations,
                handleChangeMovie,
                handleAddToLikedMovies,
                likedMovies,
                isCurrentMovieLiked,
                handleLazyMovie,
                isLazyMovie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}