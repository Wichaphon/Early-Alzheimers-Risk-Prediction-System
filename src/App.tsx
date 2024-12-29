import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingScreen } from './components/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <div className="pt-16">
              <main>
                <Hero />
                <Features />
              </main>
              <footer className="bg-gray-50 dark:bg-gray-800 py-12 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>© 2024 EarlyAlzRisk. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}