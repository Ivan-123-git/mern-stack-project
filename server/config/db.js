const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_records';
  try {
    // Try connecting to the configured database (timeout after 3 seconds if unreachable)
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Could not connect to database at ${mongoUri}: ${error.message}`);
    console.log('Attempting to start an in-memory MongoDB server as fallback...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({
        binary: {
          version: '6.0.16'
        }
      });
      const inMemoryUri = mongoServer.getUri();

      const conn = await mongoose.connect(inMemoryUri);
      console.log(`In-Memory MongoDB Connected: ${inMemoryUri}`);
      console.log('NOTE: Data in the in-memory database is temporary and will be cleared when the server stops.');
    } catch (fallbackError) {
      console.error(`Failed to start in-memory MongoDB server: ${fallbackError.message}`);
      console.error('Please make sure you have MongoDB installed and running locally, or configure a valid MONGO_URI in server/.env.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
