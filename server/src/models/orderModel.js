import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      size: { type: String },
      color: { type: String },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
