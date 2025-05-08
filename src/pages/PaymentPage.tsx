import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('Received location.state:', location.state);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  // Redirect if no state is present
  useEffect(() => {
    if (!location.state?.tier || !location.state?.plan) {
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set payment and subscription status
      localStorage.setItem('paymentStatus', 'completed');
      localStorage.setItem('subscriptionStatus', 'active');
      
      const customerInfo = {
        restaurantName: localStorage.getItem('restaurantName') || '',
        email: localStorage.getItem('userEmail') || '',
        plan: location.state?.tier === 'proPlus' ? 'Pro Plus' : 'Pro',
        trialEndDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
      };

      // Send payment notification
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payment-notification`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerInfo }),
      });

      setIsProcessing(false);
      
      toast.success('Payment successful! Redirecting to dashboard...', {
        icon: <Check className="text-green-500" />,
        duration: 3000,
      });
      
      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate('/app');
      }, 1500);
    } catch (error) {
      setIsProcessing(false);
      toast.error('There was an error processing your payment. Please try again.');
    }
  };

  // Show loading state while checking state
  if (!location.state?.tier || !location.state?.plan) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-gray-600 mr-2" />
          <h2 className="text-xl font-semibold">Payment Details</h2>
        </div>

        {/* Display selected plan details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-700">Selected Plan</h3>
          <p className="text-gray-600">
            {location.state.tier === 'proPlus' ? 'Pro Plus' : 'Pro'} - {location.state.price}/{location.state.period}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
              isProcessing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Processing...
              </>
            ) : (
              'Complete Payment'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;