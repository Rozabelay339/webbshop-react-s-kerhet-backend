import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage when user changes
  useEffect(() => {
    if (!user) return setCartItems([]);
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const updateQuantity = (productId, change) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product._id);
      if (existing) {
        return prev.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, productId: product._id, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) localStorage.removeItem(`cart_${user.id}`);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity: (id) => updateQuantity(id, 1),
        decrementQuantity: (id) => updateQuantity(id, -1),
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
