
'use server';
/**
 * @fileOverview A Genkit flow for answering questions about a document.
 *
 * This file defines the 'chatWithDocumentFlow', which takes a user's question
 * and the content of a document, and returns an AI-generated answer based on
 * the provided context.
 *
 * - chatWithDocumentFlow: The main flow function.
 * - ChatWithDocumentInput: The Zod schema for the flow's input.
 * - ChatWithDocumentOutput: The Zod schema for the flow's structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';


export const ChatWithDocumentInputSchema = z.object({
  question: z.string().describe("The user's question."),
  documentContent: z.string().describe("The full text content of the document to provide context."),
  isArabic: z.boolean().describe("Whether the user's request is in Arabic."),
});
export type ChatWithDocumentInput = z.infer<typeof ChatWithDocumentInputSchema>;

export const ChatWithDocumentOutputSchema = z.object({
  answer: z.string().describe("The AI-generated answer to the user's question."),
});
export type ChatWithDocumentOutput = z.infer<typeof ChatWithDocumentOutputSchema>;


const chatPrompt = ai.definePrompt({
    name: 'chatPrompt',
    input: { schema: ChatWithDocumentInputSchema },
    output: { schema: ChatWithDocumentOutputSchema },
    model: googleAI.model('gemini-1.5-flash'),
    prompt: `You are an expert AI assistant for the DLDCHAIN project, a sovereign blockchain ecosystem for Dubai's real estate sector.

    Your task is to answer the user's question based *only* on the provided document content. Do not use any external knowledge. If the answer is not in the document, state that the information is not available in the provided context.

    Be concise and helpful.

    {{#if isArabic}}
    Respond in Arabic.
    {{else}}
    Respond in English.
    {{/if}}

    DOCUMENT CONTEXT:
    ---
    {{{documentContent}}}
    ---

    USER QUESTION: {{{question}}}
    `,
});

export const chatWithDocumentFlow = ai.defineFlow(
  {
    name: 'chatWithDocumentFlow',
    inputSchema: ChatWithDocumentInputSchema,
    outputSchema: ChatWithDocumentOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    if (!output) {
      throw new Error('AI chat generation failed.');
    }
    return output;
  }
);
