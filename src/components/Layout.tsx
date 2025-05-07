import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

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
        
        {/* Content area */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;