import { createContext, ReactNode, useState, useEffect, useRef } from "react";
import { api } from "../services/api";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    movieRecommendations: MovieProps[],
    likedMovies: MovieProps[],
    isCurrentMovieLiked: boolean,
    isLazyMovie: boolean,
    userLocation: Location,
    handleSearchMovie: () => void,
    handleGetRandomMovie: () => void,
    handleChangeMovie: (newMovie: MovieProps) => void,
    handleAddToLikedMovies: () => void,
    handleLazyMovie: () => void,
}

type Genre = {
    id: number,
    name: string,
}

type MovieProps = {
    title: string,
    id: number,
    original_title: string,
    overview: string,
    adult: boolean,
    release_date: string,
    genres: Genre[],
    vote_average: number,
    popularity: number,
    poster_path: string,
    runtime: number | null,
}

type Location = {
    country: string,
    countryCode: string,
}

type MovieProvider = {
    children: ReactNode,
    defaultMovie: MovieProps,
    location: Location,
}

export function MovieProvider({ children, defaultMovie, location }: MovieProvider) {
    
    const [movie, setMovie] = useState<MovieProps>(defaultMovie)
    const [movieRecommendations, setMovieRecommendations] = useState<MovieProps[]>([])
    const [likedMovies, setLikedMovies] = useState<MovieProps[]>([])
    const [isLazyMovie, setIsLazyMovie] = useState(false)
    const [userLocation, setUserLocation] = useState<Location>(location)

    const isCurrentMovieLiked = likedMovies.some(({ id }) => id === movie.id)
    const intervalId = useRef<NodeJS.Timeout>(null)


    const playAudio = (url: string) => {
        const audio = new Audio(url)
        audio.volume = 0.1
        audio.play()
    }
    
    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('ibgm.likedMovies')) || []
        setLikedMovies(savedMovies)
    }, [])

    useEffect(() => {
        localStorage.setItem('ibgm.likedMovies', JSON.stringify(likedMovies))
    }, [likedMovies])

    async function handleGetRandomMovie() {
        try {
            setMovieRecommendations([])

            const page = Math.floor(Math.random() * 500)
            const movieIndex = Math.floor(Math.random() * 20)
            
            const randomMoviePage = await api.get('/movie/popular', {
                params: {
                    page,
                }
            })

            const randomMovieId = randomMoviePage.data.results[movieIndex].id

            // Actual movie data
            const rawMovieDetails = await api.get(`/movie/${randomMovieId}`, {
                params: {
                    language: userLocation.countryCode === 'BR'
                        ? 'pt-BR'
                        : userLocation.countryCode.toLowerCase()
                }
            })
            const movie = rawMovieDetails.data

            setMovie(movie)
        } catch (err) {
            console.error(err)
        } 
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
                userLocation,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}