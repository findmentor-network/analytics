const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { connect } = require('./db')
const app = express()
const routes = require('./router')
const port = process.env.PORT || 5000

app.use(require('cors')())
app.use(express.json())
app.use(express.static('docs'))
app.use(express.text())
app.use(routes)

const server = new ApolloServer({
  typeDefs: require('./typeDefs'),
  resolvers: require('./resolvers')
})
server.applyMiddleware({ app })

connect().then(() => {
  app.listen(port, '0.0.0.0', (_) => {
    console.log(`analytics app listening at http://localhost:${port}`)
    console.log(
      `🚀 Graphql ready at http://localhost:${port}${server.graphqlPath}`
    )
  })
})
