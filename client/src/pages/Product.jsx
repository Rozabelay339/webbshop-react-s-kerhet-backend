import React, { useState, useEffect } from "react";
import ProductList from "../components/ProductList/ProductList";
import Search from "../components/Search/Search";
import { ProductService } from "../services/apiService";
import { fallbackProducts } from "../data/fallbackProducts";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
        setUsingFallback(true);
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) return setFilteredProducts(products);

    const keywords = searchTerm.toLowerCase().split(" ");
    setFilteredProducts(
      products.filter(product =>
        keywords.some(kw =>
          product.name.toLowerCase().includes(kw) ||
          (product.category || "").toLowerCase().includes(kw)
        )
      )
    );
  }, [searchTerm, products]);

  return (
    <div className="page-shell products-page">
      <header className="page-header">
        <p className="section-kicker">Collection</p>
        <h1>All Products</h1>
        <p>
          En ren produktvy som visar sök, produktkort och navigation till detaljer.
          
        </p>
        {usingFallback && (
          <p className="fallback-note">
            Demo products are shown because the backend is not connected right now. Local product images are matched by product name.
          </p>
        )}
      </header>
      <Search searchProducts={setSearchTerm} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Product;
