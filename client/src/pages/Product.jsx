import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { ProductService } from "../services/ApiService";

const Product = () => {
  const [products, setProducts] = useState([]); // Stores all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Stores filtered products

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts(); // Fetch all products
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to filter products based on search query (by category)
  const searchProducts = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products); // Reset to full list if search is empty
      return;
    }

    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(query.toLowerCase()) // Search in category instead of name
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Search searchProducts={searchProducts} />
      <h1>All Products</h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Product;
