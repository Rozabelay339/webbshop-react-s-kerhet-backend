import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../services/ApiService"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.image || "/placeholder.jpg"} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetail;
