import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { OrderService } from "../../services/ApiService"; 
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "./Checkout.css";

const Checkout = () => {
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const stripe = useStripe();
  const elements = useElements();

  const calculateOrderAmount = (items) => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.productPrice;
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe is not initialized.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (paymentMethod.error) {
      setError(paymentMethod.error.message);
      return;
    }

    const totalAmount = calculateOrderAmount(cartItems);

    const orderData = {
      name: userName,
      address: userAddress,
      items: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        productPrice: item.price, 
      })),
      paymentMethodId: paymentMethod.paymentMethod.id,
      totalAmount, // Include totalAmount in the order data
    };

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Create the order in the backend
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        clearCart(); // Empty cart after order is placed
        setSuccessMessage("Your order has been placed successfully!");
      } else {
        setError("Error placing the order. Please try again.");
      }
    } catch (err) {
      setError("Error placing the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="checkout-input"
      />
      <input
        type="text"
        placeholder="Enter your address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        className="checkout-input"
      />
      
      <div className="checkout-input">
        <CardElement />
      </div>
      
      <button
        onClick={handleCheckout}
        className="checkout-button"
        disabled={loading}
      >
        {loading ? <div className="spinner"></div> : "Place Order"}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Checkout;
