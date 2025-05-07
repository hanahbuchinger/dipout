import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoShow } from '../context/NoShowContext';
import { Settings as SettingsIcon, Save, Check, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { settings, updateSettings } = useNoShow();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    yellowThreshold: settings.yellowThreshold,
    redThreshold: settings.redThreshold,
    enableTextNotifications: settings.enableTextNotifications,
    restaurantName: settings.restaurantName,
    restaurantId: settings.restaurantId
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    
    toast.success('Settings saved successfully!', {
      icon: <Check className="text-green-500" />,
      duration: 3000,
    });
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <SettingsIcon size={28} className="text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Restaurant Information */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  id="restaurantName"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="restaurantId" className="block text-sm font-medium text-gray-700 mb-1">
                  Restaurant ID
                </label>
                <input
                  type="text"
                  id="restaurantId"
                  name="restaurantId"
                  value={formData.restaurantId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Flake Score Thresholds */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Flake Score Thresholds</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="yellowThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Yellow Warning Threshold
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="yellowThreshold"
                    name="yellowThreshold"
                    min="1"
                    max={formData.redThreshold - 1}
                    value={formData.yellowThreshold}
                    onChange={handleChange}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-500">or more no-shows</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Customers with this many no-shows will get a yellow warning.
                </p>
              </div>
              
              <div>
                <label htmlFor="redThreshold" className="block text-sm font-medium text-gray-700 mb-1">
                  Red Alert Threshold
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    id="redThreshold"
                    name="redThreshold"
                    min={formData.yellowThreshold + 1}
                    value={formData.redThreshold}
                    onChange={handleChange}
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-500">or more no-shows</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Customers with this many no-shows will get a red alert, recommending prepayment.
                </p>
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h2>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="enableTextNotifications"
                  checked={formData.enableTextNotifications}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Enable automated text notifications to no-show customers</span>
              </label>
              <p className="mt-1 text-xs text-gray-500 ml-6">
                When enabled, an automatic text will be sent to customers who don't pick up their orders.
              </p>
            </div>
          </div>
          
          {/* Subscription Settings */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Subscription</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">Current Plan: <span className="text-blue-600">Free Trial</span></p>
                <p className="text-sm text-gray-500 mt-1">Your trial ends in 14 days</p>
              </div>
              <button 
                type="button"
                onClick={() => navigate('/pricing')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <CreditCard size={18} className="mr-2" />
                Upgrade Plan
              </button>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save size={18} className="mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;