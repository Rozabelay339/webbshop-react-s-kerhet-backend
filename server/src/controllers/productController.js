import Product from '../models/productModel.js';

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Fetch a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;

  if (!name || !description || !price || !image || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newProduct = new Product({ name, description, price, image, category });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(400).json({ error: 'Error creating product' });
  }
};
