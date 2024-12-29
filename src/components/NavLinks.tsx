import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export function NavLinks() {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <a 
        href="#features" 
        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        Features
      </a>
      <ThemeToggle />
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
        Get Started
      </button>
    </div>
  );
}