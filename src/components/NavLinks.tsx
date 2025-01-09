import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

interface NavLinksProps {
  onFeaturesClick: (e: React.MouseEvent) => void;
}

export function NavLinks({ onFeaturesClick }: NavLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isPredict = location.pathname === '/predict';

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="hidden md:flex items-center space-x-8"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <motion.a 
        href="#features" 
        onClick={onFeaturesClick}
        className="relative group"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Features
        </span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300" />
      </motion.a>

      <motion.div variants={itemVariants}>
        <ThemeToggle />
      </motion.div>

      <motion.div variants={itemVariants}>
        {isPredict ? (
          <motion.button 
            onClick={() => navigate('/')}
            className="relative group inline-flex items-center px-6 py-2.5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center text-white font-medium">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </span>
          </motion.button>
        ) : (
          <motion.button 
            onClick={() => navigate('/predict')}
            className="relative group inline-flex items-center px-6 py-2.5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center text-white font-medium">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}