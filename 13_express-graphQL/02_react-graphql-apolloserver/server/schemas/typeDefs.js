// typeDefs.js is a file that contains the GraphQL schema definition 
const typeDefs = `#graphql
  type User {
    id: ID!
    userName: String!
    email: String!
    password: String
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    authorId: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    articles: [Article!]!
    article(id: ID!): Article
    isLoggedIn: Boolean!
  }

  type Mutation {
    createUser(userName: String!, email: String!, password: String!): User
    updateUser(id: ID!, userName: String!, email: String!): User
    loginUser(email: String!, password: String!): Boolean
    logOut: String
    addArticle(title: String!, content: String!): Article
    editArticle(id: ID!, content: String!): Article
  }
`;

export default typeDefs;
