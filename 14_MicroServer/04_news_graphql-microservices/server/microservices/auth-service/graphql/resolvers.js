// server/microservices/auth-service/graphql/resolvers.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";

const resolvers = {
  Query: {
    currentUser: (_, __, context) => {
      const { req } = context;
      if (!req || !req.cookies) return null;

      const token = req.cookies.token;
      if (!token) return null;

      try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        return { username: decoded.username };
      } catch (error) {
        console.error("Error verifying token:", error);
        return null;
      }
    },
  },

  User: {
    __resolveReference: (reference) => {
      return { username: reference.username };
    },
  },

  Mutation: {
    login: async (_, { username, password }, { res }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error("User not found");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid password");

      const token = jwt.sign({ username }, config.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        path: "/",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return true;
    },

    register: async (_, { username, password }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error("Username is already taken");

      const newUser = new User({ username, password });
      await newUser.save();
      return true;
    },
    logOut: (_, __, { req, res }) => {
      console.log("Logout called - current cookies:", req.cookies);
      res.clearCookie("token", {
        httpOnly: true,
        path: "/", // Must match the path used when setting the cookie
        secure: false,
      });
      console.log("Logout cookie cleared");
      return true;
    },
  },
};

export default resolvers;
