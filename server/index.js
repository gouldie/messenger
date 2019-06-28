import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import typeDefs from './typeDefs'

require('dotenv').config()

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

    const server = new ApolloServer({
      typeDefs,
      mocks: true
    })

    server.applyMiddleware({ app, cors: false })

    app.listen({ port: process.env.PORT || 8080 }, () => {
      console.log(`Server listening at port ${process.env.PORT || 8080}`)
    })
  } catch (e) {
    console.log(e)
  }
})()
