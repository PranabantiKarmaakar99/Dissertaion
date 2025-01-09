import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);

    if (!stripe || !elements) return;

    try {
      const { data } = await axios.post('http://localhost:3001/api/v1/payment/create-payment-intent', {
        amount: totalAmount,
      });

      const expressCheckoutElement = elements.create('expressCheckout'); // Create Express Checkout element
      expressCheckoutElement.mount('#express-checkout'); // Mount it in a DOM element

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3001/payment-success', // Redirect URL after successful payment
        },
      });

      if (error) {
        setMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setMessage('Payment successful!');
      }
    } catch (error) {
      setMessage('Payment failed. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <div id="express-checkout" className="border p-4 rounded-lg"></div>
      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
};

const App = () => {
  const totalAmount = 500; // Example amount

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalAmount={totalAmount} />
    </Elements>
  );
};

export default App;
