export interface PatientData {
  age: number;
  gender: string;
  ethnicity: string;
  educationLevel: number;
  bmi: number;
}

export type PatientFormData = Partial<PatientData>;

export const ethnicityOptions = [
  { value: 'caucasian', label: 'Caucasian' },
  { value: 'african', label: 'African' },
  { value: 'asian', label: 'Asian' },
  { value: 'hispanic', label: 'Hispanic' },
  { value: 'other', label: 'Other' }
];