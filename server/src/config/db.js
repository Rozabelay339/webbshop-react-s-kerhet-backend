import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Make sure to load the .env variables

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB URI not defined in .env file.");
  process.exit(1); // Stop the server if URI is missing
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
