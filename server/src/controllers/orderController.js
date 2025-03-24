// src/controllers/orderController.js
export const createOrder = async (req, res) => {
  const { userId, items, total } = req.body;
  const newOrder = new Order({ userId, items, total });

  try {
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};
