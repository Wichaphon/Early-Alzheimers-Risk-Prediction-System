import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { AssessmentForm } from '../components/MedicalAssessment/AssessmentForm';
import { FileText, Shield, Activity } from 'lucide-react';

export default function PredictionPage() {
  const features = [
    {
      icon: FileText,
      title: "Clinical Assessment",
      description: "Comprehensive medical evaluation form based on standard protocols"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Secure handling of patient health information"
    },
    {
      icon: Activity,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning model for accurate risk assessment"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Clinical Assessment Tool
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional medical assessment tool for early Alzheimer's risk evaluation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-indigo-100 rounded-full mb-4">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
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