import { loadConfig } from './app/common/helper/config.helper'
import { ApolloServer } from '@apollo/server'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/typeDefs'
import { startStandaloneServer } from '@apollo/server/standalone'
import jwt from 'jsonwebtoken'

loadConfig()
const port = Number(process.env.PORT) ?? 4000

const initApp = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: port },
        context: async ({ req }) => {
            const token = req.headers.authorization || ''
            try {
                const user = jwt.verify(
                    token.replace('Bearer ', ''),
                    process.env.JWT_SECRET!
                )
                return { user }
            } catch {
                return { user: null }
            }
        },
    })

    console.log(`🚀  Server ready at: ${url}`)
}

void initApp()
