import React, { useState } from 'react';
import { Menu, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="md:hidden">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-800 transition-colors"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              <motion.a 
                href="#features"
                onClick={(e) => {
                  onFeaturesClick(e);
                  setIsOpen(false);
                }}
                className="block text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                whileHover={{ x: 10 }}
              >
                Features
              </motion.a>
              
              <div className="flex items-center justify-between">
                <ThemeToggle />
                {isPredict ? (
                  <motion.button 
                    onClick={() => handleNavigation('/')}
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </motion.button>
                ) : (
                  <motion.button 
                    onClick={() => handleNavigation('/predict')}
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}