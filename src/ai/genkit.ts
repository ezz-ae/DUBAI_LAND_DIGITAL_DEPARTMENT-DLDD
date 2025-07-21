import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      // Use a function to provide the API key lazily.
      // This prevents build errors in environments where .env is not immediately available at module load time.
      apiKey: () => process.env.GEMINI_API_KEY || '',
    }),
  ],
  model: 'googleai/gemini-pro',
});
