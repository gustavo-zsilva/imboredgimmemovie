import { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'
import { Bubble } from './Bubble'
import { LikedMovieList } from './LikedMovieList'

import { api } from '../services/api'
import {
    Tabs as ChakraTabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react'

type Actors = {
    name: string,
}

type Crewmate = {
    department: string,
    name: string,
}

type CreditsProps = {
    cast: Actors[],
    crew: Crewmate[],
}

type Genre = {
    id: number,
    name: string,
}

type GenreListProps = {
    genres: Genre[],
}

export function Tabs() {

    const { movie } = useMovie()

    const [directors, setDirectors] = useState('')
    const [cast, setCast] = useState('')
    const [producers, setProducers] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {
        api.get<CreditsProps>(`/movie/${movie.id}/credits`)
        .then(response => {

            const { cast, crew } = response.data

            const parsedGenres = movie.genres.map(genre => genre.name)
                .join(', ')

            const parsedCast = cast.map(({ name }) => name)
                .slice(0, 3)
                .join(', ')
            
            const parsedDirectors = crew.map(({ department, name }) => department === 'Directing' && name)
                .filter(Boolean)
                .slice(0, 3)
                .join(', ')

            const parsedProducers = crew.map(({ department, name }) => department === 'Production' && name)
                .filter(Boolean)
                .slice(0, 3)
                .join(', ')

            setGenres(parsedGenres)
            setCast(parsedCast)
            setDirectors(parsedDirectors)
            setProducers(parsedProducers)
            
        }).catch(err => {
            console.error(err)
        })
    }, [movie])

    return (
        <ChakraTabs
            variant="solid-rounded"
            colorScheme="primary"
            display="flex"
            flexDir="column"
            alignItems="center"
            mt={{ sm: '1rem', md: '0' }}
        >
            <TabList justifyContent="center">
                <Tab>Credits</Tab>
                <Tab>Movies</Tab>
            </TabList>

            <TabPanels display="inherit">
                <TabPanel
                    m="auto"
                    display={{ sm: 'grid', md: 'initial' }}
                    gridTemplateColumns={{ sm: '1fr 1fr', md: '1fr' }}
                    gridGap={{ sm: '1rem', md: '0' }}
                >
                    <Bubble title="Cast" description={cast} />
                    <Bubble title="Directors" description={directors} />
                    <Bubble title="Producers" description={producers} />
                    <Bubble title="Genres" description={genres} />
                </TabPanel>
                <TabPanel
                    w="100%"
                    m={{ sm: "auto", lg: "auto 2rem" }}
                >
                    <LikedMovieList />
                </TabPanel>
            </TabPanels>
        </ChakraTabs>
    )
}
