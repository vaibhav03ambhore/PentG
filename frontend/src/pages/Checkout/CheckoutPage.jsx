import React, { useState } from 'react';

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    address: '',
    paymentMethod: 'Credit Card' // Default payment method
  });
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment process (e.g., send data to backend, process payment)
    // For simplicity, we'll just display a success message
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  // Dummy product data (replace with actual product data)
  const product = {
    name: 'Product Name',
    price: 100 // Example price in dollars
  };

  return (
    <div className="flex max-w-screen-xl mx-auto p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="w-1/2 pr-8">
        <h2 className="text-2xl font-bold mb-4">Product Summary</h2>
        <div className="mb-4">
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="text-gray-400">${product.price}</p>
          {/* Add more product details as needed */}
        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {paymentStatus === 'success' ? (
          <div className="text-green-500 text-center">Payment successful! Thank you for your order.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-semibold mb-1">Shipping Address:</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500" rows="4" required />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-sm font-semibold mb-1">Payment Method:</label>
              <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500" required>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                {/* Add more payment methods as needed */}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Place Order</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
