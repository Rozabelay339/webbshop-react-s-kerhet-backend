import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { ProductService } from "../services/apiService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts(); 
        setProducts(data);
        setFilteredProducts(data); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []); 

  
  const searchProducts = (query) => {
    if (!query.trim()) {
      setFilteredProducts(products); 
      return;
    }

    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.name.toLowerCase().includes(query.toLowerCase()) 
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
