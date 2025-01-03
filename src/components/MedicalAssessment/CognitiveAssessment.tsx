import { InputField, SelectField } from '../FormField';
import { Tooltip } from '../Tooltip';
import { HelpCircle } from 'lucide-react';
import { CognitiveSymptoms } from './CognitiveSymptoms';
import type { PatientFormData } from '../../types/patient';

interface CognitiveAssessmentProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function CognitiveAssessment({ formData, onChange }: CognitiveAssessmentProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <InputField
            label="MMSE Score"
            name="mmseScore"
            type="number"
            value={formData.mmseScore || ''}
            onChange={onChange}
            min="0"
            max="30"
            required
          />
          <Tooltip content="Mini-Mental State Examination (0-30). Higher scores indicate better cognitive function.">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>

        <div className="relative">
          <InputField
            label="ADL Score"
            name="adlScore"
            type="number"
            value={formData.adlScore || ''}
            onChange={onChange}
            min="0"
            max="100"
            required
          />
          <Tooltip content="Activities of Daily Living Score (0-100). Higher scores indicate better function.">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Memory Complaints
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="memoryComplaints"
                value="true"
                checked={formData.memoryComplaints === true}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="memoryComplaints"
                value="false"
                checked={formData.memoryComplaints === false}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Behavioral Problems
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="behavioralProblems"
                value="true"
                checked={formData.behavioralProblems === true}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="behavioralProblems"
                value="false"
                checked={formData.behavioralProblems === false}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Cognitive Symptoms Assessment
        </h4>
        <CognitiveSymptoms formData={formData} onChange={onChange} />
      </div>
    </div>
  );
}