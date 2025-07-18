import {z} from 'genkit';

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
