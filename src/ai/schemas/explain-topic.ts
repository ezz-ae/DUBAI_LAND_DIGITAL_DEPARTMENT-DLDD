import {z} from 'genkit';

export const ExplainTopicInputSchema = z.object({
  topic: z.string().describe("The topic to be explained."),
  context: z.string().describe('The full context of the documentation to use for the explanation.'),
});
export type ExplainTopicInput = z.infer<typeof ExplainTopicInputSchema>;

export const ExplainTopicOutputSchema = z.object({
  explanation: z.string().describe('The detailed explanation of the topic.'),
});
export type ExplainTopicOutput = z.infer<typeof ExplainTopicOutputSchema>;
