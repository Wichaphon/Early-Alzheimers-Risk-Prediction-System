import { useState } from 'react';
import { PatientInfo } from './PatientInfo';
import { ClinicalScores } from './ClinicalScores';
import { BrainMeasurements } from './BrainMeasurements';
import { ResultsModal } from './ResultsModal';
import type { PredictionData, PredictionResult } from '../../types/prediction';
import { submitPrediction } from '../../services/api';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain } from 'lucide-react';

export function AssessmentForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<PredictionData>({
    age: 0,
    gender: '',
    education: 0,
    mmse: 0,
    cdr: 0,
    etiv: 0,
    nwbv: 0,
    asf: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const result = await submitPrediction(formData);
      setResult(result);
    } catch (err) {
      setError('Failed to process assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' ? value : Number(value)
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PatientInfo formData={formData} onChange={handleChange} />;
      case 2:
        return <ClinicalScores formData={formData} onChange={handleChange} />;
      case 3:
        return <BrainMeasurements formData={formData} onChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-800/25 overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex items-center"
                style={{ flex: stepNumber < 3 ? 1 : 'none' }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= stepNumber
                      ? 'border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-gray-900'
                      : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      step > stepNumber ? 'bg-gray-900 dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderStep()}
          
          <div className="flex justify-between mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center px-6 py-3 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`ml-auto inline-flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
                loading
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? (
                'Processing...'
              ) : step < 3 ? (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Generate Assessment
                  <Brain className="w-4 h-4 ml-2" />
                </>
              )}
            </motion.button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-900/30">
              {error}
            </div>
          )}
        </form>
      </div>

      {result && <ResultsModal result={result} onClose={() => setResult(null)} />}
    </motion.div>
  );
}