import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, UserSearch, FilePlus2, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { to: '/capture', icon: <FilePlus2 size={20} />, label: 'Log No-Show' },
    { to: '/lookup', icon: <UserSearch size={20} />, label: 'Customer Lookup' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo area */}
      <div className="flex items-center justify-center p-6 border-b">
        <div className="w-12 h-12 bg-[#38B6FF] rounded-full flex items-center justify-center">
          <span className="text-white text-3xl font-bold">D</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 ml-2">Dipout</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 pt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Restaurant Info */}
      <div className="p-4 border-t mt-auto">
        <div className="text-sm text-gray-500">
          <p className="font-medium text-gray-700">Your Restaurant</p>
          <p>Restaurant ID: #12345</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;