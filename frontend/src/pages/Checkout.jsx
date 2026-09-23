import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', 
    city: '', country: '', zip: '', cardName: '', cardNumber: '', exp: '', cvv: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const shipping = 10.00;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          customer: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: formData.address,
            city: formData.city
          },
          total: finalTotal
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setOrderId(data.orderId);
        setIsSuccess(true);
        clearCart();
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container py-16 flex justify-center animate-fade-in">
        <div className="success-card text-center max-w-md w-full">
          <CheckCircle size={64} className="text-primary mx-auto mb-6" />
          <h1 className="text-h2 mb-4">Order Confirmed!</h1>
          <p className="text-muted mb-2">Thank you for your purchase.</p>
          <p className="text-muted mb-8">Your order ID is <strong>#{orderId}</strong>. We'll email you an order confirmation with details and tracking info.</p>
          <Link to="/shop" className="btn btn-primary w-full">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 text-center animate-fade-in">
        <h2 className="text-h2 mb-4">Your cart is empty</h2>
        <p className="text-muted mb-8">Add some items to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container py-12 animate-fade-in">
      <h1 className="text-h2 mb-8">Checkout</h1>
      
      <div className="checkout-grid">
        {/* Form Column */}
        <div className="checkout-form-col">
          <form onSubmit={handleSubmit} id="checkout-form">
            <div className="checkout-section">
              <h3 className="section-title">Contact Information</h3>
              <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="mb-4" />
            </div>

            <div className="checkout-section">
              <h3 className="section-title">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} />
              </div>
              <input type="text" name="address" placeholder="Street Address" required value={formData.address} onChange={handleChange} className="mb-4" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" required value={formData.country} onChange={handleChange} />
                <input type="text" name="zip" placeholder="Postal Code" required value={formData.zip} onChange={handleChange} />
              </div>
            </div>

            <div className="checkout-section">
              <h3 className="section-title">Payment Method</h3>
              <p className="text-sm text-muted mb-4">(This is a demo. No real payment is processed.)</p>
              <input type="text" name="cardName" placeholder="Name on Card" required value={formData.cardName} onChange={handleChange} className="mb-4" />
              <input type="text" name="cardNumber" placeholder="Card Number" required value={formData.cardNumber} onChange={handleChange} className="mb-4" maxLength="16" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="exp" placeholder="MM/YY" required value={formData.exp} onChange={handleChange} maxLength="5" />
                <input type="text" name="cvv" placeholder="CVV" required value={formData.cvv} onChange={handleChange} maxLength="3" />
              </div>
            </div>
          </form>
        </div>

        {/* Summary Column */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3 className="section-title">Order Summary</h3>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img-wrapper">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-details">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="flex justify-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b">
                <span className="text-muted">Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-h3">Total</span>
                <span className="text-h2 text-primary">${finalTotal.toFixed(2)}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form" 
                className="btn btn-primary w-full btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
