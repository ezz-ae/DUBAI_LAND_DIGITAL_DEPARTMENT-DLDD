import {z} from 'genkit';

export const AskQuestionInputSchema = z.object({
  question: z.string().describe("The user's question."),
  context: z.string().describe('The context documents to answer the question from.'),
});
export type AskQuestionInput = z.infer<typeof AskQuestionInputSchema>;

export const AskQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskQuestionOutput = z.infer<typeof AskQuestionOutputSchema>;
