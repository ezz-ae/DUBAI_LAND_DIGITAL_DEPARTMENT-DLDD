
import { z } from 'zod';

export const SimulateTokenizationInputSchema = z.object({
  propertyType: z.string().describe("Type of property (e.g., apartment, villa, off-plan)."),
  appraisedValue: z.number().describe("Total appraised value of the property in AED."),
  sizeSqFt: z.number().describe("Size of the property in square feet."),
  mortgageBalance: z.number().optional().default(0).describe("Outstanding mortgage balance in AED, if any."),
});

const SimulationSetupSchema = z.object({
  propertyType: z.string().describe("The type of property being simulated."),
  appraisedValue: z.string().describe("The appraised value of the property, formatted as a currency string (e.g., 'AED 2,000,000')."),
  sizeSqFt: z.string().describe("The size of the property in square feet, formatted as a string (e.g., '1,200 sq. ft.')."),
  pricePerSqFt: z.string().describe("The calculated price per square foot, formatted as a currency string."),
  totalTokens: z.string().describe("The total number of DXBTOKENS to be minted, formatted as a string (e.g., '1,200 Tokens')."),
  mortgageBalance: z.string().describe("The mortgage balance, formatted as a currency string."),
  ownerEquity: z.string().describe("The owner's equity in the property, formatted as a currency string."),
});

const LiquidityCycleItemSchema = z.object({
  step: z.number().describe("The step number in the cycle (e.g., 1, 2, 3)."),
  title: z.string().describe("The title of the step (e.g., 'EBRAM Legal Vetting')."),
  description: z.string().describe("A brief description of what happens in this step."),
});

const FinancialOutcomeSchema = z.object({
  ownerInitialCashOut: z.string().describe("The immediate cash payout to the owner, formatted as a currency string."),
  ownerRetainedTokensValue: z.string().describe("The value of the owner's retained tokens after the assumed appreciation, formatted as a currency string."),
  ownerTotalValue: z.string().describe("The total value realized by the owner (cash + tokens), formatted as a currency string."),
  liquidityProviderProfit: z.string().describe("The estimated profit for the MAKE liquidity provider, formatted as a currency string."),
  marketInvestorPotentialROI: z.string().describe("The potential Return on Investment for a public market investor, formatted as a percentage string (e.g., '15%')."),
  totalValueCreated: z.string().describe("The net new value created by the tokenization process, formatted as a currency string."),
});

export const SimulateTokenizationOutputSchema = z.object({
  simulationTitle: z.string().describe("A descriptive title for the simulation scenario."),
  setup: SimulationSetupSchema.describe("The initial setup and parameters of the simulation."),
  liquidityCycle: z.array(LiquidityCycleItemSchema).describe("A step-by-step breakdown of the tokenization and liquidity process."),
  financialOutcome: FinancialOutcomeSchema.describe("The projected financial results for all stakeholders."),
});
