import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Check, ArrowRight, DollarSign, Clock, Users, Star, BarChart3, Bell, ChefHat, Utensils, Smartphone } from 'lucide-react';

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
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800"
              >
                Start Now
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
                  Stop losing money on no-shows. Start protecting your business with smart tracking and insights.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => navigate('/signup')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#E5DDD3] bg-red-900 hover:bg-red-800 md:py-4 md:text-lg md:px-10"
                    >
                      Start Now <ArrowRight className="ml-2" size={20} />
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
            src="https://i.imgur.com/Q1vCAD2.jpg"
            alt="Restaurant tablet ordering system"
            loading="eager"
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

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">How Dipout Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to protect your business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Enter Phone Number</h3>
              <p className="text-gray-600">Quick lookup using customer's phone number</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Check History</h3>
              <p className="text-gray-600">See past behavior and reliability score</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="h-8 w-8 text-red-900" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Make Smart Decisions</h3>
              <p className="text-gray-600">Get recommendations for handling orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Everything You Need</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive tools to manage no-shows effectively</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Flake Score™",
                description: "Instantly see customer reliability based on history"
              },
              {
                icon: <Bell className="h-6 w-6" />,
                title: "Smart Alerts",
                description: "Get notified about high-risk orders"
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Analytics Dashboard",
                description: "Track trends and impact on your business"
              },
              {
                icon: <DollarSign className="h-6 w-6" />,
                title: "Loss Prevention",
                description: "Reduce waste and protect your revenue"
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Team Access",
                description: "Multiple staff members can use the system"
              },
              {
                icon: <Utensils className="h-6 w-6" />,
                title: "Kitchen Integration",
                description: "Seamless workflow with your kitchen"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">What Restaurants Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Reduced our no-show losses by 40% in the first month.",
                author: "Mike Chen",
                role: "Restaurant Owner"
              },
              {
                quote: "Finally, a simple way to track and prevent no-shows.",
                author: "Sarah Johnson",
                role: "Operations Manager"
              },
              {
                quote: "The insights helped us save thousands in wasted prep.",
                author: "David Martinez",
                role: "Kitchen Manager"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#E5DDD3] sm:text-4xl">
              <span className="block">Ready to protect your business?</span>
              <span className="block text-red-100">Get started today.</span>
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