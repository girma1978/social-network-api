import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork');

// Export connection
export default mongoose.connection;