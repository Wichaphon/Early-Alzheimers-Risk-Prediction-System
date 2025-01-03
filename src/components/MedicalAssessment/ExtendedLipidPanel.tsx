import { InputField } from '../FormField';
import { Tooltip } from '../Tooltip';
import { HelpCircle } from 'lucide-react';
import type { PatientFormData } from '../../types/patient';

interface ExtendedLipidPanelProps {
  formData: PatientFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ExtendedLipidPanel({ formData, onChange }: ExtendedLipidPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <InputField
            label="HDL Cholesterol (mg/dL)"
            name="cholesterolHDL"
            type="number"
            value={formData.cholesterolHDL || ''}
            onChange={onChange}
            min="20"
            max="100"
            required
          />
          <Tooltip content="High-density lipoprotein cholesterol. Normal range: 40-60 mg/dL">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>

        <div className="relative">
          <InputField
            label="Triglycerides (mg/dL)"
            name="triglycerides"
            type="number"
            value={formData.triglycerides || ''}
            onChange={onChange}
            min="50"
            max="500"
            required
          />
          <Tooltip content="Normal range: <150 mg/dL">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}