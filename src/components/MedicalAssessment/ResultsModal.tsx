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
          color: 'text-gray-900',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          message: 'Low probability of developing Alzheimer\'s disease.'
        };
      case 'moderate':
        return {
          icon: AlertTriangle,
          color: 'text-gray-900',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          message: 'Moderate risk factors present. Regular monitoring recommended.'
        };
      case 'high':
        return {
          icon: AlertCircle,
          color: 'text-gray-900',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          message: 'High risk indicators detected. Immediate follow-up recommended.'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-900',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
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
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className={`p-3 ${riskInfo.bg} rounded-full border ${riskInfo.border}`}>
              <Icon className={`w-6 h-6 ${riskInfo.color}`} />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Assessment Results
          </h3>
          
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${riskInfo.bg} border ${riskInfo.border}`}>
              <p className="font-medium text-gray-900">
                {risk_level.charAt(0).toUpperCase() + risk_level.slice(1)} Risk Level
              </p>
              <p className="mt-1 text-gray-600">
                {riskInfo.message}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-gray-900">
                Risk Probability: 
                <span className="ml-2 font-mono font-medium">
                  {(probability * 100).toFixed(1)}%
                </span>
              </p>
            </div>

            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p>Note: This assessment is a screening tool and should not be used as a definitive diagnosis. Please consult with appropriate healthcare providers for proper medical evaluation and diagnosis.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}