import { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'
import { Bubble } from './Bubble'
import { LikedMovieList } from './LikedMovieList'

import { useQuery } from 'react-query'
import { graphQLClient } from '../pages/api/graphql'

import {
    Tabs as ChakraTabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
} from '@chakra-ui/react'

type Actor = {
    name: string,
}

type Crewmate = {
    department: string,
    name: string,
}

type CreditsProps = {
    cast: string,
    directors: string,
    producers: string,
}

export function Tabs() {

    const { movie, likedMovies } = useMovie()
    const [tabIndex, setTabIndex] = useState(0)

    const { data: { cast, directors, producers } } = useQuery<CreditsProps, Error>(
        ['credits', movie],
        async () => {
            const { data } = await graphQLClient.executeOperation({
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

            return data.movieCredits
        }
    )

    return (
        <ChakraTabs
            id="1-tabs-id"
            variant="unstyled"
            display="flex"
            flexDir="column"
            alignItems="center"
            w="100%"
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
                    gridGap={{ sm: '1rem', md: '0' }}
                    px={{ sm: '0', md: 'inherit' }}
                    w={{ sm: '100%', md: 'initial' }}
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
