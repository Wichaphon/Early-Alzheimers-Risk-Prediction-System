import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block"
        >
          <Brain className="w-16 h-16 text-purple-600" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xl font-semibold text-gray-900 dark:text-white"
        >
          Loading EarlyAlzRisk...
        </motion.div>
      </div>
    </motion.div>
  );
}