'use server';
/**
 * @fileOverview A Genkit flow for generating a concise title for a note.
 *
 * This file defines the 'generateNoteTitleFlow', which takes a block of text
 * and uses an AI model to suggest a short, descriptive title for it.
 *
 * - generateNoteTitleFlow: The main flow function.
 * - GenerateNoteTitleInputSchema: The Zod schema for the flow's input.
 * - GenerateNoteTitleOutputSchema: The Zod schema for the flow's structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateNoteTitleInputSchema = z.object({
  noteContent: z.string().describe("The full text content of the note for which to generate a title."),
});
export type GenerateNoteTitleInput = z.infer<typeof GenerateNoteTitleInputSchema>;

export const GenerateNoteTitleOutputSchema = z.object({
  title: z.string().describe("The generated, concise title for the note (5-7 words)."),
});
export type GenerateNoteTitleOutput = z.infer<typeof GenerateNoteTitleOutputSchema>;

const titlePrompt = ai.definePrompt({
    name: 'noteTitlePrompt',
    input: { schema: GenerateNoteTitleInputSchema },
    output: { schema: GenerateNoteTitleOutputSchema },
    prompt: `You are an expert at summarizing content. Your task is to generate a short, descriptive title (around 5-7 words) for the following note content. The title should capture the main idea of the text.

    NOTE CONTENT:
    ---
    {{{noteContent}}}
    ---

    Generate a concise title.
    `,
});

export const generateNoteTitleFlow = ai.defineFlow(
  {
    name: 'generateNoteTitleFlow',
    inputSchema: GenerateNoteTitleInputSchema,
    outputSchema: GenerateNoteTitleOutputSchema,
  },
  async (input) => {
    const { output } = await titlePrompt(input);
    if (!output) {
      throw new Error('Title generation failed.');
    }
    return output;
  }
);
