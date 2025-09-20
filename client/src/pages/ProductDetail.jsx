import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductService, OrderService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import imageMap from '../assets/ImageMap';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        if (data.colors?.length) setSelectedColor(data.colors[0]);
      } catch (err) {
        setOrderStatus("Failed to load product details.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!user) return setOrderStatus("Log in to place an order.");
    if (product.sizes?.length && !selectedSize) return setOrderStatus("Select a size.");
    if (product.colors?.length && !selectedColor) return setOrderStatus("Select a color.");

    try {
      const token = localStorage.getItem("token");
      const orderData = {
        items: [{
          name: product.name,
          category: product.category,
          quantity,
          size: selectedSize || "Standard",
          color: selectedColor || "Default",
        }]
      };
      await OrderService.createOrder(orderData, token);
      addToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
      setOrderStatus("Order placed successfully!");
    } catch (err) {
      setOrderStatus("Failed to place order.");
    }
  };

  if (!product) return <p>Loading...</p>;

  const productImage = product.image || imageMap[product.name] || "/placeholder.jpg";

  return (
    <div className="product-detail">
      <img src={productImage} alt={product.name} className="product-image" />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        {product.colors?.length > 0 && (
          <div className="product-options">
            <h3>Select Color:</h3>
            <div className="color-options">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={selectedColor === color ? "selected" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes?.length > 0 && (
          <div className="product-options">
            <h3>Select Size:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={selectedSize === size ? "selected" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-options">
          <h3>Quantity:</h3>
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        {user ? (
          <button
            className="order-button"
            onClick={handleOrder}
            disabled={(product.sizes?.length && !selectedSize) || (product.colors?.length && !selectedColor)}
          >
            Add to Cart / Order
          </button>
        ) : (
          <p>Please log in to place an order.</p>
        )}

        {orderStatus && <p className="order-status">{orderStatus}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
