import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function Hero() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800";
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16 sm:py-24 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block text-base font-semibold text-purple-600 dark:text-purple-400">
                Advanced AI Technology
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl xl:text-6xl">
                Early Alzheimer's Detection Through AI
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl"
            >
              Our advanced machine learning algorithm helps detect early signs of Alzheimer's disease, 
              enabling earlier intervention and better patient outcomes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left"
            >
              <button className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                Try Demo
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md overflow-hidden"
            >
              <img
                className="w-full rounded-lg object-cover transform transition-transform duration-500 hover:scale-110"
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800"
                alt="Brain scan visualization"
                onError={handleImageError}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}