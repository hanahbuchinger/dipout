import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

interface PaywallWrapperProps {
  children: React.ReactNode;
}

const PaywallWrapper: React.FC<PaywallWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [daysLeft, setDaysLeft] = useState(7);

  // Check if user has completed signup
  useEffect(() => {
    const trialStartDate = localStorage.getItem('trialStartDate');
    if (!trialStartDate) {
      navigate('/signup');
      return;
    }
  }, [navigate]);

  // Simulate checking subscription status
  useEffect(() => {
    const checkSubscription = () => {
      const subscriptionStatus = localStorage.getItem('subscriptionStatus');
      const trialStartDate = localStorage.getItem('trialStartDate');
      
      if (subscriptionStatus === 'active') {
        setIsSubscribed(true);
      } else {
        if (!trialStartDate) {
          navigate('/signup');
          return;
        }
        
        const startDate = new Date(trialStartDate);
        const today = new Date();
        const trialEndDate = new Date(startDate);
        trialEndDate.setDate(trialEndDate.getDate() + 7);
        
        const daysRemaining = Math.max(0, Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        setDaysLeft(daysRemaining);
        
        if (daysRemaining <= 0) {
          localStorage.setItem('subscriptionStatus', 'expired');
          setIsSubscribed(false);
        } else {
          setIsSubscribed(true);
        }
      }
      
      setIsLoading(false);
    };
    
    checkSubscription();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
      </div>
    );
  }

  if (isSubscribed) {
    if (localStorage.getItem('subscriptionStatus') === 'trial') {
      return (
        <>
          <div className="bg-red-50 border-l-4 border-red-900 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Shield className="h-5 w-5 text-red-900" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-900">
                  You're currently in your free trial period. <strong>{daysLeft} days left</strong> before you need to subscribe.
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-sm font-medium text-red-900 hover:text-red-800 flex items-center"
                >
                  Upgrade Now <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
          {children}
        </>
      );
    }
    
    return <>{children}</>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Shield size={32} className="text-red-900" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Subscription Required</h2>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Your trial period has ended. Please subscribe to continue using Dipout and protect your business from no-shows.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <div className="bg-[#E5DDD3]/10 border rounded-lg p-4 flex-1 max-w-xs mx-auto">
          <h3 className="font-bold text-gray-800 mb-2">Dipout Pro</h3>
          <p className="text-gray-600 text-sm mb-3">Track no-shows and flag repeat offenders</p>
          <p className="text-red-900 font-bold mb-4">Starting at $14.99/month</p>
          <button 
            onClick={() => navigate('/pricing')}
            className="w-full py-2 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800 transition-colors"
          >
            Choose Plan
          </button>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex-1 max-w-xs mx-auto relative">
          <div className="absolute top-0 right-0 bg-red-900 text-[#E5DDD3] px-2 py-1 text-xs rounded-bl-lg rounded-tr-lg font-medium">
            POPULAR
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Dipout Pro Plus</h3>
          <p className="text-gray-600 text-sm mb-3">Advanced protection and revenue optimization</p>
          <p className="text-red-900 font-bold mb-4">Starting at $19.99/month</p>
          <button 
            onClick={() => navigate('/pricing')}
            className="w-full py-2 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800 transition-colors"
          >
            Choose Plan
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        Need help? Contact our support team at <a href="mailto:support@dipout.com" className="text-red-900 hover:underline">support@dipout.com</a>
      </p>
    </div>
  );
};

export default PaywallWrapper;