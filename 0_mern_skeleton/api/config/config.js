const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: process.env.MONGODB_URI ||
    "mongodb://demo:password123@192.168.2.110:27017/mernproject?retryWrites=true&w=majority"||
        process.env.MONGO_HOST ||
        'mongodb://' + ('demo:password123@192.168.2.110' || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/mernproject'
}
export default config