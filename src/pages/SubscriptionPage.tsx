import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, X, Shield } from 'lucide-react';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<'pro' | 'proPlus'>('pro');

  const plans = {
    pro: {
      monthly: {
        price: '$29.99',
        period: 'month',
        savings: '',
      },
      annual: {
        price: '$299.99',
        period: 'year',
        savings: 'Save $59.89 compared to monthly',
      }
    },
    proPlus: {
      monthly: {
        price: '$49.99',
        period: 'month',
        savings: '',
      },
      annual: {
        price: '$499.99',
        period: 'year',
        savings: 'Save $99.89 compared to monthly',
      }
    }
  };

  const features = {
    pro: [
      'Track no-shows in real-time',
      'Flag repeat offenders with Flake Score',
      'Customer lookup by phone number',
      'Prep guidance based on reliability',
      'Email support',
      'Access across all devices',
    ],
    proPlus: [
      'Everything in Pro plan',
      'Advanced analytics dashboard',
      'Automated customer text notifications',
      'Prepayment prompts after 2+ flakes',
      'Weekly summary emails',
      'Future POS integrations',
      'Priority support',
    ]
  };

  const handleContinue = () => {
    navigate('/settings/payment', { 
      state: { 
        plan: selectedPlan, 
        tier: selectedTier,
        price: plans[selectedTier][selectedPlan].price,
        period: plans[selectedTier][selectedPlan].period
      } 
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <CreditCard size={28} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Choose Your Plan</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Subscription Plans</h2>
          <p className="text-gray-600">Select the plan that works best for your business</p>
          
          <div className="flex justify-center mt-6">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-md ${
                  selectedPlan === 'monthly' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-4 py-2 rounded-md ${
                  selectedPlan === 'annual' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Annual
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pro Plan */}
          <div className={`border rounded-lg overflow-hidden ${selectedTier === 'pro' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="bg-blue-50 p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Dipout Pro</h3>
                  <p className="text-gray-600 mt-1">Essential no-show management</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{plans.pro[selectedPlan].price}</p>
                  <p className="text-gray-500">per {plans.pro[selectedPlan].period}</p>
                  {plans.pro[selectedPlan].savings && (
                    <p className="text-green-600 text-sm mt-1">{plans.pro[selectedPlan].savings}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-medium text-gray-700 mb-4">Included features:</h4>
              <ul className="space-y-3">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button 
                  className={`w-full py-3 ${
                    selectedTier === 'pro' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-600 border border-blue-600'
                  } rounded-lg hover:bg-blue-700 hover:text-white transition-colors font-medium`}
                  onClick={() => setSelectedTier('pro')}
                >
                  {selectedTier === 'pro' ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          </div>

          {/* Pro Plus Plan */}
          <div className={`border rounded-lg overflow-hidden ${selectedTier === 'proPlus' ? 'ring-2 ring-blue-500' : ''}`}>
            <div className="bg-blue-50 p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold text-gray-800">Dipout Pro Plus</h3>
                    <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">POPULAR</span>
                  </div>
                  <p className="text-gray-600 mt-1">Advanced protection & analytics</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{plans.proPlus[selectedPlan].price}</p>
                  <p className="text-gray-500">per {plans.proPlus[selectedPlan].period}</p>
                  {plans.proPlus[selectedPlan].savings && (
                    <p className="text-green-600 text-sm mt-1">{plans.proPlus[selectedPlan].savings}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="font-medium text-gray-700 mb-4">Included features:</h4>
              <ul className="space-y-3">
                {features.proPlus.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button 
                  className={`w-full py-3 ${
                    selectedTier === 'proPlus' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-600 border border-blue-600'
                  } rounded-lg hover:bg-blue-700 hover:text-white transition-colors font-medium`}
                  onClick={() => setSelectedTier('proPlus')}
                >
                  {selectedTier === 'proPlus' ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">How does billing work?</h3>
            <p className="text-gray-600 mt-1">You'll be charged at the beginning of each billing period. You can cancel anytime.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700">Can I change plans later?</h3>
            <p className="text-gray-600 mt-1">Yes, you can upgrade or downgrade your plan at any time from the settings page.</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700">Is there a free trial?</h3>
            <p className="text-gray-600 mt-1">Yes, all new accounts start with a 14-day free trial with full access to all features.</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">What happens if I cancel?</h3>
            <p className="text-gray-600 mt-1">You'll continue to have access until the end of your current billing period. No refunds are provided for partial months.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;