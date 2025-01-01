import { InputField } from '../FormField';
import { Tooltip } from '../Tooltip';
import { HelpCircle } from 'lucide-react';

interface ClinicalScoresProps {
  formData: {
    mmse: number;
    cdr: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ClinicalScores({ formData, onChange }: ClinicalScoresProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Clinical Assessment Scores</h3>
      <div className="space-y-6">
        <div className="relative">
          <InputField
            label="Mini-Mental State Examination (MMSE)"
            name="mmse"
            type="number"
            value={formData.mmse || ''}
            onChange={onChange}
            min="0"
            max="30"
            required
          />
          <Tooltip content="Score range: 0-30. Higher scores indicate better cognitive function.">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
        <div className="relative">
          <InputField
            label="Clinical Dementia Rating (CDR)"
            name="cdr"
            type="number"
            value={formData.cdr || ''}
            onChange={onChange}
            step="0.5"
            min="0"
            required
          />
          <Tooltip content="Scale: 0 (Normal) to 3 (Severe Dementia). 0.5 indicates very mild dementia.">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}