// user.resolvers.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.server.model.js';

const JWT_SECRET = 'some_secret_key';

const userResolvers = {
  Query: {
    users: async () => await UserModel.find(),
    user: async (_, { id }) => await UserModel.findById(id),
    isLoggedIn: (_, __, { req }) => !!req.user,
  },
  Mutation: {
    createUser: async (_, { userName, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ userName, email, password: hashedPassword });
      return await newUser.save();
    },
    updateUser: async (_, { id, userName, email }) =>
      await UserModel.findByIdAndUpdate(id, { userName, email }, { new: true }),
    loginUser: async (_, { email, password }, { res }) => {
      const user = await UserModel.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) return false;
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true });
      return true;
    },
    logOut: (_, __, { res }) => {
      res.clearCookie('token');
      return 'Logged out successfully!';
    },
  },
};

export default userResolvers;
