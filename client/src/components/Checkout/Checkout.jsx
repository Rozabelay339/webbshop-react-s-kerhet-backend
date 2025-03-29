import React, { useState } from 'react';

function Checkout() {
  const [paymentDetails, setPaymentDetails] = useState('');

  const handleCheckout = () => {
    alert('Order placed successfully!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input
        type="text"
        placeholder="Payment details"
        value={paymentDetails}
        onChange={(e) => setPaymentDetails(e.target.value)}
      />
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}

export default Checkout;