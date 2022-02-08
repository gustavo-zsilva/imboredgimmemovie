import { createContext, ReactNode, useState, useEffect, useRef, useCallback } from "react";
import { graphQLClient } from "../pages/api/graphql";
import { setCookie } from "nookies"
import { addDoc, collection } from 'firebase/firestore'
import { db } from "../lib/firebase";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
    movieRecommendations: RecommendedMovie[],
    likedMovies: MovieProps[],
    isCurrentMovieLiked: boolean,
    isLazyMovie: boolean,
    userLocation: Location,
    handleSearchMovie: () => void,
    handleGetRandomMovie: () => void,
    handleGetMovieRecommendations: () => void,
    handleGetMovie: (id: number) => void,
    handleChangeMovie: (newMovie: MovieProps) => void,
    handleAddToLikedMovies: () => void,
    handleClearLikedMovies: () => void,
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

type RecommendedMovie = {
    id: number,
    title: string,
    poster_path: string,
}

type Location = {
    country: string,
    countryCode: string,
}

type MovieProvider = {
    children: ReactNode,
    defaultMovie: MovieProps,
    location: Location,
    initialLikedMovies: MovieProps[],
}

export function MovieProvider({
    children,
    defaultMovie,
    location,
    initialLikedMovies,
}: MovieProvider) {
    
    const [movie, setMovie] = useState<MovieProps>(defaultMovie)
    const [movieRecommendations, setMovieRecommendations] = useState<RecommendedMovie[]>([])
    const [likedMovies, setLikedMovies] = useState<MovieProps[]>(initialLikedMovies)
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
        // addToFirestore()
        // setCookie(null, '@ibgm_liked_movies', JSON.stringify(likedMovies), {
        //     secure: true,
        // })
        
    }, [likedMovies])

    async function addToFirestore() {
        try {
            const docRef = await addDoc(collection(db, "likedMovies"), {
                name: 'Googas',
                age: 16,
            })

            console.log('Document added with id: ', docRef.id)
        } catch (err) {
            console.error('ERR ON FIRESTORE:: ', err)
        }
    }

    const handleGetRandomMovie = useCallback(async () => {
        try {
            setMovieRecommendations([])

            const { data } = await graphQLClient.executeOperation({
                query: `
                    {
                        randomMovie {
                            title
                            id
                            original_title
                            overview
                            adult
                            release_date
                            genres {
                                name
                                id
                            }
                            vote_average
                            popularity
                            poster_path
                            runtime
                        }
                    }
                `
            })

            const movie = data.randomMovie
            
            setMovie(movie)
        } catch (err) {
            console.error(err)
        } 
    }, []) 

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
        try {
            const { data } = await graphQLClient.executeOperation({
                query: `
                    {
                        movieRecommendations(movieId: "${movie.id}", last: 5) {
                            id
                            title
                            poster_path
                        }
                    }
                `
            })

            setMovieRecommendations(data.movieRecommendations)
        } catch (err) {
            console.error(err)
        }
    }

    function handleChangeMovie(newMovie: MovieProps) {
        setMovie(newMovie)
    }

    async function handleGetMovie(id: number) {
        try {
            const { data } = await graphQLClient.executeOperation({
                query: `
                    {
                        movie(movieId: "${id}") {
                            title
                            id
                            original_title
                            overview
                            adult
                            release_date
                            genres {
                                name
                                id
                            }
                            vote_average
                            popularity
                            poster_path
                            runtime
                        }
                    }
                `
            })

            setMovie(data.movie)
        } catch (err) {
            console.error(err)
        }
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

    function handleClearLikedMovies() {
        setLikedMovies([])
    }

    return (
        <MovieContext.Provider
            value={{
                movie,
                handleSearchMovie,
                handleGetRandomMovie,
                movieRecommendations,
                handleGetMovieRecommendations,
                handleChangeMovie,
                handleGetMovie,
                handleAddToLikedMovies,
                handleClearLikedMovies,
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