import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, required: true },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  quantity: { type: Number, required: true, default: 0 },
});

export default mongoose.model("Product", productSchema);
