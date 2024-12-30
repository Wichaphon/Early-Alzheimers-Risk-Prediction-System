import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { PredictionForm } from '../components/PredictionForm';
import { Brain, Shield, Clock } from 'lucide-react';

export default function PredictionPage() {
  const benefits = [
    {
      icon: Brain,
      title: "Easy Assessment",
      description: "Simple questions that take only 5 minutes to complete"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your information is protected and never shared"
    },
    {
      icon: Clock,
      title: "Instant Results",
      description: "Get your assessment results immediately"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      <div className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Quick Health Assessment
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Take a quick assessment to understand your brain health status. It's simple, secure, and takes just a few minutes.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                      <benefit.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <PredictionForm />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            <p>Need help? Contact our support team for assistance</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}