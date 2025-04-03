import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You need to log in to place an order.</p>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Proceed with your order</p>
    </div>
  );
};

export default Checkout;
