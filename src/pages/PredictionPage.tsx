import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { AssessmentForm } from '../components/MedicalAssessment/AssessmentForm';
import { Brain, Shield, Activity } from 'lucide-react';

export default function PredictionPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning for accurate risk assessment"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security for patient data"
    },
    {
      icon: Activity,
      title: "Real-time Results",
      description: "Instant assessment with clinical precision"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <Header />
      <div className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              <span className="block text-purple-600 dark:text-purple-400">Professional</span>
              <span className="block">Medical Assessment</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Advanced diagnostic tool for healthcare professionals to assess early Alzheimer's risk factors.
            </motion.p>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="h-full rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl dark:shadow-gray-800/25 transition duration-300 hover:shadow-2xl dark:hover:shadow-purple-500/10">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300" />
                    <div>
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-md shadow-lg"
                      >
                        <feature.icon className="h-6 w-6 text-white" />
                      </motion.span>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <AssessmentForm />
        </motion.div>
      </div>
    </div>
  );
}