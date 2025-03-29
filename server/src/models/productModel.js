import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String } // Make sure 'category' field is included
});

const Product = mongoose.model('Product', productSchema);

export default Product;
