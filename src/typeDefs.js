const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    test: String
  }
`

module.exports = typeDefs
