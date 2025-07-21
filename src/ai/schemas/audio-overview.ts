import {z} from 'genkit';

export const GenerateAudioInputSchema = z.object({
  content: z.string().describe('The text content to generate an audio overview from.'),
  length: z.enum(['short', 'long']).describe('The desired length of the interview.'),
});
export type GenerateAudioInput = z.infer<typeof GenerateAudioInputSchema>;

export const GenerateAudioOutputSchema = z.object({
  audio: z
    .string()
    .describe(
      "The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'."
    ),
});
export type GenerateAudioOutput = z.infer<typeof GenerateAudioOutputSchema>;
