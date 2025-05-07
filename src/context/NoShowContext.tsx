import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Customer, NoShowEvent, Settings } from '../types';
import { calculateFlakeScore } from '../utils/flakeUtils';

// Initial demo data
const initialCustomers: Customer[] = [
  {
    id: '1',
    phoneNumber: '555-123-4567',
    noShows: [
      { id: '1', date: '2023-06-10T18:30:00', orderType: 'pickup', value: 32.50, notes: 'Pizza and wings' },
      { id: '2', date: '2023-07-15T19:00:00', orderType: 'call-in', value: 27.99, notes: 'Large pepperoni pizza' }
    ]
  },
  {
    id: '2',
    phoneNumber: '555-987-6543',
    noShows: [
      { id: '3', date: '2023-08-05T12:15:00', orderType: 'pickup', value: 18.25, notes: 'Sandwich combo' },
      { id: '4', date: '2023-08-20T13:30:00', orderType: 'pickup', value: 42.75, notes: 'Family meal deal' },
      { id: '5', date: '2023-09-12T17:45:00', orderType: 'call-in', value: 31.50, notes: 'Pizza and salad' }
    ]
  },
  {
    id: '3',
    phoneNumber: '555-456-7890',
    noShows: [
      { id: '6', date: '2023-09-01T19:15:00', orderType: 'call-in', value: 24.99, notes: 'Pasta special' }
    ]
  }
];

const initialSettings: Settings = {
  yellowThreshold: 1,
  redThreshold: 3,
  enableTextNotifications: false,
  restaurantName: "Paolo's Pizza",
  restaurantId: "12345",
  subscriptionStatus: "trial",
  subscriptionPlan: "none",
  trialEndDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString()
};

type NoShowContextType = {
  customers: Customer[];
  settings: Settings;
  addNoShow: (phoneNumber: string, noShow: Omit<NoShowEvent, 'id'>) => void;
  getCustomerByPhone: (phoneNumber: string) => Customer | undefined;
  getRecommendation: (phoneNumber: string) => string;
  getFlakeScore: (phoneNumber: string) => number;
  getFlakeColor: (phoneNumber: string) => string;
  updateSettings: (newSettings: Partial<Settings>) => void;
  totalNoShows: number;
  totalValueLost: number;
  updateSubscription: (status: string, plan: string) => void;
};

const NoShowContext = createContext<NoShowContextType | undefined>(undefined);

export const NoShowProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [settings, setSettings] = useState<Settings>(initialSettings);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedCustomers = localStorage.getItem('customers');
    const savedSettings = localStorage.getItem('settings');
    
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Calculate total no-shows and value lost
  const totalNoShows = customers.reduce((acc, customer) => acc + customer.noShows.length, 0);
  const totalValueLost = customers.reduce(
    (acc, customer) => acc + customer.noShows.reduce((sum, event) => sum + (event.value || 0), 0),
    0
  );

  const addNoShow = (phoneNumber: string, noShowData: Omit<NoShowEvent, 'id'>) => {
    const newNoShow: NoShowEvent = {
      ...noShowData,
      id: Date.now().toString(),
    };

    setCustomers((prevCustomers) => {
      // Check if the customer already exists
      const existingCustomerIndex = prevCustomers.findIndex(
        (c) => c.phoneNumber === phoneNumber
      );

      if (existingCustomerIndex >= 0) {
        // Update existing customer
        const updatedCustomers = [...prevCustomers];
        updatedCustomers[existingCustomerIndex] = {
          ...updatedCustomers[existingCustomerIndex],
          noShows: [...updatedCustomers[existingCustomerIndex].noShows, newNoShow],
        };
        return updatedCustomers;
      } else {
        // Add new customer
        return [
          ...prevCustomers,
          {
            id: Date.now().toString(),
            phoneNumber,
            noShows: [newNoShow],
          },
        ];
      }
    });
  };

  const getCustomerByPhone = (phoneNumber: string) => {
    return customers.find((c) => c.phoneNumber === phoneNumber);
  };

  const getFlakeScore = (phoneNumber: string) => {
    const customer = getCustomerByPhone(phoneNumber);
    return customer ? customer.noShows.length : 0;
  };

  const getFlakeColor = (phoneNumber: string) => {
    const score = getFlakeScore(phoneNumber);
    if (score >= settings.redThreshold) return 'red';
    if (score >= settings.yellowThreshold) return 'yellow';
    return 'green';
  };

  const getRecommendation = (phoneNumber: string) => {
    const score = getFlakeScore(phoneNumber);
    if (score >= settings.redThreshold) {
      return "❌ Strongly recommend prepayment or refusal.";
    } else if (score >= settings.yellowThreshold) {
      return "⚠️ Recommend prepayment or delay prep until arrival.";
    }
    return "✅ No issues detected.";
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const updateSubscription = (status: string, plan: string) => {
    setSettings((prev) => ({ 
      ...prev, 
      subscriptionStatus: status,
      subscriptionPlan: plan
    }));
  };

  return (
    <NoShowContext.Provider
      value={{
        customers,
        settings,
        addNoShow,
        getCustomerByPhone,
        getRecommendation,
        getFlakeScore,
        getFlakeColor,
        updateSettings,
        totalNoShows,
        totalValueLost,
        updateSubscription,
      }}
    >
      {children}
    </NoShowContext.Provider>
  );
};

export const useNoShow = () => {
  const context = useContext(NoShowContext);
  if (context === undefined) {
    throw new Error('useNoShow must be used within a NoShowProvider');
  }
  return context;
};