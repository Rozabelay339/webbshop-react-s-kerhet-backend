import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductService, OrderService } from "../services/apiService";
import { useAuth } from "../contexts/authContextValue";
import { useCart } from "../contexts/cartContextValue";
import imageMap from "../assets/ImageMap";
import { fallbackProducts } from "../data/fallbackProducts";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { token, isAuthenticated, loading: authLoading, logout } = useAuth();
  const { addToCart } = useCart();
  const activeToken = token || localStorage.getItem("token") || location.state?.authToken;
  const canPlaceOrder = isAuthenticated || Boolean(activeToken);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);

  const availableSizes = product?.sizes?.length
    ? product.sizes
    : product?.size
      ? [product.size]
      : [];
  const availableColors = product?.colors?.length
    ? product.colors
    : product?.color
      ? [product.color]
      : [];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(id);
        setProduct(data);
        if (data.sizes?.length) setSelectedSize(data.sizes[0]);
        else if (data.size) setSelectedSize(data.size);
        if (data.colors?.length) setSelectedColor(data.colors[0]);
        else if (data.color) setSelectedColor(data.color);
      } catch {
        const fallbackProduct = fallbackProducts.find((item) => item._id === id);
        if (fallbackProduct) {
          setProduct(fallbackProduct);
          if (fallbackProduct.sizes?.length) setSelectedSize(fallbackProduct.sizes[0]);
          else if (fallbackProduct.size) setSelectedSize(fallbackProduct.size);
          if (fallbackProduct.colors?.length) setSelectedColor(fallbackProduct.colors[0]);
          else if (fallbackProduct.color) setSelectedColor(fallbackProduct.color);
          setOrderStatus("Demo product loaded without backend connection.");
        } else {
          setOrderStatus("Failed to load product details.");
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleOrder = async () => {
    if (!canPlaceOrder || !activeToken) {
      setOrderStatus("Log in to place an order.");
      return;
    }

    if (availableSizes.length && !selectedSize) return setOrderStatus("Select a size.");
    if (availableColors.length && !selectedColor) return setOrderStatus("Select a color.");

    setIsOrdering(true);
    setOrderStatus("");

    try {
      const orderItem = {
        productId: product._id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity,
        size: selectedSize || product.size || product.sizes?.[0] || "Standard",
        color: selectedColor || product.color || product.colors?.[0] || "Default",
      };

      await OrderService.createOrder({ items: [orderItem] }, activeToken);
      addToCart({ ...product, size: selectedSize, color: selectedColor, quantity });
      setOrderStatus("Order placed successfully!");
    } catch (err) {
      const message = err.message || "";
      const isAuthError = message.includes("401") || message.toLowerCase().includes("token") || message.toLowerCase().includes("authorized");

      if (isAuthError) {
        logout();
        setOrderStatus("Your login has expired. Please log in again.");
      } else {
        setOrderStatus(`Failed to place order. ${message}`);
      }
    } finally {
      setIsOrdering(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  const productImage = product.image || imageMap[product.name] || "/placeholder.jpg";
  const loginTarget = `/products/${id}`;
  const orderDisabled = isOrdering || (availableSizes.length && !selectedSize) || (availableColors.length && !selectedColor);

  return (
    <div className="product-detail">
      <img src={productImage} alt={product.name} className="product-image" />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>

        {availableColors.length > 0 && (
          <div className="product-options">
            <h3>Select Color:</h3>
            <div className="color-options">
              {availableColors.map((color) => (
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

        {availableSizes.length > 0 && (
          <div className="product-options">
            <h3>Select Size:</h3>
            <div className="size-options">
              {availableSizes.map((size) => (
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
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>

        {authLoading ? (
          <p>Checking login status...</p>
        ) : canPlaceOrder ? (
          <button className="order-button" onClick={handleOrder} disabled={orderDisabled}>
            {isOrdering ? "Placing order..." : "Add to Cart / Order"}
          </button>
        ) : (
          <Link className="order-button login-order-link" to="/login" state={{ from: loginTarget }}>
            Log in to place an order
          </Link>
        )}

        {orderStatus && <p className="order-status">{orderStatus}</p>}
      </div>
    </div>
  );
};

export default ProductDetail;
