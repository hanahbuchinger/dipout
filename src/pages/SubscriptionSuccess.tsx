import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const SubscriptionSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/app');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Subscription Activated!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for subscribing to Dipout. Your account has been successfully activated.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Redirecting you to the dashboard in a few seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;