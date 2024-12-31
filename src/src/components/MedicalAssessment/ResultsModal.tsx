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
    switch (risk_level) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-100',
          message: 'Low probability of developing Alzheimer\'s disease.'
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
          border: 'border-yellow-100',
          message: 'Moderate risk factors present. Regular monitoring recommended.'
        };
      case 'high':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-100',
          message: 'High risk indicators detected. Immediate follow-up recommended.'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-100',
          message: 'Assessment completed.'
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
      className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className={`bg-white rounded-lg shadow-xl max-w-lg w-full ${riskInfo.border}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div className={`p-3 ${riskInfo.bg} rounded-full`}>
              <Icon className={`w-6 h-6 ${riskInfo.color}`} />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Clinical Assessment Results
            </h3>
            <div className="mt-4 space-y-4">
              <div className={`p-4 rounded-lg ${riskInfo.bg}`}>
                <p className={`font-medium ${riskInfo.color}`}>
                  {risk_level.charAt(0).toUpperCase() + risk_level.slice(1)} Risk Level
                </p>
                <p className="mt-1 text-gray-600">
                  {riskInfo.message}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Risk Probability: <span className="font-semibold">{(probability * 100).toFixed(1)}%</span>
                </p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Note: This assessment is a screening tool and should not be used as a definitive diagnosis. Please consult with appropriate healthcare providers for proper medical evaluation and diagnosis.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}