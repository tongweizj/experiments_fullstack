// server/microservices/auth-service/graphql/resolvers.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js"; // Use default import
//
//
const resolvers = {
  //
  Query: {
    currentUser: (_, __, context) => {
      console.log("🔍 Debugging context:", context); // ✅ Debugging
      const { req } = context;
      if (!req || !req.cookies) {
        // ✅ Ensure `req` exists
        console.log("🚨 Request object is missing!");
        return null;
      }
      const token = req.cookies.token;
      if (!token) {
        return null; // No user is logged in
      }
      try {
        console.log("🔍 JWT_SECRET in resolvers.js:", config.JWT_SECRET);
        const decoded = jwt.verify(token, config.JWT_SECRET);
        return { username: decoded.username };
      } catch (error) {
        console.error("Error verifying token:", error);
        return null;
      }
    },
  }, //
  Mutation: {
    //
    login: async (_, { username, password }, { res }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ username }, config.JWT_SECRET, {
        expiresIn: "1d",
      }); // ✅ Fix: Ensure cookie is set with the correct attributes
      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access
        //secure: false,  // Change to true for HTTPS
        //sameSite: 'None', // Use 'None' if different origins
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      console.log("✅ Cookie set in response:", res.getHeaders()["set-cookie"]);
      console.log("✅ Cookie set:", res.getHeaders()["set-cookie"]);
      return true;
    },
    register: async (_, { username, password }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username is already taken");
      } // password hashing is done in User model
      const newUser = new User({ username, password: password });
      await newUser.save();
      return true;
    },
  },
};

export default resolvers;
