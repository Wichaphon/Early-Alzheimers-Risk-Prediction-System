import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import PredictionPage from './pages/PredictionPage';
import { LoadingScreen } from './components/LoadingScreen';
import { CookieConsentBanner } from './components/CookieConsent';
import { useState, useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/predict" element={<PredictionPage />} />
          </Routes>
          <CookieConsentBanner />
        </>
      )}
    </ThemeProvider>
  );
}