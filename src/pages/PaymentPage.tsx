import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Check, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const planData = location.state || { 
    plan: 'annual', 
    tier: 'pro',
    price: '$299.99',
    period: 'year'
  };
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    billingAddress: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Your subscription is now active.', {
        icon: <Check className="text-green-500" />,
        duration: 5000,
      });
      navigate('/settings');
    }, 2000);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <button 
          onClick={() => navigate('/pricing')}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Payment Information</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#38B6FF] rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl font-bold">D</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Dipout {planData.tier === 'pro' ? 'Pro' : 'Pro Plus'}</h2>
              <p className="text-gray-600">{planData.plan === 'monthly' ? 'Monthly' : 'Annual'} Plan</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-800">{planData.price}</p>
            <p className="text-sm text-gray-500">per {planData.period}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Payment Method</h3>
            
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="4242 4242 4242 4242"
                />
                <CreditCard size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  maxLength={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  required
                  maxLength={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Billing Address</h3>
            
            <div>
              <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="123 Main St"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="New York"
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="NY"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10001"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex items-center bg-blue-50 p-4 rounded-lg">
            <Shield size={20} className="text-blue-600 mr-2" />
            <p className="text-sm text-blue-700">Your payment information is encrypted and secure.</p>
          </div>
          
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => navigate('/pricing')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Complete Payment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;