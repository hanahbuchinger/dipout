export interface NoShowEvent {
  id: string;
  date: string;
  orderType: 'pickup' | 'call-in' | 'delivery' | 'reservation' | 'other';
  value?: number;
  notes?: string;
}

export interface Customer {
  id: string;
  phoneNumber: string;
  noShows: NoShowEvent[];
}

export interface Settings {
  yellowThreshold: number;
  redThreshold: number;
  enableTextNotifications: boolean;
  restaurantName: string;
  restaurantId: string;
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'none';
  subscriptionPlan: 'none' | 'pro' | 'proPlus';
  trialEndDate?: string;
}