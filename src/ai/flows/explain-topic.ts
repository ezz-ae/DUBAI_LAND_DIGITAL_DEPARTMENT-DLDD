'use server';

/**
 * @fileOverview Explains a specific topic from the DLDCHAIN protocol documentation.
 */

import {ai} from '@/ai/genkit';
import {
  ExplainTopicInput,
  ExplainTopicInputSchema,
  ExplainTopicOutput,
  ExplainTopicOutputSchema
} from '@/ai/schemas/explain-topic';

export async function explainTopic(input: ExplainTopicInput): Promise<ExplainTopicOutput> {
  return explainTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainTopicPrompt',
  input: {schema: ExplainTopicInputSchema},
  output: {schema: ExplainTopicOutputSchema},
  prompt: `You are an expert on the DLDCHAIN Protocol. Provide a detailed and clear explanation for the following topic. Use the provided context to formulate your answer. Be comprehensive and well-structured.

Context:
{{{context}}}

Topic to Explain:
{{{topic}}}

Explanation:
`,
});

const explainTopicFlow = ai.defineFlow(
  {
    name: 'explainTopicFlow',
    inputSchema: ExplainTopicInputSchema,
    outputSchema: ExplainTopicOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
