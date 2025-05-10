import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';
import SubscriptionStatus from './SubscriptionStatus';
import InstallPWA from './InstallPWA';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden md:block md:w-64 bg-white shadow-md">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Mobile Header - visible only on mobile */}
        <div className="md:hidden">
          <MobileHeader />
        </div>
        
        {/* Subscription Status and Install Button */}
        <div className="p-4 flex justify-end items-center space-x-4">
          <InstallPWA />
          <SubscriptionStatus />
        </div>
        
        {/* Content area */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;