import { createContext, useState } from "react";

export const ConfigContext = createContext({})

export function ConfigProvider() {
    const [platforms, setPlatforms] = useState([])
    const [genres, setGenres] = useState([])

    return (
        <ConfigContext.Provider
            value={{

            }}
        >

        </ConfigContext.Provider>
    )
}