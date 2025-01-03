import { InputField } from '../FormField';
import type { PatientFormData } from '../../types/patient';

interface CognitiveSymptomsProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CognitiveSymptoms({ formData, onChange }: CognitiveSymptomsProps) {
  const symptoms = [
    { name: 'confusion', label: 'Confusion' },
    { name: 'disorientation', label: 'Disorientation' },
    { name: 'personalityChanges', label: 'Personality Changes' },
    { name: 'difficultyCompletingTasks', label: 'Difficulty Completing Tasks' },
    { name: 'forgetfulness', label: 'Forgetfulness' }
  ];

  return (
    <div className="space-y-4">
      {symptoms.map(({ name, label }) => (
        <div key={name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value="true"
                checked={formData[name as keyof PatientFormData] === true}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value="false"
                checked={formData[name as keyof PatientFormData] === false}
                onChange={onChange}
                className="form-radio text-purple-600"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}