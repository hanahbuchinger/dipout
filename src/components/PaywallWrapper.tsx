import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaywallWrapperProps {
  children: React.ReactNode;
}

const PaywallWrapper: React.FC<PaywallWrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const checkSubscription = () => {
      const subscriptionStatus = localStorage.getItem('subscriptionStatus');
      const paymentStatus = localStorage.getItem('paymentStatus');
      const trialStartDate = localStorage.getItem('trialStartDate');
      
      if (!trialStartDate) {
        navigate('/signup');
        return;
      }
      
      if (subscriptionStatus === 'active' && paymentStatus === 'completed') {
        setIsSubscribed(true);
      } else {
        const startDate = new Date(trialStartDate);
        const today = new Date();
        const trialEndDate = new Date(startDate);
        trialEndDate.setDate(trialEndDate.getDate() + 7);
        
        const daysRemaining = Math.max(0, Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        setDaysLeft(daysRemaining);
        
        if (daysRemaining <= 0) {
          localStorage.setItem('subscriptionStatus', 'expired');
          setIsSubscribed(false);
          navigate('/pricing');
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
      </div>
    );
  }

  if (!isSubscribed) {
    return null;
  }

  return (
    <>
      {!isLoading && daysLeft > 0 && daysLeft <= 3 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-amber-800">
              Your free trial expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}. 
              <button 
                onClick={() => navigate('/pricing')} 
                className="ml-2 font-medium underline hover:text-amber-900"
              >
                Upgrade now
              </button>
            </p>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default PaywallWrapper;