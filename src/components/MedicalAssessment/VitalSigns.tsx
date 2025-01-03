import { InputField } from '../FormField';
import type { PatientFormData } from '../../types/patient';

interface VitalSignsProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VitalSigns({ formData, onChange }: VitalSignsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hypertension
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hypertension"
              value="true"
              checked={formData.hypertension === true}
              onChange={(e) => onChange({
                ...e,
                target: { ...e.target, value: 'true', name: 'hypertension' }
              })}
              className="form-radio text-gray-900 dark:text-white"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hypertension"
              value="false"
              checked={formData.hypertension === false}
              onChange={(e) => onChange({
                ...e,
                target: { ...e.target, value: 'false', name: 'hypertension' }
              })}
              className="form-radio text-gray-900 dark:text-white"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Systolic BP (mmHg)"
          name="systolicBP"
          type="number"
          value={formData.systolicBP || ''}
          onChange={onChange}
          min="70"
          max="250"
          required
        />
        <InputField
          label="Diastolic BP (mmHg)"
          name="diastolicBP"
          type="number"
          value={formData.diastolicBP || ''}
          onChange={onChange}
          min="40"
          max="150"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Total Cholesterol (mg/dL)"
          name="cholesterolTotal"
          type="number"
          value={formData.cholesterolTotal || ''}
          onChange={onChange}
          min="100"
          max="500"
          required
        />
        <InputField
          label="LDL Cholesterol (mg/dL)"
          name="cholesterolLDL"
          type="number"
          value={formData.cholesterolLDL || ''}
          onChange={onChange}
          min="40"
          max="300"
          required
        />
      </div>
    </div>
  );
}