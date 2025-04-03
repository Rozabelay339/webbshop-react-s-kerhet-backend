import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  items: [{
    name: { type: String, required: true },  
    price: { type: Number, required: true }, 
    size: { type: String, required: true },  
    color: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
  }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
