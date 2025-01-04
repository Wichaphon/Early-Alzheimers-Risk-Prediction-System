import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface BooleanFieldProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BooleanField({ label, name, value, onChange }: BooleanFieldProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex gap-2">
        <label className="relative">
          <input
            type="radio"
            name={name}
            value="true"
            checked={value === true}
            onChange={onChange}
            className="sr-only"
          />
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer
              border-2 transition-colors
              ${value === true
                ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-500/50'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800'
              }
            `}
          >
            <Check className={`w-4 h-4 ${value === true ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
            <span className={value === true ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}>
              Yes
            </span>
          </motion.div>
        </label>

        <label className="relative">
          <input
            type="radio"
            name={name}
            value="false"
            checked={value === false}
            onChange={onChange}
            className="sr-only"
          />
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer
              border-2 transition-colors
              ${value === false
                ? 'bg-red-100 dark:bg-red-900/30 border-red-500 dark:border-red-500/50'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-800'
              }
            `}
          >
            <X className={`w-4 h-4 ${value === false ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`} />
            <span className={value === false ? 'text-red-700 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}>
              No
            </span>
          </motion.div>
        </label>
      </div>
    </div>
  );
}