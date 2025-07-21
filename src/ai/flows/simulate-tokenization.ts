'use server';

/**
 * @fileOverview Generates a detailed tokenization simulation for a given property.
 */

import {ai} from '@/ai/genkit';
import {
  SimulateTokenizationInput,
  SimulateTokenizationInputSchema,
  SimulateTokenizationOutput,
  SimulateTokenizationOutputSchema,
} from '@/ai/schemas/simulate-tokenization';

export async function simulateTokenization(input: SimulateTokenizationInput): Promise<SimulateTokenizationOutput> {
  return simulateTokenizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateTokenizationPrompt',
  input: {schema: SimulateTokenizationInputSchema},
  output: {schema: SimulateTokenizationOutputSchema},
  prompt: `You are the DLDCHAIN protocol's simulation engine. Your task is to generate a detailed, step-by-step tokenization simulation based on the provided property details. The simulation must be realistic, financially sound, and follow the core principles of the DLDCHAIN ecosystem.

Core Principles to Follow:
1.  **Tokenization Rule:** 1 DXBTOKEN = 1 square foot. The total number of tokens must equal the property's size in sq ft.
2.  **Liquidity (MAKE Event):** The property owner receives 60% of their equity in immediate cash liquidity. The remaining 40% of their equity value is retained as DXBTOKENS.
3.  **Public Offering:** 55% of the total tokens generated are offered to the public market.
4.  **Fees:** Protocol fees (EBRAM & Service Staking) total 4% of the property's appraised value. The Liquidity Provider (MAKE Officer) gets a 1% fee. These fees are taken from the token pool.
5.  **Mortgage:** If a mortgage exists, it is cleared first from the MAKE system's liquidity pool. Equity is calculated as (Appraised Value - Mortgage Balance).
6.  **Appreciation:** For the "Financial Outcome" section, assume a realistic 1-year market appreciation of 8% for the property value. This increased value should be reflected in the final token price for calculating outcomes.

**Input Property Details:**
- Property Type: {{{propertyType}}}
- Appraised Value: {{{appraisedValue}}} AED
- Size: {{{sizeSqFt}}} sq ft
- Mortgage Balance: {{{mortgageBalance}}} AED

Generate a complete simulation now, populating all fields in the output schema. Ensure all calculations are correct and clearly explained in the descriptions. The tone should be professional, authoritative, and clear.
`,
});

const simulateTokenizationFlow = ai.defineFlow(
  {
    name: 'simulateTokenizationFlow',
    inputSchema: SimulateTokenizationInputSchema,
    outputSchema: SimulateTokenizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
