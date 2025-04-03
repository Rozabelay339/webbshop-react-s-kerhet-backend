import React from "react";
import { useCart } from "../../contexts/CartContext";
import { OrderService } from "../../services/apiService";
import "./Cart.css";  

const Cart = () => {
  const { cartItems, clearCart, removeOneFromCart } = useCart();

  const calculateTotal = () => {
    console.log("Current cart items:", cartItems);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      console.log("Order being sent:", orderData); 

      const orderResponse = await OrderService.createOrder(orderData);
      alert("Order placed successfully");
      clearCart();
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-quantity"> x {item.quantity}</span>
                  <span className="cart-item-price"> ${item.price}</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => removeOneFromCart(item.productId)} className="remove">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-section">
            <p><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
            <button onClick={clearCart} className="clear-cart-button">Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
