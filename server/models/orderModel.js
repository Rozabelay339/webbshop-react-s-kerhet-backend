const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  total: Number,
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
