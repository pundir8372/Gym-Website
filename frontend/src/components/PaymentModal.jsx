import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { apiCall, API_ENDPOINTS } from '../config/api';

const PaymentModal = ({ isOpen, onClose, plan, user }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen || !plan) return null;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiCall(API_ENDPOINTS.PROCESS_PAYMENT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          paymentMethod,
          cardData: paymentMethod === 'card' ? cardData : null,
          userId: user?.id
        })
      });

      if (response.success) {
        toast.success('Payment successful! Welcome to your new membership!');
        onClose();
        // Refresh page to update membership status
        window.location.reload();
      } else {
        toast.error(response.message || 'Payment failed');
      }
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        
        <div className="payment-header">
          <h2>Complete Your Purchase</h2>
          <div className="plan-summary">
            <h3>{plan.name}</h3>
            <p className="plan-price">₹{plan.price}/{plan.duration}</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="payment-form">
          <div className="payment-methods">
            <h4>Payment Method</h4>
            <div className="method-options">
              <label className="method-option">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit/Debit Card
              </label>
              <label className="method-option">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI Payment
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-details">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData({...cardData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    value={cardData.expiryDate}
                    onChange={(e) => setCardData({...cardData, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  value={cardData.cardName}
                  onChange={(e) => setCardData({...cardData, cardName: e.target.value})}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-details">
              <p>You will be redirected to your UPI app to complete the payment.</p>
              <div className="upi-amount">
                <strong>Amount: ₹{plan.price}</strong>
              </div>
            </div>
          )}

          <div className="payment-summary">
            <div className="summary-row">
              <span>Plan:</span>
              <span>{plan.name}</span>
            </div>
            <div className="summary-row">
              <span>Duration:</span>
              <span>{plan.duration}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{plan.price}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary payment-btn" disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${plan.price}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
