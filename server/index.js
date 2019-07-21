import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'
import { PubSub } from 'graphql-subscriptions'
import http from 'http'

export const pubsub = new PubSub()

require('dotenv').config()

const IN_PROD = process.env.NODE_ENV === 'production'
const MongoStore = require('connect-mongo')(session);

(async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true }
    )

    const app = express()

    app.disable('x-powered-by')

    app.use(
      session({
        secret: process.env.SESS_SECRET,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        resave: false,
        rolling: true,
        saveUninitialized: false
      })
    )

    // Error handler
    const errorHandler = (err, req, res, next) => {
      if (res.headersSent) {
        return next(err)
      }
      const { status } = err
      res.status(status).json(err)
    }
    app.use(errorHandler)

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      schemaDirectives,
      playground: IN_PROD ? false : {
        settings: {
          'request.credentials': 'include'
        }
      },
      context: ({ req, res }) => ({ req, res })
    })

    const httpServer = http.createServer(app)
    server.installSubscriptionHandlers(httpServer)

    server.applyMiddleware({ app, cors: true })

    httpServer.listen(process.env.PORT || 8080, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 8080}${server.graphqlPath}`)
      console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT || 8080}${server.subscriptionsPath}`)
    })
  } catch (e) {
    console.log(e)
  }
})()
