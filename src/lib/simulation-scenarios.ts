
import React from 'react';
import { cn } from '@/lib/utils';


const FinancialSummaryRow = ({ label, value, isHighlighted = false, isMuted = false }: { label: string, value: string, isHighlighted?: boolean, isMuted?: boolean }) => (
    React.createElement('div', {
        className: cn(
            "flex justify-between items-center py-2 border-b last:border-b-0",
            isHighlighted && 'font-bold text-primary bg-primary/5 p-2 rounded-md',
            !isHighlighted && 'text-muted-foreground'
        )
    },
    React.createElement('span', { className: cn(isHighlighted && 'text-primary', isMuted && 'text-xs') }, label),
    React.createElement('span', { className: cn(isHighlighted ? 'text-primary' : 'text-foreground font-medium', isMuted && 'text-xs') }, value))
);

export const scenarios = [
    {
        id: 'scenario-1',
        title: "Individual Owner Tokenization",
        icon: 'apartment',
        description: "An individual property owner wants to unlock liquidity from their fully-paid apartment in Downtown Dubai without selling it entirely.",
        context: React.createElement('p', {}, "An individual owns a 2-bedroom apartment valued at AED 2.5M. The property is currently vacant and fully paid off. The owner wants to access capital for another investment but wishes to retain a stake in their property, anticipating future appreciation."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'}, 
            React.createElement('li', {}, React.createElement('b', {}, "EBRAMINT™:"), " The foundational process to create the property's unique digital identity (CDID) on-chain."),
            React.createElement('li', {}, React.createElement('b', {}, "Mashroi™ Broker:"), " A licensed broker facilitates the process, ensuring compliance (e.g., DEWA disconnection)."),
            React.createElement('li', {}, React.createElement('b', {}, "MAKE™ System:"), " The sovereign liquidity pool that guarantees 100% AED backing for the tokenization."),
            React.createElement('li', {}, React.createElement('b', {}, "DXBTOKENS™:"), " The creation of fractional ownership tokens (1 sqft = 1 token)."),
            React.createElement('li', {}, React.createElement('b', {}, "UNIVESTOR Wallet™:"), " The owner's secure wallet for receiving funds and managing their token stake.")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'}, 
            React.createElement('li', {}, React.createElement('b', {}, "Initiation:"), " The owner initiates a tokenization request via their UNIVESTOR Wallet™. DLDCHAIN™ assigns a Mashroi™-verified broker."),
            React.createElement('li', {}, React.createElement('b', {}, "Compliance & EBRAMINT™:"), " The broker ensures the property is vacant and utility-free. The property undergoes the EBRAMINT™ process, creating its immutable on-chain identity."),
            React.createElement('li', {}, React.createElement('b', {}, "MAKE™ Event (MAKELIST & MAKETRADE):"), " The EBRAMINTED™ asset is listed on the MAKE™ System. A Liquidity Pool Officer (LPO) expresses interest."),
            React.createElement('li', {}, React.createElement('b', {}, "Liquidity Lock (MAKE_ID):"), " The LPO deposits the full AED 2.5M value into the secure pool. EBRAM™ executes the MAKE_ID event, locking the liquidity and registering the token ID."),
            React.createElement('li', {}, React.createElement('b', {}, "Token Distribution (MAKE_IN):"), " The system automatically executes the 60/40 split. The owner instantly receives AED 1.5M (60%) in their UNIVESTOR Wallet™. The remaining AED 1M (40%) is converted into DXBTOKENS™, which are also deposited into the owner's wallet. The LPO now acts as the custodian for the property's liquidity.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'}, 
            React.createElement(FinancialSummaryRow, { label: "Property Valuation", value: "AED 2,500,000" }),
            React.createElement(FinancialSummaryRow, { label: "Liquidity Unlocked (60%)", value: "AED 1,500,000", isHighlighted: true }),
            React.createElement(FinancialSummaryRow, { label: "Owner's Retained Stake (40%)", value: "AED 1,000,000" }),
            React.createElement(FinancialSummaryRow, { label: "Broker Commission (1% of total)", value: "AED 25,000", isMuted: true }),
            React.createElement(FinancialSummaryRow, { label: "Net Cash to Owner", value: "AED 1,475,000", isHighlighted: true })
        )
    },
    {
        id: 'scenario-2',
        title: "Developer Off-Plan Project",
        icon: 'commercial',
        description: "A major developer seeks to raise capital for a new residential tower by tokenizing a selection of off-plan units.",
        context: React.createElement('p', {}, "A DLD-approved developer is launching a new 50-story tower. They want to tokenize 20% of the residential units to accelerate early-stage funding and gauge market interest. The total value of the tokenized units is AED 100M."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'}, 
            React.createElement('li', {}, React.createElement('b', {}, "Developer Dashboard:"), " The primary interface for initiating and managing bulk tokenization."),
            React.createElement('li', {}, React.createElement('b', {}, "EBRAM™ Bulk Processing:"), " Efficiently creates smart contracts for multiple units simultaneously."),
            React.createElement('li', {}, React.createElement('b', {}, "AI-Weighted Node System:"), " EBRAM™'s AI assesses the project's 'golden opportunity' status based on handover proximity, positively influencing its valuation."),
            React.createElement('li', {}, React.createElement('b', {}, "Secondary Market:"), " The developer's DXBTOKENS™ can be sold to initial investors on a DLD-approved secondary market.")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'}, 
            React.createElement('li', {}, React.createElement('b', {}, "Submission:"), " The developer submits the tokenization request for the 20% unit selection via their official DLDCHAIN™ dashboard."),
            React.createElement('li', {}, React.createElement('b', {}, "Automated Vetting:"), " EBRAM™ and its AI engine automatically verify the developer's credentials, project plans, and escrow compliance against DLD and RERA records."),
            React.createElement('li', {}, React.createElement('b', {}, "Bulk EBRAMINT™:"), " Upon approval, the system performs a bulk EBRAMINT™ process, creating unique CDIDs for all selected off-plan units."),
            React.createElement('li', {}, React.createElement('b', {}, "Capital Raise:"), " The developer offers a portion of their newly minted DXBTOKENS™ in a primary offering to accredited investors, raising initial capital."),
            React.createElement('li', {}, React.createElement('b', {}, "Milestone-Based Unlocks:"), " Further token releases and liquidity can be tied to the automated verification of construction milestones recorded on-chain.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'}, 
            React.createElement(FinancialSummaryRow, { label: "Total Value of Tokenized Units", value: "AED 100,000,000" }),
            React.createElement(FinancialSummaryRow, { label: "Portion Offered in Primary Sale (e.g., 50%)", value: "AED 50,000,000" }),
            React.createElement(FinancialSummaryRow, { label: "Capital Raised from Initial Investors", value: "AED 50,000,000", isHighlighted: true }),
            React.createElement(FinancialSummaryRow, { label: "Developer's Retained Token Equity", value: "AED 50,000,000" })
        )
    }
];
