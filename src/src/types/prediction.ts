export interface PredictionData {
  age: number;
  gender: string;
  education: number;
  mmse: number;
  cdr: number;
  etiv: number;
  nwbv: number;
  asf: number;
}

export interface PredictionResult {
  probability: number;
  risk_level: 'low' | 'moderate' | 'high';
}