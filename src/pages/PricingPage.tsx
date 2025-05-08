import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check, ArrowRight, Shield, Star, Zap, Users, BarChart3, DollarSign, Clock, Bell } from 'lucide-react';

const PricingPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const trialStartDate = localStorage.getItem('trialStartDate');
    if (!trialStartDate) {
      navigate('/signup');
      return;
    }
  }, [navigate]);

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

  const proFeatures = [
    'Track no-shows in real-time',
    'Flag repeat offenders with Flake Score',
    'Customer lookup by phone number',
    'Prep guidance based on reliability',
    'Email support',
    'Access across all devices',
  ];

  const proPlusFeatures = [
    'Everything in Pro plan',
    'Advanced analytics dashboard',
    'Smart cost-saving tips',
    'Prepayment prompts for repeat no-shows',
    'Internal sales shift strategies',
    'Half-off hot bin for regulars',
    'Automated customer text notifications',
    'Weekly summary emails',
    'Future POS integrations',
    'Priority support',
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
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
              <Check className="text-red-900" size={20} />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-red-900" size={20} />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Check className="text-red-900" size={20} />
              <span>Cancel anytime</span>
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-lg shadow-md inline-flex mb-12">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'monthly' 
                  ? 'bg-red-900 text-[#E5DDD3] shadow' 
                  : 'text-gray-600 hover:bg-[#E5DDD3]/20'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('annual')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedPlan === 'annual' 
                  ? 'bg-red-900 text-[#E5DDD3] shadow' 
                  : 'text-gray-600 hover:bg-[#E5DDD3]/20'
              }`}
            >
              Annual <span className="text-red-200 text-sm ml-1">Save up to 17%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="p-8 bg-gradient-to-br from-red-900 to-red-800">
              <h2 className="text-2xl font-bold text-[#E5DDD3] mb-2">Pro</h2>
              <p className="text-red-100 mb-6">Perfect for growing restaurants</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-[#E5DDD3]">{plans.pro[selectedPlan].price}</span>
                <span className="text-red-100 ml-2">per {plans.pro[selectedPlan].period}</span>
              </div>
              {plans.pro[selectedPlan].savings && (
                <p className="text-red-100 text-sm mt-2">{plans.pro[selectedPlan].savings}</p>
              )}
            </div>
            
            <div className="p-8">
              <ul className="space-y-4">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-red-900 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={handleSelectPro}
                className="w-full mt-8 py-4 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800 transition-colors font-medium flex items-center justify-center"
              >
                Start 7-Day Trial <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Pro Plus Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
            <div className="absolute top-0 right-0 bg-red-900 text-[#E5DDD3] px-4 py-1 rounded-bl-lg font-medium">
              MOST POPULAR
            </div>
            <div className="p-8 bg-gradient-to-br from-red-900 to-red-800">
              <h2 className="text-2xl font-bold text-[#E5DDD3] mb-2">Pro Plus</h2>
              <p className="text-red-100 mb-6">Advanced features for maximum protection</p>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-[#E5DDD3]">{plans.proPlus[selectedPlan].price}</span>
                <span className="text-red-100 ml-2">per {plans.proPlus[selectedPlan].period}</span>
              </div>
              {plans.proPlus[selectedPlan].savings && (
                <p className="text-red-100 text-sm mt-2">{plans.proPlus[selectedPlan].savings}</p>
              )}
            </div>
            
            <div className="p-8">
              <ul className="space-y-4">
                {proPlusFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-red-900 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={handleSelectProPlus}
                className="w-full mt-8 py-4 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800 transition-colors font-medium flex items-center justify-center"
              >
                Start 7-Day Trial <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-red-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Savings</h3>
            <p className="text-gray-600">Smart tips to maximize revenue</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} className="text-red-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">Monitor no-shows instantly</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-red-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Alerts</h3>
            <p className="text-gray-600">Automated notifications</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={24} className="text-red-900" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Rich Analytics</h3>
            <p className="text-gray-600">Detailed insights and reporting</p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center justify-center p-1 rounded-full bg-red-100 mb-8">
            <Shield size={20} className="text-red-900" />
            <span className="text-red-900 text-sm font-medium mx-2">7-Day Free Trial</span>
            <Star size={20} className="text-red-900" />
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