import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export function useMovie() {
    return useContext(MovieContext)
}