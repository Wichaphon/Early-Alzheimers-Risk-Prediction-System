import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { FormSection } from './FormSection';
import { ResultsModal } from './ResultsModal';
import type { PredictionData, PredictionResult } from '../../types/prediction';

export function AssessmentForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<PredictionData>({
    age: 0,
    gender: '',
    ethnicity: '',
    educationLevel: 0,
    bmi: 0,
    smoking: false,
    alcoholConsumption: '',
    physicalActivity: 0,
    dietQuality: 5,
    sleepQuality: 5,
    familyHistoryAlzheimers: false,
    cardiovascularDisease: false,
    diabetes: false,
    depression: false,
    headInjury: false,
    hypertension: false,
    systolicBP: 120,
    diastolicBP: 80,
    cholesterolTotal: 200,
    cholesterolLDL: 100,
    cholesterolHDL: 0,
    triglycerides: 0,
    mmseScore: 0,
    functionalAssessment: '',
    memoryComplaints: false,
    behavioralProblems: false,
    adlScore: 0,
    confusion: false,
    disorientation: false,
    personalityChanges: false,
    difficultyCompletingTasks: false,
    forgetfulness: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Implement submission logic here
      setResult({
        probability: 0.5,
        risk_level: 'moderate'
      });
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
      [name]: ['smoking', 'familyHistoryAlzheimers', 'cardiovascularDisease', 'diabetes', 
               'depression', 'headInjury', 'hypertension', 'memoryComplaints', 
               'behavioralProblems', 'confusion', 'disorientation', 'personalityChanges',
               'difficultyCompletingTasks', 'forgetfulness'].includes(name) ? 
              value === 'true' : 
              ['age', 'educationLevel', 'bmi', 'physicalActivity', 'dietQuality', 
               'sleepQuality', 'systolicBP', 'diastolicBP', 'cholesterolTotal', 
               'cholesterolLDL', 'cholesterolHDL', 'triglycerides', 'mmseScore',
               'adlScore'].includes(name) ? 
              Number(value) : value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormSection
            title="Personal Information"
            icon="User"
            formData={formData}
            onChange={handleChange}
            fields={['age', 'gender', 'ethnicity', 'educationLevel', 'bmi']}
          />

          <FormSection
            title="Lifestyle Factors"
            icon="Heart"
            formData={formData}
            onChange={handleChange}
            fields={['smoking', 'alcoholConsumption', 'physicalActivity', 'dietQuality', 'sleepQuality']}
          />

          <FormSection
            title="Medical History"
            icon="Stethoscope"
            formData={formData}
            onChange={handleChange}
            fields={[
              'familyHistoryAlzheimers',
              'cardiovascularDisease',
              'diabetes',
              'depression',
              'headInjury'
            ]}
          />

          <FormSection
            title="Vital Signs"
            icon="Activity"
            formData={formData}
            onChange={handleChange}
            fields={[
              'hypertension',
              'systolicBP',
              'diastolicBP',
              'cholesterolTotal',
              'cholesterolLDL'
            ]}
          />

          <FormSection
            title="Extended Lipid Panel"
            icon="LineChart"
            formData={formData}
            onChange={handleChange}
            fields={[
              'cholesterolHDL',
              'triglycerides',
              'mmseScore',
              'functionalAssessment'
            ]}
          />

          <FormSection
            title="Cognitive Assessment"
            icon="Brain"
            formData={formData}
            onChange={handleChange}
            fields={[
              'memoryComplaints',
              'behavioralProblems',
              'adlScore',
              'confusion',
              'disorientation',
              'personalityChanges',
              'difficultyCompletingTasks',
              'forgetfulness'
            ]}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`
              inline-flex items-center px-8 py-4 rounded-xl font-medium text-lg
              transition-all duration-200 shadow-lg
              ${loading
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
              }
            `}
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                Generate Assessment
                <Brain className="w-6 h-6 ml-2" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      {result && <ResultsModal result={result} onClose={() => setResult(null)} />}
    </motion.div>
  );
}