// server/microservices/community-service/graphql/typeDefs.js
const typeDefs = `#graphql
  type CommunityPost @key(fields: "id") {
    id: ID!
    author: User
    title: String!
    content: String!
    category: String!
    aiSummary: String
    createdAt: String
    updatedAt: String
  }

  type HelpRequest @key(fields: "id") {
    id: ID!
    author: User
    description: String!
    location: String
    isResolved: Boolean
    volunteers: [User]
    createdAt: String
    updatedAt: String
  }

  extend type User @key(fields: "username") {
    username: String! @external
  }

  type Query {
    communityPosts: [CommunityPost]
    communityPost(id: ID!): CommunityPost
    helpRequests: [HelpRequest]
    helpRequest(id: ID!): HelpRequest
  }

  type Mutation {
    createCommunityPost(title: String!, content: String!, category: String!): CommunityPost
    updateCommunityPost(id: ID!, title: String, content: String, category: String, aiSummary: String): CommunityPost
    deleteCommunityPost(id: ID!): Boolean

    createHelpRequest(description: String!, location: String): HelpRequest
    updateHelpRequest(id: ID!, description: String, location: String, isResolved: Boolean): HelpRequest
    volunteerForHelpRequest(id: ID!): HelpRequest
    deleteHelpRequest(id: ID!): Boolean
  }
`;

export default typeDefs;
