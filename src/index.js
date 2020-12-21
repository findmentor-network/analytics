const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { connect } = require('./db')

const startServer = async () => {
  // configure app
  const app = express()
  app.use(require('cors')());
  app.use(express.json())
  app.use(express.static("docs"));

  // routes
  app.use(require('./router'))

  // graphql
  const server = new ApolloServer({
    typeDefs: require('./typeDefs'),
    resolvers: require('./resolvers'),
  })
  server.applyMiddleware({ app })

  // connect to db
  await connect()

  // start server
  const port = process.env.PORT || 5000
  app.listen(port, _ => console.log(`Example app listening at http://localhost:${port}`))
}

startServer()