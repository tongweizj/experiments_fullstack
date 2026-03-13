// server/microservices/product-service/graphql/typeDefs.js
// GraphQL type definitions
const typeDefs = `#graphql
  type Product {
    id: ID!
    productName: String!
    productDescription: String!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addProduct(productName: String!, productDescription: String!): Product
  }

`;

// Export as an ES Module
export default typeDefs;
