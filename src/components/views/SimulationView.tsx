
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Home, LandPlot, Briefcase } from 'lucide-react';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const propertyTypeIcons = {
    apartment: <Building className="h-5 w-5" />,
    villa: <Home className="h-5 w-5" />,
    land: <LandPlot className="h-5 w-5" />,
    commercial: <Briefcase className="h-5 w-5" />,
};

const FinancialSummaryRow = ({ label, value, isHighlighted = false, isMuted = false }: { label: string, value: string, isHighlighted?: boolean, isMuted?: boolean }) => (
    <div className={`flex justify-between items-center py-2 border-b last:border-b-0 ${isHighlighted ? 'font-bold text-primary bg-primary/5 p-2 rounded-md' : 'text-muted-foreground'}`}>
        <span className={`${isHighlighted ? 'text-primary' : ''} ${isMuted ? 'text-xs' : ''}`}>{label}</span>
        <span className={`${isHighlighted ? 'text-primary' : 'text-foreground font-medium'} ${isMuted ? 'text-xs' : ''}`}>{value}</span>
    </div>
);


const scenarios = [
    {
        id: 'scenario1',
        title: "Secondary Market Tokenization",
        icon: 'apartment',
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
            <Separator className="my-2" />
            <FinancialSummaryRow label="Owner Instant Liquidity (60% Cash)" value="AED 1,920,000" isHighlighted={true} />
            <FinancialSummaryRow label="Owner Retained Equity (40% Tokens)" value="330 DXBTOKENS™" isHighlighted={true} />
            <FinancialSummaryRow label="Owner Total Position" value="~AED 3,200,000" />
            <Separator className="my-2" />
            <FinancialSummaryRow label="LPO Revenue (1% of Valuation)" value="AED 32,000" isMuted={true} />
            <FinancialSummaryRow label="EBRAM™ Governance Revenue (2%)" value="AED 64,000" isMuted={true} />
            <FinancialSummaryRow label="Service Staking Pool (2%)" value="AED 64,000" isMuted={true} />
            <FinancialSummaryRow label="Broker Commission (1%)" value="AED 32,000" isMuted={true} />
        </div>
    },
    {
        id: 'scenario2',
        title: "Mortgaged Property Tokenization",
        icon: 'villa',
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
            <Separator className="my-2" />
            <FinancialSummaryRow label="Lender Payout (On MAKE_ID)" value="AED 900,000" />
            <FinancialSummaryRow label="Owner Instant Liquidity (60% of Equity)" value="AED 2,520,000" isHighlighted={true} />
            <FinancialSummaryRow label="Owner Retained Equity (40% of Equity)" value="720 DXBTOKENS™" isHighlighted={true}/>
            <FinancialSummaryRow label="Owner Total Position" value="~AED 4,200,000" />
             <Separator className="my-2" />
            <FinancialSummaryRow label="LPO Revenue (1% of Net Equity)" value="AED 42,000" isMuted={true}/>
            <FinancialSummaryRow label="EBRAM™ Governance Revenue (2% of Net Equity)" value="AED 84,000" isMuted={true}/>
        </div>
    },
    {
        id: 'scenario3',
        title: "Off-Plan Property Tokenization",
        icon: 'commercial',
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
            <FinancialSummaryRow label="Projected Value at Completion" value="AED 5,500,000 (Est.)" />
            <Separator className="my-2" />
            <FinancialSummaryRow label="Developer Instant Funding (60%)" value="AED 2,700,000" isHighlighted={true} />
            <FinancialSummaryRow label="Developer Retained Equity (40%)" value="600 DXBTOKENS™" />
            <FinancialSummaryRow label="Early Investor Potential ROI" value="~22% (at completion)" isHighlighted={true} />
            <Separator className="my-2" />
            <FinancialSummaryRow label="LPO Revenue (1% of Valuation)" value="AED 45,000" isMuted={true}/>
            <FinancialSummaryRow label="EBRAM™ Governance Revenue (2%)" value="AED 90,000" isMuted={true}/>
        </div>
    },
    {
        id: 'scenario4',
        title: "Pool Closure & Asset De-Tokenization",
        icon: 'land',
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
            <FinancialSummaryRow label="Final Asset State" value="Traditional Title Deed" />
            <Separator className="my-2" />
            <FinancialSummaryRow label="Action" value="De-Tokenization (MAKE_DISMISS)" isHighlighted={true}/>
            <FinancialSummaryRow label="Key Benefit" value="Liquid, transparent acquisition of an illiquid asset." isHighlighted={true} />
             <Separator className="my-2" />
            <FinancialSummaryRow label="LPO Revenue (Final Pool Closure)" value="Fee on final settlement" isMuted={true} />
            <FinancialSummaryRow label="EBRAM™ Governance Revenue" value="Fee on D-EBRAMINT™ event" isMuted={true} />
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
                        <CardTitle className="flex items-center gap-2">
                           {propertyTypeIcons[scenario.icon as keyof typeof propertyTypeIcons] || <Building className="h-5 w-5" />}
                           {scenario.title}
                        </CardTitle>
                        <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        
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
  const [selectedScenario, setSelectedScenario] = useState<any | null>(null);

  return (
    <div className="flex-1 overflow-hidden bg-background/50">
      <ScrollArea className="h-full">
        <div className="container mx-auto p-4 md:p-8 h-full">
          <ReadyScenarios onScenarioSelect={setSelectedScenario} />
        </div>
      </ScrollArea>
      
      {selectedScenario && (
        <Dialog open={!!selectedScenario} onOpenChange={(open) => !open && setSelectedScenario(null)}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-2xl font-bold font-headline">{selectedScenario.title}</DialogTitle>
                    <DialogDescription>
                        A detailed breakdown of the tokenization process for this scenario.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 min-h-0 my-4">
                  <ScrollArea className="h-full pr-6">
                      <div className="prose dark:prose-invert max-w-full">
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
                </div>
                 <DialogFooter className="flex-shrink-0">
                    <DialogClose asChild>
                        <Button type="button" className="w-full sm:w-auto">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}

    