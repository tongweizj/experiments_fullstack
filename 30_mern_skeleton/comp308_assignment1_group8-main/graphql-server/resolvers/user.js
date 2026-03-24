const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userResolvers = {
    Query: {
        users: async () => await User.find({}),
        user: async (_, { id }) => await User.findById(id),
        userByUsername: async (_, { username }) => await User.findOne({ username }),
    },
    Mutation: {
        loginUser: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('No user found with this username');
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET || 'developmentSessionSecret',
                { expiresIn: '1d' }
            );

            return {
                token,
                user
            };
        },
        addUser: async (_, args) => {
            const newUser = new User({
                ...args
            });
            return await newUser.save();
        },
        updateUser: async (_, { id, ...args }) => {
            const user = await User.findById(id);
            if (!user) throw new Error("User not found");
            Object.assign(user, args);
            return await user.save();
        },
        deleteUser: async (_, { id }) => {
            return await User.findByIdAndDelete(id);
        }
    }
};

module.exports = userResolvers;
