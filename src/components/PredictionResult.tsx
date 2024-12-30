import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import type { PredictionResult } from '../types/prediction';

interface Props {
  result: PredictionResult;
  onClose: () => void;
}

export function PredictionResult({ result, onClose }: Props) {
  const { risk_level, probability } = result;
  
  const getRiskColor = () => {
    switch (risk_level) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskIcon = () => {
    switch (risk_level) {
      case 'low': return CheckCircle;
      case 'moderate': return AlertTriangle;
      case 'high': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const Icon = getRiskIcon();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="text-center">
          <Icon className={`w-12 h-12 mx-auto ${getRiskColor()}`} />
          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            {risk_level.charAt(0).toUpperCase() + risk_level.slice(1)} Risk
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            The probability of developing Alzheimer's is {(probability * 100).toFixed(1)}%
          </p>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
}