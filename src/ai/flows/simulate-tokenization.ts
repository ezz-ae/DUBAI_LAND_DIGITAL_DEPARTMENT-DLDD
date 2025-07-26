
'use server';
/**
 * @fileOverview A Genkit flow for simulating real estate tokenization scenarios.
 *
 * This file defines the 'simulateTokenization' flow, which takes property details
 * as input and generates a detailed financial simulation for its tokenization
 * on the DLDCHAIN platform. It leverages AI to create a realistic narrative
 * and financial breakdown for various property types (completed, mortgaged, off-plan).
 *
 * - simulateTokenizationFlow: The main flow function.
 * - SimulateTokenizationInputSchema: The Zod schema for the flow's input.
 * - SimulateTokenizationOutputSchema: The Zod schema for the flow's structured output.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  SimulateTokenizationInputSchema,
  SimulateTokenizationOutputSchema,
} from '@/ai/schemas/simulate-tokenization';

export type SimulateTokenizationInput = z.infer<typeof SimulateTokenizationInputSchema>;
export type SimulateTokenizationOutput = z.infer<typeof SimulateTokenizationOutputSchema>;

const simulationPrompt = ai.definePrompt({
    name: 'simulationPrompt',
    input: { schema: SimulateTokenizationInputSchema },
    output: { schema: SimulateTokenizationOutputSchema },
    prompt: `You are an expert real estate financial analyst specializing in blockchain tokenization. Your task is to generate a detailed, step-by-step simulation for tokenizing a property on the DLDCHAIN platform.

    **Platform Rules:**
    1.  **Token Standard:** 1 DXBTOKEN = 1 sq. ft. of the property.
    2.  **Initial Liquidity (MAKE Event):** When a property is tokenized, 100% of its appraised value is deposited into an escrow by a MAKE liquidity provider.
    3.  **Owner Payout:** The original owner receives 60% of their equity in cash (DLD-AED) immediately and retains 40% of the total DXBTOKENS.
    4.  **Lien Clearance (for mortgaged properties):** The MAKE liquidity is first used to instantly pay off any existing mortgage balance. The owner's payout is calculated from the remaining equity.
    5.  **Fees:** A total of 5% of tokens are allocated for fees (1% to MAKE Officer, 2% to EBRAM Protocol, 2% to Service Staking Pool).
    6.  **Public Offering:** 55% of the total DXBTOKENS are offered to the public market.
    7.  **MPT (Market Price Transaction):** Assumed to occur after 1 year with an 8% appreciation in property value.

    **Your Task:**
    Based on the following user input, create a compelling and realistic simulation.

    **Property Details:**
    - Property Type: {{{propertyType}}}
    - Property Status: {{{propertyStatus}}}
    - Owner Type: {{{ownerType}}}
    - Appraised Value (AED): {{{appraisedValue}}}
    - Size (sq. ft.): {{{sizeSqFt}}}
    - Mortgage Balance (AED): {{{mortgageBalance}}}

    **Instructions:**
    1.  **Create a Simulation Title:** Generate a clear, descriptive title (e.g., "Simulation: Tokenizing a Mortgaged Villa in JVC").
    2.  **Calculate Setup Details:**
        - Calculate Price per Sq. Ft. (Value / Size).
        - Calculate Total Tokens (equal to Size).
        - Calculate Owner Equity (Value - Mortgage).
    3.  **Describe the Liquidity Cycle:**
        - Detail the steps: Submission, EBRAM Legal Vetting, MAKE Liquidity Provision (including mortgage payoff if applicable), and DXBTOKEN Minting & Distribution.
    4.  **Calculate the Financial Outcome:**
        - Calculate the Owner's Initial Cash-Out (60% of equity).
        - Calculate the value of the Owner's Retained Tokens after 1 year (with 8% appreciation).
        - Calculate the Owner's Total Realized Value.
        - Calculate the Liquidity Provider's Profit (2% fee + gains on their token share).
        - Calculate the Market Investor's Potential ROI (based on the 8% appreciation).
        - Calculate the Total Value Created by the DLDCHAIN protocol.

    Ensure all currency values are formatted as strings like "AED 1,500,000". Ensure percentages are formatted like "12%".
    `,
});

export const simulateTokenizationFlow = ai.defineFlow(
  {
    name: 'simulateTokenizationFlow',
    inputSchema: SimulateTokenizationInputSchema,
    outputSchema: SimulateTokenizationOutputSchema,
  },
  async (input) => {
    const { output } = await simulationPrompt(input);
    if (!output) {
      throw new Error('Simulation generation failed.');
    }
    return output;
  }
);
