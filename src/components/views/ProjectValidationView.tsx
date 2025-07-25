
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Beaker, GanttChartSquare, ShieldCheck } from 'lucide-react';
import { Separator } from '../ui/separator';

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

const OutcomeRow = ({ label, value, isHighlighted = false, isTotal = false }: { label: string, value: string, isHighlighted?: boolean, isTotal?: boolean }) => (
    <div className={`flex justify-between items-center p-3 rounded-md ${isHighlighted ? 'bg-primary/10' : ''} ${isTotal ? 'border-t mt-2 pt-3' : ''}`}>
        <span className={`${isTotal ? 'font-bold' : 'text-muted-foreground'}`}>{label}</span>
        <span className={`font-semibold text-base ${isHighlighted || isTotal ? 'text-primary' : ''}`}>{value}</span>
    </div>
);


export function ProjectValidationView() {
  return (
    <div className="flex-1 overflow-hidden bg-background/50">
        <ScrollArea className="h-full">
            <div className="max-w-7xl mx-auto w-full p-6 space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-headline">Project Validation & Feasibility</h1>
                    <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                        A comprehensive analysis of the DLDCHAIN protocol's technical integrity, economic viability, and security framework. This section consolidates key simulations and validation plans that prove the system's organic, self-sustaining, and robust nature.
                    </p>
                </div>
            
                <ValidationSection 
                    icon={<GanttChartSquare className="h-6 w-6" />}
                    title="Originality & Feasibility Study"
                    description="An overview of the core architecture and development roadmap, demonstrating a feasible, scalable, and modular approach to building a sovereign real estate ledger."
                >
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>The DLDCHAIN proposal is a comprehensive vision for a blockchain-based real estate governance system tailored to Dubai’s unique needs. It integrates legal, financial, and operational frameworks into a sovereign digital infrastructure. The architecture is built on <strong>Hyperledger Fabric</strong> to ensure data confidentiality, regulatory compliance, and sovereign control.</p>
                        <p>The system comprises modular components (EBRAM, DXBTOKENS, Mashroi, UNIVESTOR Wallet) integrated through APIs and smart contracts, with a fiat-only stablecoin (DLD-AED) as the financial backbone. The architecture emphasizes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Immutability:</strong> Permanent, tamper-proof property records.</li>
                            <li><strong>Interoperability:</strong> Deep integration with existing DLD systems (Ejari, Milka, Trakheesi) and external governmental entities.</li>
                            <li><strong>Security:</strong> A zero-trust architecture, passwordless login, and cryptographic validation.</li>
                            <li><strong>Scalability:</strong> A hierarchical smart contract structure (EBRAM Contract Tree) for granular asset management.</li>
                        </ul>
                    </div>
                </ValidationSection>

                <ValidationSection 
                    icon={<Beaker className="h-6 w-6" />}
                    title="Tokenization Liquidity Simulations"
                    description="Four distinct simulations demonstrating DLDCHAIN's ability to unlock liquidity and create value in real-world scenarios: an individual's apartment, a mortgaged villa, an off-plan unit, and an institutional stake acquisition."
                >
                    <Tabs defaultValue="apartment">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="apartment">Ready Apartment</TabsTrigger>
                            <TabsTrigger value="mortgaged">Mortgaged Villa</TabsTrigger>
                            <TabsTrigger value="offplan">Off-Plan Unit</TabsTrigger>
                            <TabsTrigger value="institutional">Institutional Exit</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="apartment" className="p-4 border rounded-lg mt-2 bg-background text-sm">
                            <h4 className="font-semibold mb-2 text-base">Scenario 1: Ahmed's Ready Apartment</h4>
                            <p className="text-muted-foreground mb-4">An individual owner, Ahmed, tokenizes his ready apartment in Dubai Marina for a quick sale to unlock liquidity and access a broader investor base.</p>
                            
                            <h5 className="font-semibold mt-4 mb-2">Simulation Setup</h5>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li><strong>Property:</strong> Apartment, 825 sqft, Dubai Marina</li>
                                <li><strong>Appraised Value:</strong> AED 3,200,000</li>
                                <li><strong>Token Allocation (1 token = 1 sqft):</strong> 825 DXBTOKENS.</li>
                                <li><strong>Process:</strong> Ahmed initiates via UNIVESTOR Wallet, a Mashroi™ broker handles compliance, and the MAKE™ System provides liquidity.</li>
                            </ul>
                            
                            <h5 className="font-semibold mt-4 mb-2">Financial Outcome for Ahmed</h5>
                            <div className="space-y-1 mt-2">
                                <OutcomeRow label="Instant Liquidity (60% of Value)" value="AED 1,920,000" isHighlighted={true} />
                                <OutcomeRow label="Retained Equity (Tradable Tokens)" value="330 DXBTOKENS" />
                                <OutcomeRow label="Broker Commission (1%)" value="AED 32,000" />
                                <OutcomeRow label="Total Time to Liquidity" value="< 48 hours" isTotal={true} />
                            </div>
                        </TabsContent>

                        <TabsContent value="mortgaged" className="p-4 border rounded-lg mt-2 bg-background text-sm">
                             <h4 className="font-semibold mb-2 text-base">Scenario 2: Mariam's Mortgaged Villa</h4>
                             <p className="text-muted-foreground mb-4">Mariam tokenizes her villa to efficiently settle her outstanding AED 900,000 mortgage with DIB and unlock her equity without a traditional sales process.</p>
                             
                             <h5 className="font-semibold mt-4 mb-2">Simulation Setup</h5>
                             <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li><strong>Property:</strong> Villa, 1800 sqft, Arabian Ranches</li>
                                <li><strong>Appraised Value:</strong> AED 5,100,000</li>
                                <li><strong>Outstanding Mortgage:</strong> AED 900,000</li>
                                <li><strong>Owner Equity:</strong> AED 4,200,000</li>
                             </ul>

                            <h5 className="font-semibold mt-4 mb-2">Financial Outcome for Mariam</h5>
                            <div className="space-y-1 mt-2">
                                <OutcomeRow label="Mortgage Payout to Lender" value="AED 900,000" />
                                <OutcomeRow label="Instant Liquidity (60% of Equity)" value="AED 2,520,000" isHighlighted={true} />
                                <OutcomeRow label="Retained Equity (Tradable Tokens)" value="720 DXBTOKENS" />
                                <OutcomeRow label="Net Value Unlocked" value="AED 3,240,000+" isTotal={true} />
                            </div>
                        </TabsContent>

                        <TabsContent value="offplan" className="p-4 border rounded-lg mt-2 bg-background text-sm">
                            <h4 className="font-semibold mb-2 text-base">Scenario 3: Emaar's Off-Plan Villa</h4>
                            <p className="text-muted-foreground mb-4">Emaar tokenizes a luxury off-plan villa to secure early institutional funding and benefit from value appreciation tied to construction milestones.</p>
                            
                            <h5 className="font-semibold mt-4 mb-2">Simulation Setup</h5>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li><strong>Property:</strong> Ultra-Luxury Villa, 5950 sqft, Downtown</li>
                                <li><strong>Asking Price:</strong> AED 11,000,000</li>
                                <li><strong>Delivery:</strong> 11 months</li>
                            </ul>

                            <h5 className="font-semibold mt-4 mb-2">Financial Outcome for Emaar</h5>
                            <div className="space-y-1 mt-2">
                                <OutcomeRow label="Instant Capital Unlock (60% of Value)" value="AED 6,600,000" isHighlighted={true}/>
                                <OutcomeRow label="Retained Tokens for Future Sale" value="2380 DXBTOKENS"/>
                                <OutcomeRow label="Value Accrual" value="Price appreciates with each construction milestone, tracked by EBRAM™ AI."/>
                            </div>
                        </TabsContent>

                        <TabsContent value="institutional" className="p-4 border rounded-lg mt-2 bg-background text-sm">
                            <h4 className="font-semibold mb-2 text-base">Scenario 4: Institutional Investor Full Stake Acquisition</h4>
                            <p className="text-muted-foreground mb-4">An international fund acquires 92% of the tokens for Ahmed's apartment and wishes to take full physical ownership, exiting the tokenized liquidity pool.</p>
                            
                             <h5 className="font-semibold mt-4 mb-2">Process Flow</h5>
                            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                                <li><strong>Stake Threshold Detection:</strong> EBRAM™ Watcher Loop detects the fund's ≥90% stake and flags the pool for potential dismissal.</li>
                                <li><strong>MAKE_DISMISS Request:</strong> The fund initiates a `MAKE_DISMISS` request via its UNIVESTOR Wallet™.</li>
                                <li><strong>MPT & Payout:</strong> EBRAM™'s AI calculates the final Market Price Transaction (MPT). The LPO's backing funds are used to pay out any minority token holders.</li>
                                <li><strong>D-EBRAMINT™ & Title Transfer:</strong> The property is "un-tokenized" (D-EBRAMINT™), and EBRAM™'s integration with Milka's API updates the title deed, granting the fund 100% legal ownership of the physical property.</li>
                            </ol>
                        </TabsContent>
                    </Tabs>
                </ValidationSection>

                <ValidationSection 
                    icon={<ShieldCheck className="h-6 w-6" />}
                    title="Security, Audit & Compliance Framework"
                    description="A multi-layered approach to ensure the system's integrity, from smart contract code to regulatory adherence. This framework guarantees a secure, transparent, and trustworthy ecosystem."
                >
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>1. Smart Contract Auditing</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-muted-foreground">EBRAM contracts are audited using a suite of industry-leading tools. <strong>Slither</strong> and <strong>Mythril</strong> are used for static and symbolic analysis to detect vulnerabilities like reentrancy and access control flaws. <strong>Manticore</strong> is used for dynamic analysis and fuzzing to uncover complex logic bugs. All contracts must pass with zero critical vulnerabilities before deployment.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>2. API & Application Security Testing</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-muted-foreground">All external-facing APIs and the UNIVESTOR Wallet undergo rigorous penetration testing using tools like <strong>OWASP ZAP</strong> and <strong>Burp Suite</strong>. Testing focuses on preventing common web vulnerabilities such as SQL injection, Cross-Site Scripting (XSS), and authentication bypass. The goal is zero critical vulnerabilities and full protection of user data.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>3. Blockchain & Network Security</AccordionTrigger>
                            <AccordionContent>
                                <p className="text-sm text-muted-foreground">The underlying Hyperledger Fabric network is stress-tested using <strong>Hyperledger Caliper</strong> to simulate attacks like DDoS and Sybil attacks. Private channels are audited to ensure data confidentiality, and node security is scanned with tools like <strong>Nessus</strong>. The target is 100% consensus stability and zero unauthorized ledger access.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>4. Regulatory & Compliance Verification</AccordionTrigger>
                            <AccordionContent>
                               <p className="text-sm text-muted-foreground">Compliance is validated at every level. EBRAM contracts are programmatically checked against RERA rules. Investor and transaction AML/KYC checks are integrated via a direct CBUAE API. <strong>Hyperledger Explorer</strong> is used to provide a transparent, auditable trail for all regulatory reporting, ensuring 100% adherence to legal frameworks.</p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ValidationSection>
            </div>
        </ScrollArea>
    </div>
  );
}
