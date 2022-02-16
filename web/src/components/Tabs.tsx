import { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'
import { Bubble } from './Bubble'
import { LikedMovieList } from './LikedMovieList'

import {
    Tabs as ChakraTabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
} from '@chakra-ui/react'
import { graphQLClient } from '../pages/api/graphql'

type Actor = {
    name: string,
}

type Crewmate = {
    department: string,
    name: string,
}

type CreditsProps = {
    cast: Actor[],
    crew: Crewmate[],
}

export function Tabs() {

    const { movie, likedMovies } = useMovie()

    const [directors, setDirectors] = useState('')
    const [cast, setCast] = useState('')
    const [producers, setProducers] = useState('')

    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        graphQLClient.executeOperation({
            query: `
                {
                    movieCredits(movieId: "${movie.id}") {
                        cast
                        directors
                        producers
                    }
                }
            `
        })
        .then(({ data }) => {

            const { cast, directors, producers } = data.movieCredits

            setCast(cast)
            setDirectors(directors)
            setProducers(producers)
        })
        .catch(err => {
            console.error(err)
        })
    }, [movie])

    return (
        <ChakraTabs
            id="1-tabs-id"
            variant="unstyled"
            display="flex"
            flexDir="column"
            alignItems="center"
            mt={{ sm: '1rem', md: '0' }}
            onChange={(index) => setTabIndex(index)}
        >
            <TabList justifyContent="center">
                <Tab
                    fontWeight="bold"
                    borderRadius="9999px"
                    _selected={{ color: 'dark.800', bg: 'primary.300' }}
                >
                    Credits
                </Tab>
                <Tab
                    fontWeight="bold"
                    borderRadius="9999px"
                    _selected={{ color: 'dark.800', bg: 'primary.300' }}
                >
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
