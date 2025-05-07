import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoShow } from '../context/NoShowContext';
import { UserRound, Calendar, DollarSign, Clock, Tag, FileText } from 'lucide-react';
import { formatCurrency, formatDate, getFlakeColorClass } from '../utils/flakeUtils';

const CustomerDetails = () => {
  const { phoneNumber } = useParams<{ phoneNumber: string }>();
  const navigate = useNavigate();
  const { getCustomerByPhone, getFlakeScore, getFlakeColor, getRecommendation } = useNoShow();
  
  if (!phoneNumber) {
    return <div>Invalid customer ID</div>;
  }
  
  const customer = getCustomerByPhone(phoneNumber);
  const flakeScore = getFlakeScore(phoneNumber);
  const flakeColor = getFlakeColor(phoneNumber);
  const recommendation = getRecommendation(phoneNumber);
  
  if (!customer) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <UserRound size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Customer Not Found</h2>
          <p className="text-gray-600 mb-6">The customer with phone number {phoneNumber} was not found.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/lookup')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Lookup
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Total value lost calculation
  const totalValueLost = customer.noShows.reduce((sum, event) => sum + (event.value || 0), 0);
  
  // Sort no-shows by date (newest first)
  const sortedNoShows = [...customer.noShows].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <UserRound size={28} className="text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Customer Details</h1>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Back
        </button>
      </div>
      
      {/* Customer Summary Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getFlakeColorClass(flakeColor)}`}>
              <span className="text-white font-bold text-lg">{flakeScore}</span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-800">{phoneNumber}</h2>
              <p className="text-gray-500">
                {flakeScore === 1 ? '1 no-show' : `${flakeScore} no-shows`} recorded
              </p>
            </div>
          </div>
          <div className="flex items-center">
            {totalValueLost > 0 && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Value Lost</p>
                <p className="text-lg font-bold text-amber-600">{formatCurrency(totalValueLost)}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Recommendation banner */}
        <div 
          className={`mt-6 p-4 rounded-lg ${
            flakeColor === 'green' 
              ? 'bg-green-100 text-green-800' 
              : flakeColor === 'yellow' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}
        >
          <p className="font-medium">{recommendation}</p>
        </div>
        
        {/* Action buttons */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => navigate('/capture')}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center"
          >
            <Calendar size={18} className="mr-2" />
            Log Another No-Show
          </button>
        </div>
      </div>
      
      {/* No-Show History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">No-Show History</h3>
        
        <div className="space-y-4">
          {sortedNoShows.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No history available</p>
          ) : (
            sortedNoShows.map((noShow) => (
              <div key={noShow.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center mb-1">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <p className="font-medium text-gray-800">{formatDate(noShow.date)}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Tag size={14} className="mr-2" />
                      <span className="capitalize">{noShow.orderType}</span>
                    </div>
                  </div>
                  
                  {noShow.value && (
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-amber-600 mr-1" />
                      <span className="font-medium text-amber-600">{formatCurrency(noShow.value)}</span>
                    </div>
                  )}
                </div>
                
                {noShow.notes && (
                  <div className="mt-2 flex items-start">
                    <FileText size={14} className="text-gray-400 mr-2 mt-1" />
                    <p className="text-sm text-gray-600">{noShow.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;