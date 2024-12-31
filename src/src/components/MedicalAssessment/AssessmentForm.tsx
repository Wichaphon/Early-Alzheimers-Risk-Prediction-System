import { useState } from 'react';
import { PatientInfo } from './PatientInfo';
import { ClinicalScores } from './ClinicalScores';
import { BrainMeasurements } from './BrainMeasurements';
import { ResultsModal } from './ResultsModal';
import type { PredictionData, PredictionResult } from '../../types/prediction';
import { submitPrediction } from '../../services/api';

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
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {renderStep()}
        
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="ml-auto px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium shadow-md disabled:opacity-50"
          >
            {loading ? 'Processing...' : step < 3 ? 'Continue' : 'Generate Assessment'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </form>

      {result && <ResultsModal result={result} onClose={() => setResult(null)} />}
    </div>
  );
}