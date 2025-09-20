import Product from '../models/productModel.js';


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};


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


export const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp(category, "i") }  
    });

    if (!products.length) {
      return res.status(404).json({ error: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products by category' });
  }
};


export const createProduct = async (req, res) => {
  console.log("Request Body:", req.body);

  let items = req.body.items || req.body; // stöd för både array och single object
  if (!Array.isArray(items)) {
    items = [items]; // om det bara är ett objekt
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "At least one product is required" });
  }

  try {
    const createdProducts = [];
    for (const item of items) {
      console.log("Processing item:", item);

      const { name, category, sizes, colors, quantity, price, description, image } = item;

      if (!name || !category || !quantity || price === undefined) {
        return res.status(400).json({
          error: "Fields 'name', 'category', 'quantity' and 'price' are required"
        });
      }

      const newProduct = new Product({
        name,
        category,
        sizes: sizes || [],
        colors: colors || [],
        quantity,
        price,
        description: description || "",
        image: image || ""
      });

      await newProduct.save();
      createdProducts.push(newProduct);
    }

    res.status(201).json(createdProducts.length === 1 ? createdProducts[0] : createdProducts);
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Error creating product(s)" });
  }
};


