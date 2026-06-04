import { useEffect, useState } from "react";
import { useAuth } from "./authContextValue";
import { CartContext } from "./cartContextValue";

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
    const productId = product.productId || product._id;
    const quantityToAdd = Math.max(1, Number(product.quantity) || 1);

    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prev, { ...product, productId, quantity: quantityToAdd }];
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

