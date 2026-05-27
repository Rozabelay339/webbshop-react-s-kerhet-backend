import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Checkout = () => {
  const { user } = useAuth();

  console.log("Checkout user:", user);

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: '/checkout' }}
        replace
      />
    );
  }

  return (
    <div className="checkout-page">
      <p className="section-kicker">Checkout</p>
      <h1>Proceed with your order</h1>
      <p>
        Checkout-flödet är kopplat till orderresan och är redo att byggas ut med betalning,
        leveransval och orderbekräftelse.
      </p>
    </div>
  );
};

export default Checkout;