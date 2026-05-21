import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { OrderService } from "../../services/apiService";
import "./Cart.css";

const Cart = () => {
  const { cartItems, clearCart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();
  const { user, token } = useAuth();
  const activeToken = token || localStorage.getItem("token");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log("USER:", user);
console.log("TOKEN:", token);
console.log("ACTIVE TOKEN:", activeToken);

  const handleCheckout = async () => {
    if (!user && !activeToken) return alert("Please log in to place an order.");

    try {
      await OrderService.createOrder(
        {
          items: cartItems.map(({ productId, name, category, price, quantity, size, color }) => ({
            productId, name, category, price, quantity, size, color
          })),
        },
        activeToken
      );
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      alert("Checkout failed: " + err.message);
    }
  };

  if (!cartItems.length) return <p className="cart-empty">Your cart is empty.</p>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {cartItems.map(item => (
          <li key={item.productId} className="cart-item">
            <span>{item.name}</span>
            <div>
              <button onClick={() => decrementQuantity(item.productId)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQuantity(item.productId)}>+</button>
            </div>
            <span>${item.price}</span>
            <button onClick={() => removeFromCart(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="order-section">
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
