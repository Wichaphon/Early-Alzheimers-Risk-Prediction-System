import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, AlertCircle, HelpCircle } from 'lucide-react';
import { InputField, SelectField } from './FormField';
import { PredictionResult } from './PredictionResult';
import { submitPrediction } from '../services/api';
import type { PredictionData, PredictionResult as PredictionResultType } from '../types/prediction';
import { Tooltip } from './Tooltip';

export function PredictionForm() {
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
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResultType | null>(null);

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
      setError('Failed to get prediction. Please try again.');
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="bg-purple-50 dark:bg-gray-800/50 p-8 rounded-xl border border-purple-100 dark:border-purple-900/20">
            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-300 mb-6">Step 1: Personal Information</h3>
            <div className="space-y-6">
              <InputField
                label="Age"
                name="age"
                type="number"
                value={formData.age || ''}
                onChange={handleChange}
                min="0"
                required
              />
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  { value: 'M', label: 'Male' },
                  { value: 'F', label: 'Female' }
                ]}
                required
              />
              <InputField
                label="Years of Education"
                name="education"
                type="number"
                value={formData.education || ''}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="bg-blue-50 dark:bg-gray-800/50 p-8 rounded-xl border border-blue-100 dark:border-blue-900/20">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-6">Step 2: Clinical Scores</h3>
            <div className="space-y-6">
              <div className="relative">
                <InputField
                  label="MMSE Score"
                  name="mmse"
                  type="number"
                  value={formData.mmse || ''}
                  onChange={handleChange}
                  min="0"
                  max="30"
                  required
                />
                <Tooltip content="Mini-Mental State Examination score (0-30)">
                  <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
                </Tooltip>
              </div>
              <div className="relative">
                <InputField
                  label="Clinical Dementia Rating (CDR)"
                  name="cdr"
                  type="number"
                  value={formData.cdr || ''}
                  onChange={handleChange}
                  step="0.5"
                  min="0"
                  required
                />
                <Tooltip content="Standard measure of dementia severity">
                  <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
                </Tooltip>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="bg-emerald-50 dark:bg-gray-800/50 p-8 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
            <h3 className="text-xl font-semibold text-emerald-900 dark:text-emerald-300 mb-6">Step 3: Brain Measurements</h3>
            <div className="space-y-6">
              <div className="relative">
                <InputField
                  label="Estimated Total Intracranial Volume"
                  name="etiv"
                  type="number"
                  value={formData.etiv || ''}
                  onChange={handleChange}
                  required
                />
                <Tooltip content="Total volume within the cranium">
                  <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
                </Tooltip>
              </div>
              <div className="relative">
                <InputField
                  label="Normalized Whole Brain Volume"
                  name="nwbv"
                  type="number"
                  value={formData.nwbv || ''}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
                <Tooltip content="Brain volume normalized for head size">
                  <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
                </Tooltip>
              </div>
              <div className="relative">
                <InputField
                  label="Atlas Scaling Factor"
                  name="asf"
                  type="number"
                  value={formData.asf || ''}
                  onChange={handleChange}
                  step="0.001"
                  required
                />
                <Tooltip content="Factor used to normalize brain measurements">
                  <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
                </Tooltip>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center ${
                  stepNumber < 3 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > stepNumber
                        ? 'bg-purple-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 text-purple-600 dark:text-purple-400 font-medium rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                Previous
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="ml-auto px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                'Processing...'
              ) : step < 3 ? (
                'Continue'
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2 inline" />
                  Get Prediction
                </>
              )}
            </motion.button>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mt-4">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          )}
        </form>
      </motion.div>

      <AnimatePresence>
        {result && (
          <PredictionResult 
            result={result} 
            onClose={() => setResult(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}