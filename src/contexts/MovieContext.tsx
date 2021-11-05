import { createContext, ReactNode, useState } from "react";

export const MovieContext = createContext({} as MovieContextProps)

type MovieContextProps = {
    movie: MovieProps,
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

    return (
        <MovieContext.Provider
            value={{
                movie,
            }}
        >
            {children}
        </MovieContext.Provider>
    )
}