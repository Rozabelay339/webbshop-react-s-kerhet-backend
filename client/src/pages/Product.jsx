import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { ProductService } from "../services/apiService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredProducts(products);

    const keywords = searchTerm.toLowerCase().split(" ");
    setFilteredProducts(
      products.filter(product =>
        keywords.some(kw => product.name.toLowerCase().includes(kw) || product.category.toLowerCase().includes(kw))
      )
    );
  }, [searchTerm, products]);

  return (
    <div>
      <Search searchProducts={setSearchTerm} />
      <h1>All Products</h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Product;
