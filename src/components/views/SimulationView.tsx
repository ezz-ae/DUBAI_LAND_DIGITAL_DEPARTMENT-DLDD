
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Building, Home, LandPlot, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SimulateTokenizationOutput, SimulateTokenizationInputSchema } from '@/ai/schemas/simulate-tokenization';
import { simulateTokenizationFlow } from '@/ai/flows/simulate-tokenization';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const formSchema = SimulateTokenizationInputSchema;

const propertyTypeIcons = {
    apartment: <Building className="h-5 w-5" />,
    villa: <Home className="h-5 w-5" />,
    land: <LandPlot className="h-5 w-5" />,
    commercial: <Briefcase className="h-5 w-5" />,
};

const FinancialSummaryRow = ({ label, value, isHighlighted = false }: { label: string, value: string, isHighlighted?: boolean }) => (
    <div className={`flex justify-between items-center py-2 border-b last:border-b-0 ${isHighlighted ? 'font-bold text-primary bg-primary/5 p-2 rounded-md' : 'text-muted-foreground'}`}>
        <span className={isHighlighted ? 'text-primary' : ''}>{label}</span>
        <span className={isHighlighted ? 'text-primary' : 'text-foreground font-medium'}>{value}</span>
    </div>
);


const scenarios = [
    {
        id: 'scenario1',
        title: "Secondary Market Tokenization",
        description: "An individual owner tokenizes their ready apartment to achieve rapid liquidity without a traditional, lengthy listing process.",
        context: <>
            <p>Ahmed Al Zaabi owns a ready apartment in Dubai Marina. He wants to sell it quickly without a traditional, lengthy listing process. He opts for tokenization to unlock immediate liquidity and tap into a broader investor base.</p>
            <ul className="list-disc pl-5 mt-2">
                <li><strong>Property:</strong> Apartment, Dubai Marina</li>
                <li><strong>Size:</strong> 825 sqft</li>
                <li><strong>EBRAM™ Valued Price:</strong> AED 3,200,000</li>
                <li><strong>Owner:</strong> Ahmed Al Zaabi (Individual)</li>
                <li><strong>Objective:</strong> Quick sale via tokenization for liquidity.</li>
            </ul>
        </>,
        features: <ul className="list-disc pl-5 mt-2">
            <li>UNIVESTOR Wallet™ Submission: Owner-initiated tokenization.</li>
            <li>Mashroi™ Broker Involvement: Required for secondary market submissions.</li>
            <li>EBRAMINT™: Digital identity activation and smart contract finalization.</li>
            <li>MAKE™ System: Guaranteed 100% AED-backed liquidity.</li>
            <li>DXBTOKENS™ Distribution: Fractional ownership creation.</li>
        </ul>,
        steps: <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li><strong>Tokenization Request Submission:</strong> Ahmed logs into his UNIVESTOR Wallet™, selects "Submit Property for Tokenization," and chooses a Mashroi™-qualified broker. The wallet sends a `submitTokenizationRequest` API call to an EBRAM™ gateway. The broker verifies pre-requisites and uploads documents to IPFS.</li>
            <li><strong>EBRAMINT™ Activation & Digital Identity Finalization:</strong> EBRAM™ reviews the data, verifies compliance, and executes the `ebramint()` function on Hyperledger Fabric, assigning a unique City Digital ID (CDID) and transitioning the property state to `EBRAMINTED`.</li>
            <li><strong>MAKELIST & MAKETRADE Request:</strong> The EBRAMINTED™ property is added to a MAKELIST. A Liquidity Pool Officer (LPO) signals interest via their MAKE Portal™ with a `submitMakeTradeRequest()`.</li>
            <li><strong>MAKE_ID Event – Liquidity Commitment & Token Registration:</strong> The LPO signs the MAKE™ transaction, depositing AED 3,200,000. The MAKE™ System's chaincode executes `makeID()`, verifying the deposit. The underlying property is now custodially transferred to the TokenPool, and 825 DXBTOKENS™ are minted.</li>
            <li><strong>MAKE_IN – Token Escrow & Trading Activation:</strong> EBRAM™ calls `makeIn()` on the MAKE™ System. Ahmed receives AED 1,920,000 (60% cash) and 330 DXBTOKENS™ (40% equity). 453.75 tokens (55%) are allocated to the market, and 5% for fees.</li>
            <li><strong>Market Trading:</strong> Ahmed can sell his 330 tokens, and public investors can trade from the market pool. EBRAM™'s AI-Weighted Node System dynamically adjusts pricing.</li>
        </ol>,
        summary: <div className="space-y-1 mt-2 text-sm">
            <FinancialSummaryRow label="Property Valuation (EBRAM™)" value="AED 3,200,000" />
            <FinancialSummaryRow label="DXBTOKENS™ Minted (1 token/sqft)" value="825 tokens" />
            <FinancialSummaryRow label="Value per Token (Initial)" value="AED 3,878.78" />
            <FinancialSummaryRow label="Instant Liquidity (60% of Valuation)" value="AED 1,920,000" isHighlighted={true} />
            <FinancialSummaryRow label="DXBTOKENS™ Retained (40% equity)" value="330 tokens" />
            <FinancialSummaryRow label="Broker Commission (1%)" value="AED 32,000" />
            <FinancialSummaryRow label="Process Duration to Liquidity" value="< 48 hours" isHighlighted={true} />
        </div>
    },
    {
        id: 'scenario2',
        title: "Mortgaged Property Tokenization",
        description: "An owner of a mortgaged villa uses tokenization to efficiently settle the mortgage and unlock her net equity.",
        context: <>
           <p>Mariam owns a villa in Arabian Ranches with an active mortgage. She wants to sell it via tokenization to efficiently settle the mortgage and unlock her equity.</p>
           <ul className="list-disc pl-5 mt-2">
                <li><strong>Property:</strong> Villa, Arabian Ranches</li>
                <li><strong>Size:</strong> 1800 sqft</li>
                <li><strong>EBRAM™ Valued Price:</strong> AED 5,100,000</li>
                <li><strong>Outstanding Mortgage:</strong> AED 900,000</li>
                <li><strong>Lender:</strong> Dubai Islamic Bank (DIB)</li>
           </ul>
        </>,
        features: <ul className="list-disc pl-5 mt-2">
            <li>Lender Integration Module: Seamless verification and payout.</li>
            <li>MAKE_ID: Prioritizes mortgage payout from the 100% AED backing.</li>
            <li>Automated Lien Release via Milka API.</li>
        </ul>,
        steps: <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li><strong>Owner Submission & EBRAMINT™ (Mortgage Disclosure):</strong> Mariam initiates tokenization via UNIVESTOR Wallet™, disclosing mortgage details. EBRAM™ verifies details via Lender Integration API and assigns a CDID.</li>
            <li><strong>Lender Notification & Freeze:</strong> EBRAM™ sends a secure event notification to DIB, which acknowledges and temporarily freezes Mariam's mortgage account.</li>
            <li><strong>MAKETRADE & MAKE_ID Event – Liquidity Commitment & Mortgage Payout:</strong> An LPO commits AED 5,100,000. EBRAM™'s logic prioritizes the payout: AED 900,000 is transferred directly to DIB's DLD-AED wallet. A Milka API call releases the lien. Mariam receives 60% of her net equity (AED 4.2M), which is AED 2,520,000.</li>
            <li><strong>Token Distribution & Trading:</strong> Mariam retains 720 DXBTOKENS™ (40% of 1800 total). 990 tokens (55%) are allocated to the market. Trading commences.</li>
        </ol>,
        summary: <div className="space-y-1 mt-2 text-sm">
            <FinancialSummaryRow label="Property Valuation (EBRAM™)" value="AED 5,100,000" />
            <FinancialSummaryRow label="Outstanding Mortgage" value="AED 900,000" />
            <FinancialSummaryRow label="Net Equity" value="AED 4,200,000" />
            <FinancialSummaryRow label="Mortgage Payout to Lender" value="AED 900,000" />
            <FinancialSummaryRow label="Instant Liquidity (60% of Equity)" value="AED 2,520,000" isHighlighted={true} />
            <FinancialSummaryRow label="DXBTOKENS™ Retained (40% equity)" value="720 tokens" />
        </div>
    },
    {
        id: 'scenario3',
        title: "Off-Plan Property Tokenization",
        description: "A developer tokenizes an off-plan project to secure early funding and offer investors early access to a prime asset.",
        context: <>
           <p>A leading developer is launching a luxury tower in Downtown Dubai. To secure funding for the final construction phase and create early market buzz, they decide to tokenize a selection of off-plan units.</p>
           <ul className="list-disc pl-5 mt-2">
                <li><strong>Property:</strong> Off-Plan Apartment, Downtown</li>
                <li><strong>Size:</strong> 1,500 sqft</li>
                <li><strong>Asking Price (Off-Plan):</strong> AED 4,500,000</li>
                <li><strong>Owner:</strong> Major Real Estate Developer</li>
           </ul>
        </>,
        features: <ul className="list-disc pl-5 mt-2">
            <li>Developer Wallet Integration for project submissions.</li>
            <li>Milestone-Based Value Appreciation: Token value automatically increases as construction milestones are verified on-chain.</li>
            <li>Secure Escrow Management via the MAKE™ system.</li>
            <li>EBRAM™ for creating legally binding Smart SPAs (Sale and Purchase Agreements).</li>
        </ul>,
        steps: <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li><strong>Project Submission:</strong> The developer submits the project via their Developer Wallet, including all approved plans and Oqood registration details. EBRAM™ verifies the data.</li>
            <li><strong>Smart SPA Creation:</strong> The developer uses EBRAM™ to generate a Smart SPA template for the tokenized units, defining payment schedules and construction milestones.</li>
            <li><strong>Liquidity & Tokenization:</strong> An LPO commits AED 4,500,000. The MAKE™ system executes `makeID()`. The developer receives AED 2,700,000 (60%) for project funding and retains 600 DXBTOKENS™ (40% of 1500 total).</li>
            <li><strong>Milestone Verification:</strong> As construction milestones (e.g., "Foundation Complete," "Structure Complete") are achieved, the developer submits verification documents. An independent surveyor, acting as an oracle, confirms the milestone on-chain.</li>
            <li><strong>Automated Value Appreciation:</strong> Upon milestone verification, an EBRAM™ smart contract automatically adjusts the underlying valuation of the tokens upwards by a predefined percentage, rewarding early investors.</li>
        </ol>,
        summary: <div className="space-y-1 mt-2 text-sm">
            <FinancialSummaryRow label="Initial Off-Plan Price" value="AED 4,500,000" />
            <FinancialSummaryRow label="Developer Instant Funding (60%)" value="AED 2,700,000" isHighlighted={true} />
            <FinancialSummaryRow label="DXBTOKENS™ Retained (40%)" value="600 tokens" />
            <FinancialSummaryRow label="Tokens for Public Sale (55%)" value="825 tokens" />
            <FinancialSummaryRow label="Projected Value at Completion" value="AED 5,500,000 (Est.)" />
            <FinancialSummaryRow label="Early Investor ROI at Completion" value="~22%" isHighlighted={true} />
        </div>
    },
    {
        id: 'scenario4',
        title: "Pool Closure & Asset De-Tokenization",
        description: "An institutional investor acquires all tokens for a property and de-tokenizes it to take full, traditional ownership.",
        context: <>
           <p>An international investment fund wants to acquire a fully-tokenized commercial building. Instead of a complex M&A process, they strategically purchase all available DXBTOKENS™ on the open market to gain 100% ownership.</p>
           <ul className="list-disc pl-5 mt-2">
                <li><strong>Property:</strong> Commercial Building, DIFC</li>
                <li><strong>Total Tokens:</strong> 50,000 DXBTOKENS™</li>
                <li><strong>Acquirer:</strong> Global Real Estate Investment Fund</li>
                <li><strong>Objective:</strong> Acquire 100% of the asset and revert it to a traditional title deed under their full control.</li>
           </ul>
        </>,
        features: <ul className="list-disc pl-5 mt-2">
            <li>MAKE_DISMISS™ Protocol: A secure and transparent process for de-tokenization.</li>
            <li>Forced Buyout Mechanism: Protects minority token holders.</li>
            <li>Automated Title Deed Transfer via Milka API integration.</li>
            <li>Complete audit trail of the asset's entire tokenized lifecycle.</li>
        </ul>,
        steps: <ol className="list-decimal pl-5 mt-2 space-y-2">
            <li><strong>Token Acquisition:</strong> The fund uses its institutional UNIVESTOR Wallet™ to purchase all 50,000 DXBTOKENS™ from the open market and any remaining private holders over several weeks.</li>
            <li><strong>Initiate MAKE_DISMISS™:</strong> Once the fund's wallet holds 100% of the tokens, the `makeDismiss()` function in the EBRAM™ contract becomes callable. The fund initiates the transaction.</li>
            <li><strong>Contract Verification:</strong> The EBRAM™ contract verifies that one entity holds all tokens and that there are no outstanding liens or disputes associated with the property.</li>
            <li><strong>Token Burn:</strong> The contract executes a 'burn' function, permanently destroying all 50,000 DXBTOKENS™ associated with the property. This removes the asset from the tokenized market.</li>
            <li><strong>Title Deed Transfer:</strong> Upon successful token burn, EBRAM™ triggers a secure, authenticated API call to the DLD's Milka system, instructing it to issue a new, traditional title deed in the name of the investment fund.</li>
            <li><strong>Finalization:</strong> The property is now fully de-tokenized and held as a standard real estate asset by the fund. The entire on-chain history remains as a permanent, auditable record of its provenance.</li>
        </ol>,
        summary: <div className="space-y-1 mt-2 text-sm">
            <FinancialSummaryRow label="Total Tokens Acquired" value="50,000" />
            <FinancialSummaryRow label="Asset Class" value="Tokenized Commercial Real Estate" />
            <FinancialSummaryRow label="Action" value="De-Tokenization (MAKE_DISMISS)" isHighlighted={true}/>
            <FinancialSummaryRow label="Final Asset State" value="Traditional Title Deed" />
            <FinancialSummaryRow label="Key Benefit" value="Liquid, transparent acquisition of an entire illiquid asset." isHighlighted={true} />
        </div>
    }
];

const ReadyScenarios = ({ onScenarioSelect }: { onScenarioSelect: (scenario: any) => void }) => (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">DLDCHAIN™ Simulation Scenarios</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                Explore these detailed, pre-built scenarios to understand how DLDCHAIN™ seamlessly integrates its core components to unlock liquidity, ensure trust, and streamline transactions across various real-world situations.
            </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map(scenario => (
                <Card key={scenario.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle>{scenario.title}</CardTitle>
                        <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        {/* Can add key highlights here if needed */}
                    </CardContent>
                    <CardFooter>
                         <Button variant="outline" onClick={() => onScenarioSelect(scenario)} className="w-full">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
);


export function SimulationView() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulateTokenizationOutput | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: 'apartment',
      propertyStatus: 'ready',
      ownerType: 'individual',
      appraisedValue: 1500000,
      sizeSqFt: 1000,
      mortgageBalance: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSimulationResult(null);
    try {
        const result = await simulateTokenizationFlow(values);
        setSimulationResult(result);
        toast({
            title: "Simulation Complete",
            description: "The tokenization scenario has been generated.",
        });
    } catch (error) {
      console.error("Error running simulation:", error);
      toast({
        variant: "destructive",
        title: "Simulation Failed",
        description: "Could not generate the simulation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 overflow-hidden bg-background/50">
      <div className="container mx-auto p-4 md:p-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          
          <div className="lg:col-span-1 h-full flex flex-col">
            <Card className="flex-grow flex flex-col">
              <CardHeader>
                <CardTitle>Interactive Simulator</CardTitle>
                <CardDescription>Enter property details to generate a custom tokenization scenario.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="land">Land</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="propertyStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ready">Ready</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="off-plan">Off-Plan</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <FormField
                        control={form.control}
                        name="ownerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select owner type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="organization">Organization</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <FormField
                      control={form.control}
                      name="appraisedValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appraised Value (AED)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 2000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sizeSqFt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size (sq. ft.)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 1200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="mortgageBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mortgage Balance (AED)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter 0 if none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Run Simulation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 h-full">
            <ScrollArea className="h-full pr-4 -mr-4">
              <div className="space-y-6">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-card rounded-lg border">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <h3 className="text-xl font-semibold">Generating Simulation...</h3>
                        <p className="text-muted-foreground">The AI is processing the tokenization lifecycle. Please wait.</p>
                    </div>
                )}
                
                {simulationResult && !isLoading && (
                  <div className="space-y-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {propertyTypeIcons[(simulationResult.setup.propertyType.toLowerCase().replace(/[\s-]+/g, '') as keyof typeof propertyTypeIcons) || 'apartment']}
                            {simulationResult.simulationTitle}
                        </CardTitle>
                        <CardDescription>This simulation outlines the complete tokenization process from submission to value distribution.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <h3 className="font-semibold text-lg mb-4">Simulation Setup</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Appraised Value</dt>
                                <dd className="font-semibold text-primary text-base">{simulationResult.setup.appraisedValue}</dd>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Size</dt>
                                <dd className="font-semibold text-primary text-base">{simulationResult.setup.sizeSqFt}</dd>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Total Tokens</dt>
                                <dd className="font-semibold text-primary text-base">{simulationResult.setup.totalTokens}</dd>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Value per Token</dt>
                                <dd className="font-semibold text-primary text-base">{simulationResult.setup.pricePerSqFt}</dd>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Mortgage Balance</dt>
                                <dd className="font-semibold text-base">{simulationResult.setup.mortgageBalance}</dd>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-md">
                                <dt className="font-medium text-muted-foreground">Owner's Equity</dt>
                                <dd className="font-semibold text-base">{simulationResult.setup.ownerEquity}</dd>
                            </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Liquidity & Tokenization Cycle</CardTitle>
                            <CardDescription>Step-by-step breakdown of the EBRAM and MAKE system processes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative pl-6">
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                                {simulationResult.liquidityCycle.map((item, index) => (
                                    <div key={index} className="relative mb-8">
                                        <div className="absolute left-0 top-1.5 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground -translate-x-1/2">
                                            <span className="text-xs font-bold">{item.step}</span>
                                        </div>
                                        <div className="ml-8">
                                            <h4 className="font-semibold">{item.title}</h4>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Outcome & Value Creation</CardTitle>
                            <CardDescription>Projected financial results for all stakeholders after a 1-year period with 8% market appreciation.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                              <span className="font-medium">Owner's Initial Cash-Out</span>
                              <span className="font-bold text-lg">{simulationResult.financialOutcome.ownerInitialCashOut}</span>
                          </div>
                          <div className="flex justify-between items-center p-3">
                              <span className="text-muted-foreground">Owner's Retained Tokens Value (at MPT)</span>
                              <span className="font-semibold">{simulationResult.financialOutcome.ownerRetainedTokensValue}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-primary/10 rounded-md">
                              <strong className="text-primary">Owner's Total Realized Value</strong>
                              <strong className="text-primary text-lg">{simulationResult.financialOutcome.ownerTotalValue}</strong>
                          </div>
                          <Separator className="my-4" />
                          <div className="flex justify-between items-center p-3">
                              <span className="text-muted-foreground">Liquidity Provider (MAKE) Profit</span>
                              <span className="font-semibold">{simulationResult.financialOutcome.liquidityProviderProfit}</span>
                          </div>
                          <div className="flex justify-between items-center p-3">
                              <span className="text-muted-foreground">Market Investor Potential ROI</span>
                              <span className="font-semibold text-green-600">{simulationResult.financialOutcome.marketInvestorPotentialROI}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md mt-4">
                              <strong className="text-lg">Total Value Created by DLDCHAIN</strong>
                              <strong className="text-lg text-green-600">{simulationResult.financialOutcome.totalValueCreated}</strong>
                          </div>
                        </CardContent>
                    </Card>

                  </div>
                )}

                {!simulationResult && !isLoading && (
                    <ReadyScenarios onScenarioSelect={setSelectedScenario} />
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      
      {selectedScenario && (
        <Dialog open={!!selectedScenario} onOpenChange={(open) => !open && setSelectedScenario(null)}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-headline">{selectedScenario.title}</DialogTitle>
                    <DialogDescription>
                        A detailed breakdown of the tokenization process for this scenario.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] my-4">
                    <div className="space-y-6 pr-4 prose dark:prose-invert max-w-full">
                        <div>
                            <h4 className="font-semibold text-lg">Context</h4>
                            {selectedScenario.context}
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold text-lg">DLDCHAIN™ Features Highlighted</h4>
                             {selectedScenario.features}
                        </div>
                         <Separator />
                        <div>
                            <h4 className="font-semibold text-lg">Simulation Steps & Technical Flow</h4>
                            {selectedScenario.steps}
                        </div>
                         <Separator />
                        <div>
                             <h4 className="font-semibold text-lg">Financial Summary</h4>
                            {selectedScenario.summary}
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
