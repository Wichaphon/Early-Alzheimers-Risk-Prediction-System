import { useState } from 'react';
import { PatientInfo } from './PatientInfo';
import { LifestyleInfo } from './LifestyleInfo';
import { MedicalHistory } from './MedicalHistory';
import { VitalSigns } from './VitalSigns';
import { ExtendedLipidPanel } from './ExtendedLipidPanel';
import { CognitiveAssessment } from './CognitiveAssessment';
import { ResultsModal } from './ResultsModal';
import { FormProgress } from './FormProgress';
import type { PredictionData, PredictionResult } from '../../types/prediction';
import { motion } from 'framer-motion';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export function AssessmentForm() {
  const [activeSection, setActiveSection] = useState(0);
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

  const sections = [
    { title: 'Personal Information', component: PatientInfo },
    { title: 'Lifestyle Factors', component: LifestyleInfo },
    { title: 'Medical History', component: MedicalHistory },
    { title: 'Vital Signs', component: VitalSigns },
    { title: 'Extended Lipid Panel', component: ExtendedLipidPanel },
    { title: 'Cognitive Assessment', component: CognitiveAssessment }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Implement your submission logic here
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

  const CurrentSection = sections[activeSection].component;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-6 sm:p-8">
          <FormProgress 
            steps={sections.map(s => s.title)} 
            currentStep={activeSection} 
            onStepClick={setActiveSection}
          />

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {sections[activeSection].title}
              </h3>
              
              <CurrentSection formData={formData} onChange={handleChange} />
            </motion.div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              {activeSection > 0 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setActiveSection(prev => prev - 1)}
                  className="inline-flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
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
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {loading ? (
                  'Processing...'
                ) : activeSection < sections.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Generate Assessment
                    <Brain className="w-5 h-5 ml-2" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {result && <ResultsModal result={result} onClose={() => setResult(null)} />}
    </motion.div>
  );
}