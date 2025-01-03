import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface FormProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function FormProgress({ steps, currentStep, onStepClick }: FormProgressProps) {
  return (
    <div className="hidden sm:block">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step}
                className={`flex flex-col items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? 'bg-purple-600 border-purple-600 hover:bg-purple-700'
                      : isCurrent
                      ? 'border-purple-600 bg-white dark:bg-gray-900'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
                  } transition-colors duration-200`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        isCurrent ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  )}
                </button>
                <span
                  className={`mt-2 text-sm font-medium ${
                    isCurrent
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}