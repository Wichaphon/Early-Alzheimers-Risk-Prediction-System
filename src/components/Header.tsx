import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">EarlyAlzRisk</span>
        </div>
        
        <NavLinks />
        <MobileMenu />
      </nav>
    </header>
  );
}