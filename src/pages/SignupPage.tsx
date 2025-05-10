import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'proPlus'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    establishmentName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

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
        savings: 'Save $29.88/year'
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
        savings: 'Save $39.88/year'
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            restaurant_name: formData.establishmentName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zipCode,
            country: formData.country
          }
        }
      });

      if (signUpError) throw signUpError;

      // Store restaurant info
      localStorage.setItem('restaurantName', formData.establishmentName);
      localStorage.setItem('userEmail', formData.email);
      
      // Get the session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (!session) {
        throw new Error('No session after signup');
      }

      // Navigate to payment with selected plan and auth token
      navigate('/settings/payment', {
        state: {
          plan: billingCycle,
          tier: selectedPlan,
          price: plans[selectedPlan][billingCycle].price,
          period: plans[selectedPlan][billingCycle].period,
          token: session.access_token
        }
      });
      
      toast.success('Account created! Proceeding to payment...');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center">
          <img src="https://i.imgur.com/kHROaT6.png" alt="Dipout Logo" className="h-16 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get started with Dipout today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Plan Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose your plan</h3>
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-md ${
                    billingCycle === 'monthly' 
                      ? 'bg-white shadow-sm text-red-900' 
                      : 'text-gray-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 rounded-md ${
                    billingCycle === 'annual' 
                      ? 'bg-white shadow-sm text-red-900' 
                      : 'text-gray-600'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {/* Pro Plan */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  selectedPlan === 'pro' 
                    ? 'border-red-900 bg-red-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPlan('pro')}
              >
                <h3 className="text-lg font-semibold">Pro</h3>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-red-900">
                    {plans.pro[billingCycle].price}
                    <span className="text-sm text-gray-500">/{plans.pro[billingCycle].period}</span>
                  </p>
                  {plans.pro[billingCycle].savings && (
                    <p className="text-sm text-green-600">{plans.pro[billingCycle].savings}</p>
                  )}
                </div>
              </div>

              {/* Pro Plus Plan */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer ${
                  selectedPlan === 'proPlus' 
                    ? 'border-red-900 bg-red-50' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPlan('proPlus')}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">Pro Plus</h3>
                  <span className="text-xs bg-red-900 text-white px-2 py-1 rounded-full">POPULAR</span>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-red-900">
                    {plans.proPlus[billingCycle].price}
                    <span className="text-sm text-gray-500">/{plans.proPlus[billingCycle].period}</span>
                  </p>
                  {plans.proPlus[billingCycle].savings && (
                    <p className="text-sm text-green-600">{plans.proPlus[billingCycle].savings}</p>
                  )}
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                  />
                  <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="establishmentName" className="block text-sm font-medium text-gray-700">
                  Establishment Name
                </label>
                <div className="mt-1 relative">
                  <input
                    id="establishmentName"
                    name="establishmentName"
                    type="text"
                    required
                    value={formData.establishmentName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                  />
                  <Building2 className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <div className="mt-1">
                    <input
                      id="state"
                      name="state"
                      type="text"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-900 focus:border-red-900"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#E5DDD3] bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900 ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;