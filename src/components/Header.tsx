import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { NavLinks } from './NavLinks';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === '/predict') {
      navigate('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/predict') {
      navigate('/#features');
    } else {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <div className="flex-1 flex justify-start">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-md"
              />
              <Brain className="w-10 h-10 text-purple-600 relative" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"
              />
            </div>
            <div className="flex items-center space-x-1">
              <motion.span 
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #9333EA 0%, #3B82F6 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Early
              </motion.span>
              <motion.span 
                className="text-2xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #9333EA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 200%'
                }}
                animate={{
                  backgroundPosition: ['100% 100%', '0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                AlzRisk
              </motion.span>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 flex justify-end">
          <NavLinks onFeaturesClick={handleFeaturesClick} />
          <MobileMenu onFeaturesClick={handleFeaturesClick} />
        </div>
      </nav>
    </motion.header>
  );
}