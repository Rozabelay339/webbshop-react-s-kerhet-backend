import React, { useState } from 'react';
import { OrderService } from '../../services/ApiService';
import './OrderForm.css';

const OrderForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addItem = () => {
    if (productId && quantity > 0) {
      setItems([...items, { productId, quantity }]);
      setProductId('');
      setQuantity(1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (items.length === 0) {
      setError('Please add at least one item to the order.');
      setLoading(false);
      return;
    }

    const orderData = { name, address, items };

    try {
      await OrderService.createOrder(orderData);
      alert('Order placed successfully');
      setName('');
      setAddress('');
      setItems([]);
      setLoading(false);
    } catch (err) {
      setError('Error placing order');
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>Fullname:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Address:</label>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

      <label>Product ID:</label>
      <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Enter product ID" />

      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" />
      
      <button type="button" onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>Product ID: {item.productId}, Quantity: {item.quantity}</li>
        ))}
      </ul>

      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Order'}</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default OrderForm;
