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
        title: "Driving Digital Sovereignty in Real Estate",
        content: [
            {
                type: 'paragraph',
                text: "This technical analysis book provides a comprehensive and in-depth examination of DLDCHAIN™, the groundbreaking blockchain-based real estate governance system pioneered by the Dubai Land Department (DLD). In an era defined by rapid digital transformation and the increasing demand for transparency and efficiency in global markets, DLDCHAIN™ stands as a visionary solution, meticulously engineered to address the inherent complexities and traditional limitations of the real estate sector."
            },
            {
                type: 'paragraph',
                text: "DLDCHAIN™ transcends conventional property registries, evolving into a real-time operating system that seamlessly integrates legal, financial, and operational frameworks into a sovereign digital infrastructure. This document systematically dissects each component of the DLDCHAIN™ ecosystem – including EBRAM™, DXBTOKENS™, MAKE™ System, Mashroi™, and the UNIVESTOR Wallet™ – detailing their purpose, functionality, technical architecture, and synergistic interactions."
            },
            {
                type: 'paragraph',
                text: "Drawing upon extensive research, detailed simulations (including real-world scenarios for mortgaged and off-plan properties), and a deep understanding of Dubai's unique regulatory and economic landscape, this analysis demonstrates DLDCHAIN™'s unprecedented capabilities in unlocking liquidity, ensuring immutable trust, streamlining compliance, and fostering new economic opportunities. Furthermore, it highlights Dubai's strategic intent to position DLDCHAIN™ as a global blueprint for digital governance in real estate, offering a model of efficiency and security to cities worldwide."
            },
            {
                type: 'paragraph',
                text: "This book is designed for policymakers, governmental agencies, financial institutions, technology developers, and industry stakeholders seeking a thorough understanding of DLDCHAIN™'s innovative design and its transformative potential for the future of real estate."
            }
        ]
    },
    parts: [
        {
            id: 'part-1',
            title: "Part I: Foundation & National Purpose (Technical Perspective)",
            chapters: [
                {
                    id: 'chapter-1',
                    title: "System Architecture Overview",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is not merely a collection of applications; it is a meticulously designed, multi-layered digital ecosystem built to serve as the sovereign operating system for Dubai's real estate sector. Its architecture ensures robustness, scalability, security, and seamless integration with existing governmental frameworks, while enabling future global expansion. The system's design reflects a \"City as Code\" paradigm, where urban truth is encoded and governed on-chain."}],
                    articles: [
                        {
                            id: 'article-1-1',
                            title: '1.1. Core Architectural Layers: Foundational, Core Services, Application, Access',
                            content: [
                                {type: 'paragraph', text: 'The DLDCHAIN™ architecture is structured into distinct, yet interconnected, layers, each with specific responsibilities, ensuring modularity, maintainability, and scalability.'},
                                {type: 'list', items: [
                                    "<strong>Foundational Layer (The Immutable Core):</strong> This is the bedrock, providing the underlying blockchain infrastructure, immutable ledger, and core consensus mechanisms. It guarantees data integrity and transaction finality.",
                                    "<strong>Core Services Layer (Transaction Orchestration and Asset Management):</strong> Built directly on the Foundational Layer, this layer provides essential services for managing the lifecycle of real estate assets on the blockchain, including digital identity, wallet management, and escrow logic.",
                                    "<strong>Application Layer (User-Facing and Interoperability Modules):</strong> This layer consists of the various applications and interfaces that interact with core services, providing utility to users and integrating with external systems. This is where EBRAM™, DXBTOKENS™, and Mashroi™ primarily reside.",
                                    "<strong>Access Layer (Universal Wallet & User Experience):</strong> This is the user-facing interface, providing a single, secure gateway for all interactions within the DLDCHAIN™ ecosystem, designed for intuitive use by all stakeholders."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-2',
                            title: '1.2. Interoperability Blueprint: Integrating DLDCHAIN™ with Ejari and Future Government Systems',
                            content: [
                                {type: 'paragraph', text: 'DLDCHAIN™ is designed for seamless and secure interoperability, acting as a central nexus for data exchange across various government ministries and authorities. This "connect, not replace" philosophy ensures a smooth transition and leverages existing, trusted systems.'},
                                {type: 'list', items: [
                                    "<strong>Read-Only Integration Model:</strong> For foundational systems like Ejari, DLDCHAIN™ employs a \"read-only\" integration. A trusted DLD-managed oracle securely polls Ejari for new, validated registrations and transmits essential, non-sensitive data to the DLDCHAIN™. This data then triggers the instantiation of new EBRAM™ smart contracts, ensuring the DLDCHAIN™ is a perfect reflection of the legal reality in Ejari without altering the foundational record.",
                                    "<strong>Secure API Layer:</strong> For communication in the other direction (allowing other government entities or authorized third parties to access data from DLDCHAIN™), a secure API (Application Programming Interface) layer is developed. Using Hyperledger Fabric's SDKs, RESTful APIs provide controlled, permissioned access to query non-confidential ledger data.",
                                    "<strong>Future Interoperability Protocols:</strong> DLDCHAIN™ is architected to connect with other blockchain networks using emerging interoperability protocols like Hyperledger Cactus or Weaver, facilitating secure data and asset exchange between different DLTs (e.g., other Fabric, Corda, or Ethereum-based networks). This ensures DLDCHAIN™ is an interconnected component of Dubai's broader digital infrastructure."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-3',
                            title: '1.3. Security, Scalability, and Privacy: Designing a Future-Proof Infrastructure with Channels and Private Data',
                            content: [
                                {type: 'paragraph', text: 'DLDCHAIN™\'s design prioritizes security, scalability, and confidentiality, crucial for a national-scale real estate infrastructure.'},
                                {type: 'list', items: [
                                    "<strong>Scalability through Channels:</strong> Hyperledger Fabric's \"channel\" architecture enables horizontal scalability. Different real estate segments (e.g., residential sales, commercial leases) or even different jurisdictions (in a multi-city white-label scenario) can operate on separate, isolated channels. This prevents congestion on a single main chain, allowing for parallel transaction processing and data isolation.",
                                    "<strong>Data Confidentiality via Private Data Collections:</strong> For granular privacy within channels, Fabric offers \"private data collections.\" This allows a subset of organizations to share sensitive data peer-to-peer, with only a cryptographic hash recorded on the main channel ledger as immutable evidence. This protects commercial confidentiality (e.g., commission agreements, specific lease terms) while maintaining auditability.",
                                    "<strong>Enhanced Performance:</strong> Fabric's \"Execute-Order-Validate\" transaction flow significantly boosts throughput and performance by enabling parallel transaction processing and removing non-determinism, ensuring the system can handle high transaction volumes efficiently.",
                                    "<strong>Robust Security:</strong> The permissioned network, cryptographic primitives (hashing, digital signatures), and explicit endorsement policies ensure tamper-proof records, fraud resistance, and secure multi-party approvals. The MAKE™ System also operates with \"air-gapped security\" from public trading layers for financial stability."
                                ]}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: The Immutable Core: Hyperledger Fabric – A Government-Grade Foundation",
            chapters: [
                {
                    id: 'chapter-2',
                    title: "Hyperledger Fabric Architecture",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN™ is meticulously built on Hyperledger Fabric, an open-source, enterprise-grade, permissioned Distributed Ledger Technology (DLT) platform. Fabric's architecture is uniquely suited for governmental and highly regulated industry applications due to its inherent emphasis on security, privacy, and performance. This makes it the ideal choice for a national-scale infrastructure that demands both robustness and flexibility, while adhering to strict regulatory requirements. Its design principles align perfectly with the need for a controlled yet transparent environment, crucial for managing a nation's most valuable assets."}],
                    articles: [
                        { id: 'article-2-1', title: '2.1. Permissioned Network', content: [{type: 'paragraph', text: "Unlike public blockchains where anyone can participate anonymously, Fabric is fundamentally a permissioned network. This means all participants (organizations and their individual users) are known, identified, and authenticated through a robust Membership Service Provider (MSP). This is a non-negotiable requirement for government applications, where accountability, stringent regulatory compliance (such as KYC/AML), and trusted interactions are paramount. Every entity and individual operating on the DLDCHAIN™ is verifiable, accountable, and operates within a clearly defined legal and regulatory perimeter, ensuring a secure, transparent, and compliant ecosystem from the ground up."}]},
                        { id: 'article-2-2', title: '2.2. Modular and Configurable Architecture', content: [{type: 'paragraph', text: "Fabric is not a monolithic, one-size-fits-all solution, which is critical for a dynamic and evolving ecosystem like Dubai's real estate market. Its core components, including consensus mechanisms, identity management protocols, and ledger databases, are highly pluggable and interchangeable. This modularity allows the DLDCHAIN™ to be precisely tailored to meet the specific, evolving requirements of DLD and its consortium partners, ensuring adaptability as technology advances and market needs shift without requiring a complete system overhaul. This future-proof design is a key advantage, enabling continuous innovation and seamless upgrades to the underlying infrastructure."}]},
                        { id: 'article-2-3', title: '2.3. No Native Cryptocurrency', content: [{type: 'paragraph', text: "A crucial alignment with Dubai's strategic decision to prioritize stability and regulatory clarity, Fabric is designed to operate without a native, speculative cryptocurrency. Transactions are processed without the need for volatile \"gas\" fees, which fluctuate wildly in public crypto markets. This perfectly aligns with the de-risked, fiat-based approach that proved so successful in DLD's initial tokenization pilots, making it inherently more appropriate for a stable, government-run infrastructure. This eliminates the speculative risks associated with public crypto markets, providing a secure and predictable environment for real estate transactions, and significantly appealing to traditional institutional investors."}]},
                        { id: 'article-2-4', title: '2.4. Execute-Order-Validate Transaction Flow', content: [{type: 'paragraph', text: "Fabric employs a novel transaction architecture that separates the process into three distinct phases: execution (where transactions are endorsed by required peers), ordering (where endorsed transactions are grouped into blocks by a consensus service), and validation (where peers verify the transactions against endorsement policies before committing them to the ledger). This paradigm enables parallel transaction processing, significantly enhances scalability and performance by allowing multiple transactions to be processed concurrently. Crucially, it removes the non-determinism that can plague other blockchain platforms, ensuring predictable and reliable transaction finality. This multi-stage process adds layers of security and verification to every on-chain event, guaranteeing transactional integrity and auditability."}]},
                        { id: 'article-2-5', title: '2.5. Channels', content: [{type: 'paragraph', text: "Fabric allows for the creation of private \"sub-ledgers\" or channels. These are isolated networks where only a specific set of member organizations can transact and see the data, providing a high degree of confidentiality. This is the digital equivalent of creating secure communication lines between specific government departments or between the government and a select group of private sector partners. For example, a dedicated channel could exist exclusively for DLD and VARA to manage sensitive tokenization regulations, or another for DLD and major developers to manage confidential off-plan project milestones, ensuring data privacy without compromising the overall integrity of the main chain. This capability is vital for maintaining commercial confidentiality and regulatory segregation, enabling tailored data access while preserving overall network security."}]},
                        { id: 'article-2-6', title: '2.6. Private Data Collections', content: [{type: 'paragraph', text: "For even more granular privacy control within the same channel, Fabric offers private data collections. This feature allows a subset of organizations on a channel to share sensitive data privately amongst themselves, off the main channel ledger. The actual sensitive data is transmitted peer-to-peer, while only a cryptographic hash of that data is written to the channel's public ledger as immutable evidence of the transaction. This is highly efficient, allowing for confidential transactions without the overhead of creating and maintaining a separate channel for every unique combination of parties. For instance, within a channel for all registered brokers, a specific broker and their client could use a private data collection to share a confidential commission agreement, with only the hash of that agreement being visible to other brokers on the channel, preserving commercial confidentiality while maintaining an auditable record of the agreement's existence."}]},
                        { id: 'article-2-7', title: '2.7. Endorsement Policies', content: [{type: 'paragraph', text: "Government workflows often require specific approvals and multi-party sign-offs for critical transactions. Fabric's endorsement policies codify these rules directly at the smart contract (chaincode) level. A transaction can be defined to be valid only if it is digitally signed (endorsed) by a specific set of authorized organizations. For example, the transfer of a tokenized property title could require simultaneous endorsements from DLD, the seller, and the buyer's financing bank, creating a tamper-proof, automated workflow for multi-party approvals that is enforced by the network itself, eliminating manual bottlenecks, reducing fraud, and enhancing security. This robust foundation ensures smart ownership contracts are \"unbreakable, undeletable, and uneditable,\" establishing the highest level of trust and legal certainty in property records. This forms the bedrock of Dubai's digital land matrix and its future as a \"City as Code,\" where the digital representation of property is as legally binding and secure as its physical counterpart."}]}
                    ]
                }
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Core Technical Applications: Code, Logic, and Execution",
            chapters: [
                {
                    id: 'chapter-3',
                    title: "EBRAM™: Real Estate Legal Programming Language",
                    introduction: [
                        {type: 'paragraph', text: "EBRAM™ (إبرام), derived from the Arabic word meaning \"agreement,\" and also standing for \"Emirates Blockchain Real-estate Agreement Management,\" is the unified smart contract layer and core application within the DLDCHAIN™ protocol. It is designed as a revolutionary smart contract system that fundamentally reshapes how agreements, reputation, and legal accountability function in the digital age. EBRAM™ is envisioned as the \"smart contract of the chain\" and the \"smart agreement engine\" of DLDCHAIN™, serving as the very consciousness of Dubai's real estate. It acts as the digital nervous system for all real estate transactions, ensuring precision and legal certainty in every interaction."},
                        {type: 'paragraph', text: "More than just a smart contract system, EBRAM™ is conceptualized as a \"legal-transactional language\" and a \"domain-specific programmable language for real estate governance.\" It is designed to be \"the law, coded and automated,\" functioning as a \"global language of agreement\" that fosters trust and transparency. Inspired by Prophet Ibrahim, it represents a bridge between faith in tradition and trust in technology, ensuring that legal intent is precisely executed without ambiguity. Its primary role is to serve as a \"global infrastructure for binding agreements, offering a seamless, legally valid, and transparent way to create, sign, verify, and monitor transactions and promises across all sectors.\" This vision extends to making legal agreements as fluid and reliable as software, capable of self-execution and real-time adaptation."}
                    ],
                    articles: [
                        {
                            id: 'article-3-1', 
                            title: '3.1. EBRAM™ Design Principles',
                            content: [
                                {type: 'paragraph', text: 'The design of EBRAM™ is rooted in principles that prioritize legal fidelity, automation, transparency, and adaptability:'},
                                {type: 'list', items: [
                                    "<strong>Legal-First Approach:</strong> Ensuring that the codified logic accurately reflects and enforces UAE property law.",
                                    "<strong>Automated Execution:</strong> Minimizing human intervention in contract lifecycle management.",
                                    "<strong>Transparency and Auditability:</strong> Providing immutable, verifiable records of all contractual events.",
                                    "<strong>Adaptability:</strong> Designing the system to evolve with changing legal precedents and market dynamics.",
                                    "<strong>User-Centricity:</strong> Making complex legal processes accessible and intuitive for all stakeholders."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-2',
                            title: '3.2. EBRAM™ Syntax and Structure',
                            content: [
                                {type: 'paragraph', text: 'EBRAM™ distinguishes itself not merely as a smart contract template but as a comprehensive, domain-specific programmable language for real estate governance. This innovative dual-layer design allows for a direct, codified representation of legal intent and property rules on the blockchain, bridging the gap between legal professionals and technical implementation. It creates a comprehensive smart governance system by clearly distinguishing between a legal-readable logic layer and a computational execution layer. This ensures that legal experts can define terms in a familiar format, while the system executes them with machine precision, guaranteeing fidelity to legal intent.'},
                                {type: 'subheading', text: "EBRAM™ Layer (Legal-readable logic)" },
                                {type: 'paragraph', text: 'This layer represents the legal clauses and conditions in a structured, human-readable format that closely mirrors traditional legal language. It is designed for clarity and precision for legal professionals, enabling them to define contractual logic using intuitive constructs. This ensures legal enforceability and understanding, making the underlying code accessible to legal review.'},
                                {type: 'list', items: [
                                    "<strong>Core Constructs:</strong> These are the fundamental elements that combine to form logical statements: Logic (e.g., if... then..., defining conditions and outcomes), Roles (e.g., who... what..., specifying involved parties and their responsibilities), and Rights (e.g., can... until... unless..., defining permissions and constraints). These constructs form the precise vocabulary of the legal-transactional language, ensuring comprehensive coverage of contractual terms.",
                                    "<strong>Operators:</strong> Key operators that dictate the flow of logic within an agreement: if, then, else, and unless. These provide the conditional framework for automated execution, ensuring that actions are triggered only when specific conditions are met, and only in the precise sequence defined.",
                                    "<strong>Property Bindings:</strong> The language's ability to interact with specific data points of a property or contract (e.g., rental.status, contract.state, rent.days_late) ensures that contracts are dynamically linked to real-time asset data, reflecting the current state of the property. This eliminates the need for manual data updates and ensures accuracy, as the contract constantly references the live digital twin of the asset.",
                                    "<strong>Triggers:</strong> Events or time-based initiations can trigger actions within the contract. For example, a trigger might be if lease.startDate + 3 days && noKeyPickup then auto-cancel, automating responses to specific conditions without manual intervention, such as lease terminations or penalty applications. These triggers ensure proactive contract management."
                                ]},
                                {type: 'subheading', text: "Python Layer (Computational execution)" },
                                {type: 'paragraph', text: 'This layer is the underlying code that executes the logic defined in the EBRAM™ layer on the blockchain. It serves as an intermediate Domain Specific Language (DSL), translating the human-readable legal logic into executable commands for the Hyperledger Fabric network. This separation ensures that legal clarity is maintained while technical execution is precise and efficient, guaranteeing the integrity of automated legal processes and providing a robust, auditable execution environment that can be verified by technical experts.'},
                                {type: 'paragraph', text: 'This dual-layer approach allows for the tokenization of "enforceable rights, behaviors, and consequences," not just properties, establishing a new paradigm for real estate governance where legal agreements are self-executing and auditable.'},
                                {type: 'subheading', text: 'Example: Automated Late Rent Payment and Access Lock'},
                                {type: 'code', text: '# EBRAM™ Clause (Legal Logic Layer):\n# IF tenant.payment.status == late FOR > 5d AND no_response_from_owner FOR 3d THEN trigger notice_to_DLD AND pause_token_transfer = TRUE.\n\n# Python Execution Layer:\nif tenant.payment_overdue(days=5) and not owner.responded(within_days=3):\n    trigger_dld_notice()\n    lock_token_transfer()'},
                                {type: 'paragraph', text: "This example demonstrates how a clear legal clause is directly translated into executable code, ensuring automated and legally compliant responses to contractual breaches, eliminating ambiguity and manual enforcement. This level of automation drastically reduces the need for human intervention in dispute resolution, accelerating outcomes and reducing costs."}
                            ]
                        },
                        {
                            id: 'article-3-3',
                            title: '3.3. EBRAM™ Integration with DLDCHAIN™',
                            content: [
                                {type: 'paragraph', text: 'EBRAM™ is seamlessly integrated as the core smart contract engine within the DLDCHAIN™ ecosystem, acting as the primary executor of legal and transactional logic on the sovereign ledger.'},
                                {type: 'list', items: [
                                    "<strong>EBRAMINT™ Trigger:</strong> The formal digitization of a property's agreement (EBRAMINT™) is the foundational act that brings an EBRAM™ smart contract to life on the DLDCHAIN™. This process ensures immutability and verifiable records, defining the basis for property tokenization.",
                                    "<strong>Oracle Integration:</strong> EBRAM™ consumes data from \"Smart Verification Oracles\" (e.g., Ejari, Milka, Trakheesi) in a read-only model. A valid Ejari registration, for instance, acts as the \"genesis event\" triggering the creation and activation of corresponding EBRAM™ smart contracts.",
                                    "<strong>Cross-Ministry Coordination:</strong> EBRAM™'s logic extends across governmental entities, enabling automated workflows that involve the Ministry of Justice (for judicial enforcement), DET (for short-term rental permits), and other relevant bodies, ensuring a unified national protocol."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-4',
                            title: '3.4. Technical Implementation',
                            content: [
                                {type: 'paragraph', text: '(Placeholder for future expansion) This section will detail the specific technical implementation aspects of EBRAM™, including:'},
                                {type: 'list', items: [
                                    "Smart contract design patterns (e.g., custom ERC-like standards for real estate specific NFTs/fungible tokens).",
                                    "State machine diagrams for contract lifecycles.",
                                    "Oracle integration mechanisms (e.g., Chainlink equivalents for Hyperledger Fabric).",
                                    "Detailed pseudo-code or Go Chaincode examples for core EBRAM™ functions beyond the high-level Python logic.",
                                    "Deployment strategies on Hyperledger Fabric."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-5',
                            title: '3.5. Security and Compliance',
                            content: [
                                {type: 'paragraph', text: "The security and compliance of EBRAM™ are paramount, given its role as the legal-transactional backbone of DLDCHAIN™. Every aspect of EBRAM™'s design and execution is fortified to ensure the highest levels of data integrity, legal enforceability, and fraud prevention within the sovereign digital real estate ecosystem."},
                                {type: 'list', items: [
                                    "<strong>Immutable Records:</strong> Every contract generated, executed, and finalized by EBRAM™ results in immutable, timestamped records on the DLDCHAIN™. This inherent property of blockchain prevents any unauthorized alteration or deletion of contractual data, providing a permanent and auditable trail for all legal events and property states. This eliminates the possibility of document forgery or retroactive tampering.",
                                    "<strong>Legal Finality:</strong> The EBRAM™ system is meticulously designed to ensure that smart ownership contracts are \"unbreakable, undeletable, and uneditable\". This establishes a robust framework of trust and legal certainty, guaranteeing the integrity and finality of all agreements executed on-chain. Once a contract is finalized and recorded by EBRAM™, its terms are immutably set, mirroring the finality of a court judgment.",
                                    "<strong>Programmatic Compliance:</strong> Compliance with DLD and RERA regulations is not a post-audit check but an inherent feature of EBRAM™'s design. The system programmatically enforces rules, including Ejari timelines and Rental Dispute Settlement Centre (RDC) dispute paths, directly at the smart contract level. This reduces human error, eliminates manual compliance checks, and ensures continuous regulatory adherence for every transaction.",
                                    "<strong>Role-Based Access Control:</strong> Access to specific EBRAM™ functionalities, such as contract deployment, property status changes, or dispute module activation, is strictly controlled by assigned roles within the permissioned DLDCHAIN™ network. This ensures that only authorized entities (e.g., DLD administrators, verified developers, licensed brokers) can perform critical actions, maintaining system integrity and preventing unauthorized interventions.",
                                    "<strong>AI for Risk Mitigation:</strong> EBRAMGPT™ actively contributes to security by proactively identifying and flagging potential risks or violations of regulations in contract drafting. Furthermore, the EBRAM™ AI-Weighted Node System can intercept and stop agreements with \"unlogical terms/price/commission\", protecting market integrity and preventing exploitative practices before they are executed on-chain. This predictive and preventive AI layer acts as an intelligent guardian for the ecosystem."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-6',
                            title: '3.6. Flowchart: EBRAM™ Workflow in DLDCHAIN™',
                            content: [
                                {type: 'paragraph', text: "(Conceptual) This section would present a detailed technical flowchart illustrating the lifecycle of an EBRAM™ smart contract from natural language input to on-chain execution and adaptive learning, highlighting key decision points and system interactions. This workflow demonstrates how EBRAM™ orchestrates legal intelligence with blockchain finality."},
                                {type: 'list', items: [
                                    "<strong>Natural Language Input (EBRAMGPT™ Frontend):</strong> User (Owner, Tenant, Developer, Legal Staff) articulates intent using plain language.",
                                    "<strong>AI-Driven Drafting (EBRAMGPT™ Backend):</strong> EBRAMGPT™ translates natural language to EBRAM™ smart clauses and Python code, suggests clauses, and flags risks based on its extensive knowledge base of legal principles and past contracts.",
                                    "<strong>EBRAM™ Contract Logic (Intermediate Representation):</strong> The codified legal logic, structured and ready for execution on the blockchain.",
                                    "<strong>User Action / Clause Submission:</strong> Verified roles submit proposals for adaptations or edits, feeding into the learning system.",
                                    "<strong>EBRAM ML NOTES™ (Knowledge & Logic Evolution Hub):</strong> Stores and processes expert observations, legal precedents, exceptions, and pattern-based rules, continuously evolving the contract intelligence.",
                                    "<strong>Review Panel:</strong> Vetted legal and administrative experts review and approve proposed adaptations/edits from ML NOTES™ before they are integrated into the core logic.",
                                    "<strong>EBRAM™ Core Engine:</strong> The optimized smart logic core that executes contracts based on the finalized logic and adapts system behavior based on input from verified roles.",
                                    "<strong>On-Chain Execution (Hyperledger Fabric):</strong> The final, immutable recording and execution of the smart contract on the DLDCHAIN™.",
                                    "<strong>AI-Weighted Node System:</strong> Continuously analyzes contract performance and market data, such as market sentiment, recent transactions, and seasonality. This data feeds back into contract adaptation and valuation logic, ensuring the system remains responsive and intelligent."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-4',
                    title: "EBRAMGPT™: AI-Powered Legal Assistant for DLDCHAIN™",
                    introduction: [
                        {type: 'paragraph', text: "EBRAMGPT™ is the cornerstone of DLDCHAIN™'s user accessibility and legal intelligence. Positioned as the \"exclusive interface between humans and the machine logic of real estate law\", it transforms complex legal processes into intuitive, natural language interactions. It is not merely a chatbot but a \"verbal+legal+contextual access node\" that democratizes access to legal drafting and understanding."}
                    ],
                    articles: [
                        {
                            id: 'article-4-1',
                            title: '4.1. EBRAMGPT™ Design Principles',
                            content: [
                                {type: 'paragraph', text: 'The design of EBRAMGPT™ adheres to principles that prioritize accessibility, intelligence, and integration, ensuring it serves as a robust and reliable legal co-pilot:'},
                                {type: 'list', items: [
                                    "<strong>Natural Language Interface (NLI):</strong> Enables users to interact using everyday language (Arabic, English, etc.), eliminating legal jargon barriers and making contract drafting accessible to non-experts.",
                                    "<strong>Contextual Awareness:</strong> Understands user roles (tenant, owner, developer) and transaction types (rent, sale, sublet, commission), providing relevant guidance and ensuring generated contracts fit the specific scenario.",
                                    "<strong>Predictive Assistance:</strong> Proactively suggests clauses, flags potential risks or regulatory violations, and provides clear explanations, guiding users to legally sound agreements.",
                                    "<strong>Transparency:</strong> Provides clear, readable explanations of complex legal logic and system outputs, ensuring users understand the implications of their contracts.",
                                    "<strong>Integrity:</strong> Ensures generated contracts are compliant with Dubai's legal framework (e.g., Ejari timelines, RDC dispute paths), maintaining the highest standards of legal validity and preventing errors."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-2',
                            title: '4.2. EBRAMGPT™ Functionality (Bi-directional Language, Context-Aware Drafting, AI Clause Suggestions, Group Negotiations)',
                            content: [
                                {type: 'paragraph', text: 'EBRAMGPT™ offers a comprehensive suite of functionalities that empower users throughout the real estate legal lifecycle, from initial drafting to ongoing management and dispute resolution:'},
                                {type: 'list', items: [
                                    "<strong>Bi-directional Language Conversion:</strong> Seamlessly translates natural language (Arabic, English, Russian, Chinese, or any other major language) into valid EBRAM™ smart clauses and the underlying Python code. Conversely, users can click on any code or clause within the system to receive a clear, readable explanation in their chosen language. This breaks down language barriers and democratizes legal access for a global clientele.",
                                    "<strong>Context-Aware Drafting:</strong> Integrates deep knowledge of Dubai's specific legal rules (e.g., Ejari timelines and Rental Dispute Settlement Centre (RDC) dispute paths) to ensure generated contracts are always compliant, accurate, and relevant to the local regulatory landscape. This prevents common errors and enhances legal robustness.",
                                    "<strong>AI Clause Suggestions & Risk Warnings:</strong> Proactively enhances contract drafting by recommending missing protections (e.g., suggesting a clause for a maintenance Service Level Agreement (SLA) if one is absent, based on best practices and historical data). It also intelligently identifies and flags potential risks, warning users if proposed terms might violate regulations like RERA guidelines or create future legal vulnerabilities. This predictive logic learns from prior agreements and can explain its reasoning.",
                                    "<strong>Information Retrieval and Transparency (EBRAMDATA Interpreter):</strong> Serves as an \"EBRAMDATA Interpreter,\" connecting directly to the full on-chain history of user behavior, property risk, and token logic. Users can retrieve the complete, timestamped transaction history of any EBRAMINTED™ property, making it a \"public treasure\" of verifiable data and significantly enhancing market confidence. It functions as a \"reputation explorer,\" pulling contract behavior, dispute logs, and late payments, while also explaining legal consequences with transparency.",
                                    "<strong>Unified Access and Integration:</strong> Accessible through various user-friendly formats, including a mobile GPT chat within the UNIVESTOR Wallet™ app, a web GPT terminal inside the DLD dashboard, and a developer API mode for legal tech platforms. It also offers voice access in Arabic with built-in clause transcription, ensuring broad accessibility and ease of use across diverse user preferences. The system is linked in real-time to EBRAMDATA, DLDCHAIN™ (for verification and title registry), Mashroi™ (for legal knowledge training and certification), and DXBTOKENS™ (for token liquidity and fractional ownership implications), ensuring a holistic and interconnected intelligence.",
                                    "<strong>AI-Coordinated Group Negotiations:</strong> Facilitates multi-party sessions, allowing buyers, agents, and developers to negotiate terms collaboratively in a transparent and guided environment. This allows \"single conversation or multi-user conversation that acts as an agreement draft\". Chat discussions are linked to property metadata for context memory, ensuring the conversation directly contributes to the evolving agreement. It also supports \"Clause Voting Logic\" for fractional token co-owners to collectively vote on changes, democratizing governance.",
                                    "<strong>Risk Rating & Behavioral Logic System:</strong> Introduces a dynamic behavioral scoring system for every actor (tenants, owners, buyers, brokers) in the ecosystem, creating data-backed risk profiles based on their on-chain history and interactions. It can automatically adjust payment plans and clauses based on these risk profiles and provide historical disclosure notices about past disputes or penalties. Users can query EBRAMGPT™ to understand their risk status and how to improve it, fostering responsible behavior and enhancing market integrity."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-3',
                            title: '4.3. Technical Implementation',
                            content: [
                                {type: 'paragraph', text: '(Placeholder for future expansion) This section will detail the underlying technical architecture of EBRAMGPT™, including:'},
                                {type: 'list', items: [
                                    "The Large Language Model (LLM) architecture and fine-tuning process for legal domain expertise, specifically tailored to UAE law and DLD regulations.",
                                    "Integration points with DLDCHAIN™ for real-time data access (EBRAMDATA, EBRAM™'s AI-Weighted Node System), detailing API protocols and data synchronization mechanisms.",
                                    "API design for seamless interaction with the UNIVESTOR Wallet™ and developer platforms, including authentication and rate limiting.",
                                    "Security measures for handling sensitive legal and personal data, including data anonymization, homomorphic encryption for confidential AI processing, and privacy-preserving AI techniques.",
                                    "Scalability strategy for processing numerous concurrent natural language requests and maintaining real-time responsiveness for millions of users.",
                                    "Ethical AI guidelines and monitoring frameworks to ensure fairness and prevent bias in legal recommendations."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-4',
                            title: '4.4. Integration with DLDCHAIN™',
                            content: [
                                {type: 'paragraph', text: "EBRAMGPT™ serves as the intelligent user-facing layer that connects stakeholders directly to the core functionalities of DLDCHAIN™. It bridges the gap between complex blockchain operations and intuitive user experiences."},
                                {type: 'list', items: [
                                    "<strong>Contract Lifecycle Automation:</strong> EBRAMGPT™ facilitates the initiation and management of smart contracts across the entire real estate lifecycle, from drafting to execution and dispute handling. It serves as the primary tool for creating and modifying EBRAM™ contracts.",
                                    "<strong>Data-Driven Insights:</strong> By integrating with EBRAMDATA and EBRAM™'s AI-Weighted Node System, EBRAMGPT™ provides users with real-time, explainable insights into property valuations, risk profiles, and market dynamics. This empowers informed decision-making.",
                                    "<strong>Compliance Gateway:</strong> It guides users through compliant processes, ensuring that all actions taken via natural language align with DLD and VARA regulations, acting as a built-in compliance check before on-chain execution."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-5',
                            title: '4.5. Flowchart: EBRAMGPT™ Workflow in DLDCHAIN™',
                            content: [
                                {type: 'paragraph', text: "(Conceptual) This section would feature a flowchart illustrating the EBRAMGPT workflow."}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-5',
                    title: "DXBTOKENS™: Property Tokenization Protocol",
                    introduction: [{type: 'paragraph', text: "DXBTOKENS™ represent a fundamental paradigm shift in real estate ownership and liquidity in Dubai. They are the visible, tradable UX expression of what EBRAM™ governs. These tokens digitize real estate into a fractionalized token economy where 1 square foot equals 1 token, aiming to revolutionize property ownership and investment by making previously illiquid assets highly accessible and liquid."}],
                    articles: [
                        {
                            id: 'article-5-1',
                            title: '5.1. DXBTOKENS™ Technical Definition',
                            content: [
                                {type: 'paragraph', text: "DXBTOKENS™ are native, verifiable shares of physical, DLD-registered properties. They are designed as pure value units of real estate ownership, unlinked from rental streams or ROI promises, ensuring stability and focusing on capital appreciation."},
                                {type: 'list', items: [
                                    "<strong>Asset-Backed:</strong> Each DXBTOKEN™ is cryptographically backed by a corresponding portion of a real-world property unit, meticulously vetted and verified by DLD. This direct linkage provides inherent value and trust, differentiating it from purely speculative digital assets.",
                                    "<strong>Non-Yield Focused:</strong> Unlike many traditional property tokens or REITs, DXBTOKENS™' primary value is derived from the underlying asset's appreciation, not its rental income. Rental income is considered a secondary byproduct, managed separately via an optional income pool, ensuring the token's value is insulated from tenancy fluctuations and operational complexities.",
                                    "<strong>Fractionalized Ownership:</strong> The \"1 sqft = 1 token\" model allows for granular, fractional ownership, democratizing access to high-value real estate for a broader range of investors, including those with smaller capital allocations (e.g., as low as AED 2,000 in initial pilots).",
                                    "<strong>Immutable Linkage:</strong> Each DXBTOKEN™ is immutably linked to its corresponding EBRAMINTED™ asset's digital identity (CDID), ensuring verifiable provenance and integrity from its inception on the DLDCHAIN™."
                                ]}
                            ]
                        },
                        {
                            id: 'article-5-2',
                            title: '5.2. Tokenization Process: Minting and Lifecycle Management',
                            content: [
                                {type: 'paragraph', text: "The tokenization process for DXBTOKENS™ is a rigorous, transparent, and exclusively controlled lifecycle managed by DLDCHAIN™, ensuring compliance and trust from inception to market. This multi-stage process ensures legal finality and financial backing before any token enters the market."},
                                {type: 'list', items: [
                                    "<strong>Asset Planning & Creation:</strong> This initial off-chain stage involves the meticulous legal and financial structuring of the property asset. Typically, a Special Purpose Vehicle (SPV) or a trust is created to legally hold the title deed of the physical property. This legal entity then becomes the subject of tokenization, ensuring a clear legal link between the digital token and the physical asset.",
                                    "<strong>Project Vetting:</strong> Only \"mega-projects with unique concepts and sound financials, from DLD-approved developers,\" are eligible for tokenization. This stringent vetting process includes strict criteria such as a \"minimum 20-year management contract and robust governance frameworks\". This ensures the integrity, long-term viability, and inherent value of all tokenized assets entering the DLDCHAIN™ ecosystem, protecting investors from speculative or unsound projects and maintaining market quality.",
                                    "<strong>DLDCHAIN™ as Sole Minting Authority:</strong> Upon official DLD approval, the vetted project is tokenized into a predetermined number of DXBTOKENS™ (e.g., 1 Billion). The sole authority for minting these tokens rests with DLDCHAIN™, ensuring centralized control, regulatory compliance, and a single source of truth from the very moment of creation. This prevents unauthorized token issuance and maintains market integrity.",
                                    "<strong>Developer Allocation:</strong> An agreed percentage of minted tokens is directly allocated into a DLD-monitored escrow wallet of the developer, ensuring accountability and secure handling of assets. For the pre-owner (developer or individual), after tokenization and initial liquidity provision into a pool, they retain 50% as liquid funds and 45% as tradable DXBTOKENS™.",
                                    "<strong>Launch Price Determination:</strong> Initial price of DXBTOKENS™ is calculated by dividing the DLD-verified project valuation at launch by the total token supply. By default, one token is priced as one square foot of the property. For example, a 1,000 sqft apartment valued at AED 1 million would equate to 1,000 tokens, with each token initially priced at AED 1,000.",
                                    "<strong>EBRAMINT™ Activation:</strong> The EBRAMINT™ process formally finalizes and publishes the property's smart contract onto the DLDCHAIN™ blockchain, creating its immutable digital identity. A DXBTOKEN™ can only be issued from an asset finalized as an EBRAMINTED™ asset. This is the critical step that binds the digital token to its physical asset and legal framework.",
                                    "<strong>Transparency:</strong> All governance rules and major decisions related to DXBTOKENS™, from their issuance to their trading parameters, are \"documented on-chain\", providing an auditable and immutable record that significantly enhances trust among all participants. This on-chain transparency enables comprehensive regulatory oversight."
                                ]}
                            ]
                        },
                        {
                            id: 'article-5-3',
                            title: '5.3. Technical Specifications of DXBTOKEN™ Standard',
                            content: [
                                {type: 'paragraph', text: "The DXBTOKEN™ standard is a specialized implementation designed for real estate assets on Hyperledger Fabric, adhering to principles of fungibility (within a given property pool) and traceability."},
                                {type: 'list', items: [
                                    "<strong>Token Standard:</strong> While not a direct ERC-20, it conceptually aligns with fungible token standards, adapted for Fabric's chaincode environment. Each token represents a precise fractional unit (1 sqft).",
                                    "<strong>Metadata:</strong> Each DXBTOKEN™ carries rich, immutable metadata directly linked to its CDID, including:",
                                    "propertyCDID: Unique identifier of the underlying property.",
                                    "unit_sqft: The exact square footage represented by the token (always 1).",
                                    "property_type: (e.g., Residential, Commercial, Parking).",
                                    "current_status: (e.g., Off-Plan, Ready, Mortgaged, EBRAMINTED™).",
                                    "linked_ebram_contract: Reference to the governing EBRAM™ smart contract.",
                                    "make_pool_id: Reference to the MAKE™ pool providing liquidity.",
                                    "developer_id: Verified ID of the developer (for off-plan).",
                                    "handover_date: For off-plan properties.",
                                    "<strong>Supply Management:</strong> Total supply for a property's token pool is fixed based on its square footage. Minting occurs only upon MAKE_ID event.",
                                    "<strong>Transferability:</strong> DXBTOKENS™ are transferable between UNIVESTOR Wallets™ within the DLDCHAIN™ marketplace, subject to compliance checks and state-based rules (e.g., not transferable if property is under legal hold)."
                                ]}
                            ]
                        },
                        {
                            id: 'article-5-4',
                            title: '5.4. Smart Contract Logic for Token Lifecycle',
                            content: [
                                {type: 'paragraph', text: "The lifecycle of DXBTOKENS™ is governed by intricate smart contract logic primarily residing within the EBRAM™ Chaincode and MAKE™ System Chaincode on Hyperledger Fabric."},
                                {type: 'list', items: [
                                    "<strong>Minting Logic:</strong>",
                                    "Triggered by EBRAMINT™ and confirmed by MAKE_ID.",
                                    "Ensures 1 sqft = 1 token conversion based on verified property size.",
                                    "Distributes tokens according to predefined allocation rules (e.g., 40% owner, 55% market, fees).",
                                    "<strong>Conceptual Chaincode Function (within MAKE™ System Chaincode):</strong>",
                                ]},
                                {type: 'code', text: "// Simplified Go Chaincode function for token minting during MAKE_IN\nfunc (s *SmartContract) MintDXBTokens(ctx contractapi.TransactionContextInterface, poolId string, ownerAddress string, marketAddress string, totalSqFt uint256) error {\n    // ... authorize only EBRAM™ to call this ...\n    // Check if poolId is in MAKE_ID status\n    // ...\n    // Perform actual token minting\n    // Example: DXBTOKEN_Contract.Mint(poolId, totalSqFt); // Mints totalSqFt tokens for this pool\n    // Distribute minted tokens\n    // DXBTOKEN_Contract.Transfer(poolId, ownerAddress, totalSqFt * 40 / 100);\n    // DXBTOKEN_Contract.Transfer(poolId, marketAddress, totalSqFt * 55 / 100);\n    // ... distribute fees ...\n    return nil\n}"},
                                {type: 'list', items: [
                                    "<strong>Transfer Logic:</strong>",
                                    "Standard token transfer functions (e.g., transfer(from, to, amount)).",
                                    "Enforces enforceNonDualRights modifier: trade = true → owner = false. If a token is being traded (in escrow), it cannot be simultaneously claimed by an individual owner for utility.",
                                    "Integrates with KYC/AML checks via UNIVESTOR Wallet™ and CBUAE APIs.",
                                    "<strong>Burning/Retirement Logic:</strong>",
                                    "Triggered by MAKE_DISMISS event (e.g., 90%+ stake acquisition, legal settlement).",
                                    "Removes tokens from circulation, conceptually signaling the property's exit from the tokenized liquidity pool.",
                                    "<strong>Escrow State Management:</strong>",
                                    "The DXBToken struct tracks owner, tradeEnabled, escrowed, and linkedPool to manage the ownership vs. escrowship states.",
                                    "Functions like setTokenState() (callable only by EBRAM™) manage these transitions.",
                                    "<strong>Rental Distribution Logic (Optional):</strong>",
                                    "If rentEnabled flag is true in the TokenPool struct, EBRAM™ triggers distributeRent() function.",
                                    "This function calculates and distributes rental income proportionally to token holders, pool officer, EBRAM™, and service manager, without affecting the token's core value."
                                ]}
                            ]
                        },
                        {
                            id: 'article-5-5',
                            title: '5.5. Security Audits and Formal Verification',
                            content: [
                                {type: 'paragraph', text: "The security of DXBTOKENS™ smart contracts is paramount, given their direct representation of real-world assets."},
                                {type: 'list', items: [
                                    "<strong>Rigorous Auditing:</strong> All DXBTOKENS™ chaincode will undergo multiple, independent security audits by specialized blockchain security firms. These audits focus on identifying vulnerabilities like re-entrancy, access control flaws, integer overflows, and logical errors.",
                                    "<strong>Formal Verification:</strong> For critical functions (e.g., minting, burning, core transfer logic, escrow state transitions), formal verification methods will be applied. This involves mathematically proving the correctness of the smart contract code against formal specifications, ensuring the absence of specific bugs and adherence to security properties.",
                                    "<strong>Continuous Testing:</strong> Integration into CI/CD pipelines with automated unit, integration, and system tests (including fuzz testing and symbolic execution) to continuously validate the security and functionality of the DXBTOKENS™ contracts.",
                                    "<strong>Bug Bounty Programs:</strong> Implementation of bug bounty programs to incentivize ethical hackers to discover and report vulnerabilities, enhancing the security posture.",
                                    "<strong>Version Control & Upgradeability:</strong> Strict version control and a robust upgrade mechanism (e.g., proxy patterns for Solidity, or chaincode upgrade procedures for Fabric) will be in place, allowing for secure updates and bug fixes without compromising the immutability of historical data."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-6',
                    title: "MAKE™ System: The Sovereign Liquidity Backbone (Technical Deep Dive)",
                    introduction: [{type: 'paragraph', text: "The MAKE™ System is DLDCHAIN™'s sovereign financial layer, meticulously designed to govern liquidity for tokenized real estate. It functions as an internal liquidity infrastructure, operating as a non-public, non-tradeable, and strictly permissioned subsystem. MAKE™ acts as the fundamental liquidity foundation behind every DXBTOKEN™ issuance and transaction. Its primary purpose is to enable secure, regulated, and highly efficient on-chain trading and liquidity for Dubai’s tokenized real estate, where every property is represented as a DXBTOKEN™ and every transaction is governed by the intelligent interplay of EBRAM™ and MAKE Systems™."}],
                    articles: [
                        {
                            id: 'article-6-1',
                            title: '6.1. MAKE™ System Architecture (Internal Infrastructure, Air-Gapped)',
                            content: [
                                {type: 'paragraph', text: 'The MAKE™ System is architected for maximum security, control, and efficiency, embodying the principle: "In a market of speculation, MAKE™ is certainty".'},
                                {type: 'list', items: [
                                    "<strong>Internal Liquidity Infrastructure:</strong> It is a closed system, not a public market, responsible for backing every tokenized asset with 100% AED liquidity.",
                                    "<strong>Non-Public & Permissioned:</strong> MAKE™ is strictly non-public, non-tradeable, and permissioned. Its separate explorer and interface are visible only to MakeD Wallets™ and authorized signers. This \"air-gapped security\" isolates it from external market volatility and speculative influences.",
                                    "<strong>Managed by Liquidity Pool Officers (LPOs):</strong> LPOs (regulated financial institutions, DLD-owned branches, government-certified MAKE™ Nodes) are the verified MAKE™ signers responsible for initiating and confirming liquidity issuance.",
                                    "<strong>Custodian of Liquidity:</strong> LPOs become the legal and financial custodians of the property’s liquidity cycle upon a MAKE™ Event™. They guarantee the liquidity behind the tokens."
                                ]}
                            ]
                        },
                        {
                            id: 'article-6-2',
                            title: '6.2. MAKE™ Smart Contracts™ (Purpose, Characteristics, Non-Public)',
                            content: [
                                {type: 'paragraph', text: "Every MAKE™ Event™ generates a unique, dedicated MAKE™ Smart Contract™ tied to the specific tokenized property. These contracts are the operational backbone of the MAKE™ System, executing the precise terms of liquidity provision with absolute certainty."},
                                {type: 'list', items: [
                                    "<strong>Contract Characteristics:</strong>",
                                    "Tied to Property CDID, Pool ID, and LPO’s MakeD Wallet™.",
                                    "Includes trading permissions and compliance rules.",
                                    "Non-Public: Not searchable on public blockchain explorers.",
                                    "Signer-Only Access: Strictly limited to LPO and DLDCHAIN™ governance with MAKE™ authentication.",
                                    "Uninterruptible Flow: Once confirmed, it maintains an uninterruptible flow, terminable only by EBRAM™ or the originating LPO under predefined conditions.",
                                    "<strong>Liquidity Coverage Logic:</strong> A fundamental principle: \"No liquidity = no token.\" Every token pool is 100% backed on-chain, confirmed via the MAKE™ node and reported to EBRAM™, ensuring full collateralization by real AED."
                                ]}
                            ]
                        },
                        {
                            id: 'article-6-3',
                            title: '6.3. MAKE™ Event Lifecycle (MAKELIST, MAKETRADE, MAKE_ID, MAKE_IN, MAKE_OUT, MAKE_DISMISS – detailed logic and transitions)',
                            content: [
                                {type: 'paragraph', text: 'The MAKE™ System orchestrates the entire liquidity lifecycle for tokenized properties, ensuring seamless transition from tokenization to market trading. This process is highly structured and governed by specific events, ensuring strict adherence to protocol rules and maintaining the "token = true = owner" principle. EBRAM™ is the absolute ruler of state transitions; no MAKE™ event can override or conclude EBRAMINT™ — only EBRAM™ can.'},
                                {type: 'list', items: [
                                    "<strong>1. MAKELIST (Event: Token Candidate Listing):</strong> Writer: No (Status-only event). Description: An EBRAM™-qualified property is listed as a candidate for tokenization on a MAKELIST. This is a status-only event created by EBRAM™ and approved by a DLDLOG (silent signature). It indicates a property is eligible for liquidity but not yet funded. The property is still owned by the original owner. Code Implication: TokenState.MakeListed",
                                    "<strong>2. MAKETRADE (Event: Pool Interest Expressed):</strong> Writer: No (Status-only event). Description: A MAKE™-compatible liquidity pool signals its intent to acquire/escrow a token from the MAKELIST. This is a non-binding request, merely logged by the system as a signal of interest. No capital is locked yet. Code Implication: Internal signaling, not directly altering TokenPool status from MakeListed.",
                                    "<strong>3. MAKE_ID (Event: Liquidity Commitment & Token Registration):</strong> Writer: Yes (Writes to asset structure). Description: This is the pivotal writer event. A Liquidity Pool Officer (LPO) signs the MAKE™ transaction, depositing 100% of the unit's AED value into a dedicated, unit-bound liquidity pool. This confirmed acquisition triggers the EBRAM™ Core Engine to execute the MAKE_ID event. This is the moment the property genuinely becomes an on-chain tokenized asset under MAKE™ permission rules. This is where the token ID is formally registered, and the property is converted into its on-chain tokenized form under MAKE™ permission rules. Effect on Ownership: Ownership of the property is formally transferred to the TokenPool (under the LPO's custodianship). The original owner receives 60% of property value in AED as instant liquidity, and 40% as tradable DXBTOKENS™. Code Implication: TokenState.MakeID. This is where _mint() function logic for DXBTOKENS™ would execute, creating the tokens and assigning initial ownership/distribution.",
                                ]},
                                {type: 'code', text: "// Simplified core logic for MAKE_ID within EBRAMTokenPool contract\n// This function would be called by EBRAM™ (onlyEBRAM modifier)\nfunction makeID(bytes32 poolId) external onlyEBRAM {\n    TokenPool storage pool = pools[poolId];\n    require(pool.status == Status.MakeListed, \"Invalid status: Must be MakeListed to confirm ID\");\n    // Perform 100% AED deposit verification here (off-chain oracle-confirmed or direct transfer check)\n    // Example: require(IMakeConnector(makeConnector).isFunded(poolId), \"Pool not fully funded\");\n    pool.status = Status.MakeID;\n    // Conceptual step: Ownership of the physical property asset is transferred to the pool's legal entity.\n    // DXBTOKENS™ are now considered 'registered' by MAKE™, ready for release via MAKE_IN.\n    emit MakeIDConfirmed(poolId);\n}"},
                                {type: 'list', items: [
                                    "<strong>4. MAKE_IN (Event: Token Enters Escrow & Activates for Trading):</strong> Writer: No (Status-only event). Description: The token, now registered via MAKE_ID, is transferred into a market-tradeable state by being accepted into a verified MAKEPOOL™. The original owner receives 60% of property value in AED as instant liquidity, and 40% as tradable DXBTOKENS™. The remaining tokens are allocated for market offering, fees, and service pools. The token ownership is formally moved to the Liquidity Pool Officer (LPO) as custodian. This is not an ownership transfer to the LPO; rather, the LPO assumes custodial responsibility for the tradable asset within the pool. Effect on Ownership: The token's ownership is now \"escrowed.\" It is controlled by the MAKEPOOL Officer (as the custodian of the tradable pool), not directly by the individual owner. The individual owner holds tradable DXBTOKENS™ (fractional rights to the pool's value), but not direct property ownership or physical utility rights. The token enters the EBRAM™ Watcher Loop. There is no public sale or trading before MAKE-IN. All trading layers are recorded on top of MAKE-IN transaction. Code Implication: TokenState.MakeIn. This is where _transfer() calls for DXBTOKEN™ distribution happen, moving tokens from a general pool to individual owner/market participant addresses.",
                                ]},
                                {type: 'code', text: "// Simplified core logic for MAKE_IN within EBRAMTokenPool contract\n// This function would be called by EBRAM™ (onlyEBRAM modifier)\nfunction makeIn(bytes32 poolId) external onlyEBRAM {\n    TokenPool storage pool = pools[poolId];\n    require(pool.status == Status.MakeID, \"Invalid status: Must be MakeID for MakeIn\");\n    // Logic to distribute DXBTOKENS™ to original owner and other allocations\n    // Example: DXBTOKEN_Contract.transfer(originalOwnerAddress, pool.totalTokens * 40 / 100);\n    // Example: DXBTOKEN_Contract.transfer(marketPoolAddress, pool.totalTokens * 55 / 100);\n    pool.status = Status.MakeIn;\n    // Activate EBRAM™ Watcher for this pool in the broader EBRAM™ system\n    emit MakeInConfirmed(poolId);\n}"},
                                {type: 'list', items: [
                                    "<strong>5. MAKE_OUT (Event: Temporary Exit from Liquidity Lock):</strong> Writer: No (Status-only event, unless part of a broader EBRAM™ D-EBRAMINT™). Description: This event temporarily detaches DXBTOKENS™ from their active liquidity pool contract, pausing trading for specific purposes (e.g., legal hold, owner request for direct sale outside the pool, property restructuring). It's a temporary pause or a procedural step towards D-EBRAMINT™ (De-EBRAMINT™). Effect on Ownership: Tokens are unbound from the active liquidity contract but retain their EBRAMINTED™ status. Ownership remains with the MAKEPOOL (custodially), but trading is halted. The tokens can be moved, but not traded on the primary market. Code Implication: TokenState.MakeOut. Triggers conditional logic to freeze trading and update the token's status.",
                                ]},
                                {type: 'code', text: "// Simplified core logic for MAKE_OUT within EBRAMTokenPool contract\n// This function would be called by EBRAM™ (onlyEBRAM modifier)\nfunction makeOut(bytes32 poolId) external onlyEBRAM {\n    TokenPool storage pool = pools[poolId];\n    require(pool.status == Status.MakeIn, \"Invalid status for MakeOut\");\n    // Logic to temporarily halt trading for these tokens\n    // Example: DXBTOKEN_Contract.pauseTrading(poolId); // if token contract has this\n    pool.status = Status.MakeOut;\n    emit MakeOutExecuted(poolId);\n}"},
                                {type: 'list', items: [
                                    "<strong>6. MAKE_DISMISS (Event: Final Exit & D-EBRAMINT™ Execution):</strong> Writer: Yes (Writes to asset structure, executes D-EBRAMINT™). Description: This is the ultimate finalization event for a tokenized property's lifecycle within the DLDCHAIN™. It represents the formal closure of the entire token pool inside EBRAM™ and performs a D-EBRAMINT™ (De-EBRAMINT™), ending the sovereign contract system for that tokenized property. This is triggered by a 90%+ ownership stake claim by a single entity, legal settlement, or pool expiration/timeout. It effectively \"un-tokenizes\" the property from the MAKE™ system. Effect on Ownership: Ownership is finally transferred from the MAKEPOOL's custodial role to the new, 100% legal owner (the one who acquired 90%+ of the tokens). The tokenized status of the property ends under the current EBRAMINT™, and the property is effectively returned to its raw legal state or re-registered under a new EBRAMINT™ if resold traditionally. The token itself is conceptually \"burned\" or retired from the active tokenization system. Code Implication: TokenState.MakeDismissed. This would trigger a D-EBRAMINT™ procedure in the main EBRAM™ contract.",
                                ]},
                                {type: 'code', text: "// Simplified core logic for MAKE_DISMISS within EBRAMTokenPool contract\n// This function would be called by EBRAM™ (onlyEBRAM modifier)\nfunction makeDismiss(bytes32 poolId) external onlyEBRAM {\n    TokenPool storage pool = pools[poolId];\n    require(pool.status == Status.MakeOut || pool.status == Status.MakeIn, \"Invalid status for MakeDismiss\"); // Can dismiss from active or paused\n    // Trigger D-EBRAMINT™ procedure in main EBRAM™ contract\n    // Example: EBRAM_Main_Contract.deEbramint(pool.property, newOwnerAddress); // Transfer ownership of underlying asset\n    // Logic to perform MPT (Market Price Transaction) and finalize funds distribution\n    pool.status = Status.MakeDismissed;\n    // Optionally, clear pool data or mark for archival\n    emit MakeDismissed(poolId);\n}"}
                            ]
                        },
                        {
                            id: 'article-6-4',
                            title: '6.4. Liquidity Pool Structure and Ownership Escrowship Logic (Technical Breakdown of Pool-as-Signer vs. Ownership)',
                            content: [
                                {type: 'paragraph', text: "The MAKE™ System operates on a sophisticated \"Pool-as-Signer\" model, fundamentally differentiating ownership from direct control and utility. This ensures cryptographic security, legal clarity, and privacy within the tokenized real estate market."},
                                {type: 'list', items: [
                                    "<strong>MAKEPOOL Concept:</strong> A MAKEPOOL is not a wallet in the traditional sense, nor is it a direct legal owner of the physical property. It's a secure, on-chain asset vault and transaction engine specifically associated with a tokenized property. It acts like a bank account with predefined rules, multiple stakeholders, and specific thresholds, managed by the Liquidity Pool Officer.",
                                    "<strong>Pool Creator as Signer:</strong> The \"Pool Creator\" (the Liquidity Pool Officer) is a \"permissioned signer,\" not an owner. They sign the MAKE-TRADE request and become the permanent signer for that pool, but they cannot own or withdraw the token directly. Their role is to attest to the liquidity backing and facilitate trades, not to hold beneficial ownership.",
                                    "<strong>Escrow Ownership (Escrowship):</strong> When tokens are within the MAKE™ System, their ownership is in an \"escrowship\" state. This means the token is held by the MAKE™ System (via its smart contracts) as a legal holder, not by a specific individual user or the Pool Officer as an owner with full, direct property rights. This escrowed state is non-usable and non-civil-active; for instance, the escrowed entity or token holder cannot apply for DEWA, create rental contracts, or physically access the property. \"Escrowship ≠ Utility ≠ Rental Rights.\"",
                                    "<strong>Security Lock (Signer ≠ Owner):</strong> This fundamental security principle is cryptographically enforced: \"Signer ≠ Owner,\" \"Signer = Trade Authority,\" and \"Signer ≠ Resale Permission\". A token cannot be both tradeable and legally owned by an individual simultaneously. If a token is in an escrowed state for trading, its ownership is temporarily \"nullified\" or held by the system's escrow logic. Only when ownership is fully restored to an individual (via EBRAM™ MAKE-OUT or D-EBRAMINT™) can the token cease being traded within the pool, and then it becomes eligible for full legal ownership rights. This prevents dual claims, unauthorized use, and maintains integrity."
                                ]},
                                {type: 'code', text: "// DLDCHAIN™ Cryptographic Security Rule: trade = true --> owner = false\n// Enforces that a token cannot be both tradable and have a direct legal owner simultaneously.\n// This modifier would be used in functions that alter token state based on trading or ownership.\nmodifier enforceNonDualRights(uint tokenId) {\n    // Assume dxbTokens is a mapping (uint => DXBToken) storing the state of each token\n    DXBToken storage token = dxbTokens[tokenId];\n\n    // Rule 1: If token is tradable, its owner must be the system's escrow (address(0) or a specific escrow contract)\n    if (token.tradeEnabled == true) {\n        require(token.owner == address(0), \"Error: Tradable token cannot have an individual owner (must be escrowed).\");\n    }\n    // Rule 2: If token has an individual owner, it cannot be tradable\n    if (token.owner != address(0)) {\n        require(token.tradeEnabled == false, \"Error: Owned token cannot be actively traded in pool.\");\n    }\n    _; // Continue with the function execution if rules are met\n}\n\n// Example of a simplified DXBToken struct and state transitions (conceptual)\nstruct DXBToken {\n    address owner;        // Address of the legal owner (Level 1); address(0) if in escrow/trading\n    bool tradeEnabled;    // True if in trading/escrow (Level 2); false if directly owned\n    bool escrowed;        // True if currently managed by a MAKE™ pool\n    address linkedPool;   // Address of the MAKE™ pool if escrowed\n}\n\n// Function to set token state based on ownership/escrowship (called only by EBRAM™)\nfunction setTokenState(uint tokenId, address _newOwner, bool _isTradeable, address _linkedPool) public onlyEBRAM {\n    DXBToken storage token = dxbTokens[tokenId];\n    // Apply non-dual rights enforcement logic from the modifier conceptually here\n    require((_isTradeable && _newOwner == address(0)) || (!_isTradeable && _newOwner != address(0)), \"Invalid owner/tradeable state transition.\");\n\n    token.owner = _newOwner;\n    token.tradeEnabled = _isTradeable;\n    token.escrowed = _isTradeable; // Escrowed implies tradeable\n    token.linkedPool = _linkedPool;\n}\n\n// Rental eligibility check: No Renting from Escrow Pools\n// \"Escrowship ≠ Utility ≠ Rental Rights\"\nfunction isRentable(uint256 tokenId) public view returns (bool) {\n    DXBToken memory token = dxbTokens[tokenId];\n    // Only tokens that are not escrowed (i.e., directly owned by an individual) can enable rental\n    if (token.escrowed == true) {\n        return false; // Escrowed tokens cannot enable rental utility\n    }\n    // Further checks for legal owner status via EBRAM™'s legal module (not shown here)\n    return true;\n}"}
                            ]
                        },
                        {
                            id: 'article-6-5',
                            title: '6.5. MAKE™ Security & Confidentiality (Air-Gapped, AI-Audited, Sovereign Logic Freeze)',
                            content: [
                                {type: 'list', items: [
                                    "<strong>Air-Gapped Operation:</strong> The core MAKE™ System's financial operations are conceptually \"air-gapped\" from public trading layers, isolating them from market volatility and speculative influences. This physical and logical separation enhances security.",
                                    "<strong>AI-Audited:</strong> AI models continuously monitor MAKE™ transactions for anomalies, flagging suspicious activity that might indicate fraud or market manipulation.",
                                    "<strong>Sovereign Logic Freeze:</strong> In extreme scenarios, the DLDCHAIN™ governance (EBRAM™) can enforce a \"sovereign logic freeze\" on MAKE™ Wallets™ or pools, preventing any unauthorized fund movement without dual-sign from the Liquidity Officer and an EBRAM™ node."
                                ]}
                            ]
                        },
                        {
                            id: 'article-6-6',
                            title: '6.6. Limited Interoperability (Technical implications of isolation)',
                            content: [
                                {type: 'paragraph', text: "MAKE™ is designed with limited interoperability by default to ensure its integrity and security. The technical implications of this isolation include:"},
                                {type: 'list', items: [
                                    "No direct integration with public DeFi protocols, preventing exposure to external smart contract risks.",
                                    "Controlled bridging of assets to other blockchains would require a highly secure, DLD-audited oracle and smart contract gateway.",
                                    "Data sharing with external systems is managed through a strict API gateway with granular permissions."
                                ]}
                            ]
                        }
                    ]
                },
            ]
        }
    ],
    conclusion: {
        id: 'tech-conclusion',
        title: "Conclusion",
        content: [
            {type: 'paragraph', text: 'This book will conclude by summarizing the key technical innovations of DLDCHAIN™, reiterating its potential to revolutionize the real estate industry through a combination of sovereign governance, blockchain security, and AI-driven intelligence.'}
        ]
    },
    appendices: [
        {
            id: 'appendix-a',
            title: "Appendix A: DLDCHAIN™ Property Tokenization Smart Contract (Full)",
            content: [
                {type: 'paragraph', text: 'This appendix provides the full, unabridged pseudo-code or Go Chaincode for the DLDCHAINPropertyTokenization smart contract, detailing all functions, state variables, events, and modifiers.'},
                {type: 'code', text: '... Full Smart Contract Code ...'}
            ]
        },
        {
            id: 'appendix-b',
            title: 'Appendix B: DLDCHAIN™ Governance Model (Detailed)',
            content: [
                {type: 'paragraph', text: 'This section offers a detailed breakdown of the DLDCHAIN™ governance model, including the specific roles and responsibilities of the Governing Council and the Technical Committee, as well as the on-chain voting mechanisms for proposals and network upgrades.'},
            ]
        },
        {
            id: 'appendix-simulations',
            title: "Appendix C: DLDCHAIN™ Simulation: Real-World Tokenization Scenarios",
            content: [
                {type: 'paragraph', text: "This appendix provides a detailed, step-by-step walkthrough of distinct tokenization cases, demonstrating how DLDCHAIN™ seamlessly integrates its core components—EBRAM™, DXBTOKENS™, the MAKE™ System, Mashroi™, and the UNIVESTOR Wallet™—to unlock liquidity, ensure trust, and streamline transactions for individual owners, mortgaged properties, and major developers. These scenarios highlight DLDCHAIN™’s versatility, precision, and its unique ability to bring digital sovereignty to every corner of Dubai’s real estate market."},
                {type: 'subheading', text: "Scenario 1: Ahmed's Apartment (Secondary Sale – Ready Property)"},
                {type: 'paragraph', text: "<strong>Context:</strong> Ahmed Al Zaabi owns a ready apartment in Dubai Marina. He wants to sell it quickly without a traditional, lengthy listing process. He opts for tokenization to unlock immediate liquidity and tap into a broader investor base."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Apartment, Dubai Marina",
                    "<strong>Size:</strong> 825 sqft",
                    "<strong>EBRAM™ Valued Price:</strong> AED 3,200,000",
                    "<strong>Owner:</strong> Ahmed Al Zaabi (Individual)",
                    "<strong>Objective:</strong> Quick sale via tokenization for liquidity."
                ]},
                {type: 'subheading', text: "Scenario 2: Mariam's Villa (Mortgaged Property Sale – Ready Property)"},
                {type: 'paragraph', text: "<strong>Context:</strong> Mariam owns a villa in Arabian Ranches with an active mortgage, 70% of which is paid. She wants to sell it via tokenization to efficiently settle the mortgage and unlock her equity."},
                 {type: 'list', items: [
                    "<strong>Property:</strong> Villa, Arabian Ranches",
                    "<strong>Size:</strong> 1800 sqft",
                    "<strong>EBRAM™ Valued Price:</strong> AED 5,100,000",
                    "<strong>Mortgage Status:</strong> 70% paid. Assuming initial mortgage was AED 3,000,000, 30% remaining = AED 900,000.",
                    "<strong>Owner:</strong> Mariam (Individual)",
                    "<strong>Lender:</strong> DLDCHAIN™-approved financial institution (e.g., Dubai Islamic Bank - DIB).",
                    "<strong>Objective:</strong> Settle mortgage and cash out equity quickly."
                ]},
                {type: 'subheading', text: "Scenario 3: Emaar's Ultra-Luxury Villa (Off-Plan Development)"},
                {type: 'paragraph', text: "<strong>Context:</strong> Emaar is launching a new ultra-luxury project downtown and wants to tokenize its signature top-floor villa to attract early institutional funding and benefit from value appreciation closer to handover."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Top-floor Villa (3 floors), Downtown",
                    "<strong>Size:</strong> 5950 sqft",
                    "<strong>Emaar Asking Price (EBRAM™ Valued Price):</strong> AED 11,000,000",
                    "<strong>Delivery:</strong> 11 months (within the 12-month window for off-plan tokenization).",
                    "<strong>Owner:</strong> Emaar (Developer)",
                    "<strong>Objective:</strong> Unlock early capital, demonstrate value accrual based on construction milestones."
                ]},
                {type: 'subheading', text: "Scenario 4: Investor Acquires Full Stake & Exits/Dismisses Liquidity Pool"},
                {type: 'paragraph', text: "<strong>Context:</strong> An institutional investor (e.g., an International Fund) has been accumulating DXBTOKENS™ from the market for a specific property. They have now acquired a dominant stake (90% or more) and wish to exit the tokenized liquidity pool to take full physical ownership of the property for their portfolio, or to potentially re-list it under a new EBRAMINT™ cycle. This scenario demonstrates the finality and flexibility of DLDCHAIN™'s token lifecycle management."},
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
