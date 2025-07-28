
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
    },
    {
        id: 'scenario-3',
        title: "Multi-Owner Villa Tokenization",
        icon: 'villa',
        description: "Three family members co-own a villa and wish to manage their shares and potential exits with legal clarity and ease.",
        context: React.createElement('p', {}, "Three siblings co-own a villa in Jumeirah valued at AED 10M. Their ownership is split 50%, 25%, and 25%. They want a clear, on-chain record of their shares and a simple mechanism for one sibling to sell their stake to the others or to an external buyer."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'},
            React.createElement('li', {}, React.createElement('b', {}, "EBRAM™ for Co-Ownership:"), " Creates a master smart contract defining the precise ownership percentages."),
            React.createElement('li', {}, React.createElement('b', {}, "Clause Voting Logic:"), " EBRAMGPT™ facilitates on-chain voting for decisions, such as approving a new co-owner."),
            React.createElement('li', {}, React.createElement('b', {}, "Auto-Split Sell:"), " A feature allowing a co-owner to easily sell their tokenized stake, with proceeds automatically distributed.")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'},
            React.createElement('li', {}, React.createElement('b', {}, "Co-Ownership EBRAMINT™:"), " A single EBRAMINT™ process is initiated, with the EBRAM™ contract specifying the 50/25/25 ownership split. DXBTOKENS™ are minted and distributed to each sibling's UNIVESTOR Wallet™ accordingly."),
            React.createElement('li', {}, React.createElement('b', {}, "Exit Scenario:"), " The sibling with a 25% stake decides to sell. They list their tokens for sale."),
            React.createElement('li', {}, React.createElement('b', {}, "Right of First Refusal:"), " The EBRAM™ contract automatically notifies the other two siblings, giving them the first right to buy the shares at the offered price."),
            React.createElement('li', {}, React.createElement('b', {}, "On-Chain Vote & Transfer:"), " The remaining siblings vote via their wallets to approve the purchase. The transaction is executed, and tokens are instantly re-allocated on-chain, with funds transferred via DLD-AED.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'},
            React.createElement(FinancialSummaryRow, { label: "Total Villa Valuation", value: "AED 10,000,000" }),
            React.createElement(FinancialSummaryRow, { label: "Value of Stake Being Sold (25%)", value: "AED 2,500,000" }),
            React.createElement(FinancialSummaryRow, { label: "Sibling 1 Ownership (Post-Sale)", value: "62.5% (or as negotiated)" }),
            React.createElement(FinancialSummaryRow, { label: "Sibling 2 Ownership (Post-Sale)", value: "37.5% (or as negotiated)" })
        )
    },
    {
        id: 'scenario-4',
        title: "Cross-Border Investment",
        icon: 'briefcase',
        description: "An international investor from Germany wants to purchase fractional ownership of a portfolio of Dubai properties.",
        context: React.createElement('p', {}, "An investor in Berlin wants to diversify their portfolio by investing EUR 100,000 into Dubai's real estate market. They want a secure, transparent, and low-friction way to buy and manage their holdings."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'},
            React.createElement('li', {}, React.createElement('b', {}, "UNIVESTOR Wallet™:"), " Provides a single, secure gateway with integrated currency conversion."),
            React.createElement('li', {}, React.createElement('b', {}, "Global Currency Support:"), " The wallet's bridging technology instantly converts EUR to the DLD-AED stablecoin."),
            React.createElement('li', {}, React.createElement('b', {}, "Programmatic KYC/AML:"), " The system enforces compliance checks programmatically, ensuring adherence to international standards."),
            React.createElement('li', {}, React.createElement('b', {}, "Digital Asset Inheritance:"), " Provides legal certainty for the investor's heirs, regardless of jurisdiction.")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'},
            React.createElement('li', {}, React.createElement('b', {}, "Onboarding:"), " The investor downloads the UNIVESTOR Wallet™ and completes the digital KYC/AML process using their German passport."),
            React.createElement('li', {}, React.createElement('b', {}, "Funding:"), " They initiate a transfer of EUR 100,000. The wallet's integrated exchange partner securely converts this to DLD-AED at competitive rates."),
            React.createElement('li', {}, React.createElement('b', {}, "Investment:"), " The investor browses the DLD-approved secondary market and purchases a portfolio of DXBTOKENS™ across several properties."),
            React.createElement('li', {}, React.createElement('b', {}, "Management:"), " They can monitor their holdings' value in real-time and sell tokens instantly, with proceeds convertible back to EUR.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'},
            React.createElement(FinancialSummaryRow, { label: "Initial Investment", value: "EUR 100,000" }),
            React.createElement(FinancialSummaryRow, { label: "Converted to DLD-AED (approx.)", value: "AED 400,000" }),
            React.createElement(FinancialSummaryRow, { label: "Transaction Fees (example)", value: "0.1%", isMuted: true }),
            React.createElement(FinancialSummaryRow, { label: "Net Investment Capital", value: "AED 399,600", isHighlighted: true })
        )
    },
     {
        id: 'scenario-5',
        title: "Land Plot Tokenization for Development",
        icon: 'land',
        description: "A developer wants to tokenize a plot of land to fund the initial architectural and approval stages before construction.",
        context: React.createElement('p', {}, "A development company owns a vacant plot of land valued at AED 50M. They want to raise AED 5M in seed capital to cover architectural designs, environmental studies, and initial DLD approvals without taking on traditional debt."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'},
            React.createElement('li', {}, React.createElement('b', {}, "Land as a Digital Asset:"), " EBRAMINT™ creates a unique CDID for the land plot, making it a verifiable and tokenizable asset on-chain."),
            React.createElement('li', {}, React.createElement('b', {}, "Developer Tokens:"), " A specific class of DXBTOKEN™ is minted, representing a future stake in the developed project."),
            React.createElement('li', {}, React.createElement('b', {}, "Milestone-Tied Contracts:"), " The smart contracts can tie token value appreciation to the successful completion of verified milestones (e.g., design approval).")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'},
            React.createElement('li', {}, React.createElement('b', {}, "Land EBRAMINT™:"), " The land plot is EBRAMINTED™, and its legal title is verified on DLDCHAIN™."),
            React.createElement('li', {}, React.createElement('b', {}, "Seed Round Tokenization:"), " The developer tokenizes 10% of the land's value (AED 5M) into 'Developer Tokens' and offers them to accredited investors."),
            React.createElement('li', {}, React.createElement('b', {}, "Investor Participation:"), " Investors purchase these tokens, providing the developer with the necessary seed capital."),
            React.createElement('li', {}, React.createElement('b', {}, "Future Conversion:"), " The EBRAM™ contract stipulates that these Developer Tokens can be converted into equity tokens of the final constructed building at a preferential rate.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'},
            React.createElement(FinancialSummaryRow, { label: "Land Valuation", value: "AED 50,000,000" }),
            React.createElement(FinancialSummaryRow, { label: "Portion Tokenized for Seed Round", value: "10%" }),
            React.createElement(FinancialSummaryRow, { label: "Seed Capital Raised", value: "AED 5,000,000", isHighlighted: true }),
            React.createElement(FinancialSummaryRow, { label: "Developer's Retained Land Equity", value: "90% (AED 45,000,000)" })
        )
    },
    {
        id: 'scenario-6',
        title: "Automated Inheritance Scenario",
        icon: 'villa',
        description: "Demonstrating the secure and automated transfer of tokenized assets upon the death of an owner.",
        context: React.createElement('p', {}, "An investor holding DXBTOKENS™ worth AED 1.2M passes away. They had previously used the UNIVESTOR Wallet™ to designate their legal heirs according to a notarized digital will stored on-chain."),
        features: React.createElement('ul', {className: 'list-disc pl-5 space-y-1'},
            React.createElement('li', {}, React.createElement('b', {}, "Digital Asset Inheritance Protocol:"), " A legally robust protocol within EBRAM™ that acts as a 'digital executor'."),
            React.createElement('li', {}, React.createElement('b', {}, "Integration with MoJ:"), " DLDCHAIN™ securely integrates with the Ministry of Justice to receive a verified digital death certificate."),
            React.createElement('li', {}, React.createElement('b', {}, "Automated, Rule-Based Distribution:"), " The smart contract programmatically executes the distribution based on the pre-defined will.")
        ),
        steps: React.createElement('ol', {className: 'list-decimal pl-5 space-y-2'},
            React.createElement('li', {}, React.createElement('b', {}, "Trigger Event:"), " DLDCHAIN™ receives a cryptographically signed notification from the Ministry of Justice, confirming the owner's death."),
            React.createElement('li', {}, React.createElement('b', {}, "Contract Execution:"), " The EBRAM™ inheritance contract is automatically triggered. It freezes the deceased's wallet to prevent unauthorized access."),
            React.createElement('li', {}, React.createElement('b', {}, "Verification of Heirs:"), " The contract verifies the identities of the designated heirs against their own KYC-verified UNIVESTOR Wallets™."),
            React.createElement('li', {}, React.createElement('b', {}, "Asset Distribution:"), " The DXBTOKENS™ are automatically and instantly transferred to the heirs' wallets according to the percentages specified in the digital will. The entire process is completed in minutes.")
        ),
        summary: React.createElement('div', {className: 'space-y-2'},
            React.createElement(FinancialSummaryRow, { label: "Value of Tokenized Assets", value: "AED 1,200,000" }),
            React.createElement(FinancialSummaryRow, { label: "Heir 1 (Spouse, 50%) Receives", value: "AED 600,000" }),
            React.createElement(FinancialSummaryRow, { label: "Heir 2 (Child 1, 25%) Receives", value: "AED 300,000" }),
            React.createElement(FinancialSummaryRow, { label: "Heir 3 (Child 2, 25%) Receives", value: "AED 300,000" }),
            React.createElement(FinancialSummaryRow, { label: "Time to Settlement", value: "Minutes", isHighlighted: true })
        )
    }
];
