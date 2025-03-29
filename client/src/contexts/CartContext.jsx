import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (productId) => setCartItems(cartItems.filter(item => item.id !== productId));
  const clearCart = () => setCartItems([]); // Add clearCart function

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
