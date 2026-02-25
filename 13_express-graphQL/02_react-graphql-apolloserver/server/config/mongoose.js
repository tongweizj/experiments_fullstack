import mongoose from 'mongoose';
import config from './config.js';
import '../models/user.server.model.js'; // Load the 'User' model
import '../models/article.server.model.js'; // Load the 'Article' model

// Define the Mongoose configuration method
const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(config.db);
    console.log('DB Connected!');
    return db;
  } catch (err) {
    console.error('Error in DB connection', err);
    throw err;
  }
};

export default connectToDatabase;
