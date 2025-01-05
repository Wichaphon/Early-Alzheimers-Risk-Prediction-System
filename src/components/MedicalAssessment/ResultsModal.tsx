import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';
import type { PredictionResult } from '../../types/prediction';

interface ResultsModalProps {
  result: PredictionResult;
  onClose: () => void;
}

export function ResultsModal({ result, onClose }: ResultsModalProps) {
  const { risk_level, probability } = result;
  
  const getRiskInfo = () => {
    const probabilityPercentage = probability * 100;
    
    if (probabilityPercentage <= 33) {
      return {
        icon: CheckCircle,
        color: 'text-emerald-500 dark:text-emerald-300',
        bg: 'bg-emerald-50 dark:bg-emerald-900/30',
        border: 'border-emerald-200 dark:border-emerald-600',
        gradient: 'from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400',
        message: 'Low probability of developing Alzheimer\'s disease.'
      };
    } else if (probabilityPercentage <= 66) {
      return {
        icon: AlertTriangle,
        color: 'text-amber-500 dark:text-amber-300',
        bg: 'bg-amber-50 dark:bg-amber-900/30',
        border: 'border-amber-200 dark:border-amber-600',
        gradient: 'from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-400',
        message: 'Moderate risk factors present. Regular monitoring recommended.'
      };
    } else {
      return {
        icon: AlertCircle,
        color: 'text-red-500 dark:text-red-300',
        bg: 'bg-red-50 dark:bg-red-900/30',
        border: 'border-red-200 dark:border-red-600',
        gradient: 'from-red-400 to-red-500 dark:from-red-500 dark:to-red-400',
        message: 'High risk indicators detected. Immediate follow-up recommended.'
      };
    }
  };

  const riskInfo = getRiskInfo();
  const Icon = riskInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-4 ${riskInfo.bg} rounded-full w-16 h-16 mx-auto flex items-center justify-center border ${riskInfo.border} shadow-lg`}
          >
            <Icon className={`w-8 h-8 ${riskInfo.color}`} />
          </motion.div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <motion.h3
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2"
            >
              {risk_level.charAt(0).toUpperCase() + risk_level.slice(1)} Risk Level
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 dark:text-gray-200"
            >
              {riskInfo.message}
            </motion.p>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${probability * 100}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className={`absolute h-full bg-gradient-to-r ${riskInfo.gradient}`}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className={`p-4 rounded-lg ${riskInfo.bg} border ${riskInfo.border} shadow-md`}
          >
            <p className="text-center font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
              Risk Probability: {(probability * 100).toFixed(1)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p>Note: This assessment is a screening tool and should not be used as a definitive diagnosis. Please consult with appropriate healthcare providers for proper medical evaluation and diagnosis.</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}