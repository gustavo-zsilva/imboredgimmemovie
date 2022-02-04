import { ApolloServer, gql } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../services/api'
import axios from 'axios'

type DeepLink = {
    link: string,
    name: string,
}

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
}

type Actor = {
    name: string,
}

type Crewmate = {
    department: string,
    name: string,
}

type CreditsResponse = {
    cast: Actor[],
    crew: Crewmate[],
}

const typeDefs = gql`
    type Genre {
        id: ID!
        name: String!
    }

    type Credits {
        cast: String
        directors: String
        producers: String
    }

    type WatchProvider {
        logo_path: String!
        provider_name: String!
        provider_id: Int!
        link: String
    }

    type Movie {
        title: String!
        id: ID!
        original_title: String!
        overview: String
        adult: Boolean
        release_date: String
        genres: [Genre!]
        vote_average: Float
        popularity: Float
        poster_path: String
        runtime: Int
    }

    type Query {
        randomMovie: Movie!
        watchProviders(
            movieId: ID!,
            countryCode: String!,
            movieSlug: String!,
        ): [WatchProvider!]
        movieRecommendations(
            movieId: ID!,
            last: Int,
        ): [Movie!]
        movieCredits(
            movieId: ID!,
        ): Credits
    }
`

const resolvers = {
    Query: {
        randomMovie: async () => {
            try {
                const page = Math.floor(Math.random() * 500)
                const movieIndex = Math.floor(Math.random() * 20)
    
                const response = await api.get('/movie/popular', {
                    params: {
                        page,
                    }
                })
    
                const randomMovieId = response.data.results[movieIndex].id
    
                const rawMovieDetails = await api.get(`/movie/${randomMovieId}`)
                const movie = rawMovieDetails.data
    
                return movie
            } catch (err) {
                throw err
            }
        },
        watchProviders: async (_, { movieId, countryCode, movieSlug }) => {
            try {
                const providersResponse = await api.get(`/movie/${movieId}/watch/providers`)
                const providers: Provider[] = providersResponse.data.results[countryCode]?.flatrate


                const deepLinksResponse = await axios.get(`http://localhost:3001`, {
                    params: {
                        countryCode: countryCode.toLowerCase(),
                        movie: movieSlug,
                    }
                })

                const deepLinks: DeepLink[] = deepLinksResponse.data.deepLinks

                if (!deepLinks) return providers

                const providersWithDeepLink = providers.map((provider) => {
                    if (!deepLinks.find(({ name }) => name === provider.provider_name)) return

                    const deepLink: DeepLink = deepLinks
                        .find(({ name }) => name === provider.provider_name)

                    return { ...provider, link: deepLink.link }
                })
                

                return providersWithDeepLink
            } catch (err) {
                throw err
            }
        },
        movieRecommendations: async (_, { movieId, last }) => {
            try {
                const response = await api.get(`/movie/${movieId}/recommendations`)
                const recommendedMovies = response.data.results.slice(0, last)

                return recommendedMovies
            } catch (err) {
                throw err
            }
        },
        movieCredits: async (_, { movieId }) => {
            try {
                const response = await api.get(`/movie/${movieId}/credits`)

                const { cast, crew } = response.data

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

                return {
                    cast: parsedCast,
                    directors: parsedDirectors,
                    producers: parsedProducers,
                }

            } catch (err) {
                throw err
            }
        },
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
}

export const graphQLClient = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})
const serverStart = graphQLClient.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await serverStart
    await graphQLClient.createHandler({
        path: '/api/graphql'
    })(req, res)
}