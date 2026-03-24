const studentTypeDefs = require('./student');
const courseTypeDefs = require('./course');
const userTypeDefs = require('./user');

const typeDefs = [studentTypeDefs, courseTypeDefs, userTypeDefs];

module.exports = typeDefs;
