import Product from '../models/productModel.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  const newProduct = new Product({ name, description, price, image });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error creating product' });
  }
};
