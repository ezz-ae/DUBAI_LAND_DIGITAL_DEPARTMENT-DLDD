'use server';

/**
 * @fileOverview Answers questions based on provided context, responding in the same language as the question.
 */

import {ai} from '@/ai/genkit';
import {
  AskQuestionInput,
  AskQuestionInputSchema,
  AskQuestionOutput,
  AskQuestionOutputSchema
} from '@/ai/schemas/ask-question';

export async function askQuestion(input: AskQuestionInput): Promise<AskQuestionOutput> {
  return askQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askQuestionPrompt',
  input: {schema: AskQuestionInputSchema},
  output: {schema: AskQuestionOutputSchema},
  prompt: `You are an expert on the DLDCHAIN Protocol. First, detect the language of the user's question (English or Arabic). Then, answer the following question in the SAME language based on the provided context. Be concise and helpful.

Context:
{{{context}}}

Question:
{{{question}}}

Answer:
`,
});

const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: AskQuestionInputSchema,
    outputSchema: AskQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
