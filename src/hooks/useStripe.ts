import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext';
import { products } from '../stripe-config';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function useStripe() {
  const { user } = useAuth();

  const createCheckoutSession = async (productId: keyof typeof products) => {
    const product = products[productId];
    if (!product) throw new Error('Invalid product');

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.access_token}`,
      },
      body: JSON.stringify({
        price_id: product.priceId,
        success_url: `${window.location.origin}/app/settings/billing?success=true`,
        cancel_url: `${window.location.origin}/app/settings/billing?success=false`,
        mode: product.mode,
      }),
    });

    const { url } = await response.json();
    window.location.href = url;
  };

  return { createCheckoutSession };
}