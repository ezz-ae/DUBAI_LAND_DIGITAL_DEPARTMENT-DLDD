import {z} from 'genkit';

// Clarification Schemas
export const GetClarificationInputSchema = z.object({
  notes: z.array(z.string()).describe('A list of notes or text snippets from the document.'),
});
export type GetClarificationInput = z.infer<typeof GetClarificationInputSchema>;

export const GetClarificationOutputSchema = z.object({
  clarification: z.string().describe('A detailed clarification and expansion of the provided notes.'),
});
export type GetClarificationOutput = z.infer<typeof GetClarificationOutputSchema>;


// Report Generation Schemas
export const GenerateReportInputSchema = z.object({
  notes: z.array(z.string()).describe('A list of notes to base the report on.'),
  reportType: z.enum(['technical', 'managerial', 'legal', 'financial']).describe('The type of report to generate.'),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

export const GenerateReportOutputSchema = z.object({
  report: z.string().describe('The generated report.'),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;
