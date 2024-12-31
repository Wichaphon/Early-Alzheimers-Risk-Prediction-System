import React from 'react';
import { Brain, Shield, Activity, Clock, Users, BarChart3 } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { motion } from 'framer-motion';

export function Features() {
  const features = [
    {
      name: 'Advanced ML Algorithm',
      description: 'State-of-the-art machine learning model trained on extensive medical data',
      icon: Brain
    },
    {
      name: 'Early Detection',
      description: "Identify potential signs of Alzheimer's disease in early stages",
      icon: Clock
    },
    {
      name: 'High Accuracy',
      description: 'Proven accuracy rates backed by clinical validation studies',
      icon: BarChart3
    },
    {
      name: 'Secure & Private',
      description: 'Your medical data is protected with enterprise-grade security',
      icon: Shield
    },
    {
      name: 'Real-time Analysis',
      description: 'Get results quickly with our efficient processing system',
      icon: Activity
    },
    {
      name: 'Expert Support',
      description: 'Access to medical professionals for result interpretation',
      icon: Users
    }
  ];

  return (
    <div id="features" className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center">
            <h2 className="text-base text-purple-600 dark:text-purple-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Advanced Technology for Better Healthcare
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Our platform combines cutting-edge AI with medical expertise to provide accurate predictions.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative pt-6"
                >
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8 h-full transition-all duration-300 hover:shadow-xl">
                    <div className="-mt-6">
                      <div>
                        <motion.span
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-md shadow-lg"
                        >
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </motion.span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}