import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, ArrowRight, Shield, Star, Zap, Users, BarChart3 } from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const plans = {
    pro: {
      monthly: {
        price: '$14.99',
        period: 'month',
        savings: '',
      },
      annual: {
        price: '$150',
        period: 'year',
        savings: 'Save $29.88 compared to monthly',
      }
    },
    proPlus: {
      monthly: {
        price: '$19.99',
        period: 'month',
        savings: '',
      },
      annual: {
        price: '$200',
        period: 'year',
        savings: 'Save $39.88 compared to monthly',
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

  const handleSelectPro = () => {
    navigate('/settings/payment', { 
      state: { 
        plan: selectedPlan, 
        tier: 'pro',
        price: plans.pro[selectedPlan].price,
        period: plans.pro[selectedPlan].period
      } 
    });
  };

  const handleSelectProPlus = () => {
    navigate('/settings/payment', { 
      state: { 
        plan: selectedPlan, 
        tier: 'proPlus',
        price: plans.proPlus[selectedPlan].price,
        period: plans.proPlus[selectedPlan].period
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Protect Your Business from No-Shows
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Join thousands of restaurants using Dipout to reduce no-shows and increase revenue
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-blue-500" size={20} />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-blue-500" size={20} />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-blue-500" size={20} />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-lg shadow-md inline-flex mb-12">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'monthly' 
                  ? 'bg-blue-500 text-white shadow' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'annual' 
                  ? 'bg-blue-500 text-white shadow' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Annual <span className="text-blue-200 text-sm ml-1">Save up to 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8 bg-gradient-to-br from-blue-500 to-blue-600">
              <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
              <p className="text-blue-100 mb-6">Perfect for growing restaurants</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">{plans.pro[selectedPlan].price}</span>
                <span className="text-blue-100 ml-2">per {plans.pro[selectedPlan].period}</span>
              </div>
              {plans.pro[selectedPlan].savings && (
                <p className="text-blue-100 text-sm mt-2">{plans.pro[selectedPlan].savings}</p>
              )}
            </div>
            
            <div className="p-8">
              <ul className="space-y-4">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={handleSelectPro}
                className="w-full mt-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
              >
                Start 7-Day Trial <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Pro Plus Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-lg font-medium">
              MOST POPULAR
            </div>
            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-700">
              <h2 className="text-2xl font-bold text-white mb-2">Pro Plus</h2>
              <p className="text-blue-100 mb-6">Advanced features for maximum protection</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-white">{plans.proPlus[selectedPlan].price}</span>
                <span className="text-blue-100 ml-2">per {plans.proPlus[selectedPlan].period}</span>
              </div>
              {plans.proPlus[selectedPlan].savings && (
                <p className="text-blue-100 text-sm mt-2">{plans.proPlus[selectedPlan].savings}</p>
              )}
            </div>
            
            <div className="p-8">
              <ul className="space-y-4">
                {features.proPlus.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={handleSelectProPlus}
                className="w-full mt-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                Start 7-Day Trial <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Bank-level security to protect your data</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Setup</h3>
            <p className="text-gray-600">Be up and running in minutes</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Expert help whenever you need it</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rich Analytics</h3>
            <p className="text-gray-600">Detailed insights and reporting</p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-blue-100 mb-8">
            <Shield size={20} className="text-blue-600" />
            <span className="text-blue-600 text-sm font-medium mx-2">7-Day Free Trial</span>
            <Star size={20} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Start Protecting Your Business Today</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try all features risk-free for 7 days. Credit card required. Cancel anytime during your trial period.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;