import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

const calculateOrderAmount = (items) => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const createOrder = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized. Please log in to place an order.' });
  }

  const { name, category, size, color, quantity } = req.body;

  if (!name || !category || !size || !color || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const product = await Product.findOne({ name, category });
    if (!product) {
      return res.status(404).json({ error: `Product with name "${name}" in category "${category}" not found` });
    }

    const orderItem = {
      name: product.name,
      category: product.category,
      price: product.price,
      size,
      color,
      quantity,
    };

    const totalPrice = orderItem.price * orderItem.quantity;

    const newOrder = new Order({
      userId: req.user.id,
      userName: user.name,
      items: [orderItem],  // Order contains just a single product now
      totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error creating order', details: err.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

export const getUserOrders = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ orderDate: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json({
      latestOrder: orders[0],
      previousOrders: orders.slice(1),
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders for user', error });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this order' });
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete order', error });
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.status(200).json({ message: 'All orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all orders', error });
  }
};
