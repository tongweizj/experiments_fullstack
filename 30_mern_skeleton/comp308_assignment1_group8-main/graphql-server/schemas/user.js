const userTypeDefs = `#graphql
    type User {
        id: ID!
        firstName: String
        lastName: String
        email: String
        username: String!
    }

    type UserAuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        users: [User]
        user(id: ID!): User
        userByUsername(username: String!): User
    }

    extend type Mutation {
        loginUser(username: String!, password: String!): UserAuthPayload

        addUser(
            firstName: String,
            lastName: String,
            email: String,
            username: String!,
            password: String!
        ): User

        updateUser(
            id: ID!,
            firstName: String,
            lastName: String,
            email: String
        ): User

        deleteUser(id: ID!): User
    }
`;

module.exports = userTypeDefs;
