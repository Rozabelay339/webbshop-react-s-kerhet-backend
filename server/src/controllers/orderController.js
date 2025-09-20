import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "Order must include items" });

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { name, category, quantity, size, color } = item;
      const product = await Product.findOne({ name, category });
      if (!product) return res.status(404).json({ error: `Product "${name}" in "${category}" not found` });

      totalAmount += product.price * quantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: size || null,
        color: color || null,
        quantity,
      });
    }

    const newOrder = await Order.create({
      userId: req.user.id,
      userName: req.user.name,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get orders for logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Delete single order by ID (admin)
export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Delete all orders (admin)
export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.json({ message: "All orders deleted" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
