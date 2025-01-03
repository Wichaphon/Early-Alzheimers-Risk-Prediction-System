import { InputField, SelectField } from '../FormField';
import { alcoholConsumptionOptions } from '../../types/patient';
import type { PatientFormData } from '../../types/patient';

interface LifestyleInfoProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function LifestyleInfo({ formData, onChange }: LifestyleInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Smoking Status
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="smoking"
              value="true"
              checked={formData.smoking === true}
              onChange={(e) => onChange({
                ...e,
                target: { ...e.target, value: 'true', name: 'smoking' }
              })}
              className="form-radio text-gray-900 dark:text-white"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="smoking"
              value="false"
              checked={formData.smoking === false}
              onChange={(e) => onChange({
                ...e,
                target: { ...e.target, value: 'false', name: 'smoking' }
              })}
              className="form-radio text-gray-900 dark:text-white"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
          </label>
        </div>
      </div>

      <SelectField
        label="Alcohol Consumption"
        name="alcoholConsumption"
        value={formData.alcoholConsumption || ''}
        onChange={onChange}
        options={alcoholConsumptionOptions}
        required
      />

      <InputField
        label="Physical Activity (hours/week)"
        name="physicalActivity"
        type="number"
        value={formData.physicalActivity || ''}
        onChange={onChange}
        min="0"
        max="168"
        step="0.5"
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Diet Quality (1-10)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            name="dietQuality"
            min="1"
            max="10"
            step="1"
            value={formData.dietQuality || 5}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formData.dietQuality || 5}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Sleep Quality (1-10)
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            name="sleepQuality"
            min="1"
            max="10"
            step="1"
            value={formData.sleepQuality || 5}
            onChange={onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formData.sleepQuality || 5}
          </span>
        </div>
      </div>
    </div>
  );
}