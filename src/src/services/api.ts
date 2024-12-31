import { PredictionData } from '../types/prediction';

const API_URL = 'YOUR_API_ENDPOINT'; // Replace with your friend's API endpoint

export async function submitPrediction(data: PredictionData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Prediction request failed');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Failed to submit prediction');
  }
}