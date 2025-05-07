import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNoShow } from '../context/NoShowContext';
import { Search, UserRound, Clock, X, Check } from 'lucide-react';
import { getFlakeColorClass } from '../utils/flakeUtils';

const CustomerLookup = () => {
  const navigate = useNavigate();
  const { getCustomerByPhone, getFlakeScore, getFlakeColor, getRecommendation } = useNoShow();
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    customer?: ReturnType<typeof getCustomerByPhone>;
    score?: number;
    color?: string;
    recommendation?: string;
  } | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) return;
    
    const customer = getCustomerByPhone(phoneNumber);
    
    if (customer) {
      setSearchResult({
        found: true,
        customer,
        score: getFlakeScore(phoneNumber),
        color: getFlakeColor(phoneNumber),
        recommendation: getRecommendation(phoneNumber),
      });
    } else {
      setSearchResult({
        found: false,
      });
    }
  };
  
  const handleViewDetails = () => {
    if (searchResult?.found && searchResult.customer) {
      navigate(`/customer/${searchResult.customer.phoneNumber}`);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Search size={28} className="text-blue-500" />
        <h1 className="text-2xl font-bold text-gray-800">Customer Lookup</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter customer phone number"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <UserRound size={20} />
              </div>
            </div>
            <button
              type="submit"
              className="ml-3 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>
        
        {searchResult && (
          <div 
            className={`rounded-lg p-6 mt-4 transition-all duration-300 ${
              searchResult.found 
                ? searchResult.color === 'green' 
                  ? 'bg-green-50 border border-green-200' 
                  : searchResult.color === 'yellow' 
                    ? 'bg-yellow-50 border border-yellow-200' 
                    : 'bg-red-50 border border-red-200'
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            {searchResult.found ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getFlakeColorClass(searchResult.color || 'gray')}`}>
                      <span className="text-white font-bold">{searchResult.score}</span>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-800">{searchResult.customer?.phoneNumber}</h3>
                      <p className="text-sm text-gray-500">{searchResult.customer?.noShows.length} past no-shows</p>
                    </div>
                  </div>
                  <button
                    onClick={handleViewDetails}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
                
                <div className={`p-4 rounded-lg mb-4 ${
                  searchResult.color === 'green' 
                    ? 'bg-green-100 text-green-800' 
                    : searchResult.color === 'yellow' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  <p className="font-medium">{searchResult.recommendation}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">Recent No-Shows:</h4>
                  {searchResult.customer?.noShows.slice(0, 3).map((noShow) => (
                    <div key={noShow.id} className="flex items-center border-b border-gray-100 pb-2">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium">
                          {new Date(noShow.date).toLocaleDateString()} - {noShow.orderType}
                        </p>
                        {noShow.notes && (
                          <p className="text-xs text-gray-500">{noShow.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                  <UserRound size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">No Records Found</h3>
                <p className="text-gray-500 mb-4">
                  No customer with this phone number has been recorded for no-shows.
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => navigate('/capture')}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Log a No-Show
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Quick Tip</h3>
          <p className="text-sm text-blue-700">
            Search for a customer before preparing their order to check their reliability.
            A high flake score indicates a history of not picking up orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerLookup;