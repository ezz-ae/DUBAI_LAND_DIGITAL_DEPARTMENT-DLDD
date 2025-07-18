'use server';
/**
 * @fileOverview AI flows for handling user notes, including clarification and report generation.
 */

import {ai} from '@/ai/genkit';
import {
  GetClarificationInput,
  GetClarificationInputSchema,
  GetClarificationOutput,
  GetClarificationOutputSchema,
  GenerateReportInput,
  GenerateReportInputSchema,
  GenerateReportOutput,
  GenerateReportOutputSchema,
} from '@/ai/schemas/notes';

// Clarification Flow
export async function getClarification(input: GetClarificationInput): Promise<GetClarificationOutput> {
  return getClarificationFlow(input);
}

const clarificationPrompt = ai.definePrompt({
  name: 'clarificationPrompt',
  input: {schema: GetClarificationInputSchema},
  output: {schema: GetClarificationOutputSchema},
  prompt: `You are an expert on the DLDCHAIN Protocol. A user has selected the following snippets from the documentation. Provide a clear and detailed clarification for these notes, explaining the concepts, their relationships, and their significance within the protocol.

Notes:
{{#each notes}}
- {{{this}}}
{{/each}}
`,
});

const getClarificationFlow = ai.defineFlow(
  {
    name: 'getClarificationFlow',
    inputSchema: GetClarificationInputSchema,
    outputSchema: GetClarificationOutputSchema,
  },
  async (input) => {
    const {output} = await clarificationPrompt(input);
    return output!;
  }
);

// Report Generation Flow
export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const reportPrompt = ai.definePrompt({
  name: 'reportPrompt',
  input: {schema: GenerateReportInputSchema},
  output: {schema: GenerateReportOutputSchema},
  prompt: `You are an expert on the DLDCHAIN Protocol. Based on the following user-selected notes and the specified report type, generate a comprehensive, well-structured {{{reportType}}} report.

Report Type: {{{reportType}}}

The report should synthesize the information from the notes, elaborate on the key points, and present them in a format appropriate for the chosen report type. For example, a technical report should focus on architecture and implementation details, while a managerial report should focus on strategy and business implications.

Notes to be included in the report:
{{#each notes}}
- {{{this}}}
{{/each}}

Generated Report:
`,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async (input) => {
    const {output} = await reportPrompt(input);
    return output!;
  }
);
