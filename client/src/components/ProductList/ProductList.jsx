import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import './ProductList.css'

const ProductList = ({ products }) => {
  if (!products.length) {
    return <p>No products found.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
