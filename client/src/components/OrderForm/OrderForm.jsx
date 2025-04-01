import React, { useState } from "react";
import { OrderService } from "../../services/ApiService";
import { useCart } from "../../contexts/CartContext";
import "./OrderForm.css";

const OrderForm = () => {
  const { addToCart, cartItems } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addItem = async () => {
    if (productId && quantity > 0) {
      try {
        // Fetch product details from the server
        const product = await fetchProductById(productId);
        
        addToCart({
          productId,
          quantity,
          name: product.name,  // Use actual product name
          price: product.price, // Use actual product price
        });
        
        setProductId("");
        setQuantity(1);
      } catch (err) {
        setError("Product not found");
      }
    }
  };

  const fetchProductById = async (productId) => {
    const product = await fetch(`http://localhost:3001/api/products/${productId}`);
    if (!product.ok) throw new Error("Product not found");
    return await product.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    if (cartItems.length === 0) {
      setError("Please add at least one item to the order.");
      setLoading(false);
      return;
    }
  
    const orderData = {
      name,
      address,
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        productPrice: item.price,
      })),
    };
  
    try {
      console.log("Sending Order:", orderData);
      const response = await OrderService.createOrder(orderData);
      console.log('Order response:', response);
      alert("Order placed successfully!");
      setName("");
      setAddress("");
    } catch (err) {
      console.error("Order error:", err);
      setError("Error placing order: " + err.message);
    }
    setLoading(false);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>Fullname:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Address:</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <label>Product ID:</label>
      <input
        type="text"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter product ID"
      />

      <label>Quantity:</label>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
      />

      <button type="button" onClick={addItem}>
        Add Item
      </button>

      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            Product ID: {item.productId}, Quantity: {item.quantity}
          </li>
        ))}
      </ul>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Order"}
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default OrderForm;
