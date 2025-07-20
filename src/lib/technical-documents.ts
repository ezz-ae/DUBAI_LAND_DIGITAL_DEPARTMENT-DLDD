
interface CodeContent {
    type: 'code';
    language: string;
    text: string;
}

interface TextContent {
    type: 'paragraph' | 'heading' | 'subheading';
    text: string;
}

interface ListContent {
    type: 'list';
    items: string[];
}

type ContentItem = CodeContent | TextContent | ListContent;

interface TechnicalDocument {
  id: number;
  name: string;
  summary: string;
  content: ContentItem[];
}

export const technicalDocuments: TechnicalDocument[] = [
    {
        id: 1,
        name: "DLDCHAIN's Market Making System",
        summary: "An explanation of the dynamics of gains and value creation within the DLDCHAIN Market Making System.",
        content: [
            {
                type: 'heading',
                text: "Core Principles of the Market Making System"
            },
            {
                type: 'list',
                items: [
                    '<strong>Guaranteed Liquidity:</strong> Through the MAKE protocol, tokenized properties receive 100% AED liquidity backing upfront, eliminating the traditional illiquidity of real estate.',
                    '<strong>Ebram\'s AI Market-Making Logic:</strong> Ebram\'s sophisticated AI continuously analyzes real-time market data, transaction volumes, demand patterns, and asset-specific attributes to dynamically adjust DXBTOKEN prices, ensuring fair valuation and preventing speculative bubbles or manipulation.',
                    '<strong>Separation of Ownership and Liquidity Provision:</strong> The fundamental principle <code>MAKE =/= OWN | OWNER =/= TOKENIZE</code> ensures that providing liquidity does not confer ownership of the underlying asset unless specific conditions (like pool takeover) are met, creating clear roles and incentives.'
                ]
            },
            {
                type: 'heading',
                text: "Who Wins, Who Doesn't, and How?"
            },
            {
                type: 'paragraph',
                text: "The DLDCHAIN's market-making system creates a win-win scenario for the primary stakeholders, designed to align incentives and foster a healthy, active market."
            },
            {
                type: 'subheading',
                text: '1. The Property Owner (Seller): "Win Big"'
            },
            {
                type: 'list',
                items: [
                    '<strong>Instant Liquidity & Full Value Realization:</strong> When an owner tokenizes their property, the MAKE system ensures they receive 60% of the property\'s appraised value as immediate cash liquidity (or DLD-AED tokens). This means the owner is "fully paid" almost instantly, without waiting for a buyer to emerge on the open market.',
                    '<strong>Retained Upside (40% DXBTOKENS):</strong> The remaining 40% of the property\'s value is allocated to the owner as tradable DXBTOKENS. This allows them to benefit from any future market appreciation of their property. They\'ve realized significant immediate capital while retaining exposure to potential growth.',
                    '<strong>Seamless Exit:</strong> The process of converting an illiquid asset into cash and liquid tokens is significantly streamlined, offering a faster and more efficient exit strategy than traditional sales.'
                ]
            },
             {
                type: 'subheading',
                text: '2. The Liquidity Provider (MAKE Officer / Investor): "Guaranteed & Market Gains"'
            },
            {
                type: 'list',
                items: [
                    '<strong>Guaranteed Fixed Profit:</strong> The system explicitly guarantees the liquidity provider (e.g., banks, institutional funds, or small investor liquidity pools) a fixed profit equivalent to 2% of the property\'s price. This is a de-risked, predictable return for providing initial liquidity.',
                    '<strong>Market Gains from Tokens:</strong> In addition to the fixed profit, liquidity providers also benefit from the market appreciation of the DXBTOKENS within the dedicated fund. As these tokens are sold on the trading platform, any increase in their market value (driven by Ebram\'s smart pricing and demand) accrues to the liquidity pool, providing additional revenue until the pre-funded amount is recovered.',
                    '<strong>Controlled Risk:</strong> All MAKE contracts are "air-gapped" and isolated from volatile DeFi protocols, ensuring the core financial mechanisms remain stable and secure. Their participation is underpinned by robust cryptographic validation and DLD oversight.'
                ]
            },
             {
                type: 'subheading',
                text: '3. The DXBTOKEN Buyer/Investor (on the Marketplace): "Accessible & Liquid Ownership"'
            },
            {
                type: 'list',
                items: [
                    '<strong>Fractional & Accessible Ownership:</strong> Buyers can acquire small, affordable shares of high-value properties (e.g., 1 Token = 1 sq. ft.), democratizing real estate investment.',
                    '<strong>Instant Liquidity (for future resale):</strong> The continuous operation of the Market Making System ensures that DXBTOKENS are tradable within minutes, providing liquidity that is rare in traditional real estate.',
                    '<strong>Transparent Valuation:</strong> Prices are determined by Ebram\'s AI market-making logic, ensuring fair and dynamic valuations based on comprehensive data, reducing information asymmetry.'
                ]
            }
        ]
    }
];
