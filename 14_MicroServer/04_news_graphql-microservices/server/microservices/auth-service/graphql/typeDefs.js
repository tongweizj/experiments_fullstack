// server/microservices/auth-service/graphql/typeDefs.js
// GraphQL type definitions
const typeDefs = `#graphql
  type User @key(fields: "username") {
    username: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): Boolean
    register(username: String!, password: String!): Boolean
    logOut: String
  }
`;

// Export as an ES Module
export default typeDefs;
