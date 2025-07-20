






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
    introduction: {
        id: 'book-introduction',
        title: "Driving Digital Sovereignty in Real Estate",
        content: [
             {
                type: 'paragraph',
                text: "This technical analysis book provides a comprehensive and in-depth examination of DLDCHAIN, the groundbreaking blockchain-based real estate governance system pioneered by the Dubai Land Department (DLD). In an era defined by rapid digital transformation and the increasing demand for transparency and efficiency in global markets, DLDCHAIN stands as a visionary solution, meticulously engineered to address the inherent complexities and traditional limitations of the real estate sector."
            },
            {
                type: 'paragraph',
                text: "DLDCHAIN transcends conventional property registries, evolving into a real-time operating system that seamlessly integrates legal, financial, and operational frameworks into a sovereign digital infrastructure. This document systematically dissects each component of the DLDCHAIN ecosystem – including EBRAM, DXBTOKENS, MAKE, Mashroi, and the UNIVESTOR Wallet – detailing their purpose, functionality, technical architecture, and synergistic interactions."
            },
            {
                type: 'paragraph',
                text: "Drawing upon extensive research, detailed simulations (including real-world scenarios for mortgaged and off-plan properties), and a deep understanding of Dubai's unique regulatory and economic landscape, this analysis demonstrates DLDCHAIN's unprecedented capabilities in unlocking liquidity, ensuring immutable trust, streamlining compliance, and fostering new economic opportunities. Furthermore, it highlights Dubai's strategic intent to position DLDCHAIN as a global blueprint for digital real estate governance, offering a model of efficiency and security to cities worldwide."
            },
            {
                type: 'paragraph',
                text: "This book is designed for policymakers, governmental agencies, financial institutions, technology developers, and industry stakeholders seeking a thorough understanding of DLDCHAIN's innovative design and its transformative potential for the future of real estate."
            }
        ]
    },
    parts: [
        {
            id: 'part-1',
            title: "Part I: The Strategic Vision – Dubai's Sovereign Real Estate Future",
            chapters: [
                {
                    id: 'chapter-1',
                    title: "Chapter 1: From Registry to Operating System",
                    articles: [
                        { 
                            id: 'article-1-1', 
                            title: 'Article 1.1: The Vision of "City as Code"', 
                            content: [
                                {
                                    type: 'paragraph',
                                    text: "DLDCHAIN is not merely a product; it represents a fundamentally new paradigm for managing real estate. It does more than digitize property; it governs the entire lifecycle under Dubai’s sovereign authority, operating continuously in real time. In a global environment where cities operate like startups and nations are increasingly data-driven, real estate transcends its traditional identity as mere land. It is evolving into a programmable asset. Dubai is positioned to inaugurate the world's first city-state to implement an autonomous real estate layer, which shall be demonstrably on-chain, legally binding, and economically extensible. This inherent capacity for programmability within the asset class facilitates the direct encoding of complex legal stipulations, financial conditions, and transactional sequences into the digital representation of property, thereby enabling self-executing agreements and automated compliance. For instance, a property could be programmed to automatically transfer ownership upon the fulfillment of specific payment conditions, or to release rental income to a designated account only after verified occupancy. This level of granular control and automation represents a significant departure from traditional, manually intensive processes."
                                },
                                {
                                    type: 'paragraph',
                                    text: 'The "City as Code" paradigm effectuates a profound metamorphosis within Dubai\'s real estate sector, converting it into a dynamic, digital matrix of verified veracity. Each parcel of land, every vertical structure, every residential villa, or individual unit shall be ascribed a sovereign digital identity. This digital identity, a unique and immutable identifier on the blockchain, will encapsulate all pertinent information related to the property, including its legal state, economic function, and contractual obligations, which shall be immutably encoded upon the blockchain. This process is designed to obviate the abstractions and mitigate the temporal delays that have historically encumbered traditional real estate transactions, such as manual title searches or multi-party document verification. The urban landscape shall manifest as a discernible system of codified urban logic—quantified, comprehended, and perpetually safeguarded. Legal frameworks shall transmute into software, procedural operations into automation, and the real estate substratum of Dubai shall achieve a state of sovereignty, self-verification, and borderless scalability. This transformation implies that regulatory provisions and legal precedents can be directly translated into executable code, ensuring consistent application and minimizing subjective interpretation across all transactions. The inherent self-verifying nature of the blockchain, complemented by governmental oversight, is anticipated to establish an unprecedented level of trust and operational efficiency across the entire property lifecycle, from initial registration to eventual transfer or fractional ownership. Furthermore, the concept of "borderless scalability" suggests that this codified urban logic could, in principle, be adapted and replicated in other jurisdictions, positioning Dubai as a global leader in digital governance frameworks.'
                                }
                            ] 
                        },
                        { 
                            id: 'article-1-2', 
                            title: 'Article 1.2: Dubai Land Department as Chain Governor - Core Role', 
                            content: [
                                {
                                    type: 'paragraph',
                                    text: "The Dubai Land Department (DLD) functions as the preeminent sovereign anchor of DLDCHAIN. Its role extends beyond that of a mere regulatory body; it assumes the critical function of the ultimate authoritative node, directly overseeing the network and ensuring unparalleled adherence to regulatory mandates and comprehensive control. This represents a strategic reorientation for Dubai, whereby the DLD shall assume the mantle of sovereign operator of its foundational digital real estate infrastructure, thereby diminishing reliance upon external platforms or third-party intermediaries. Such direct governmental oversight is deemed indispensable for the establishment of trust and the rigorous enforcement of compliance within real estate applications, as it provides a singular, indisputable source of truth for all property-related data and transactions. The DLD's direct control over the ledger is intended to preclude the potential for external manipulation or the imposition of extraneous protocols, thereby safeguarding national interests and maintaining systemic integrity and stability within the real estate market. This ensures that the fundamental rules governing property remain under the direct purview of the state, fostering a secure and predictable environment for investors and citizens alike."
                                },
                                {
                                    type: 'paragraph',
                                    text: "DLDCHAIN has been meticulously engineered to address the specific complexities and intricate legal and transactional exigencies inherent within property transactions. This bespoke design ensures its singular suitability for the particular requirements of the real estate sector, distinguishing it from generalized public blockchain architectures that may lack the specialized functionalities or regulatory integration necessary for real estate. The architecture is optimized to accommodate the nuances of various property types, ownership structures (e.g., freehold, leasehold, fractional), and regulatory requirements unique to Dubai, aiming to ensure that the system is not merely adaptable but inherently congruent with the existing legal and administrative landscape. This deep congruence minimizes friction during implementation and maximizes the system's effectiveness in a highly regulated environment."
                                }
                            ] 
                        },
                        { 
                            id: 'article-1-3', 
                            title: 'Article 1.3: Cross-Entity Integration & Elimination of Legacy Silos', 
                            content: [
                                { type: 'heading', text: 'Cross-Entity Integration' },
                                { 
                                    type: 'paragraph', 
                                    text: 'DLDCHAIN establishes secure interconnections with a diverse array of governmental entities and industry stakeholders, thereby fostering a unified and regulated real estate ecosystem. This comprehensive integration, executed through robust API linkages and secure data exchange protocols, encompasses:' 
                                },
                                {
                                    type: 'list',
                                    items: [
                                        '<strong>GDRFA (General Directorate of Residency and Foreigners Affairs):</strong> Facilitation of visa-linked rental agreements, verification of broker identities, issuance of smart visas, and validation of investor residency status. This integration is designed to streamline immigration processes directly tied to real estate activities, enhancing compliance and efficiency by automating checks against official residency databases. For example, a rental contract could automatically trigger a visa status verification for a tenant, or a property purchase could initiate a residency application process for an investor.',
                                        '<strong>Central Bank of the UAE (CBUAE):</strong> Provision of financial system oversight, enforcement of Anti-Money Laundering (AML) and Know Your Customer (KYC) compliance protocols, and maintenance of the stability of the DLD Digital Dirham. The Central Bank\'s involvement is intended to ensure the financial integrity and regulatory adherence of all on-chain transactions, providing a critical layer of financial security and preventing illicit activities within the digital real estate economy.',
                                        '<strong>Ministry of Justice / Dubai Courts:</strong> Assurance of enforceable legal records, notarization of smart contracts, and judicial enforcement of ownership rights pertaining to tokenized assets. This direct linkage is expected to imbue smart contracts with the full force of law, enabling automated dispute resolution pathways and legally binding outcomes, thereby significantly reducing the burden on traditional court systems for routine real estate disputes.',
                                        '<strong>Municipal Planning:</strong> Management of permitting processes and compliance logs, ensuring congruence with urban development objectives. This functionality aims to allow for real-time tracking of land use, zoning regulations, and construction approvals, thereby enhancing urban planning efficiency and ensuring that all property developments adhere to city master plans and environmental regulations.',
                                        '<strong>Department of Economy & Tourism (DET):</strong> Oversight of business licensing, collection of tourism dirham, and regulation of commercial usage compliance. This integration is intended to streamline the regulatory burden for tourism-related real estate, ensuring automated fee collection and compliance monitoring for short-term rentals and other commercial property uses.'
                                    ]
                                },
                                { type: 'heading', text: 'Elimination of Legacy Silos' },
                                { 
                                    type: 'paragraph', 
                                    text: 'DLDCHAIN is designed to supersede fragmented, static, and paper-based systems with a dynamic, on-chain asset ledger. Historically, real estate transactions in many jurisdictions have been characterized by disparate databases, manual cross-verification processes, and the physical transfer of paper documents, leading to inefficiencies, data inconsistencies, and opportunities for fraud. This innovation is expected to eradicate offline verification procedures between agencies and traditional paper-based dispute resolution mechanisms, replacing them with self-executing smart contracts and immutable audit trails. The system aims to establish a continuously updated ledger of verifiable truth, characterized by its on-chain verifiability and inherent interoperability, thereby creating a shared repository of verified data among all stakeholders, resolving contradictions, and establishing transactions upon enforceable digital agreements. This systemic overhaul is projected to reduce administrative overhead, mitigate human error, and significantly diminish the incidence of disputes, thereby fostering an environment of heightened transparency and trust across the entire real estate sector. The real-time nature of the ledger means that all parties are always operating from the same, most current, and verified dataset, eliminating discrepancies that often arise from delayed or manual updates.' 
                                }
                            ] 
                        }
                    ]
                },
                {
                    id: 'chapter-2',
                    title: "Chapter 2: Project Foundational Principles & Core Components Overview",
                    articles: [
                        { 
                            id: 'article-2-1', 
                            title: 'Article 2.1: DLD Digital Dirham (DLD-AED) - Overview & Purpose', 
                            content: [
                                {
                                    type: 'paragraph',
                                    text: 'The DLD Digital Dirham (DLD-AED) functions as a cornerstone of the DLDCHAIN ecosystem, serving as its native currency and financial backbone. Its meticulously designed structure and "fiat-only approach" are deemed critical for fostering investor confidence and driving market adoption. This strategic decision aligns DLDCHAIN with traditional financial practices while leveraging the efficiencies of digital currency.'
                                },
                                {
                                    type: 'subheading',
                                    text: 'Nature and Purpose of DLD Digital Dirham (DLD-AED)'
                                },
                                {
                                    type: 'paragraph',
                                    text: 'The DLD-AED is formally defined as a stablecoin, issued and regulated by the DLD, and precisely pegged 1:1 to the UAE Dirham (AED). It serves as the exclusive currency for all transactions within the DLDCHAIN ecosystem, encompassing DXBTOKEN purchases, sales, rental payments, service fees, and commissions. This exclusivity is intended to create a controlled and predictable financial environment within the platform, minimizing currency conversion risks and streamlining financial flows. As a central bank digital currency (CBDC)-like instrument, it embodies governmental backing and oversight, distinguishing it from volatile cryptocurrencies.'
                                }
                            ] 
                        },
                        { 
                            id: 'article-2-2', 
                            title: 'Article 2.2: DLD Digital Dirham (DLD-AED) - Mechanism & Stability', 
                            content: [
                                {
                                    type: 'subheading',
                                    text: 'Mechanism of DLD-AED'
                                },
                                {
                                    type: 'paragraph',
                                    text: 'Users interact with the DLD-AED through a DLDCHAIN universal wallet. Upon deposit of fiat currency (AED or other approved currencies), it is seamlessly converted into DLD-AED within the wallet, with withdrawals effecting the reverse conversion. This seamless conversion process is designed to minimize friction for users accustomed to traditional fiat transactions. This stablecoin is collateralized by fully audited reserves held by the DLD or a designated financial partner, thereby ensuring its stability and trustworthiness. Regular, independent audits of these reserves are crucial to maintain public confidence and regulatory compliance. Wallet functionalities are tiered in accordance with the user\'s Know Your Customer (KYC) level, allowing for differentiated access and transaction limits, ensuring that financial activities are aligned with regulatory requirements and user verification status.'
                                },
                                {
                                    type: 'subheading',
                                    text: 'Stability and Fiat-Only Nature for Investor Confidence and Market Adoption'
                                },
                                {
                                    type: 'paragraph',
                                    text: 'The "fiat-only approach" constitutes a strategic decision that underpins DLDCHAIN\'s capacity to attract and reassure traditional investors. This methodology dictates that all transactions within DLDCHAIN shall be conducted exclusively in UAE Dirhams via DLD-AED, thereby deliberately precluding the use of volatile cryptocurrencies. This strategic choice is observed to yield several key benefits:'
                                },
                                {
                                    type: 'list',
                                    items: [
                                        '<strong>Mitigation of Volatility and Regulatory Ambiguity:</strong> By isolating Real World Asset (RWA) tokenization from the market fluctuations and regulatory uncertainties frequently associated with speculative cryptocurrencies, DLD-AED establishes a stable and predictable financial environment. This is deemed crucial for the seamless integration of real estate, traditionally a conservative and capital-intensive asset class, into a digital framework, thereby reducing perceived investment risks and fostering a more attractive investment climate.',
                                        '<strong>High Confidence for Traditional Investors:</strong> The exclusion of cryptocurrency-related risks, facilitated by DLD-AED, fosters an "environment of exceptionally high confidence" for traditional investors who often exhibit reservations regarding the speculative nature of cryptocurrencies. This positioning is intended to render Dubai a preferred destination for secure digital asset investment, appealing to a broader investor base that values stability and regulatory clarity over high-risk, high-reward ventures.',
                                        '<strong>Enhanced Transparency and Auditability:</strong> All transactions recorded using DLD-AED upon the DLDCHAIN are inherently auditable and transparent. This characteristic is projected to drastically reduce instances of fraud, errors, and administrative overhead, thereby positioning Dubai\'s real estate as a "beacon of innovation and trust." The immutable nature of blockchain records is intended to ensure a complete and verifiable transaction history, significantly enhancing financial oversight and accountability.',
                                        '<strong>Reduced Friction and Costs:</strong> The DLD-AED eliminates multi-currency friction and mitigates cross-border payment delays, concurrently aiming to reduce the conventional banking costs associated with real estate transactions. This enhanced efficiency is anticipated to attract a new influx of global investment and talent, streamlining financial operations and reducing barriers to entry for international participants, thereby boosting Dubai\'s competitiveness in the global real estate market.'
                                    ]
                                }
                            ] 
                        }
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: Core Protocol Pillars – Architecture and Functionality",
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

    