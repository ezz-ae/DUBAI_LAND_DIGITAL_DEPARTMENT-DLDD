'use server';
/**
 * @fileOverview A Genkit flow for generating reports from user notes.
 *
 * This file defines the 'generateReportFlow', which takes a list of notes
 * and a report type, and generates a structured report summarizing the key findings.
 *
 * - generateReportFlow: The main flow function.
 * - GenerateReportInput: The Zod schema for the flow's input.
 * - GenerateReportOutput: The Zod schema for the flow's structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GenerateReportInputSchema = z.object({
  notes: z.array(z.string()).describe("An array of notes, where each string is a note's content."),
  reportType: z.enum(['technical', 'managerial', 'legal', 'financial']).describe("The type of report to generate."),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

export const GenerateReportOutputSchema = z.object({
  report: z.string().describe("The generated report in plain text or markdown format."),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

const reportPrompt = ai.definePrompt({
    name: 'reportPrompt',
    input: { schema: GenerateReportInputSchema },
    output: { schema: GenerateReportOutputSchema },
    prompt: `You are an expert analyst tasked with creating a professional report based on a set of notes about the DLDCHAIN project.

    Report Type: {{{reportType}}}

    Your task is to synthesize the following notes into a coherent and well-structured report. The report should summarize the key findings, insights, and concerns expressed in the notes, tailored to the specified report type.

    - For a 'technical' report, focus on architecture, feasibility, security, and scalability.
    - For a 'managerial' report, focus on strategy, timelines, risks, and stakeholder impact.
    - For a 'legal' report, focus on compliance, regulations, smart contract enforceability, and dispute resolution.
    - For a 'financial' report, focus on revenue models, economic impact, tokenomics, and liquidity.

    Structure the report with a title, a brief introduction, a body with clear headings for key themes, and a concluding summary.

    NOTES:
    ---
    {{#each notes}}
    - {{{this}}}
    {{/each}}
    ---
    `,
});

export const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async (input) => {
    const { output } = await reportPrompt(input);
    if (!output) {
      throw new Error('Report generation failed.');
    }
    return output;
  }
);
