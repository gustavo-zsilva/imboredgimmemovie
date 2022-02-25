import { createContext, ReactNode, useEffect, useState } from "react";

export const ConfigContext = createContext({} as ConfigContextProps)

type ConfigContextProps = {
    providers: number[],
    genres: number[],
    handleAddGenre: (id: number) => void,
    handleRemoveGenre: (id: number) => void,
    handleAddProvider: (id: number) => void,
    handleRemoveProvider: (id: number) => void,
    handleAddAllProviders: (idList: number[]) => void,
    handleRemoveAllProviders: () => void,
}

type ConfigProviderProps = {
    children: ReactNode,
}

export function ConfigProvider({ children }: ConfigProviderProps) {
    const [providers, setProviders] = useState<number[]>([])
    const [genres, setGenres] = useState<number[]>([])

    function handleAddGenre(id: number) {
        setGenres([...genres, id])
    }

    function handleRemoveGenre(id: number) {
        const newGenres = genres.filter(genre => genre !== id)
        setGenres(newGenres)
    }

    function handleAddProvider(id: number) {
        setProviders([...providers, id])
    }

    function handleRemoveProvider(id: number) {
        const newProviders = providers.filter(provider => provider !== id)
        setProviders(newProviders)
    }

    function handleAddAllProviders(idList: number[]) {
        setProviders(idList)
    }

    function handleRemoveAllProviders() {
        setProviders([])
    }

    return (
        <ConfigContext.Provider
            value={{
                providers,
                genres,
                handleAddGenre,
                handleRemoveGenre,
                handleAddProvider,
                handleRemoveProvider,
                handleAddAllProviders,
                handleRemoveAllProviders,
            }}
        >
            {children}
        </ConfigContext.Provider>
    )
}