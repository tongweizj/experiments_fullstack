import dotenv from 'dotenv';
dotenv.config();
// Configuration for community-service
export const config = {
  db: process.env.COMMUNITY_MONGO_URI || 'mongodb://localhost:27017/communityServiceDB',  // ✅ Separate DB for community-service
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',  // ✅ Shared JWT secret
  port: process.env.COMMUNITY_PORT || 4002,  // ✅ Correct port for community-service
};

// Log in development mode
if (process.env.NODE_ENV !== 'production') {
  console.log(`🔐 JWT_SECRET in community-service config: ${config.JWT_SECRET}`);
  console.log(`🚀 Community Microservice running on port: ${config.port}`);
}
