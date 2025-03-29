import React from 'react';
import { useCart } from '../../contexts/CartContext'; 

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart(); 

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id}>
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))
      )}
      <button onClick={clearCart}>Clear Cart</button> 
    </div>
  );
}

export default Cart;
