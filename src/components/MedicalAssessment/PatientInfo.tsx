import { InputField, SelectField } from '../FormField';
import { ethnicityOptions } from '../../types/patient';
import type { PatientFormData } from '../../types/patient';

interface PatientInfoProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function PatientInfo({ formData, onChange }: PatientInfoProps) {
  return (
    <div className="space-y-6">
      <InputField
        label="Age"
        name="age"
        type="number"
        value={formData.age || ''}
        onChange={onChange}
        min="0"
        max="120"
        required
      />
      
      <SelectField
        label="Gender"
        name="gender"
        value={formData.gender || ''}
        onChange={onChange}
        options={[
          { value: 'M', label: 'Male' },
          { value: 'F', label: 'Female' }
        ]}
        required
      />

      <SelectField
        label="Ethnicity"
        name="ethnicity"
        value={formData.ethnicity || ''}
        onChange={onChange}
        options={ethnicityOptions}
        required
      />

      <InputField
        label="Education Level (years)"
        name="educationLevel"
        type="number"
        value={formData.educationLevel || ''}
        onChange={onChange}
        min="0"
        max="30"
        required
      />

      <InputField
        label="BMI"
        name="bmi"
        type="number"
        value={formData.bmi || ''}
        onChange={onChange}
        min="10"
        max="50"
        step="0.1"
        required
      />
    </div>
  );
}