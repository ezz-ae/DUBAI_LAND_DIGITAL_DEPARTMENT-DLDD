
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Beaker, GanttChartSquare, ShieldCheck } from 'lucide-react';

const ValidationSection = ({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) => (
  <Card className="bg-card/50">
    <CardHeader className="flex flex-row items-start gap-4">
      <div className="bg-primary/10 text-primary p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

const FinancialSummaryRow = ({ label, value, isHighlighted = false }: { label: string, value: string, isHighlighted?: boolean }) => (
    <div className={`flex justify-between items-center py-2 ${isHighlighted ? 'font-bold text-primary' : ''}`}>
        <span>{label}</span>
        <span>{value}</span>
    </div>
);


export function ProjectValidationView() {
  return (
    <div className="flex-1 overflow-hidden bg-background/50">
        <ScrollArea className="h-full">
            <div className="max-w-7xl mx-auto w-full p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline">DLDCHAIN™ Simulation: Real-World Tokenization Scenarios</h1>
                    <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                        From Individual Apartments to Luxury Off-Plan: The Power of Sovereign Digital Governance. This simulation provides a detailed, step-by-step walkthrough of distinct tokenization cases, demonstrating how DLDCHAIN™ seamlessly integrates its core components to unlock liquidity, ensure trust, and streamline transactions.
                    </p>
                </div>
            
                <div className="prose dark:prose-invert max-w-full">
                  
                  <h2>1. Introduction: DLDCHAIN™ in Action – Bridging the Digital and Physical</h2>
                  <p>DLDCHAIN™ is meticulously engineered to address the complexities of real estate in diverse, real-world scenarios. This simulation provides a detailed, step-by-step walkthrough of three distinct tokenization cases, demonstrating how DLDCHAIN™ seamlessly integrates its core components—EBRAM™, DXBTOKENS™, the MAKE™ System, Mashroi™, and the UNIVESTOR Wallet™—to unlock liquidity, ensure trust, and streamline transactions for individual owners, mortgaged properties, and major developers. These scenarios highlight DLDCHAIN™’s versatility, precision, and its unique ability to bring digital sovereignty to every corner of Dubai’s real estate market.</p>

                  <Tabs defaultValue="scenario1" className="mt-8">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                        <TabsTrigger value="scenario1">Ahmed's Apartment</TabsTrigger>
                        <TabsTrigger value="scenario2">Mariam's Villa</TabsTrigger>
                        <TabsTrigger value="scenario3">Emaar's Off-Plan Villa</TabsTrigger>
                        <TabsTrigger value="scenario4">Investor Full Stake</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="scenario1" className="p-4 border rounded-lg mt-2 bg-background">
                        <h3>2. Scenario 1: Ahmed's Apartment (Secondary Sale – Ready Property)</h3>
                        <h4>Context</h4>
                        <p>Ahmed Al Zaabi owns a ready apartment in Dubai Marina. He wants to sell it quickly without a traditional, lengthy listing process. He opts for tokenization to unlock immediate liquidity and tap into a broader investor base.</p>
                        <ul>
                            <li><strong>Property:</strong> Apartment, Dubai Marina</li>
                            <li><strong>Size:</strong> 825 sqft</li>
                            <li><strong>EBRAM™ Valued Price:</strong> AED 3,200,000</li>
                            <li><strong>Owner:</strong> Ahmed Al Zaabi (Individual)</li>
                            <li><strong>Objective:</strong> Quick sale via tokenization for liquidity.</li>
                        </ul>
                        <h4>DLDCHAIN™ Features Highlighted</h4>
                        <ul>
                            <li>UNIVESTOR Wallet™ Submission: Owner-initiated tokenization.</li>
                            <li>Mashroi™ Broker Involvement: Required for secondary market submissions.</li>
                            <li>EBRAMINT™: Digital identity activation and smart contract finalization.</li>
                            <li>MAKE™ System: Guaranteed 100% AED-backed liquidity.</li>
                            <li>DXBTOKENS™ Distribution: Fractional ownership creation.</li>
                        </ul>
                        <h4>Simulation Steps & Technical Flow</h4>
                        <ol>
                            <li><strong>Tokenization Request Submission:</strong> Ahmed logs into his UNIVESTOR Wallet™, selects "Submit Property for Tokenization," and chooses a Mashroi™-qualified broker. The wallet sends a `submitTokenizationRequest` API call to an EBRAM™ gateway. The broker verifies pre-requisites and uploads documents to IPFS.</li>
                            <li><strong>EBRAMINT™ Activation & Digital Identity Finalization:</strong> EBRAM™ reviews the data, verifies compliance, and executes the `ebramint()` function on Hyperledger Fabric, assigning a unique City Digital ID (CDID) and transitioning the property state to `EBRAMINTED`.</li>
                            <li><strong>MAKELIST & MAKETRADE Request:</strong> The EBRAMINTED™ property is added to a MAKELIST. A Liquidity Pool Officer (LPO) signals interest via their MAKE Portal™ with a `submitMakeTradeRequest()`.</li>
                            <li><strong>MAKE_ID Event – Liquidity Commitment & Token Registration:</strong> The LPO signs the MAKE™ transaction, depositing AED 3,200,000. The MAKE™ System's chaincode executes `makeID()`, verifying the deposit. The underlying property is now custodially transferred to the TokenPool, and 825 DXBTOKENS™ are minted.</li>
                            <li><strong>MAKE_IN – Token Escrow & Trading Activation:</strong> EBRAM™ calls `makeIn()` on the MAKE™ System. Ahmed receives AED 1,920,000 (60% cash) and 330 DXBTOKENS™ (40% equity). 453.75 tokens (55%) are allocated to the market, and 5% for fees.</li>
                            <li><strong>Market Trading:</strong> Ahmed can sell his 330 tokens, and public investors can trade from the market pool. EBRAM™'s AI-Weighted Node System dynamically adjusts pricing.</li>
                        </ol>
                        <h4>Financial Summary for Ahmed</h4>
                        <div className="space-y-1 mt-2 text-sm">
                            <FinancialSummaryRow label="Property Valuation (EBRAM™)" value="AED 3,200,000" />
                            <FinancialSummaryRow label="DXBTOKENS™ Minted (1 token/sqft)" value="825 tokens" />
                            <FinancialSummaryRow label="Value per Token (Initial)" value="AED 3,878.78" />
                            <FinancialSummaryRow label="Instant Liquidity (60% of Valuation)" value="AED 1,920,000" isHighlighted={true} />
                            <FinancialSummaryRow label="DXBTOKENS™ Retained (40% equity)" value="330 tokens" />
                            <FinancialSummaryRow label="Broker Commission (1%)" value="AED 32,000" />
                            <FinancialSummaryRow label="Process Duration to Liquidity" value="< 48 hours" isHighlighted={true} />
                        </div>
                    </TabsContent>

                    <TabsContent value="scenario2" className="p-4 border rounded-lg mt-2 bg-background">
                        <h3>3. Scenario 2: Mariam's Villa (Mortgaged Property Sale – Ready Property)</h3>
                        <h4>Context</h4>
                        <p>Mariam owns a villa in Arabian Ranches with an active mortgage. She wants to sell it via tokenization to efficiently settle the mortgage and unlock her equity.</p>
                        <ul>
                            <li><strong>Property:</strong> Villa, Arabian Ranches</li>
                            <li><strong>Size:</strong> 1800 sqft</li>
                            <li><strong>EBRAM™ Valued Price:</strong> AED 5,100,000</li>
                            <li><strong>Outstanding Mortgage:</strong> AED 900,000</li>
                            <li><strong>Lender:</strong> Dubai Islamic Bank (DIB)</li>
                        </ul>
                        <h4>DLDCHAIN™ Features Highlighted</h4>
                        <ul>
                            <li>Lender Integration Module: Seamless verification and payout.</li>
                            <li>MAKE_ID: Prioritizes mortgage payout from the 100% AED backing.</li>
                            <li>Automated Lien Release via Milka API.</li>
                        </ul>
                        <h4>Simulation Steps & Technical Flow</h4>
                        <ol>
                            <li><strong>Owner Submission & EBRAMINT™ (Mortgage Disclosure):</strong> Mariam initiates tokenization via UNIVESTOR Wallet™, disclosing mortgage details. EBRAM™ verifies details via Lender Integration API and assigns a CDID.</li>
                            <li><strong>Lender Notification & Freeze:</strong> EBRAM™ sends a secure event notification to DIB, which acknowledges and temporarily freezes Mariam's mortgage account.</li>
                            <li><strong>MAKETRADE & MAKE_ID Event – Liquidity Commitment & Mortgage Payout:</strong> An LPO commits AED 5,100,000. EBRAM™'s logic prioritizes the payout: AED 900,000 is transferred directly to DIB's DLD-AED wallet. A Milka API call releases the lien. Mariam receives 60% of her net equity (AED 4.2M), which is AED 2,520,000.</li>
                            <li><strong>Token Distribution & Trading:</strong> Mariam retains 720 DXBTOKENS™ (40% of 1800 total). 990 tokens (55%) are allocated to the market. Trading commences.</li>
                        </ol>
                        <h4>Financial Summary for Mariam</h4>
                        <div className="space-y-1 mt-2 text-sm">
                            <FinancialSummaryRow label="Property Valuation (EBRAM™)" value="AED 5,100,000" />
                            <FinancialSummaryRow label="Outstanding Mortgage" value="AED 900,000" />
                            <FinancialSummaryRow label="Net Equity" value="AED 4,200,000" />
                            <FinancialSummaryRow label="Mortgage Payout to Lender" value="AED 900,000" />
                            <FinancialSummaryRow label="Instant Liquidity (60% of Equity)" value="AED 2,520,000" isHighlighted={true} />
                            <FinancialSummaryRow label="DXBTOKENS™ Retained (40% equity)" value="720 tokens" />
                        </div>
                    </TabsContent>

                    <TabsContent value="scenario3" className="p-4 border rounded-lg mt-2 bg-background">
                      <h3>4. Scenario 3: Emaar's Ultra-Luxury Villa (Off-Plan Development)</h3>
                      <h4>Context</h4>
                      <p>Emaar is launching a new ultra-luxury project downtown and wants to tokenize its signature top-floor villa to attract early institutional funding and benefit from value appreciation closer to handover.</p>
                      <ul>
                          <li><strong>Property:</strong> Top-floor Villa (3 floors), Downtown</li>
                          <li><strong>Size:</strong> 5950 sqft</li>
                          <li><strong>Emaar Asking Price (EBRAM™ Valued Price):</strong> AED 11,000,000</li>
                          <li><strong>Delivery:</strong> 11 months</li>
                      </ul>
                      <h4>DLDCHAIN™ Features Highlighted</h4>
                      <ul>
                          <li>Developer-Initiated Tokenization with automated clearance.</li>
                          <li>Milestone-Based Value Accrual via AI-Weighted Node System.</li>
                          <li>Handover Event for final value realization.</li>
                      </ul>
                      <h4>Simulation Steps & Technical Flow</h4>
                      <ol>
                          <li><strong>Developer-Initiated Tokenization Request:</strong> Emaar submits the project via their Developer Wallet. EBRAM™ automatically pulls construction permits from DLD's internal systems.</li>
                          <li><strong>MAKETRADE Listing & LPO Commitment:</strong> The off-plan units appear in the MAKE™ Trading Terminal. An LPO commits AED 11,000,000. EBRAM™ executes `makeID()`, and 5950 DXBTOKENS™ are minted.</li>
                          <li><strong>MAKE_IN – Capital Unlock & Token Distribution:</strong> EBRAM™ calls `makeIn()`. Emaar receives AED 6,600,000 (60% cash) for funding. Emaar retains 2380 DXBTOKENS™ (40%). 3272.5 tokens (55%) go to market.</li>
                          <li><strong>Milestone-Based Value Accrual & Trading:</strong> As construction milestones are verified on-chain, EBRAM™'s AI-Weighted Node System automatically adjusts the DXBTOKEN™ price upwards in real-time.</li>
                          <li><strong>Handover Event & Final Value Realization:</strong> `HandoverConfirmation()` is signed by DLD and Emaar, updating the CDID status to "Ready" and finalizing the value.</li>
                          <li><strong>DXBTOKEN™ Resale/Utility Activation:</strong> The completed villa tokens are now highly liquid for trade or utility activation by the 100% owner.</li>
                      </ol>
                      <h4>Financial Summary for Emaar (Initial)</h4>
                        <div className="space-y-1 mt-2 text-sm">
                            <FinancialSummaryRow label="Property Valuation (Asking Price)" value="AED 11,000,000" />
                            <FinancialSummaryRow label="DXBTOKENS™ Minted" value="5950 tokens" />
                            <FinancialSummaryRow label="Value per Token (Initial)" value="AED 1,848.74" />
                            <FinancialSummaryRow label="Instant Capital Unlock (60%)" value="AED 6,600,000" isHighlighted={true}/>
                            <FinancialSummaryRow label="DXBTOKENS™ Retained (40%)" value="2380 tokens" />
                        </div>
                    </TabsContent>

                     <TabsContent value="scenario4" className="p-4 border rounded-lg mt-2 bg-background">
                        <h3>6. Scenario 4: Investor Acquires Full Stake & Exits/Dismisses Liquidity Pool</h3>
                        <h4>Context</h4>
                        <p>An institutional investor has acquired 92% of the tokens for Ahmed's apartment (CDID-DXB-MAR-001A) and wishes to exit the tokenized liquidity pool to take full physical ownership.</p>
                        <h4>DLDCHAIN™ Features Highlighted</h4>
                        <ul>
                            <li>MAKE_DISMISS: Final exit from the MAKE™ System and D-EBRAMINT™ execution.</li>
                            <li>Market Price Transaction (MPT) for final settlement.</li>
                            <li>Automated final title transfer via Milka Integration.</li>
                        </ul>
                        <h4>Simulation Steps & Technical Flow</h4>
                        <ol>
                            <li><strong>Stake Accumulation & Threshold Detection:</strong> The EBRAM™ Watcher Loop detects that a single UNIVESTOR Wallet™ holds ≥ 90% of the pool's tokens and flags the pool for potential dismissal.</li>
                            <li><strong>MAKE_OUT Request (Optional - Temporary Pause):</strong> The investor may optionally initiate a `requestMakeOut()` call to pause trading and prepare for consolidation.</li>
                            <li><strong>MAKE_DISMISS Execution & MPT:</strong> The investor initiates `requestMakeDismiss()`. EBRAM™ calls `makeDismiss()` on the MAKE™ System. EBRAM™'s AI calculates the final MPT for the property.</li>
                            <li><strong>Fund Distribution:</strong> Based on the MPT, funds from the LPO's backing are distributed to any remaining minority token holders. The LPO receives back its principal + fees.</li>
                            <li><strong>D-EBRAMINT™ & Final Title Transfer:</strong> EBRAM™ performs a D-EBRAMINT™, formally ending the tokenized lifecycle. A Milka API call registers the institutional fund as the new 100% legal owner of the physical property. The DXBTOKENS™ for that CDID are retired.</li>
                        </ol>
                         <h4>Financial Summary (Conceptual)</h4>
                        <div className="space-y-1 mt-2 text-sm">
                           <FinancialSummaryRow label="Total Pool Value at MPT" value="~AED 3.5M (if 9.3% appreciation)" />
                           <FinancialSummaryRow label="Minority Token Holders" value="Paid out at MPT value" />
                           <FinancialSummaryRow label="International Fund" value="Gains 100% physical ownership" isHighlighted={true}/>
                           <FinancialSummaryRow label="DXBTOKENS™ Status" value="Retired / Burned" />
                           <FinancialSummaryRow label="Legal Ownership" value="Transferred via Milka API" />
                        </div>
                    </TabsContent>
                  </Tabs>

                  <h3 className="mt-8">5. Conclusion for Simulations: DLDCHAIN™'s Versatility and Robustness</h3>
                  <p>These real-world simulations powerfully demonstrate DLDCHAIN™'s unparalleled ability to navigate the complexities of diverse real estate assets and ownership structures. From an individual's apartment to a large-scale mortgaged villa, a high-value off-plan development, and the sophisticated process of an institutional investor acquiring full stake and exiting a tokenized pool, DLDCHAIN™ consistently provides:</p>
                  <ul>
                      <li><strong>Rapid Liquidity:</strong> Unlocking capital in hours/days, significantly faster than traditional methods.</li>
                      <li><strong>Unwavering Trust:</strong> Through 100% AED backing, immutable on-chain records, and DLD's sovereign guarantee.</li>
                      <li><strong>Automated Precision:</strong> Streamlining complex legal, financial, and operational workflows with smart contracts and AI.</li>
                      <li><strong>Enhanced Investor Protection:</strong> Transparency into asset status, mortgage settlement, and value accrual.</li>
                      <li><strong>Market Confidence:</strong> Creating a stable, predictable market driven by objective data and AI, not speculation.</li>
                      <li><strong>Full Lifecycle Management:</strong> From initial tokenization to full physical ownership transfer and retirement from the digital pool, DLDCHAIN™ manages the entire asset journey with legal and cryptographic finality.</li>
                  </ul>
                  <p>DLDCHAIN™ is not just a theoretical framework; it is a practical, powerful operating system ready to revolutionize real estate finance and governance at a national and global scale.</p>

                </div>
            </div>
        </ScrollArea>
    </div>
  );
}

    