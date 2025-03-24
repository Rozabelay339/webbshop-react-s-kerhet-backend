// productModel.js (for ES Module approach)
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Image URL or path
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product; // Export correctly as ES module
