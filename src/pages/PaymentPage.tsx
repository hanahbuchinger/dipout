import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createCheckoutSession } = useStripe();
  const { user } = useAuth();

  useEffect(() => {
    const initializeCheckout = async () => {
      if (!location.state?.tier || !user) {
        navigate('/signup');
        return;
      }

      try {
        await createCheckoutSession(location.state.tier as keyof typeof products);
      } catch (error: any) {
        console.error('Failed to create checkout session:', error);
        navigate('/signup');
      }
    };

    initializeCheckout();
  }, [location.state, navigate, createCheckoutSession, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-900"></div>
    </div>
  );
};

export default PaymentPage;