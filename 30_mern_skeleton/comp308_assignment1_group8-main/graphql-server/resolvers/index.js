const studentResolvers = require('./student');
const courseResolvers = require('./course');
const userResolvers = require('./user');

const resolvers = {
    Query: {
        ...studentResolvers.Query,
        ...courseResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...studentResolvers.Mutation,
        ...courseResolvers.Mutation,
        ...userResolvers.Mutation
    }
};

module.exports = resolvers;
