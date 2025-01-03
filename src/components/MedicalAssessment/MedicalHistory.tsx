import type { PatientFormData } from '../../types/patient';

interface MedicalHistoryProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MedicalHistory({ formData, onChange }: MedicalHistoryProps) {
  const conditions = [
    { name: 'familyHistoryAlzheimers', label: "Family History of Alzheimer's" },
    { name: 'cardiovascularDisease', label: 'Cardiovascular Disease' },
    { name: 'diabetes', label: 'Diabetes' },
    { name: 'depression', label: 'Depression' },
    { name: 'headInjury', label: 'Head Injury' }
  ];

  return (
    <div className="space-y-6">
      {conditions.map(({ name, label }) => (
        <div key={name} className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[200px]">
            {label}
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value="true"
                checked={formData[name as keyof PatientFormData] === true}
                onChange={(e) => onChange({
                  ...e,
                  target: { ...e.target, value: 'true', name }
                })}
                className="form-radio text-gray-900 dark:text-white"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={name}
                value="false"
                checked={formData[name as keyof PatientFormData] === false}
                onChange={(e) => onChange({
                  ...e,
                  target: { ...e.target, value: 'false', name }
                })}
                className="form-radio text-gray-900 dark:text-white"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">No</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}