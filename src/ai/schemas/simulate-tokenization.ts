import {z} from 'genkit';

export const SimulateTokenizationInputSchema = z.object({
  propertyType: z.enum(['apartment', 'villa', 'off-plan']),
  appraisedValue: z.number().positive(),
  sizeSqFt: z.number().positive(),
  mortgageBalance: z.number().min(0).optional().default(0),
});
export type SimulateTokenizationInput = z.infer<typeof SimulateTokenizationInputSchema>;

export const SimulateTokenizationOutputSchema = z.object({
  simulationTitle: z.string(),
  setup: z.object({
    propertyType: z.string(),
    appraisedValue: z.string(),
    sizeSqFt: z.string(),
    pricePerSqFt: z.string(),
    mortgageBalance: z.string(),
    ownerEquity: z.string(),
    totalTokens: z.string(),
  }),
  liquidityCycle: z.array(z.object({
    step: z.number(),
    title: z.string(),
    description: z.string(),
  })),
  financialOutcome: z.object({
    ownerInitialCashOut: z.string(),
    ownerRetainedTokensValue: z.string(),
    ownerTotalValue: z.string(),
    liquidityProviderProfit: z.string(),
    marketInvestorPotentialROI: z.string(),
    totalValueCreated: z.string(),
  }),
});
export type SimulateTokenizationOutput = z.infer<typeof SimulateTokenizationOutputSchema>;
