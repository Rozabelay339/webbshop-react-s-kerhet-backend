import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    productPrice: { type: Number, required: true }
  }]
});

// Virtual for calculating total amount
orderSchema.virtual('totalAmount').get(function() {
  return this.items.reduce((total, item) => total + (item.quantity * item.productPrice), 0);
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
