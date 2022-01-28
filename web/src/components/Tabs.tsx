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
    Text,
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

export function Tabs() {

    const { movie, likedMovies } = useMovie()

    const [directors, setDirectors] = useState('')
    const [cast, setCast] = useState('')
    const [producers, setProducers] = useState('')
    const [genres, setGenres] = useState('')

    const [tabIndex, setTabIndex] = useState(0)

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
            id="1-tabs-id"
            variant="solid-rounded"
            colorScheme="primary"
            display="flex"
            flexDir="column"
            alignItems="center"
            mt={{ sm: '1rem', md: '0' }}
            onChange={(index) => setTabIndex(index)}
            
        >
            <TabList justifyContent="center">
                <Tab>Credits</Tab>
                <Tab>
                    Movies
                    {tabIndex === 1 &&
                        <Text ml=".4rem" fontWeight="500">
                            {likedMovies.length}
                        </Text>
                    }
                </Tab>
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
