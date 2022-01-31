import { ApolloServer, gql } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '../../services/api'

const typeDefs = gql`
    type Genre {
        id: ID!,
        name: String!,
    }

    type Movie {
        title: String!,
        id: ID!,
        original_title: String!,
        overview: String,
        adult: Boolean,
        release_date: String,
        genres: [Genre!],
        vote_average: Float,
        popularity: Float,
        poster_path: String,
        runtime: Int,
    }

    type Query {
        randomMovie: Movie!
    }
`

const resolvers = {
    Query: {
        randomMovie: async () => {
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
        }
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