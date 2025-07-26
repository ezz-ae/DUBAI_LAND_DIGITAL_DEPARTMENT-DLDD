
import type { ContentItem } from '@/lib/types';

export interface BookArticle {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface BookChapter {
  id:string;
  title: string;
  introduction: ContentItem[];
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
    title: "DLDCHAIN Technical Analysis Book",
    subtitle: "Driving Digital Sovereignty in Real Estate",
    introduction: {
        id: 'book-introduction',
        title: "Introduction: A Sovereign Digital Vision",
        content: [
            {
                type: 'paragraph',
                text: "This technical analysis book provides a comprehensive and in-depth examination of DLDCHAIN™, the groundbreaking blockchain-based real estate governance system pioneered by the Dubai Land Department (DLD). In an era defined by rapid digital transformation and the increasing demand for transparency and efficiency in global markets, DLDCHAIN™ stands as a visionary solution, meticulously engineered to address the inherent complexities and traditional limitations of the real estate sector."
            },
            {
                type: 'paragraph',
                text: "DLDCHAIN™ transcends conventional property registries, evolving into a real-time operating system that seamlessly integrates legal, financial, and operational frameworks into a sovereign digital infrastructure. This document systematically dissects each component of the DLDCHAIN™ ecosystem – including <b class='text-primary'>EBRAM™</b>, <b class='text-primary'>DXBTOKENS™</b>, the <b class='text-primary'>MAKE™ System</b>, <b class='text-primary'>Mashroi™</b>, and the <b class='text-primary'>UNIVESTOR Wallet™</b> – detailing their purpose, functionality, technical architecture, and synergistic interactions."
            },
            {
                type: 'paragraph',
                text: "Drawing upon extensive research, detailed simulations, and a deep understanding of Dubai's unique regulatory and economic landscape, this analysis demonstrates DLDCHAIN™'s unprecedented capabilities in unlocking liquidity, ensuring immutable trust, streamlining compliance, and fostering new economic opportunities. Furthermore, it highlights Dubai's strategic intent to position DLDCHAIN™ as a global blueprint for digital governance in real estate, offering a model of efficiency and security to cities worldwide."
            }
        ]
    },
    parts: [
        {
            id: 'part-1',
            title: "Part I: Foundation & National Purpose",
            chapters: [
                {
                    id: 'chapter-1-1',
                    title: 'The Strategic Imperative',
                    introduction: [{type: 'paragraph', text: "Dubai's real estate sector has a long history of innovation. DLDCHAIN™ is the culmination of this journey, transforming DLD from a regulator of digital platforms to the foundational operator of the digital market itself."}],
                    articles: [
                        {
                            id: 'article-1-1-1',
                            title: 'Vision & National Alignment',
                            content: [
                                {type: 'paragraph', text: 'This initiative directly aligns with the visionary mandates of <span class="highlight">UAE Vision 2031</span>, the ambitious <span class="highlight">Dubai Economic Agenda D33</span>, and the forward-thinking <span class="highlight">Dubai Blockchain Strategy</span>. DLDCHAIN™ strategically elevates DLD\'s already globally recognized successes—such as the groundbreaking Ejari system and AI-driven advertising governance—into a unified, sovereign digital future. It is, unequivocally, <b class="text-primary">Authored by Dubai. Operated by Dubai. For the world.</b>'}
                            ]
                        },
                        {
                            id: 'article-1-1-2',
                            title: 'Solving Core Industry Challenges',
                            content: [
                                {type: 'paragraph', text: "The confluence of AI, Blockchain, and Real Estate Tokenization creates an unprecedented moment to reshape the foundation of trust in real estate. DLDCHAIN™ is engineered to instill exceptionally high confidence by directly addressing long-standing industry challenges:"},
                                {type: 'list', items: [
                                    "<b>Simplicity and Peace of Mind:</b> Streamlining complex bureaucratic processes into intuitive digital experiences within the UNIVESTOR Wallet™.",
                                    "<b>Total Control with Zero Technical Burden:</b> Empowering users with absolute control over their assets and data through intelligent, automated protocols that abstract away technical complexity.",
                                    "<b>Zero Fear, No Crypto Risks:</b> Operating exclusively with the stable, DLD-issued UAE Digital Dirham (DLD-AED), eliminating the volatility and regulatory ambiguities of speculative cryptocurrencies.",
                                    "<b>Real-time Transparency:</b> Every transaction is immutably recorded on-chain, creating a single source of truth that eradicates information asymmetry and fraud.",
                                    "<b>Powerful Profit and Revenue Channels:</b> Creating sustainable economic opportunities through streamlined fees, fractional ownership, and enhanced data monetization.",
                                    "<b>Robust Security & Legal Strength:</b> Built on enterprise-grade blockchain and governed by sovereign authority, ensuring immutable data integrity and full legal enforceability."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-1-2',
                    title: 'System Architecture Overview',
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is a meticulously designed, multi-layered digital ecosystem built to serve as the sovereign operating system for Dubai's real estate sector. Its architecture ensures robustness, scalability, security, and seamless integration with existing governmental frameworks."}],
                    articles: [
                        {
                            id: 'article-1-2-1',
                            title: 'Architectural Layers',
                            content: [
                                {type: 'paragraph', text: 'The DLDCHAIN™ architecture is structured into distinct, yet interconnected, layers:'},
                                {type: 'list', items: [
                                    "<strong>Foundational Layer (The Immutable Core):</strong> The bedrock, providing the underlying <b class='text-primary'>Hyperledger Fabric</b> blockchain infrastructure, immutable ledger, and core consensus mechanisms.",
                                    "<strong>Core Services Layer (Orchestration & Asset Management):</strong> Manages the lifecycle of real estate assets on the blockchain, including digital identity, wallet management, and escrow logic.",
                                    "<strong>Application Layer (User-Facing & Interoperability):</strong> Consists of the applications and interfaces that interact with core services, where <b class='text-primary'>EBRAM™</b>, <b class='text-primary'>DXBTOKENS™</b>, and <b class='text-primary'>Mashroi™</b> primarily reside.",
                                    "<strong>Access Layer (The Universal Wallet™):</strong> The singular, secure gateway for all user interactions within the ecosystem."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-2-2',
                            title: 'Interoperability & Integration',
                            content: [
                                {type: 'paragraph', text: 'A cornerstone of the DLDCHAIN™ philosophy is its unwavering commitment to <span class="highlight">"connect, not replace"</span> existing, successful systems within Dubai\'s governmental and real estate landscape. This approach ensures a smooth, non-disruptive transition and strategically leverages established infrastructure.'},
                                 {type: 'paragraph', text: 'DLDCHAIN™ acts as a central nexus for data exchange, integrating with critical systems like <b class="text-primary">Ejari</b> (as a read-only oracle for rental contracts), <b class="text-primary">Milka</b> (for title verification), and <b class="text-primary">Trakheesi</b> (for advertising control). This deep integration model transforms them into "Smart Verification Oracles" that feed verified, real-time data into the sovereign ledger.'},
                                {type: 'list', items: [
                                    "<b>Ministry of Justice:</b> For dispute records and judicial enforcement.",
                                    "<b>Department of Economy & Tourism (DET):</b> For licensing sync and developer risk flags.",
                                    "<b>Ministry of Interior / GDRFA:</b> For broker ID verification and investor residency checks.",
                                    "<b>UAE Central Bank / CBUAE:</b> For payment oversight and AML/CFT compliance.",
                                    "<b>DEWA/Empower:</b> For automated utility connection approvals."
                                ]}
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: Core Technologies & Protocols",
            chapters: [
                {
                    id: 'chapter-2-1',
                    title: "The Immutable Core: Hyperledger Fabric",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is meticulously built on <b class='text-primary'>Hyperledger Fabric</b>, an open-source, enterprise-grade, permissioned Distributed Ledger Technology (DLT) platform. Its architecture is uniquely suited for governmental and highly regulated industry applications due to its inherent emphasis on security, privacy, and performance."}],
                    articles: [
                        { id: 'article-2-1-1', title: 'Permissioned Network', content: [{type: 'paragraph', text: "Unlike public blockchains, Fabric is a <b class='text-primary'>permissioned network</b>. All participants (e.g., DLD, banks, licensed brokers) are known, identified, and authenticated through a robust Membership Service Provider (MSP). This is a non-negotiable requirement for government applications, where accountability, stringent regulatory compliance (KYC/AML), and trusted interactions are paramount."}]},
                        { id: 'article-2-1-2', title: 'Modular & Extensible', content: [{type: 'paragraph', text: "Fabric's core components—consensus, identity management, and ledger databases—are highly <b class='text-primary'>pluggable and interchangeable</b>. This modularity allows the DLDCHAIN™ to be precisely tailored to meet specific, evolving requirements without a complete system overhaul. It also operates <b class='text-primary'>without a native, speculative cryptocurrency</b>, which aligns perfectly with the de-risked, fiat-based approach using DLD-AED."}]},
                        { id: 'article-2-1-3', title: 'Advanced Transaction Flow & Governance', content: [
                            {type: 'paragraph', text: "Fabric employs a novel <span class='highlight'>Execute-Order-Validate</span> transaction architecture that enhances scalability and removes non-determinism. This multi-stage process adds layers of security and verification to every on-chain event."},
                            {type: 'list', items: [
                                "<strong>Channels for Data Isolation:</strong> Fabric allows for the creation of private <b class='text-primary'>Channels</b>, or isolated sub-ledgers, where only a specific set of member organizations can transact. This ensures data privacy without compromising the overall integrity of the main chain.",
                                "<strong>Private Data for Confidentiality:</strong> For even more granular privacy, <b class='text-primary'>Private Data Collections</b> allow a subset of organizations on a channel to share sensitive data peer-to-peer. The actual data is transmitted privately, with only a cryptographic hash recorded on the channel's public ledger.",
                                "<strong>Endorsement Policies for Governance:</strong> Fabric's <b class='text-primary'>Endorsement Policies</b> codify approval workflows directly at the smart contract level. A transaction can be defined to be valid only if it is digitally signed (endorsed) by a specific set of authorized organizations."
                            ]}
                        ]}
                    ]
                },
                {
                    id: 'chapter-2-2',
                    title: "The UNIVESTOR Wallet™",
                    introduction: [
                        {type: 'paragraph', text: "The UNIVESTOR Wallet™ is the singular, secure, government-issued digital identity and access point for all interactions within the DLDCHAIN™ ecosystem. It is meticulously designed to be the main and only login way, streamlining the user experience while ensuring unparalleled security and compliance. It is built for <b class='text-primary'>\"zero technical knowledge\"</b>."}
                    ],
                    articles: [
                        {
                            id: 'article-2-2-1', 
                            title: 'Unified Digital Identity',
                            content: [
                                {type: 'paragraph', text: 'The wallet provides a <span class="highlight">one wallet, one human</span> identity, supporting multi-nationality holders through robust identity verification leveraging <b class="text-primary">UAE Pass</b> data. This ensures high trust, accountability, and regulatory compliance (KYC/AML) for all interactions.'},
                            ]
                        },
                        {
                            id: 'article-2-2-2',
                            title: 'Security & Access',
                            content: [
                                {type: 'paragraph', text: "The wallet employs a <b class='text-primary'>\"No any passwords\"</b> login approach, using dynamic OTP and smart cookies for a frictionless yet highly protected user experience. Wallet functionalities and transaction limits are dynamically tiered based on the user's verified KYC level and role (investor, developer, realtor, government), minimizing cognitive load and maximizing usability."},
                            ]
                        },
                        {
                            id: 'article-2-2-3',
                            title: 'Financial Core: The Digital Dirham (DLD-AED)',
                            content: [
                                {type: 'paragraph', text: "The wallet exclusively manages the <b class='text-primary'>DLD Digital Dirham (DLD-AED)</b>, the DLD-issued stablecoin pegged 1:1 to the physical UAE Dirham. This is the cornerstone of financial stability within the ecosystem."},
                                 {type: 'list', items: [
                                    "<b>Absolute Monetary Stability:</b> Eliminates the volatility and regulatory ambiguities associated with speculative cryptocurrencies.",
                                    "<b>Instant, Near-Zero Fee Payments:</b> Guarantees efficient financial flows for all transactions, from rent payments to token trades.",
                                    "<b>Enhanced Transparency & Auditability:</b> All financial flows are transparently recorded and auditable, reinforcing financial integrity and compliance with AML/CFT standards."
                                ]}
                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Core Applications & Business Logic",
            chapters: [
                {
                    id: 'chapter-3-1',
                    title: "EBRAM™: The Legal Engine",
                    introduction: [
                        {type: 'paragraph', text: "EBRAM™ (Emirates Blockchain Real-estate Agreement Management) is the unified smart contract layer and legal-transactional programming language of DLDCHAIN™. It serves as the digital nervous system for all transactions, designed to be <b class='text-primary'>\"the law, coded and automated.\"</b>"}
                    ],
                    articles: [
                        {
                            id: 'article-3-1-1', 
                            title: 'EBRAM™ Syntax & Structure',
                            content: [
                                {type: 'paragraph', text: 'EBRAM™ uses an innovative dual-layer design to bridge the gap between legal professionals and technical implementation. This ensures legal experts can define terms in a familiar format, while the system executes them with machine precision.'},
                                {type: 'subheading', text: "Legal Logic Layer (Human-Readable)" },
                                {type: 'paragraph', text: 'This layer represents legal clauses in a structured, human-readable format. It uses core constructs like Logic (if...then), Roles (who...what), and Rights (can...until) to define contractual logic.'},
                                {type: 'subheading', text: "Python Execution Layer (Computational)" },
                                {type: 'paragraph', text: 'This layer is the underlying code that executes the logic on the blockchain. It serves as an intermediate Domain Specific Language (DSL), translating the human-readable logic into executable commands for Hyperledger Fabric.'},
                                {type: 'subheading', text: 'Example: Automated Late Rent Payment'},
                                {type: 'code', text: '# EBRAM™ Clause (Legal Logic Layer):\n# IF tenant.payment.status == late FOR > 5d AND no_response_from_owner FOR 3d THEN trigger notice_to_DLD AND pause_token_transfer = TRUE.\n\n# Python Execution Layer (Chaincode):\nif tenant.payment_overdue(days=5) and not owner.responded(within_days=3):\n    trigger_dld_notice()\n    lock_token_transfer()'}
                            ]
                        },
                        {
                            id: 'article-3-1-2',
                            title: 'EBRAMGPT™: The AI Legal Copilot',
                            content: [
                                {type: 'paragraph', text: "EBRAMGPT™ is the AI-powered Legal Copilot that serves as the natural language interface for EBRAM™. It is the <span class='highlight'>exclusive interface between humans and the machine logic of real estate law.</span>"},
                                {type: 'list', items: [
                                    "<strong>Bi-directional Language Conversion:</strong> Seamlessly translates natural language (Arabic, English, etc.) into valid EBRAM™ smart clauses and the underlying Python code, and vice-versa.",
                                    "<strong>Context-Aware Drafting:</strong> Integrates deep knowledge of Dubai's specific legal rules (e.g., Ejari timelines, RDC dispute paths) to ensure generated contracts are always compliant.",
                                    "<strong>AI Clause Suggestions & Risk Warnings:</strong> Proactively enhances contract drafting by recommending missing protections and flagging potential risks or regulatory violations.",
                                    "<strong>AI-Coordinated Group Negotiations:</strong> Facilitates multi-party sessions, allowing buyers, agents, and developers to negotiate terms collaboratively in a transparent and guided environment."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-1-3',
                            title: 'Automated Agreement Lifecycle',
                            content: [
                                {type: 'paragraph', text: "EBRAM™ automates and enforces various types of agreements across the real estate market, drastically reducing administrative overhead and accelerating transaction cycles."},
                                {type: 'list', items: [
                                    "<strong>Rental Management:</strong> Automates rent payments (DLD-AED), security deposit escrow, renewal/expiry logic, and maintenance logging. This significantly reduces administrative burden for landlords and tenants, and minimizes disputes.",
                                    "<strong>Property Sales & Transfers:</strong> Manages complex off-plan milestone payments and facilitates instant legal transfer of title deeds for resale, tied to KYC/AML compliance. This accelerates sales cycles and enhances security.",
                                    "<strong>Digital Asset Inheritance:</strong> Integrates a legally robust succession protocol, acting as a \"digital executor\" to secure and transfer digital assets upon death, reducing investor anxiety and streamlining probate.",
                                ]}
                            ]
                        },
                    ]
                },
                {
                    id: 'chapter-3-2',
                    title: "Tokenization & Liquidity",
                    introduction: [{type: 'paragraph', text: "<b class='text-primary'>DXBTOKENS™</b> represent a fundamental paradigm shift in real estate ownership. They are the visible, tradable UX expression of what EBRAM™ governs. These tokens digitize real estate into a fractionalized token economy where <span class='highlight'>1 square foot equals 1 token</span>, making illiquid assets highly accessible."}],
                    articles: [
                        {
                            id: 'article-3-2-1',
                            title: 'DXBTOKENS™: The Asset',
                            content: [
                                {type: 'paragraph', text: "DXBTOKENS™ are native, verifiable shares of physical, DLD-registered properties. They are designed as pure value units, unlinked from rental streams, ensuring stability and focusing on capital appreciation."},
                                {type: 'list', items: [
                                    "<strong>Asset-Backed:</strong> Each token is cryptographically backed by a corresponding portion of a real-world property, vetted by DLD.",
                                    "<strong>Non-Yield Focused:</strong> The token's core value is based on the asset's intrinsic worth, not fluctuating tenancy risks.",
                                    "<strong>Fractionalized Ownership:</strong> The \"1 sqft = 1 token\" model allows for granular, fractional ownership, democratizing access to high-value real estate.",
                                    "<strong>Token Standard:</strong> A specialized implementation on Hyperledger Fabric, conceptually aligned with fungible token standards, carrying rich, immutable metadata about the underlying property."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-2-2',
                            title: 'The MAKE™ System: Liquidity Engine',
                            content: [
                                {type: 'paragraph', text: "The MAKE™ System is DLDCHAIN™'s sovereign financial layer, an internal, non-public liquidity infrastructure that ensures every DXBTOKEN™ is <b class='text-primary'>100% AED-backed</b>. It provides certainty in a market often prone to speculation."},
                                {type: 'list', items: [
                                    "<strong>Liquidity Pool Officers (LPOs):</strong> Regulated financial entities (banks, escrow offices) that act as MAKE™ signers, providing the liquidity to back the token pools.",
                                    "<strong>Air-Gapped Security:</strong> The system is conceptually air-gapped from public trading layers, isolating it from external market volatility and speculative influences.",
                                    "<strong>Sovereign Logic Freeze:</strong> In extreme scenarios, DLDCHAIN™ governance can enforce a freeze on MAKE™ Wallets, preventing any fund movement without dual-sign from the LPO and an EBRAM™ node."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-2-3',
                            title: 'The MAKE™ Event Lifecycle',
                            content: [
                                {type: 'paragraph', text: 'The MAKE™ System orchestrates the entire liquidity lifecycle through a series of structured, governed events:'},
                                {type: 'list', items: [
                                    "<strong>MAKELIST:</strong> An EBRAM™-qualified property is listed as a candidate for tokenization.",
                                    "<strong>MAKETRADE:</strong> An LPO signals intent to provide liquidity for the property.",
                                    "<strong>MAKE_ID:</strong> The pivotal event where the LPO deposits 100% of the unit's AED value. The property becomes a fully-backed on-chain tokenized asset, and DXBTOKENS™ are minted.",
                                    "<strong>MAKE_IN:</strong> The token enters a market-tradeable state. The original owner receives their liquidity (60% cash) and retained tokens (40%).",
                                    "<strong>MAKE_OUT:</strong> A temporary exit from the liquidity lock, pausing trading for specific purposes (e.g., legal hold).",
                                    "<strong>MAKE_DISMISS:</strong> The final exit event, typically triggered by a 90%+ stake acquisition, which \"un-tokenizes\" the property and retires the tokens."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-2-4',
                            title: 'Market Making & Price Stability',
                            content: [
                                {type: 'paragraph', text: 'Market making in DLDCHAIN™ facilitates the trading of DXBTOKENS™ by ensuring liquidity, stabilizing prices, and incentivizing organic participation, without artificial price support. The framework operates as follows:'},
                                {type: 'list', items: [
                                    "<strong>MAKE™ Escrow Mechanism:</strong> The LPO acts as the primary market maker, providing liquidity by depositing the full equity amount into an escrow account to initiate tokenization.",
                                    "<strong>Mashroi™ Broker Assignment:</strong> An AI-driven system assigns licensed brokers to market public tokens, ensuring demand without artificial price inflation.",
                                    "<strong>AI Pricing Stability:</strong> EBRAM™’s AI pricing model, embedded in the core trading functions, uses real-time data to set token prices within a stable range (e.g., ±10% based on market signals), preventing excessive volatility.",
                                    "<strong>Regulatory Compliance:</strong> RERA-compliant fees and CBUAE-integrated AML/KYC checks ensure all market activities are transparent and secure."
                                ]}
                            ]
                        },
                    ]
                },
                 {
                    id: 'chapter-3-3',
                    title: "Mashroi™: Professional Intelligence",
                    introduction: [{type: 'paragraph', text: "Mashroi™ is the <span class='highlight'>Nation’s Real Estate Intelligence Grid</span>, an AI-driven platform that redefines professionalism in Dubai's real estate sector through merit-based empowerment and stringent compliance. It ensures that every professional interaction on the DLDCHAIN™ meets the highest standards of quality and ethics."}],
                    articles: [
                        {
                            id: 'article-3-3-1',
                            title: 'Empowering Professionals',
                            content: [
                                {type: 'paragraph', text: "Mashroi™ is not just a licensing system; it is a career development and opportunity platform for real estate professionals."},
                                {type: 'list', items: [
                                     "<strong>Automated Licensing & Smart Visas:</strong> Streamlines broker licensing and facilitates 3-month renewable digital visas, addressing informal hiring practices and ensuring a fully compliant professional workforce.",
                                     "<strong>Performance-Based Rewards:</strong> Rewards real contributions and verified on-chain performance, fostering a merit-based system that incentivizes professionalism and ethical conduct.",
                                     "<strong>Continuous Professional Development:</strong> Provides gamified learning paths and AI assistants for ongoing education, ensuring brokers are always up-to-date with market trends and regulations."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-3-2',
                            title: 'Building Market Trust',
                            content: [
                                {type: 'paragraph', text: "Mashroi™'s integrated compliance and ethical tracking hub significantly enhances market integrity and investor trust."},
                                {type: 'list', items: [
                                     "<strong>Automated Fines & Proactive Monitoring:</strong> Implements automated fines for non-compliance and leverages AI to monitor market activity, proactively flagging potential fraud or misinformation.",
                                     "<strong>Mandatory Gateway:</strong> Fully integrated into DLD and RERA as a mandatory gateway, similar to Ejari, ensuring all real estate activities are channeled through a compliant framework.",
                                     "<strong>Smart Contract Commission Flow:</strong> Automates the calculation and distribution of broker commissions via smart contracts, ensuring transparent and timely payments."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-3-3',
                            title: 'Opportunity for Professionals',
                            content: [
                                {type: 'paragraph', text: 'A key feature of "Mashroi" is its philosophy that <b class="text-primary">opportunity is for the deserving, not merely for those who ask</b>. For instance, when an individual wishes to sell a property through the tokenization system, EBRAM™ requires the involvement of a RERA-accredited real estate broker from "Mashroi" to facilitate the application. This requires the broker to possess a certain level of knowledge acquired through the "Mashroi" platform to qualify their UNIVESTOR Wallet™ as a broker in the transaction. A broker who has not acquired or passed a specified level of general and field knowledge will not be able to use their wallet to sign a commercial contract within the system or access virtual agreement rooms supervised by EBRAM™. This ensures the system operates as a unified entity, elevating efficiency and quality standards across all transactions.'}
                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: 'part-4',
            title: "Part IV: Governance, Revenue, & Global Vision",
            chapters: [
                {
                    id: 'chapter-4-1',
                    title: 'Governance & Economic Model',
                    introduction: [{type: 'paragraph', text: "This chapter outlines the strategic leadership and economic vision behind DLDCHAIN™, detailing its governance framework, quantifiable economic benefits, and ambitious plans for global leadership in digital real estate."}],
                    articles: [
                        {
                            id: 'article-4-1-1',
                            title: 'Governance Structure',
                            content: [
                                {type: 'paragraph', text: 'The DLDCHAIN™ is structured as a <b class="text-primary">government-led consortium blockchain</b>, a hybrid model that ensures security, privacy, and control while benefiting from the shared perspective of multiple trusted stakeholders.'},
                                {type: 'list', items: [
                                    "<strong>Core Consortium Members:</strong> The strategic nucleus includes DLD (Chair, with veto power), VARA (Vice-Chair, regulatory oversight), CBUAE (financial systems), and DFF (driving Innovation).",
                                    "<strong>Dual-Layer Governance:</strong> A Business Governance Council handles high-level strategy and policy, while an Operational Governance Technical Committee manages the live network, security, and upgrades.",
                                    "<strong>On-Chain Mechanisms:</strong> Smart contracts automate membership onboarding, transparently log governance proposals, and manage fee collection, ensuring efficiency and accountability."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-1-2',
                            title: 'Stakeholder Incentives & Revenue',
                            content: [
                                {type: 'paragraph', text: 'DLDCHAIN™ is designed to provide clear incentives for all stakeholders, fostering widespread adoption and creating sustainable revenue streams.'},
                                {type: 'list', items: [
                                    "<strong>For DLD:</strong> New revenue from transaction fees, token issuance fees, compliance gate fees (Mashroi™), API licensing, and global licensing royalties.",
                                    "<strong>For Developers:</strong> Accelerated sales cycles, early capital unlock via tokenization, enhanced investor trust, and reduced administrative burden.",
                                    "<strong>For Brokers:</strong> Streamlined licensing, transparent commissions, and new lead generation tools via Mashroi™.",
                                    "<strong>For Investors:</strong> Instant liquidity, fractional ownership access, enhanced security, and legal certainty for digital assets (including inheritance)."
                                ]}
                            ]
                        },
                    ]
                },
                {
                    id: 'chapter-4-2',
                    title: 'Global Vision & Expansion',
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is positioned not just as a domestic solution but as a <b class='text-primary'>\"master model for global adoption,\"</b> a sovereign blueprint for digital governance in real estate that Dubai intends to export worldwide."}],
                    articles: [
                         {
                            id: 'article-4-2-1',
                            title: 'A Sovereign Model for Cities',
                            content: [
                                {type: 'paragraph', text: "Dubai's strategic vision extends beyond its borders, aiming for DLDCHAIN™ to become a sovereign model for cities worldwide. Its modular and configurable architecture can be tailored to fit diverse legal and administrative frameworks of other cities and nations, offering a proven blueprint for digital transformation."},
                            ]
                        },
                        {
                            id: 'article-4-2-2',
                            title: 'Multi-City White-Label Strategy',
                            content: [
                                {type: 'paragraph', text: 'To facilitate global adoption, DLDCHAIN™ will implement a comprehensive Multi-City White-Label Strategy. This allows other jurisdictions to deploy a customized version of the DLDCHAIN™ protocol under their own branding and regulatory oversight, while benefiting from Dubai\'s proven technology and governance framework.'},
                                {type: 'list', items: [
                                    "<strong>Franchising and Licensing Abroad:</strong> A clear framework for licensing the protocol, including guidelines for adaptation to local regulatory environments.",
                                    "<strong>Full System Translation:</strong> Support for all major languages, with AI integration for guidance and text-to-action features.",
                                    "<strong>UAE Branding and Sovereign Watermarking:</strong> Robust UAE branding and sovereign watermarking on each system node to ensure authenticity and reinforce Dubai's leadership."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-2-3',
                            title: 'Dubai as a Global Exchange Hub',
                            content: [
                                {type: 'paragraph', text: 'The ultimate ambition is for Dubai to become a <b class="text-primary">global tokenized property exchange hub</b>, attracting immense global investment and talent. This establishes a "gold standard" for tokenized real estate, where the underlying ledger is managed by the government land authority itself, providing a level of trust that no private blockchain can match.'}
                            ]
                        },
                    ]
                }
            ]
        }
    ],
    conclusion: {
        id: 'tech-conclusion',
        title: "Conclusion: A New Era of Real Estate Governance",
        content: [
            {type: 'paragraph', text: 'DLDCHAIN™ represents a paradigm shift in real estate governance, moving from a system of fragmented records to a unified, intelligent, and sovereign digital operating system. The technical architecture, founded on the enterprise-grade security of Hyperledger Fabric and powered by the legal intelligence of EBRAM™ and the financial stability of the MAKE™ system, is designed to be robust, scalable, and secure. It delivers on the promise of unlocking liquidity, ensuring immutable trust, and creating a transparent, efficient market for all stakeholders. This is not merely a technological upgrade; it is the codification of Dubai\'s vision for a future-proof, digitally sovereign real estate sector.'}
        ]
    },
    appendices: [
        {
            id: 'appendix-a',
            title: "Appendix A: DLDCHAIN™ Smart Contract (Pseudo-Code)",
            content: [
                {type: 'paragraph', text: 'This appendix provides a high-level pseudo-code representation of the core `DLDCHAIN_TokenPool` smart contract, illustrating the key functions and logic that govern the tokenization lifecycle on Hyperledger Fabric. This Chaincode would be written in a supported language like Go, Node.js, or Java.'},
                {type: 'code', text: `
// DLDCHAIN_TokenPool Chaincode (Hyperledger Fabric)

// PoolState defines the structure for each tokenized property pool
type PoolState struct {
    DocType             string              \`json:"docType"\` // "PoolState"
    PoolID              string              \`json:"poolId"\`
    PropertyCDID        string              \`json:"propertyCDID"\`
    OwnerWalletID       string              \`json:"ownerWalletId"\`
    LPOTokenWalletID    string              \`json:"lpoTokenWalletId"\`
    TotalValueAED       uint64              \`json:"totalValueAED"\`
    TotalTokens         uint64              \`json:"totalTokens"\`
    Status              string              \`json:"status"\` // "MakeListed", "MakeID", "MakeIn", "MakeOut", "MakeDismissed"
    TokenBalances       map[string]uint64   \`json:"tokenBalances"\` // mapping walletID to balance
}

// --- CORE LIFECYCLE FUNCTIONS (INVOKABLE ONLY BY EBRAM CONTRACT) ---

// makeID: LPO commits funds, DXBTOKENS are minted and registered.
// This function is triggered by the EBRAM contract after validating the LPO's off-chain fund deposit.
func (s *SmartContract) MakeID(ctx contractapi.TransactionContextInterface, poolId string, lpoWalletId string, value uint64, ownerWalletId string, propertyCDID string, sizeSqFt uint64) error {
    
    // Authorization Check: Must be called by the EBRAM Chaincode
    // ... logic to verify caller's identity ...

    // Create the new pool state
    pool := PoolState{
        DocType:          "PoolState",
        PoolID:           poolId,
        PropertyCDID:     propertyCDID,
        OwnerWalletID:    ownerWalletId,
        LPOTokenWalletID: lpoWalletId,
        TotalValueAED:    value,
        TotalTokens:      sizeSqFt, // 1 token per sq ft
        Status:           "MakeID",
        TokenBalances:    make(map[string]uint64),
    }

    // Initialize the total token supply in the LPO's wallet (custodial)
    pool.TokenBalances[lpoWalletId] = pool.TotalTokens;

    // Persist the new pool state to the world state
    poolJSON, _ := json.Marshal(pool)
    return ctx.GetStub().PutState(poolId, poolJSON)
}

// makeIn: Distribute tokens from LPO custodial wallet and activate pool for trading.
func (s *SmartContract) MakeIn(ctx contractapi.TransactionContextInterface, poolId string) error {
    
    // Authorization Check: Must be called by the EBRAM Chaincode
    // ...

    pool, err := s.getPoolState(ctx, poolId)
    if err != nil { return err }
    if pool.Status != "MakeID" { return fmt.Errorf("pool not in MAKE_ID status") }

    // Calculate token distribution
    ownerTokens := (pool.TotalTokens * 40) / 100
    marketTokens := (pool.TotalTokens * 55) / 100
    feeTokens := pool.TotalTokens - ownerTokens - marketTokens // Remaining 5%

    // Transfer tokens from LPO custodial wallet
    pool.TokenBalances[pool.LPOTokenWalletID] -= (ownerTokens + marketTokens + feeTokens)
    pool.TokenBalances[pool.OwnerWalletID] += ownerTokens
    pool.TokenBalances["MARKET_POOL_WALLET"] += marketTokens
    pool.TokenBalances["FEE_WALLET"] += feeTokens

    // EBRAM handles the 60% cash payout to owner off-chain or via another integrated system

    pool.Status = "MakeIn"
    poolJSON, _ := json.Marshal(pool)
    return ctx.GetStub().PutState(poolId, poolJSON)
}

// makeDismiss: Final exit from the pool, "un-tokenizes" the asset.
func (s *SmartContract) MakeDismiss(ctx contractapi.TransactionContextInterface, poolId string) error {
    
    // Authorization Check: Must be called by the EBRAM Chaincode
    // ...

    pool, err := s.getPoolState(ctx, poolId)
    if err != nil { return err }

    // EBRAM performs MPT calculation and final fund distribution off-chain

    // Burn/retire all tokens associated with this pool
    pool.TotalTokens = 0
    pool.TokenBalances = make(map[string]uint64) // Clear all balances
    pool.Status = "MakeDismissed"

    poolJSON, _ := json.Marshal(pool)
    return ctx.GetStub().PutState(poolId, poolJSON)
}
`}
            ]
        },
        {
            id: 'appendix-b',
            title: 'Appendix B: Governance Model Framework',
            content: [
                {type: 'paragraph', text: 'The DLDCHAIN™ is structured as a <b class="text-primary">government-led consortium blockchain</b>, a hybrid model combining the strengths of private and public blockchains. This model ensures the necessary security, privacy, and control required for a regulated industry like real estate, while still benefiting from the decentralization and resilience of multiple trusted stakeholders.'},
                {type: 'subheading', text: 'Consortium Membership'},
                 {type: 'list', items: [
                    "<strong>Core Consortium Members:</strong> The strategic nucleus includes DLD (Chair, with veto power), VARA (Vice-Chair, regulatory oversight), CBUAE (financial systems), and DFF (driving Innovation).",
                    "<strong>Strategic Stakeholder Participation:</strong> Major VARA-licensed real estate developers, top-tier financial institutions, and leading licensed real estate brokerage firms are invited to operate nodes, contributing to network security and aligning development with market needs."
                 ]},
                 {type: 'subheading', text: 'Dual-Layer Governance Structure'},
                 {type: 'list', items: [
                    "<strong>Business Governance (Governing Council):</strong> Responsible for overall direction, policy, budgets, and IP ownership. Ensures strategic alignment and market relevance.",
                    "<strong>Operational Governance (Technical Committee):</strong> Manages the live network, security standards, software upgrades, and technical dispute resolution. Ensures smooth and secure functioning of the infrastructure."
                 ]},
                 {type: 'subheading', text: 'On-Chain Governance Mechanisms'},
                 {type: 'list', items: [
                    "<strong>Automated Membership Onboarding:</strong> Smart contracts streamline the process of admitting new consortium members based on pre-defined criteria.",
                    "<strong>Transparent Proposal System:</strong> A formal, immutable log for all governance proposals (e.g., chaincode upgrades), recording status and voting outcomes transparently.",
                    "<strong>Automated Fee Management:</strong> Smart contracts collect minuscule fees on transactions and distribute funds to a treasury wallet controlled by the Governing Council, ensuring transparent revenue collection."
                 ]}
            ]
        },
        {
            id: 'appendix-simulations',
            title: "Appendix C: Real-World Tokenization Scenarios",
            content: [
                {type: 'paragraph', text: "This appendix provides a detailed, step-by-step walkthrough of distinct tokenization cases, demonstrating how DLDCHAIN™ seamlessly integrates its core components to unlock liquidity, ensure trust, and streamline transactions."},
                {type: 'subheading', text: "Scenario 1: Individual Owner (Ready Property)"},
                {type: 'paragraph', text: "<strong>Context:</strong> An individual owns a ready apartment and wants to sell it quickly without a traditional listing process to unlock immediate liquidity."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Apartment, Dubai Marina",
                    "<strong>EBRAM™ Valued Price:</strong> AED 3,200,000",
                    "<strong>Action:</strong> Owner initiates tokenization via UNIVESTOR Wallet™, facilitated by a Mashroi™ broker.",
                    "<strong>Outcome:</strong> After MAKE_ID and MAKE_IN events, owner receives <b class='text-primary'>AED 1,920,000 (60%)</b> in instant cash and retains 40% equity as tradable DXBTOKENS™."
                ]},
                {type: 'subheading', text: "Scenario 2: Mortgaged Property"},
                {type: 'paragraph', text: "<strong>Context:</strong> An owner wants to sell a mortgaged villa, efficiently settling the mortgage and unlocking equity."},
                 {type: 'list', items: [
                    "<strong>Property:</strong> Villa, Arabian Ranches",
                    "<strong>EBRAM™ Valued Price:</strong> AED 5,100,000",
                    "<strong>Outstanding Mortgage:</strong> AED 900,000",
                    "<strong>Action:</strong> Owner initiates tokenization, disclosing mortgage details. EBRAM™ verifies with the lender.",
                    "<strong>Outcome:</strong> During MAKE_ID, the LPO's committed funds first pay off the <b class='text-primary'>AED 900,000 mortgage</b>. The owner then receives 60% of their net equity (AED 4.2M), which is <b class='text-primary'>AED 2,520,000</b>."
                ]},
                {type: 'subheading', text: "Scenario 3: Off-Plan Development"},
                {type: 'paragraph', text: "<strong>Context:</strong> A developer wants to tokenize a luxury off-plan villa to attract early institutional funding."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Off-Plan Villa, Downtown",
                    "<strong>Asking Price:</strong> AED 11,000,000",
                    "<strong>Action:</strong> Developer submits project via their Developer Wallet. LPO commits funds.",
                    "<strong>Outcome:</strong> Developer receives <b class='text-primary'>AED 6,600,000 (60%)</b> for project funding and retains 40% as DXBTOKENS™. As construction milestones are verified on-chain, EBRAM™'s AI automatically adjusts the token price upwards."
                ]},
            ]
        },
        {
            id: 'techbook-full',
            title: '[AI] Full Technical Book',
            content: [] 
        }
    ]
};

// This must be done after the full object is defined.
const fullBookContent: ContentItem[] = [
    ...technicalBook.introduction.content,
    ...technicalBook.parts.flatMap(part => [
        { type: 'heading', text: part.title },
        ...part.chapters.flatMap(chapter => [
            { type: 'heading', text: chapter.title },
            ...chapter.introduction,
            ...chapter.articles.flatMap(article => [
                { type: 'subheading', text: article.title },
                ...article.content
            ])
        ])
    ]),
    { type: 'heading', text: technicalBook.conclusion.title },
    ...technicalBook.conclusion.content,
    ...technicalBook.appendices.filter(a => a.id !== 'techbook-full').flatMap(appendix => [
        { type: 'heading', text: appendix.title },
        ...appendix.content
    ])
];
const techBookEntry = technicalBook.appendices.find(a => a.id === 'techbook-full');
if (techBookEntry) {
    techBookEntry.content = fullBookContent;
}

    