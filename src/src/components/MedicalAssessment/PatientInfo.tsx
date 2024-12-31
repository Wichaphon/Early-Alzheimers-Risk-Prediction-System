import { InputField, SelectField } from '../FormField';

interface PatientInfoProps {
  formData: {
    age: number;
    gender: string;
    education: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function PatientInfo({ formData, onChange }: PatientInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Patient Information</h3>
      <div className="space-y-6">
        <InputField
          label="Patient Age"
          name="age"
          type="number"
          value={formData.age || ''}
          onChange={onChange}
          min="0"
          required
        />
        <SelectField
          label="Patient Gender"
          name="gender"
          value={formData.gender}
          onChange={onChange}
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
          onChange={onChange}
          min="0"
          required
        />
      </div>
    </div>
  );
}