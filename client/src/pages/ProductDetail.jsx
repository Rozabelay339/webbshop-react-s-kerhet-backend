import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductService, OrderService } from "../services/apiService";
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from "../contexts/CartContext";
import imageMap from '../assets/ImageMap';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        console.log("Fetched product:", data); 
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      }
    };

    fetchProduct();
  }, [id]);

  const getEstimatedDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "long" });
  };

 const handleOrder = async () => {
  const storedToken = localStorage.getItem("token");
  if (!user || !storedToken) {
    setOrderStatus("You need to log in to place an order.");
    return;
  }

  try {
    const orderData = {
      name: product.name,            // Add name
      category: product.category || "Unknown",  // Ensure category is present
      quantity: 1,                   // Default quantity of 1 (change if needed)
      price: product.price,          // Price of the product
      size: product.size || "Standard", // Ensure size is present
      color: product.color || "Default", // Ensure color is present
    };

    await OrderService.createOrder(orderData, storedToken);
    addToCart(product);
    setOrderStatus("Order placed successfully!");
  } catch (err) {
    console.error("Error placing order:", err);
    setOrderStatus("Failed to place order. Please try again.");
  }
};


  if (!product) {
    return <p>Loading...</p>;
  }

  
  const productImage = product.image || imageMap[product.name] || "/placeholder.jpg";

  const isClothing = product.category === "Clothing";
  const isShoes = product.category === "Shoes";

  return (
    <div className="product-detail">
      <img src={productImage} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <div className="delivery-info">
          <h3>Delivery & Returns</h3>
          <p><strong>Delivery:</strong> Fast delivery ({getEstimatedDeliveryDate()}) - <span className="free-delivery">Free</span></p>
          <p><strong>Returns:</strong> Free returns within 30 days</p>
          <p><strong>Resale Option:</strong> Available via <span className="resale-option">"Sell Back"</span></p>
        </div>

        {product.colors && (
          <div className="product-options">
            <h3>Select Color:</h3>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {isClothing && product.sizes && (
          <div className="product-options">
            <h3>Select Size:</h3>
            <div className="size-options">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {isShoes && product.sizes && (
          <div className="product-options">
            <h3>Select Shoe Size:</h3>
            <div className="size-options">
              {["36", "37", "38", "39", "40", "41", "42"].map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

   
        {user ? (
          <button className="order-button" onClick={handleOrder}>Order Now</button>
        ) : (
          <p className="login-message">Please log in to place an order.</p>
        )}
        {orderStatus && <p className="order-status">{orderStatus}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
