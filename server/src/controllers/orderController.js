import Order from '../models/orderModel.js';
import mongoose from 'mongoose';
const calculateOrderAmount = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * item.productPrice;
  }, 0); // No need to convert to cents since we're not processing payments
};

// Create a new order (no payment integration)
export const createOrder = async (req, res) => {
  const { name, address, items } = req.body;

  if (!name || !address || !items || items.length === 0) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Calculate the total amount for the order
    const totalAmount = calculateOrderAmount(items);

    // Create and save the new order
    const newOrder = new Order({
      name,
      address,
      items,  // Ensure all items, including productId and productPrice, are saved
      paymentStatus: 'pending',  // No payment processing yet
    });

    const savedOrder = await newOrder.save();

    // Return the totalAmount in the response (not saved in DB)
    res.status(201).json({
      message: "Order created successfully",
      order: {
        ...savedOrder.toObject(),
        totalAmount,  // Include totalAmount in the response
      }
    });
  } catch (err) {
    console.error("Error during order creation:", err);
    res.status(500).json({ error: "Error creating order", details: err.message });
  }
};


// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserName = async (req, res) => {
  console.log("Received request for user:", req.params.name); // Debugging log

  try {
    const orders = await Order.find({ name: req.params.name });

    if (!orders.length) {
      console.log("No orders found for:", req.params.name);
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: err.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Order ID format' });
  }

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all orders
export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.status(200).json({ message: 'All orders deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete order by ID
export const deleteOrderById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Order ID format' });
  }

  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
