import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "Order must include items" });

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { productId, name, category, quantity, size, color } = item;
      const product = productId
        ? await Product.findById(productId)
        : await Product.findOne({ name, category });

      if (!product) {
        return res.status(404).json({ error: `Product "${name}" in "${category}" not found` });
      }

      const safeQuantity = Math.max(1, Number(quantity) || 1);
      totalAmount += product.price * safeQuantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        size: size || null,
        color: color || null,
        quantity: safeQuantity,
      });
    }

    const newOrder = await Order.create({
      userId: req.user._id,
      userName: req.user.name || req.user.email,
      items: orderItems,
      totalAmount,
      totalPrice: totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.json({ message: "All orders deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
