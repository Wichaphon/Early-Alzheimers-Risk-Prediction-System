import React, { useState } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  onFeaturesClick: (e: React.MouseEvent) => void;
}

export function MobileMenu({ onFeaturesClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isPredict = location.pathname === '/predict';

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#features"
              onClick={(e) => {
                onFeaturesClick(e);
                setIsOpen(false);
              }}
              className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Features
            </a>
            <div className="flex items-center justify-between">
              <ThemeToggle />
              {isPredict ? (
                <button 
                  onClick={() => handleNavigation('/')}
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </button>
              ) : (
                <button 
                  onClick={() => handleNavigation('/predict')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}