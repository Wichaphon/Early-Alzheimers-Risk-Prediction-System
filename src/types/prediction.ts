import type { PatientData } from './patient';

export interface PredictionData extends PatientData {
  // ... other fields will be added as needed
}

export interface PredictionResult {
  probability: number;
  risk_level: 'low' | 'moderate' | 'high';
}