import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { saveCookieConsent, getCookieConsent, type CookieConsent } from '../services/cookieConsent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    analytics_consent: false,
    marketing_consent: false,
    functional_consent: true,
  });

  useEffect(() => {
    const checkConsent = async () => {
      const savedConsent = await getCookieConsent();
      if (!savedConsent) {
        setIsVisible(true);
      } else {
        setConsent(savedConsent);
      }
    };
    checkConsent();
  }, []);

  const handleAcceptAll = async () => {
    const allConsent = {
      analytics_consent: true,
      marketing_consent: true,
      functional_consent: true,
    };
    await saveCookieConsent(allConsent);
    setConsent(allConsent);
    setIsVisible(false);
  };

  const handleSavePreferences = async () => {
    await saveCookieConsent(consent);
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto">
          {!showPreferences ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Cookie className="w-6 h-6 text-purple-600" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We use cookies to enhance your experience and analyze our website traffic.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Functional</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Essential for website functionality</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.functional_consent}
                    disabled
                    className="rounded text-purple-600 cursor-not-allowed"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Analytics</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Help us improve our website</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.analytics_consent}
                    onChange={(e) => setConsent(prev => ({ ...prev, analytics_consent: e.target.checked }))}
                    className="rounded text-purple-600 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Marketing</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Personalized recommendations</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={consent.marketing_consent}
                    onChange={(e) => setConsent(prev => ({ ...prev, marketing_consent: e.target.checked }))}
                    className="rounded text-purple-600 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}