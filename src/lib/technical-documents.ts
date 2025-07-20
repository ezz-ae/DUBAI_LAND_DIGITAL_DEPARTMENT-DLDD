




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

export type ContentItem = CodeContent | TextContent | ListContent;

export interface BookArticle {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface BookChapter {
  id: string;
  title: string;
  articles: BookArticle[];
}

export interface BookPart {
  id: string;
  title: string;
  chapters: BookChapter[];
}

export interface BookAppendix {
    id: string;
    title: string;
    content: ContentItem[];
}

export interface BookConclusion {
    id: string;
    title: string;
    content: ContentItem[];
}

export interface TechnicalBook {
    title: string;
    subtitle: string;
    preparedFor: string;
    preparedBy: string;
    date: string;
    introduction: {
        id: string;
        title: string;
        content: ContentItem[];
    };
    parts: BookPart[];
    conclusion: BookConclusion;
    appendices: BookAppendix[];
}

export const technicalBook: TechnicalBook = {
    title: "DLDCHAIN: The Architectural Governance Protocol for Dubai's Real Estate Future",
    subtitle: "A Comprehensive Technical Analysis",
    preparedFor: "Dubai Land Department (DLD) and Strategic Partners",
    preparedBy: "Mahmoud Ezz, Dubai Resident | Real Estate Specialist | Technology Architect",
    date: "Q4 2025 – Dubai, UAE",
    introduction: {
        id: 'book-introduction',
        title: "Book Conclusion: Realizing the Future of Real Estate Governance",
        content: [
            {
                type: 'paragraph',
                text: "The DLDCHAIN project represents a profound leap forward in the evolution of real estate governance, transitioning from fragmented, manual processes to a unified, intelligent, and sovereign digital ecosystem. As detailed throughout this technical analysis, DLDCHAIN is not merely a technological upgrade but a strategic transformation that embodies Dubai's vision for a future-ready, data-driven city."
            },
            {
                type: 'paragraph',
                text: "Through its meticulously designed core pillars—EBRAM's legal-programmable smart contracts, DXBTOKENS' value-based tokenization, MAKE's sovereign liquidity and escrow, Mashroi's AI-powered professional hub, and the UNIVESTOR Wallet's universal interface—DLDCHAIN addresses the most critical challenges facing global real estate: illiquidity, lack of transparency, and operational inefficiencies. Its deep integration with existing governmental systems, particularly those of the Dubai Land Department, ensures legal continuity and regulatory compliance, while its robust cryptographic foundation guarantees unparalleled security and trust."
            },
            {
                type: 'paragraph',
                text: "The detailed simulations for mortgaged and off-plan properties unequivocally demonstrate DLDCHAIN's capacity to unlock significant trapped value, provide unprecedented liquidity, and generate substantial economic opportunities for all stakeholders—from property owners and investors to brokers, financial institutions, and the government itself. Furthermore, the explicit architectural design for global white-labeling and cross-chain interoperability positions DLDCHAIN as a pioneering blueprint, capable of setting international standards for digital real estate governance."
            },
            {
                type: 'paragraph',
                text: "In essence, DLDCHAIN is a testament to the transformative power of purposeful innovation. It is an organically evolving system, continuously learning and adapting, designed to serve the nation and lead the global community by example. Dubai, through DLDCHAIN, is not just building a smart city; it is coding the future of real estate governance for the world."
            }
        ]
    },
    parts: [
        {
            id: 'part-1',
            title: "Part I: The Strategic Vision",
            chapters: [
                {
                    id: 'chapter-1',
                    title: "Chapter 1: From Registry to Operating System",
                    articles: [
                        { id: 'article-1-1', title: 'Article 1.1: The Vision of "City as Code"', content: [] },
                        { id: 'article-1-2', title: 'Article 1.2: Dubai Land Department as Chain Governor - Core Role', content: [] },
                        { id: 'article-1-3', title: 'Article 1.3: Cross-Entity Integration & Elimination of Legacy Silos', content: [] }
                    ]
                },
                {
                    id: 'chapter-2',
                    title: "Chapter 2: Project Foundational Principles & Core Components Overview",
                    articles: [
                        { id: 'article-2-1', title: 'Article 2.1: DLD Digital Dirham (DLD-AED) - Overview & Purpose', content: [] },
                        { id: 'article-2-2', title: 'Article 2.2: DLD Digital Dirham (DLD-AED) - Mechanism & Stability', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: Core Protocol Pillars",
            chapters: [
                {
                    id: 'chapter-3',
                    title: "Chapter 3: EBRAM – The Legal-Programmable Language of Property Law",
                    articles: [
                        { id: 'article-3-1', title: 'Article 3.1: EBRAM - Overview & Dual Language Infrastructure', content: [] },
                        { id: 'article-3-2', title: 'Article 3.2: EBRAM - Language Syntax & Logic Trees', content: [] },
                        { id: 'article-3-3', title: 'Article 3.3: EBRAM - Key Integrations & Process Flow', content: [] },
                        { id: 'article-3-4', title: 'Article 3.4: EBRAM - Smart Pricing Technology', content: [] }
                    ]
                },
                {
                    id: 'chapter-4',
                    title: "Chapter 4: EBRAMGPT – The AI-Powered Legal Advisor on the Chain",
                    articles: [
                        { id: 'article-4-1', title: 'Article 4.1: EBRAMGPT - Overview & Role as AI Legal Advisor', content: [] },
                        { id: 'article-4-2', title: 'Article 4.2: EBRAMGPT - Key Functionalities', content: [] },
                        { id: 'article-4-3', title: 'Article 4.3: EBRAMGPT - Real-Time Connected Systems & Impact (including EBRAM ML NOTES™)', content: [] }
                    ]
                },
                {
                    id: 'chapter-5',
                    title: "Chapter 5: DXBTOKENS – The New Value System in Real Estate",
                    articles: [
                        { id: 'article-5-1', title: 'Article 5.1: DXBTOKENS - Overview & Value-Based Tokenization', content: [] },
                        { id: 'article-5-2', title: 'Article 5.2: DXBTOKENS - Full Lifecycle & Market Trading', content: [] }
                    ]
                },
                {
                    id: 'chapter-6',
                    title: "Chapter 6: The MAKE System – Sovereign Liquidity & Escrow Backbone",
                    articles: [
                        { id: 'article-6-1', title: 'Article 6.1: The MAKE System - Overview & Purpose', content: [] },
                        { id: 'article-6-2', title: 'Article 6.2: The MAKE System - Lifecycle of Liquidity & Revenue Model', content: [] },
                        { id: 'article-6-3', title: 'Article 6.3: The MAKE System - Security & Governance', content: [] },
                        { id: 'article-6-4', title: 'Article 6.4: MAKE & EBRAM: Synergy of Liquidity and Legal Backbone', content: [] }
                    ]
                },
                {
                    id: 'chapter-7',
                    title: "Chapter 7: Mashroi – The Nation's Real Estate Intelligence Grid",
                    articles: [
                        { id: 'article-7-1', title: 'Article 7.1: Mashroi - Overview & Core Identity', content: [] },
                        { id: 'article-7-2', title: 'Article 7.2: Mashroi - Key Functionalities & Services for Brokers', content: [] },
                        { id: 'article-7-3', title: 'Article 7.3: Mashroi - Performance Governance & AI-Powered Intelligence', content: [] }
                    ]
                },
                {
                    id: 'chapter-8',
                    title: "Chapter 8: The UNIVESTOR Wallet – One Wallet, Multiple Roles",
                    articles: [
                        { id: 'article-8-1', title: 'Article 8.1: The UNIVESTOR Wallet - Overview & Tiered Access', content: [] },
                        { id: 'article-8-2', title: 'Article 8.2: The UNIVESTOR Wallet - Role in Trading & Functionalities', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Technical Architecture & Implementation Deep Dive",
            chapters: [
                {
                    id: 'chapter-9',
                    title: "Chapter 9: Core Blockchain Architecture: Hyperledger Fabric under Sovereign Oversight",
                    articles: [
                        { id: 'article-9-1', title: 'Article 9.1: Hyperledger Fabric in DLDCHAIN: Enterprise-Grade Blockchain for Real Estate Governance', content: [] }
                    ]
                },
                {
                    id: 'chapter-10',
                    title: "Chapter 10: Technical Plan for DLDCHAIN Development (Roadmap Alignment)",
                    articles: [
                        { id: 'article-10-1', title: 'Article 10.1: System Architecture Overview', content: [] },
                        { id: 'article-10-2', title: 'Article 10.2: Mocking Up Key Elements (UNIVESTOR Wallet, EBRAMGPT, Mashroi, DXBTOKEN Marketplace)', content: [] },
                        { id: 'article-10-3', title: 'Article 10.3: EBRAM Smart Contract Development (Technology Stack, Structure, Workflow)', content: [] },
                        { id: 'article-10-4', title: 'Article 10.4: Phased Technical Development Plan (Phases 1-4)', content: [] },
                        { id: 'article-10-5', title: 'Article 10.5: Tools and Technologies Overview', content: [] }
                    ]
                },
                {
                    id: 'chapter-11',
                    title: "Chapter 11: DLDCHAIN Technical Map: Detailed Architectural Overview",
                    articles: [
                        { id: 'article-11-1', title: 'Article 11.1: Core Components (Detailed Breakdown: Fabric, EBRAM, EBRAMGPT, DLD-AED, DXBTOKENS, Mashroi, UNIVESTOR Wallet)', content: [] },
                        { id: 'article-11-2', title: 'Article 11.2: External Integrations', content: [] },
                        { id: 'article-11-3', title: 'Article 11.3: Data Flow (Property Lifecycle, User Interaction, Regulatory Oversight)', content: [] },
                        { id: 'article-11-4', title: 'Article 11.4: Security Framework', content: [] }
                    ]
                },
                {
                    id: 'chapter-12',
                    title: "Chapter 12: DLDCHAIN Smart Contract (Python Chaincode for Hyperledger Fabric)",
                    articles: [
                        { id: 'article-12-1', title: 'Article 12.1: Contract Overview & Code Implementation (DLDCHAINPropertyTokenization)', content: [] },
                        { id: 'article-12-2', title: 'Article 12.2: Contract Explanation & Security Features', content: [] },
                        { id: 'article-12-3', title: 'Article 12.3: Auditability & Compliance Measures', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-4',
            title: "Part IV: Economic Models, Security, and Governance Framework",
            chapters: [
                {
                    id: 'chapter-13',
                    title: "Chapter 13: Economic Models and Revenue Channels",
                    articles: [
                        { id: 'article-13-1', title: 'Article 13.1: Economic Models and Revenue Channels Overview', content: [] },
                        { id: 'article-13-2', title: 'Article 13.2: Key Revenue Streams', content: [] },
                        { id: 'article-13-3', title: 'Article 13.3: Strategic Alignment & Global Support', content: [] }
                    ]
                },
                {
                    id: 'chapter-14',
                    title: "Chapter 14: Automation & Reporting Engine",
                    articles: [
                        { id: 'article-14-1', title: 'Article 14.1: Overview & Data Contribution', content: [] },
                        { id: 'article-14-2', title: 'Article 14.2: Market Analytics & Fraud Prevention', content: [] },
                        { id: 'article-14-3', title: 'Article 14.3: Automated Compliance (RegTech)', content: [] }
                    ]
                },
                {
                    id: 'chapter-15',
                    title: "Chapter 15: Compliance, Risk Management, and Dispute Resolution",
                    articles: [
                        { id: 'article-15-1', title: 'Article 15.1: EBRAM Veracity Commons: Building Reputation and Trust', content: [] },
                        { id: 'article-15-2', title: 'Article 15.2: Cryptographic Foundation and Security - Overview', content: [] },
                        { id: 'article-15-3', title: 'Article 15.3: Cryptographic Foundation - Advanced Security Features', content: [] }
                    ]
                },
                 {
                    id: 'chapter-16',
                    title: "Chapter 16: Comprehensive Governmental Integration",
                    articles: [
                        { id: 'article-16-1', title: 'Article 16.1: Comprehensive Governmental Integration Overview', content: [] },
                        { id: 'article-16-2', title: 'Article 16.2: Industry Level - Stakeholder Integration and Data Flow', content: [] },
                    ]
                },
            ]
        },
        {
            id: 'part-5',
            title: "Part V: Global Vision, Impact, and Outlook",
            chapters: [
                { id: 'chapter-17', title: "Chapter 17: DLDCHAIN: Opening Doors for Talent & Innovation", articles: [] },
                { id: 'chapter-18', title: "Chapter 18: DLDCHAIN & Banks: Modernizing Mortgage Operations", articles: [] },
                { id: 'chapter-19', title: "Chapter 19: Tokenizing a Mortgaged Property on DLDCHAIN: The World's First Seamless Solution (Simulation & Flowchart)", articles: [] },
                { id: 'chapter-20', title: "Chapter 20: Tokenizing Off-Plan Property on DLDCHAIN: Unlocking Future Value Today (Simulation & Flowchart)", articles: [] },
                { id: 'chapter-21', title: "Chapter 21: DLDCHAIN's Market Making System: Dynamics of Gains and Value Creation (Simulation & Flowchart)", articles: [] },
                { id: 'chapter-22', title: "Chapter 22: DLDCHAIN & Brokers: Unlocking New Income through Tokenization", articles: [] },
                { id: 'chapter-23', title: '"Connecting, Not Replacing": DLDCHAIN\'s Integration Philosophy', articles: [] },
                {
                    id: 'chapter-24',
                    title: "Chapter 24: Global Export Framework - The Sovereign Model for Cities Worldwide",
                    articles: [
                        { id: 'article-24-1', title: 'Article 24.1: Sovereign Model for Cities Worldwide', content: [] },
                        { id: 'article-24-2', title: 'Article 24.2: Challenges & Nuances for Export', content: [] }
                    ]
                },
                { id: 'chapter-25', title: 'Chapter 25: Implementation Roadmap - Phased Rollout', articles: [] },
                { id: 'chapter-26', title: 'Chapter 26: External Evaluation and Technical Endorsement: ChatGPT Certificate for DLDCHAIN Project', articles: [] },
            ]
        }
    ],
    conclusion: {
        id: 'book-conclusion-main',
        title: 'Book Conclusion: Realizing the Future of Real Estate Governance',
        content: []
    },
    appendices: [
        { id: 'appendix-a', title: 'Appendix A: DLDCHAIN Property Tokenization Smart Contract (Full Code)', content: [] },
        { id: 'appendix-b', title: 'Appendix B: DLDCHAIN MAKE Escrow Solidity Contract (Full Code)', content: [] },
        { id: 'appendix-c', title: 'Appendix C: DLDCHAIN Technical Map: Architectural Overview (Visualization)', content: [] },
        { id: 'appendix-d', title: 'Appendix D: DLDCHAIN Escrow Logic: MAKE System (Flowchart)', content: [] },
        { id: 'appendix-e', title: 'Appendix E: EBRAM Workflow in DLDCHAIN (Flowchart)', content: [] },
        { id: 'appendix-f', title: 'Appendix F: EBRAMGPT Workflow in DLDCHAIN (Flowchart)', content: [] },
        { id: 'appendix-g', title: 'Appendix G: Mashroi Workflow in DLDCHAIN (Flowchart)', content: [] },
        { id: 'appendix-h', title: 'Appendix H: Liquidity Cycle for DXBTOKENS (Flowchart)', content: [] },
        { id: 'appendix-i', title: 'Appendix I: Mortgaged Villa Liquidity Cycle (Flowchart)', content: [] },
        { id: 'appendix-j', title: 'Appendix J: Off-Plan Liquidity Cycle (Flowchart)', content: [] },
        { id: 'appendix-k', title: 'Appendix K: Projected Revenue Growth (2025–2030) (Chart)', content: [] },
        { id: 'appendix-l', title: 'Appendix L: Projected Global Revenue Growth (2025–2030) (Chart)', content: [] },
        { id: 'appendix-m', title: 'Appendix M: Security Testing Workflow (Flowchart)', content: [] },
        { id: 'appendix-n', title: 'Appendix N: Smart Contract Auditing Workflow (Flowchart)', content: [] },
    ]
};
