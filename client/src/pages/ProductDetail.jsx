import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductService, OrderService } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import imageMap from '../assets/ImageMap';
import { fallbackProducts } from "../data/fallbackProducts";
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, token, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const activeToken = token || localStorage.getItem("token");
  const isAuthenticated = Boolean(user || activeToken);

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
      } catch {
        const fallbackProduct = fallbackProducts.find(item => item._id === id);
        if (fallbackProduct) {
          setProduct(fallbackProduct);
          if (fallbackProduct.sizes?.length) setSelectedSize(fallbackProduct.sizes[0]);
          if (fallbackProduct.colors?.length) setSelectedColor(fallbackProduct.colors[0]);
          setOrderStatus("Demo product loaded without backend connection.");
        } else {
          setOrderStatus("Failed to load product details.");
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!activeToken) return setOrderStatus("Log in to place an order.");
    if (product.sizes?.length && !selectedSize) return setOrderStatus("Select a size.");
    if (product.colors?.length && !selectedColor) return setOrderStatus("Select a color.");

    try {
      const orderData = {
        items: [{
          productId: product._id,
          name: product.name,
          category: product.category,
          quantity,
          size: selectedSize || "Standard",
          color: selectedColor || "Default",
        }]
      };
      await OrderService.createOrder(orderData, activeToken);
      addToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
      setOrderStatus("Order placed successfully!");
    } catch (err) {
      const message = err.message || "";
      setOrderStatus(
        message.includes("401") || message.includes("Token")
          ? "Your login has expired. Please log in again."
          : `Failed to place order. ${message}`
      );
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

        {authLoading ? (
          <p>Checking login status...</p>
        ) : isAuthenticated ? (
          <button
            className="order-button"
            onClick={handleOrder}
            disabled={(product.sizes?.length && !selectedSize) || (product.colors?.length && !selectedColor)}
          >
            Add to Cart / Order
          </button>
        ) : (
          <Link className="order-button login-order-link" to="/login" state={{ from: `/products/${id}` }}>
            Log in to place an order
          </Link>
        )}

        {orderStatus && <p className="order-status">{orderStatus}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
