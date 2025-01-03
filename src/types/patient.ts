export interface PatientData {
  age: number;
  gender: string;
  ethnicity: string;
  educationLevel: number;
  bmi: number;
  smoking: boolean;
  alcoholConsumption: string;
  physicalActivity: number;
  dietQuality: number;
  sleepQuality: number;
  familyHistoryAlzheimers: boolean;
  cardiovascularDisease: boolean;
  diabetes: boolean;
  depression: boolean;
  headInjury: boolean;
  hypertension: boolean;
  systolicBP: number;
  diastolicBP: number;
  cholesterolTotal: number;
  cholesterolLDL: number;
  cholesterolHDL: number;
  triglycerides: number;
  mmseScore: number;
  functionalAssessment: string;
  memoryComplaints: boolean;
  behavioralProblems: boolean;
  adlScore: number;
  confusion: boolean;
  disorientation: boolean;
  personalityChanges: boolean;
  difficultyCompletingTasks: boolean;
  forgetfulness: boolean;
}

export type PatientFormData = Partial<PatientData>;

export const ethnicityOptions = [
  { value: 'caucasian', label: 'Caucasian' },
  { value: 'african', label: 'African' },
  { value: 'asian', label: 'Asian' },
  { value: 'hispanic', label: 'Hispanic' },
  { value: 'other', label: 'Other' }
];

export const alcoholConsumptionOptions = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light (1-2 drinks/week)' },
  { value: 'moderate', label: 'Moderate (3-7 drinks/week)' },
  { value: 'heavy', label: 'Heavy (>7 drinks/week)' }
];