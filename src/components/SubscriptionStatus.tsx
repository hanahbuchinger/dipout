import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const SubscriptionStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('stripe_user_subscriptions')
          .select('subscription_status')
          .single();

        if (error) throw error;
        setStatus(data?.subscription_status || null);
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  if (loading) return null;

  if (!status || status !== 'active') {
    return (
      <button
        onClick={() => navigate('/pricing')}
        className="flex items-center px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 rounded-lg hover:bg-amber-200"
      >
        <Crown className="w-4 h-4 mr-2" />
        Upgrade to Pro
      </button>
    );
  }

  return (
    <div className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
      <Crown className="w-4 h-4 mr-2" />
      Pro Subscriber
    </div>
  );
};

export default SubscriptionStatus;