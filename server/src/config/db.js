import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.name}`);
  } catch (err) { console.error(err); process.exit(1); }
};
