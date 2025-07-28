
'use server';
/**
 * @fileoverview This file is the entrypoint for Genkit's developer UI.
 *
 * It is not used in production.
 **/
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// You must specify a region for the plugin even if you are only using models that are available globally.
// See https://firebase.google.com/docs/genkit/plugins/google-ai#initialize-the-plugin
export const ai = genkit({
  plugins: [googleAI({
    location: 'us-central1',
    apiKey: process.env.GEMINI_API_KEY,
  })],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
