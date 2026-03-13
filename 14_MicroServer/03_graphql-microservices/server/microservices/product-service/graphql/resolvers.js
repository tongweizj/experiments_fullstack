// server/microservices/product-service/graphql/resolvers.js
// server/microservices/product-service/graphql/resolvers.js
import Product from "../models/Product.js";
//
//
const resolvers = {
  // Query and Mutation resolvers
  Query: {
    products: async (_, __, { user }) => {
      if (!user) throw new Error("You must be logged in");
      return await Product.find({});
    },
  },
  Mutation: {
    addProduct: async (_, { productName, productDescription }, { user }) => {
      if (!user) throw new Error("You must be logged in");
      const newProduct = new Product({ productName, productDescription });
      await newProduct.save();
      return newProduct;
    },
  },
};

export default resolvers;
