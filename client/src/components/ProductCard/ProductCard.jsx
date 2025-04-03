import React from "react";
import { Link } from "react-router-dom";
import './ProductCard.css';
import imageMap from '../../assets/ImageMap'; 

const ProductCard = ({ product }) => {
  const productImage = imageMap[product.name] || '/placeholder.jpg';

  return (
    <div className="product-card">
      <img 
        src={productImage} 
        alt={product.name || "Product"} 
      />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/products/${product._id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
