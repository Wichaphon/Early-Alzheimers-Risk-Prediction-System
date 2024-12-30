import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavLinksProps {
  onFeaturesClick: (e: React.MouseEvent) => void;
}

export function NavLinks({ onFeaturesClick }: NavLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPredict = location.pathname === '/predict';

  return (
    <div className="hidden md:flex items-center space-x-8">
      <a 
        href="#features" 
        onClick={onFeaturesClick}
        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        Features
      </a>
      <ThemeToggle />
      {isPredict ? (
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      ) : (
        <button 
          onClick={() => navigate('/predict')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Get Started
        </button>
      )}
    </div>
  );
}