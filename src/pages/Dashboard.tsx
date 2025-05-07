import React from 'react';
import { useNoShow } from '../context/NoShowContext';
import { BarChart, Hourglass, Ban, DollarSign, UserRound } from 'lucide-react';
import { formatCurrency } from '../utils/flakeUtils';

const Dashboard = () => {
  const { customers, totalNoShows, totalValueLost, settings } = useNoShow();
  
  // Calculate statistics
  const topOffenders = [...customers]
    .sort((a, b) => b.noShows.length - a.noShows.length)
    .slice(0, 5);
  
  const recentNoShows = customers
    .flatMap(customer => 
      customer.noShows.map(noShow => ({
        ...noShow,
        phoneNumber: customer.phoneNumber
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const noShowsByType = customers
    .flatMap(c => c.noShows)
    .reduce((acc, noShow) => {
      acc[noShow.orderType] = (acc[noShow.orderType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const mostCommonType = Object.entries(noShowsByType)
    .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

  return (
    <div className="space-y-6">
      {/* Business Name Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-right">
          <h2 className="text-lg font-semibold text-gray-700">{settings.restaurantName}</h2>
          <p className="text-sm text-gray-500">ID: {settings.restaurantId}</p>
        </div>
      </div>
      
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total No-Shows" 
          value={totalNoShows.toString()} 
          icon={<Ban size={20} className="text-red-500" />} 
          trend="+2 this week"
          trendUp={false}
        />
        <StatCard 
          title="Value Lost" 
          value={formatCurrency(totalValueLost)} 
          icon={<DollarSign size={20} className="text-amber-500" />} 
          trend="+$120 this week"
          trendUp={false}
        />
        <StatCard 
          title="Repeat Offenders" 
          value={customers.filter(c => c.noShows.length > 1).length.toString()} 
          icon={<UserRound size={20} className="text-blue-500" />} 
          trend="+1 this week"
          trendUp={false}
        />
        <StatCard 
          title="Most Common Type" 
          value={mostCommonType[0]} 
          icon={<Hourglass size={20} className="text-purple-500" />} 
          subvalue={`${mostCommonType[1]} incidents`}
        />
      </div>
      
      {/* Top offenders */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Top Offenders</h2>
          <BarChart size={20} className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-sm font-medium text-gray-500">Phone Number</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">No-Shows</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">Value Lost</th>
                <th className="text-left py-2 text-sm font-medium text-gray-500">Last Incident</th>
              </tr>
            </thead>
            <tbody>
              {topOffenders.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm">
                    <a href={`/customer/${customer.phoneNumber}`} className="text-blue-600 hover:underline font-medium">
                      {customer.phoneNumber}
                    </a>
                  </td>
                  <td className="py-3 text-sm">
                    <span className="bg-red-100 text-red-800 font-medium px-2 py-1 rounded-full text-xs">
                      {customer.noShows.length}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    {formatCurrency(customer.noShows.reduce((sum, event) => sum + (event.value || 0), 0))}
                  </td>
                  <td className="py-3 text-sm text-gray-500">
                    {new Date(Math.max(...customer.noShows.map(n => new Date(n.date).getTime()))).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {topOffenders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Recent no-shows */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent No-Shows</h2>
          <Hourglass size={20} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {recentNoShows.map((event) => (
            <div key={event.id} className="flex items-center justify-between border-b pb-3">
              <div>
                <a href={`/customer/${event.phoneNumber}`} className="text-blue-600 hover:underline font-medium">
                  {event.phoneNumber}
                </a>
                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</p>
              </div>
              <div>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {event.orderType}
                </span>
                {event.value && (
                  <span className="ml-2 text-sm font-medium text-amber-600">
                    {formatCurrency(event.value)}
                  </span>
                )}
              </div>
            </div>
          ))}
          {recentNoShows.length === 0 && (
            <div className="py-4 text-center text-gray-500">
              No recent no-shows
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat card component
const StatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp, 
  subvalue 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend?: string; 
  trendUp?: boolean;
  subvalue?: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {subvalue && <p className="text-xs text-gray-500 mt-1">{subvalue}</p>}
      {trend && (
        <p className={`text-xs mt-2 ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </p>
      )}
    </div>
  );
};

export default Dashboard;