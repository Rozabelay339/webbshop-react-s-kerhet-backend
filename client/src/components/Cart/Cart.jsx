import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { OrderService } from "../../services/ApiService";
import './Cart.css'

function Cart() {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const userOrders = await OrderService.getOrdersByUserName(user?.name);
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleRemove = (item) => {
    console.log("Removing from cart:", item);
    removeFromCart(item._id);
  };

  const handleAdd = (item) => {
    console.log("Adding to cart:", item);
    addToCart(item);
  };

  return (
    <div className="cart-container">
    <h2>{user?.name ? `${user.name}'s Cart` : 'Your Cart'}</h2>
  
    {cartItems.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <p>{item.name} - ${item.price} x {item.quantity}</p>
            <div>
              <button className="remove" onClick={() => handleRemove(item)}>Remove</button>
              <button onClick={() => handleAdd(item)}>Add One More</button>
            </div>
          </div>
        ))}
      </div>
    )}
  
    {cartItems.length > 0 && <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>}
  
    {/* Display User Orders */}
    <div className="order-section">
      <h3>Your Previous Orders</h3>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-item">
            <h4>Order ID: {order._id}</h4>
            <p>Ordered by: {order.name}</p>
            <p>Address: {order.address || "Not provided"}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.productName} - ${item.productPrice} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  </div>
  
  );
}

export default Cart;
