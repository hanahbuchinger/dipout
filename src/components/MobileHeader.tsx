import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, BarChart3, UserSearch, FilePlus2, Settings } from 'lucide-react';

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: '/', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { to: '/capture', icon: <FilePlus2 size={20} />, label: 'Log No-Show' },
    { to: '/lookup', icon: <UserSearch size={20} />, label: 'Customer Lookup' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#38B6FF] rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xl font-bold">D</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">Dipout</h1>
        </div>
        <button
          onClick={toggleMenu}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50" onClick={toggleMenu}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end p-4 border-b">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
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
                      onClick={toggleMenu}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;