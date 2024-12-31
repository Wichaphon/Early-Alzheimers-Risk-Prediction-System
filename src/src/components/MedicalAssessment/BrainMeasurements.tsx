import { InputField } from '../FormField';
import { Tooltip } from '../Tooltip';
import { HelpCircle } from 'lucide-react';

interface BrainMeasurementsProps {
  formData: {
    etiv: number;
    nwbv: number;
    asf: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BrainMeasurements({ formData, onChange }: BrainMeasurementsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">MRI Measurements</h3>
      <div className="space-y-6">
        <div className="relative">
          <InputField
            label="Estimated Total Intracranial Volume (eTIV)"
            name="etiv"
            type="number"
            value={formData.etiv || ''}
            onChange={onChange}
            required
          />
          <Tooltip content="Measured in mm³. Typical range: 1300000-1800000">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
        <div className="relative">
          <InputField
            label="Normalized Whole Brain Volume (nWBV)"
            name="nwbv"
            type="number"
            value={formData.nwbv || ''}
            onChange={onChange}
            step="0.01"
            required
          />
          <Tooltip content="Ratio of brain tissue volume to eTIV. Typical range: 0.65-0.85">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
        <div className="relative">
          <InputField
            label="Atlas Scaling Factor (ASF)"
            name="asf"
            type="number"
            value={formData.asf || ''}
            onChange={onChange}
            step="0.001"
            required
          />
          <Tooltip content="Scaling factor for atlas registration. Typical range: 0.9-1.1">
            <HelpCircle className="w-4 h-4 text-gray-400 absolute top-2 right-2" />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}