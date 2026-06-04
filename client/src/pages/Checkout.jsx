import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContextValue";

const Checkout = () => {
  const location = useLocation();
  const { isAuthenticated, loading, token } = useAuth();
  const canCheckout = isAuthenticated || Boolean(token || localStorage.getItem("token") || location.state?.authToken);

  if (loading) return <p>Loading...</p>;

  if (!canCheckout) {
    return <Navigate to="/login" state={{ from: "/checkout" }} replace />;
  }

  return (
    <div className="checkout-page">
      <p className="section-kicker">Checkout</p>
      <h1>Proceed with your order</h1>
      <p>
        Checkout-flödet är kopplat till orderresan och är redo att byggas ut
        med betalning, leveransval och orderbekräftelse.
      </p>
    </div>
  );
};

export default Checkout;
