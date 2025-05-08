import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, ArrowRight, DollarSign, Clock, Users } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="https://i.imgur.com/kHROaT6.png" alt="Dipout Logo" className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 text-red-900 hover:text-red-800"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">GHOST-PROOF</span>
                  <span className="block text-red-900">YOUR KITCHEN</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Smarter prep. Less waste. More control.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#E5DDD3] bg-red-900 hover:bg-red-800 md:py-4 md:text-lg md:px-10"
                    >
                      Start Free Trial <ArrowRight className="ml-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.pexels.com/photos/12935063/pexels-photo-12935063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Restaurant staff using tablet"
            loading="eager"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.pexels.com/photos/12935063/pexels-photo-12935063.jpeg";
            }}
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#E5DDD3]/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-red-900">$3,000+</p>
              <p className="mt-2 text-lg text-gray-500">Annual savings per location</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-red-900">5 sec</p>
              <p className="mt-2 text-lg text-gray-500">Average lookup time</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-red-900">30%</p>
              <p className="mt-2 text-lg text-gray-500">Reduction in no-shows</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Kitchens Love Dipout</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-red-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Lookup</h3>
              <p className="text-gray-600">
                Check a customer's flake score using just their phone number — no app download required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Protection</h3>
              <p className="text-gray-600">
                Flag repeat offenders and get prep recommendations based on customer history.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-red-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Revenue Guard</h3>
              <p className="text-gray-600">
                Track lost revenue and make data-driven decisions to protect your bottom line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-[#E5DDD3]/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Pro Plan</h3>
              <p className="text-4xl font-bold text-red-900 mb-4">$14.99<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Full flake scoring</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Prep tools</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Email support</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-3 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800"
              >
                Start Free Trial
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-red-900">
              <div className="inline-block px-4 py-1 bg-red-900 text-[#E5DDD3] rounded-full text-sm mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro+ Plan</h3>
              <p className="text-4xl font-bold text-red-900 mb-4">$19.99<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Team accounts</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Advanced insights</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-red-900 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/signup')}
                className="w-full py-3 bg-red-900 text-[#E5DDD3] rounded-lg hover:bg-red-800"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#E5DDD3] sm:text-4xl">
              <span className="block">Ready to protect your business?</span>
              <span className="block text-red-100">Start your free trial today.</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <button
                  onClick={() => navigate('/signup')}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-900 bg-[#E5DDD3] hover:bg-white"
                >
                  Get Started
                  <ArrowRight className="ml-2 -mr-1" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500">
            &copy; 2025 Dipout. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;