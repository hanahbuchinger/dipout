import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoShow } from '../context/NoShowContext';
import { Check, X, AlarmClockOff } from 'lucide-react';
import toast from 'react-hot-toast';

const CaptureNoShow = () => {
  const navigate = useNavigate();
  const { addNoShow } = useNoShow();
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    orderType: 'pickup' as 'pickup' | 'call-in' | 'delivery' | 'reservation' | 'other',
    date: new Date().toISOString().slice(0, 16), // Current date and time in local format
    value: '',
    notes: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Phone number validation (simple check for non-empty and format)
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phoneNumber) && 
               !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phoneNumber) &&
               !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    // Order type validation
    if (!formData.orderType) {
      newErrors.orderType = 'Order type is required';
    }
    
    // Date validation
    if (!formData.date) {
      newErrors.date = 'Date and time are required';
    }
    
    // Value validation (optional but must be a number if provided)
    if (formData.value && isNaN(parseFloat(formData.value))) {
      newErrors.value = 'Value must be a number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const noShowData = {
        date: new Date(formData.date).toISOString(),
        orderType: formData.orderType,
        value: formData.value ? parseFloat(formData.value) : undefined,
        notes: formData.notes || undefined,
      };
      
      addNoShow(formData.phoneNumber, noShowData);
      
      toast.success('No-show recorded successfully!', {
        icon: <Check className="text-green-500" />,
        duration: 3000,
      });
      
      // Navigate to the customer details page or reset form
      navigate(`/customer/${formData.phoneNumber}`);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <AlarmClockOff size={28} className="text-red-500" />
        <h1 className="text-2xl font-bold text-gray-800">Log a No-Show</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="555-123-4567"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>
          
          {/* Order Type */}
          <div>
            <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 mb-1">
              Order Type <span className="text-red-500">*</span>
            </label>
            <select
              id="orderType"
              name="orderType"
              value={formData.orderType}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.orderType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="pickup">Pickup</option>
              <option value="call-in">Call-in</option>
              <option value="delivery">Delivery</option>
              <option value="reservation">Reservation</option>
              <option value="other">Other</option>
            </select>
            {errors.orderType && (
              <p className="mt-1 text-sm text-red-500">{errors.orderType}</p>
            )}
          </div>
          
          {/* Date and Time */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-500">{errors.date}</p>
            )}
          </div>
          
          {/* Value */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Order Value ($)
            </label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="24.99"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                errors.value ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-500">{errors.value}</p>
            )}
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Items ordered, special circumstances, etc."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            ></textarea>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Record No-Show
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaptureNoShow;