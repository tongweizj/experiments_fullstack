// server/microservices/product-service/models/Product.js
//
import { Schema, model } from "mongoose";

// Product schema definition
const productSchema = new Schema({
  productName: String,
  productDescription: String,
});
const Product = model("Product", productSchema); // Export the model
export default Product;
