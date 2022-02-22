import { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";

export function useConfig() {
    return useContext(ConfigContext)
}