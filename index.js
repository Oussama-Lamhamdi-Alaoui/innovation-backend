import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core'
import http from 'http'

import app from './app.js'
import connectToMongo from './mongo.js'
import typeDefs from './schema.js'
import resolvers from './resolvers.js'

async function startServer() {
  await connectToMongo()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 8080 }, resolve))
  console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`)
}

startServer()
