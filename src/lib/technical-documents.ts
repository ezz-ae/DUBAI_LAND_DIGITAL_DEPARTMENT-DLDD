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
            title: "Part I: Foundation & Core Architecture",
            chapters: [
                {
                    id: 'chapter-1',
                    title: "System Architecture",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is not merely a collection of applications; it is a meticulously designed, multi-layered digital ecosystem built to serve as the sovereign operating system for Dubai's real estate sector. Its architecture ensures robustness, scalability, security, and seamless integration with existing governmental frameworks. The system's design reflects a <span class='highlight'>City as Code</span> paradigm, where urban truth is encoded and governed on-chain."}],
                    articles: [
                        {
                            id: 'article-1-1',
                            title: '1.1 Architectural Layers',
                            content: [
                                {type: 'paragraph', text: 'The DLDCHAIN™ architecture is structured into distinct, yet interconnected, layers, each with specific responsibilities, ensuring modularity, maintainability, and scalability.'},
                                {type: 'list', items: [
                                    "<strong>Foundational Layer (The Immutable Core):</strong> This is the bedrock, providing the underlying <b class='text-primary'>Hyperledger Fabric</b> blockchain infrastructure, immutable ledger, and core consensus mechanisms. It guarantees data integrity and transaction finality.",
                                    "<strong>Core Services Layer (Orchestration & Asset Management):</strong> Built directly on the Foundational Layer, this layer provides essential services for managing the lifecycle of real estate assets on the blockchain, including digital identity, wallet management, and escrow logic.",
                                    "<strong>Application Layer (User-Facing & Interoperability Modules):</strong> This layer consists of the various applications and interfaces that interact with core services, providing utility to users and integrating with external systems. This is where <b class='text-primary'>EBRAM™</b>, <b class='text-primary'>DXBTOKENS™</b>, and <b class='text-primary'>Mashroi™</b> primarily reside.",
                                    "<strong>Access Layer (The Universal Wallet™):</strong> This is the user-facing interface, providing a single, secure gateway for all interactions within the DLDCHAIN™ ecosystem, designed for intuitive use by all stakeholders."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-2',
                            title: '1.2 Interoperability Blueprint',
                            content: [
                                {type: 'paragraph', text: 'DLDCHAIN™ is designed for seamless and secure interoperability, acting as a central nexus for data exchange across various government ministries and authorities. This <span class="highlight">connect, not replace</span> philosophy ensures a smooth transition and leverages existing, trusted systems.'},
                                {type: 'list', items: [
                                    "<strong>Read-Only Integration Model:</strong> For foundational systems like <b class='text-primary'>Ejari</b>, DLDCHAIN™ employs a read-only integration. A trusted DLD-managed oracle securely polls Ejari for new, validated registrations and transmits essential, non-sensitive data to the DLDCHAIN™. This data then triggers the instantiation of new EBRAM™ smart contracts.",
                                    "<strong>Secure API Layer:</strong> A secure API layer, using Hyperledger Fabric's SDKs, provides controlled, permissioned access for authorized entities to query non-confidential ledger data.",
                                    "<strong>Future Protocols:</strong> The architecture is designed to connect with other blockchain networks using emerging interoperability protocols like <b class='text-primary'>Hyperledger Cactus</b> or <b class='text-primary'>Weaver</b>, ensuring DLDCHAIN™ is an interconnected component of Dubai's broader digital infrastructure."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-3',
                            title: '1.3 Security, Scalability & Privacy',
                            content: [
                                {type: 'paragraph', text: 'DLDCHAIN™\'s design prioritizes security, scalability, and confidentiality, crucial for a national-scale real estate infrastructure.'},
                                {type: 'list', items: [
                                    "<strong>Scalability via Channels:</strong> Hyperledger Fabric's <span class='highlight'>channel</span> architecture enables horizontal scalability. Different real estate segments or even different jurisdictions can operate on separate, isolated channels, preventing congestion.",
                                    "<strong>Confidentiality via Private Data:</strong> For granular privacy, Fabric offers <span class='highlight'>private data collections</span>. This allows a subset of organizations to share sensitive data peer-to-peer, with only a cryptographic hash recorded on the main channel ledger as immutable evidence.",
                                    "<strong>Performance:</strong> Fabric's <span class='highlight'>Execute-Order-Validate</span> transaction flow significantly boosts throughput by enabling parallel transaction processing and removing non-determinism.",
                                    "<strong>Robust Security:</strong> The permissioned network, cryptographic primitives, and explicit endorsement policies ensure tamper-proof records and secure multi-party approvals."
                                ]}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: The Immutable Core: Hyperledger Fabric",
            chapters: [
                {
                    id: 'chapter-2',
                    title: "Why Hyperledger Fabric?",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is meticulously built on <b class='text-primary'>Hyperledger Fabric</b>, an open-source, enterprise-grade, permissioned Distributed Ledger Technology (DLT) platform. Fabric's architecture is uniquely suited for governmental and highly regulated industry applications due to its inherent emphasis on security, privacy, and performance. Its design principles align perfectly with the need for a controlled yet transparent environment, crucial for managing a nation's most valuable assets."}],
                    articles: [
                        { id: 'article-2-1', title: '2.1 Permissioned Network', content: [{type: 'paragraph', text: "Unlike public blockchains, Fabric is fundamentally a <b class='text-primary'>permissioned network</b>. All participants are known, identified, and authenticated through a robust Membership Service Provider (MSP). This is a non-negotiable requirement for government applications, where accountability, stringent regulatory compliance (KYC/AML), and trusted interactions are paramount."}]},
                        { id: 'article-2-2', title: '2.2 Modular Architecture', content: [{type: 'paragraph', text: "Fabric is not a monolithic, one-size-fits-all solution. Its core components—consensus, identity management, and ledger databases—are highly <b class='text-primary'>pluggable and interchangeable</b>. This modularity allows the DLDCHAIN™ to be precisely tailored to meet specific, evolving requirements without a complete system overhaul."}]},
                        { id: 'article-2-3', title: '2.3 No Native Cryptocurrency', content: [{type: 'paragraph', text: "A crucial feature is that Fabric operates <b class='text-primary'>without a native, speculative cryptocurrency</b>. Transactions are processed without the need for volatile 'gas' fees. This perfectly aligns with DLDCHAIN™'s de-risked, fiat-based approach using the <b class='text-primary'>DLD-AED</b>, making it inherently more appropriate for a stable, government-run infrastructure."}]},
                        { id: 'article-2-4', title: '2.4 Advanced Transaction Flow', content: [{type: 'paragraph', text: "Fabric employs a novel <span class='highlight'>Execute-Order-Validate</span> transaction architecture. This paradigm enables parallel transaction processing, significantly enhances scalability, and removes non-determinism, ensuring predictable and reliable transaction finality. This multi-stage process adds layers of security and verification to every on-chain event."}]},
                        { id: 'article-2-5', title: '2.5 Channels for Data Isolation', content: [{type: 'paragraph', text: "Fabric allows for the creation of private <b class='text-primary'>Channels</b>, or isolated sub-ledgers, where only a specific set of member organizations can transact. For example, a dedicated channel could exist exclusively for DLD and VARA to manage sensitive tokenization regulations, ensuring data privacy without compromising the overall integrity of the main chain."}]},
                        { id: 'article-2-6', title: '2.6 Private Data for Confidentiality', content: [{type: 'paragraph', text: "For even more granular privacy, Fabric offers <b class='text-primary'>Private Data Collections</b>. This feature allows a subset of organizations on a channel to share sensitive data privately amongst themselves. The actual sensitive data is transmitted peer-to-peer, with only a cryptographic hash recorded on the channel's public ledger. This is ideal for confidential agreements like broker commissions."}]},
                        { id: 'article-2-7', title: '2.7 Endorsement Policies for Governance', content: [{type: 'paragraph', text: "Government workflows require specific approvals. Fabric's <b class='text-primary'>Endorsement Policies</b> codify these rules directly at the smart contract level. A transaction can be defined to be valid only if it is digitally signed (endorsed) by a specific set of authorized organizations, creating a tamper-proof, automated workflow for multi-party approvals."}]}
                    ]
                }
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Core Applications & Logic",
            chapters: [
                {
                    id: 'chapter-3',
                    title: "EBRAM™: The Legal Engine",
                    introduction: [
                        {type: 'paragraph', text: "EBRAM™ (Emirates Blockchain Real-estate Agreement Management) is the unified smart contract layer of DLDCHAIN™. It is the <span class='highlight'>smart agreement engine</span>, serving as the very consciousness of Dubai's real estate. It acts as the digital nervous system for all transactions, ensuring precision and legal certainty. It is designed to be <b class='text-primary'>\"the law, coded and automated.\"</b>"}
                    ],
                    articles: [
                        {
                            id: 'article-3-1', 
                            title: '3.1 EBRAM™ Syntax & Structure',
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
                            id: 'article-3-2',
                            title: '3.2 EBRAMGPT™: The AI Legal Assistant',
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
                    ]
                },
                {
                    id: 'chapter-4',
                    title: "Tokenization & Liquidity",
                    introduction: [{type: 'paragraph', text: "<b class='text-primary'>DXBTOKENS™</b> represent a fundamental paradigm shift in real estate ownership. They are the visible, tradable UX expression of what EBRAM™ governs. These tokens digitize real estate into a fractionalized token economy where <span class='highlight'>1 square foot equals 1 token</span>, making illiquid assets highly accessible."}],
                    articles: [
                        {
                            id: 'article-4-1',
                            title: '4.1 DXBTOKENS™: The Asset',
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
                            id: 'article-4-2',
                            title: '4.2 The MAKE™ System: Liquidity Engine',
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
                            id: 'article-4-3',
                            title: '4.3 The MAKE™ Event Lifecycle',
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
                        }
                    ]
                },
                 {
                    id: 'chapter-5',
                    title: "Mashroi™ & UNIVESTOR Wallet™",
                    introduction: [{type: 'paragraph', text: "These components manage the human and access layers of the ecosystem, ensuring professionalism, compliance, and a seamless user experience."}],
                    articles: [
                        {
                            id: 'article-5-1',
                            title: '5.1 Mashroi™: Professional Intelligence Hub',
                            content: [
                                {type: 'paragraph', text: "Mashroi™ is the <span class='highlight'>Nation’s Real Estate Intelligence Grid</span>, an AI-driven platform that redefines professionalism in Dubai's real estate sector through merit-based empowerment and stringent compliance."},
                                {type: 'list', items: [
                                     "<strong>Automated Licensing & Smart Visas:</strong> Streamlines broker licensing and facilitates 3-month renewable digital visas, ensuring a compliant workforce.",
                                     "<strong>Performance-Based Rewards:</strong> Rewards real contributions and verified performance, fostering a merit-based system that incentivizes professionalism and ethical conduct.",
                                     "<strong>Mandatory Gateway:</strong> Fully integrated into DLD and RERA as a mandatory gateway, similar to Ejari, ensuring all real estate activities are channeled through a compliant framework."
                                ]}
                            ]
                        },
                        {
                            id: 'article-5-2',
                            title: '5.2 UNIVESTOR Wallet™: The Universal Access Point',
                            content: [
                                {type: 'paragraph', text: "The UNIVESTOR Wallet™ is the singular, secure, government-issued digital identity and access point for all DLDCHAIN™ interactions. It is designed for <b class='text-primary'>\"zero technical knowledge\"</b> to ensure broad accessibility."},
                                {type: 'list', items: [
                                     "<strong>Unified Digital Identity:</strong> One wallet per human, with robust identity verification leveraging <b class='text-primary'>UAE Pass</b>, ensuring high trust and KYC/AML compliance.",
                                     "<strong>Seamless & Secure Login:</strong> Utilizes a \"No any passwords\" approach with dynamic OTP and smart cookies, providing a frictionless yet highly protected user experience.",
                                     "<strong>Tiered Access:</strong> Wallet functionalities and transaction limits are dynamically tiered based on the user's verified KYC level and role (investor, developer, realtor, government), minimizing cognitive load.",
                                     "<strong>Fiat-Only:</strong> Exclusively manages the <b class='text-primary'>DLD-AED</b>, ensuring all financial flows are stable and secure."
                                ]}
                            ]
                        },
                    ]
                },
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
                {type: 'paragraph', text: 'This appendix provides a high-level pseudo-code representation of the core `DLDCHAIN_TokenPool` smart contract, illustrating the key functions and logic that govern the tokenization lifecycle on Hyperledger Fabric.'},
                {type: 'code', text: `
contract DLDCHAIN_TokenPool is Ownable, ReentrancyGuard {
    // State Variables
    struct TokenPool {
        string poolId;
        string propertyCDID;
        address payable owner;
        address payable liquidityProvider;
        uint256 totalValue;
        uint256 totalTokens;
        Status status;
        mapping(address => uint256) tokenBalances;
    }

    enum Status { MakeListed, MakeID, MakeIn, MakeOut, MakeDismissed }

    mapping(string => TokenPool) public pools;
    address ebramContract; // Address of the main EBRAM™ contract

    // Modifiers
    modifier onlyEBRAM() {
        require(msg.sender == ebramContract, "Caller is not the EBRAM contract");
        _;
    }

    // --- Core Lifecycle Functions (Callable only by EBRAM™) ---

    // LPO commits funds, DXBTOKENS™ are minted and registered
    function makeID(string memory poolId, address _lpo, uint256 _value) external onlyEBRAM nonReentrant {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeListed, "Pool not listed");
        
        // 1. Verify 100% AED deposit from LPO (oracle call or direct transfer check)
        // ... verification logic ...

        pool.liquidityProvider = payable(_lpo);
        pool.totalValue = _value;
        pool.totalTokens = _value / 1000; // Example: 1 token per 1000 AED value
        pool.status = Status.MakeID;
        
        // Minting logic (conceptual)
        _mint(poolId, pool.totalTokens);
    }

    // Distribute tokens and activate for trading
    function makeIn(string memory poolId) external onlyEBRAM nonReentrant {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeID, "Pool not in MAKE_ID status");

        // Distribute tokens: 40% to owner, 55% to market, 5% fees
        uint256 ownerTokens = (pool.totalTokens * 40) / 100;
        uint256 marketTokens = (pool.totalTokens * 55) / 100;
        
        _transferTokens(poolId, pool.owner, ownerTokens);
        _transferTokens(poolId, address(this), marketTokens); // Held by contract for market
        
        // Pay 60% liquidity to owner
        pool.owner.transfer(pool.totalValue * 60 / 100);

        pool.status = Status.MakeIn;
    }

    // Final exit from the pool
    function makeDismiss(string memory poolId) external onlyEBRAM nonReentrant {
        TokenPool storage pool = pools[poolId];
        require(pool.status == Status.MakeIn || pool.status == Status.MakeOut, "Pool not active or paused");

        // 1. MPT Calculation (via EBRAM™ oracle)
        // ...
        
        // 2. Distribute final funds to remaining token holders
        // ...
        
        // 3. Return remaining capital + profit to LPO
        // ...

        // 4. Burn/retire all tokens associated with this pool
        _burn(poolId, pool.totalTokens);

        pool.status = Status.MakeDismissed;
    }

    // --- Internal Helper Functions ---
    function _mint(string memory poolId, uint256 amount) internal { /* ... */ }
    function _burn(string memory poolId, uint256 amount) internal { /* ... */ }
    function _transferTokens(string memory poolId, address to, uint256 amount) internal { /* ... */ }
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
                    "<strong>Automated Membership Onboarding:</strong> Streamlines the process of admitting new consortium members.",
                    "<strong>Transparent Proposal System:</strong> A formal, immutable log for all governance proposals, recording status and voting outcomes.",
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
