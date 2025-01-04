import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { InputField, SelectField } from '../FormField';
import { BooleanField } from './BooleanField';
import { ethnicityOptions, alcoholConsumptionOptions } from '../../types/patient';
import type { PredictionData } from '../../types/prediction';

interface FormSectionProps {
  title: string;
  icon: keyof typeof Icons;
  formData: PredictionData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  fields: (keyof PredictionData)[];
}

export function FormSection({ title, icon, formData, onChange, fields }: FormSectionProps) {
  const Icon = Icons[icon];

  const renderField = (field: keyof PredictionData) => {
    const booleanFields = [
      'smoking', 'familyHistoryAlzheimers', 'cardiovascularDisease', 'diabetes',
      'depression', 'headInjury', 'hypertension', 'memoryComplaints',
      'behavioralProblems', 'confusion', 'disorientation', 'personalityChanges',
      'difficultyCompletingTasks', 'forgetfulness'
    ];

    if (booleanFields.includes(field)) {
      return (
        <BooleanField
          label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          name={field}
          value={formData[field] as boolean}
          onChange={onChange}
        />
      );
    }

    switch (field) {
      case 'gender':
        return (
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={[
              { value: 'M', label: 'Male' },
              { value: 'F', label: 'Female' }
            ]}
            required
          />
        );
      case 'ethnicity':
        return (
          <SelectField
            label="Ethnicity"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={onChange}
            options={ethnicityOptions}
            required
          />
        );
      case 'alcoholConsumption':
        return (
          <SelectField
            label="Alcohol Consumption"
            name="alcoholConsumption"
            value={formData.alcoholConsumption}
            onChange={onChange}
            options={alcoholConsumptionOptions}
            required
          />
        );
      default:
        return (
          <InputField
            label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            name={field}
            type="number"
            value={formData[field] || ''}
            onChange={onChange}
            required
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>

        <div className="space-y-4">
          {fields.map(field => (
            <div key={field} className="relative">
              {renderField(field)}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}