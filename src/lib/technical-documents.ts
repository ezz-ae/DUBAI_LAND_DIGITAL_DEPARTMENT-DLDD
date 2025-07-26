
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
        title:string;
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
                type: 'heading',
                text: "A Constitutional Upgrade for Real Estate"
            },
            {
                type: 'paragraph',
                text: "DLDCHAIN is proposed as Dubai's sovereign real estate operating system, a digital infrastructure project intended as a <b class='text-primary'>\"constitutional upgrade\"</b> to how real estate is recorded, verified, transacted, and trusted within Dubai. It is envisioned as a \"world-class level government plan with full governmental integration\" and a \"national protocol\"."
            },
            {
                type: 'paragraph',
                text: "This comprehensive study will delve into all aspects of the DLDCHAIN project, from its genesis and core identity to its technical architecture, implementation roadmap, economic models, and global vision, providing a thorough understanding for strategic decision-making."
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
                    title: 'The Sovereign Vision',
                    introduction: [
                        {type: 'paragraph', text: "The core purpose of DLDCHAIN is to serve as Dubai's <b class='text-primary'>\"sovereign real estate operating system\"</b>, a \"constitutional system for real estate governance in the 21st century\". Its overarching vision is encapsulated in the subline: <span class='highlight'>\"Built by Dubai. Shared with the world.\"</span>"}
                    ],
                    articles: [
                        {
                            id: 'article-1-1-1',
                            title: 'A Dubai-Authored Protocol',
                            content: [
                                {type: 'paragraph', text: 'This emphasizes that it is "Not made in Silicon Valley. Not imported from tech giants. <b class="text-primary">Authored by Dubai. Operated by Dubai. For the world.</b>". The project aims to secure ownership, inspire confidence, and export sovereignty. It is designed as a "real-time transformation model, rooted in law, driven by AI, secured by sovereign authority". The project is positioned as a "master model for global adoption, owned by Dubai".'},
                                {type: 'subheading', text: "Core Tenets of the Vision"},
                                {type: 'list', items: [
                                    "<b>Secure Ownership:</b> Create an unbreakable, single source of truth for property ownership, eliminating ambiguity and fraud.",
                                    "<b>Inspire Confidence:</b> Build a transparent, efficient, and legally robust market that attracts global investors and talent.",
                                    "<b>Export Sovereignty:</b> Develop a replicable model of digital governance that can be adopted by other cities worldwide, establishing Dubai as a global leader."
                                ]}
                            ]
                        },
                        {
                            id: 'article-1-1-2',
                            title: 'Addressing Core Market Challenges',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN is designed to address fundamental challenges within Dubai's traditional real estate market, particularly <b class='text-primary'>\"Information Asymmetry & Data Integrity\"</b> and <b class='text-primary'>\"Transactional Friction & Opacity\"</b>."},
                                {type: 'list', items: [
                                    "<b>Countering Information Asymmetry:</b> By creating a transparent and immutable record of real estate transactions, DLDCHAIN ensures that all stakeholders have access to verified, real-time data, reducing discrepancies and fraud. The integration with existing DLD systems like Ejari and Milka ensures a single source of truth for property information.",
                                    "<b>Reducing Transactional Friction:</b> The system automates various stages of the real estate lifecycle through smart contracts, significantly reducing manual processes, delays, and hidden costs. This includes streamlining agreements, dispute resolution, and advertising control. The goal is to move towards a state where processes like Ejari can \"execute itself\" and rental disputes can be resolved in minutes, rather than going to traditional channels."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-1-2',
                    title: 'System Architecture Overview',
                    introduction: [{type: 'paragraph', text: "DLDCHAIN is designed as a multi-layered architecture, ensuring separation of concerns, security, and scalability. This structure allows for both foundational stability and flexible application development."}],
                    articles: [
                         {
                            id: 'article-1-2-1',
                            title: 'The Foundational Layer',
                            content: [
                                {type: 'paragraph', text: "This layer is the bedrock of the entire system, built on <b class='text-primary'>Hyperledger Fabric</b>. It provides the core distributed ledger capabilities, including immutability, consensus, and the smart contract runtime environment. Its permissioned nature is critical for a sovereign system, ensuring that only known and vetted participants can operate nodes and validate transactions. This layer is responsible for the raw security and integrity of the ledger."}
                            ]
                        },
                         {
                            id: 'article-1-2-2',
                            title: 'The Core Services Layer',
                            content: [
                                {type: 'paragraph', text: "Built atop the foundational layer, this is where the primary business logic and core components of DLDCHAIN reside. These services are the engines that drive the ecosystem's unique functionalities."},
                                {type: 'list', items: [
                                    "<b>Identity Service:</b> Manages digital identities for all participants (individuals, brokers, developers, government entities) via integration with UAE Pass.",
                                    "<b>UNIVESTOR Wallet™ Service:</b> Provides the secure, unified interface for all users to interact with the system.",
                                    "<b>EBRAM™ Smart Contract Engine:</b> The core legal-technical protocol for creating, managing, and executing real estate agreements.",
                                    "<b>DXBTOKENS™ (Tokenization Service):</b> Manages the lifecycle of property tokens, from minting to trading and retirement.",
                                    "<b>Mashroi™ Service:</b> The AI-driven hub for real estate professionals, managing licensing, compliance, and performance.",
                                    "<b>MAKE™ (Escrow Service):</b> Handles the secure holding and automated release of funds and tokens during transactions."
                                ]}
                            ]
                        },
                         {
                            id: 'article-1-2-3',
                            title: 'The Application Layer',
                            content: [
                                {type: 'paragraph', text: "This is the user-facing layer where decentralized applications (dApps) live. It consumes the services provided by the Core Services Layer through secure APIs. This layer is designed for a diverse range of users and use cases."},
                                {type: 'list', items: [
                                    "<b>Official DLDCHAIN dApps:</b> These include the UNIVESTOR Wallet™ interface, the Mashroi™ portal for professionals, and the developer dashboards for project management.",
                                    "<b>Third-Party dApps:</b> The architecture allows for an ecosystem of third-party applications to be built on top of DLDCHAIN. These could include advanced analytics platforms, property management tools, or innovative FinTech solutions, all consuming verified data from the DLDCHAIN APIs. This fosters a competitive and innovative market, expanding the utility of the entire ecosystem."
                                ]}
                            ]
                        },
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: Core System Pillars",
            chapters: [
                {
                    id: 'chapter-2-1',
                    title: "EBRAM™: The Smart Contract Engine",
                    introduction: [{type: 'paragraph', text: "EBRAM™ (Electronic Blockchain Real Estate Agreement Module) is the legal and technical heart of DLDCHAIN. It is not merely a set of smart contracts, but a comprehensive protocol designed to translate complex legal real estate agreements into self-executing, automated, and legally binding digital processes."}],
                    articles: [
                        {
                            id: 'article-2-1-1',
                            title: 'Core Purpose and Legal Standing',
                            content: [
                                {type: 'paragraph', text: "EBRAM's primary function is to <b class='text-primary'>minimize ambiguity, eliminate human error, and drastically reduce the potential for disputes</b> in real estate transactions. It achieves this by creating a single, verifiable, and executable version of an agreement that is understood by both humans and machines."},
                                {type: 'subheading', text: "Legal Validity"},
                                {type: 'paragraph', text: "Crucially, every contract executed through EBRAM is designed to be a <span class='highlight'>legally valid and binding agreement</span>. Through deep integration with the Ministry of Justice, EBRAM smart contracts act as digital evidence that is admissible and enforceable within the UAE's judicial system. It complements, not replaces, the existing legal framework, providing a high-fidelity digital twin of legal obligations."}
                            ]
                        },
                         {
                            id: 'article-2-1-2',
                            title: 'Key Functionalities and Use Cases',
                            content: [
                                {type: 'paragraph', text: "EBRAM's modular design allows it to handle a wide array of real estate transactions:"},
                                {type: 'list', items: [
                                    "<b>Automated Residential & Commercial Leases:</b> This is the flagship use case. EBRAM can manage the entire lease lifecycle, including automated rent collection in DLD-AED, security deposit management, automated fee calculations (e.g., service charges), and sending notifications for renewal or termination. The goal is to make the annual Ejari registration a self-executing event.",
                                    "<b>Short-Term Rentals (Holiday Homes):</b> By integrating with the Department of Economy and Tourism (DET), EBRAM can automate the compliance checks for holiday home permits, manage payments, and even automate the collection of the Tourism Dirham Fee, remitting it directly to the DET.",
                                    "<b>Property Sales & Title Transfer:</b> For sales agreements, EBRAM can orchestrate the entire process, from holding the deposit in escrow via the MAKE™ system to triggering the final title transfer via the Milka API upon fulfillment of all conditions by both buyer and seller.",
                                    "<b>Utility Integration:</b> A planned pilot with DEWA will test the automatic approval and transfer of utility connections upon the execution of a new lease or sale agreement, eliminating a significant point of friction for residents and owners."
                                ]}
                            ]
                        },
                        {
                            id: 'article-2-1-3',
                            title: 'EBRAMGPT and the AI Layer',
                            content: [
                                {type: 'paragraph', text: "EBRAM is enhanced by <b class='text-primary'>EBRAMGPT</b>, an AI-powered legal co-pilot. This system is designed to bridge the gap between human legal language and machine-executable code."},
                                {type: 'list', items: [
                                    "<b>Natural Language to Code:</b> Legal professionals can describe contract clauses in natural English or Arabic, and EBRAMGPT will suggest the appropriate, pre-audited EBRAM code modules to implement them.",
                                    "<b>Risk Analysis & Clause Suggestion:</b> The AI can analyze draft agreements, flag potentially risky or non-compliant clauses, and suggest alternative, standard clauses based on a vast dataset of successful and legally-sound contracts.",
                                    "<b>Explainability:</b> For any automated action taken by an EBRAM contract, the system can provide a clear, plain-language explanation of which specific clause in the agreement triggered the action, providing full transparency and auditability."
                                ]}
                            ]
                        }
                    ]
                },
                 {
                    id: 'chapter-2-2',
                    title: "Mashroi™: Professional & Compliance Hub",
                    introduction: [{type: 'paragraph', text: "Mashroi™ is the mandatory gateway and intelligence grid for all real estate professionals operating in Dubai. It is a sovereign system designed to elevate professional standards, ensure compliance, and foster a merit-based ecosystem through the power of AI and blockchain."}],
                    articles: [
                        {
                            id: 'article-2-2-1',
                            title: 'Core Identity & Purpose',
                            content: [
                                {type: 'paragraph', text: "Mashroi™ is envisioned as a <span class='highlight'>\"Contribution Intelligence System\"</span>. Its purpose is to move beyond simple licensing and create a dynamic, real-time picture of the real estate market and its participants. It will be a mandatory gateway, similar to Ejari, for any professional wishing to operate in Dubai's real estate sector."},
                                {type: 'list', items: [
                                   "<b>Single Source of Truth for Professionals:</b> Mashroi™ creates an immutable, DLD-verified digital identity for every broker, agent, and property manager.",
                                   "<b>Merit-Based, Not Wallet-Based:</b> The system is designed so that reputation and ranking are earned through verifiable contributions, ethical behavior, and continuous learning, not through advertising spend.",
                                   "<b>Self-Funding Governance:</b> The platform is designed to be economically self-sustaining through a variety of compliance and value-added service fees."
                                ]}
                            ]
                        },
                        {
                            id: 'article-2-2-2',
                            title: 'Key Functionalities',
                            content: [
                                {type: 'paragraph', text: "Mashroi™ integrates multiple layers of functionality into a single, unified platform:"},
                                 {type: 'list', items: [
                                    "<b>Automated Licensing & Visa Flow:</b> A key innovation is the integration with GDRFA to issue a <b class='text-primary'>3-month renewable smart visa</b> for brokers directly through the platform. Licensing, renewals, and compliance checks are automated, ensuring every active professional is always in good standing.",
                                    "<b>AI-Powered Performance Analytics:</b> The system tracks broker performance based on objective, on-chain data: successful deal closures, positive client feedback (verified), compliance adherence, and educational milestones. This data feeds into a public-facing, trustworthy ranking system.",
                                    "<b>Compliance & Ethical Tracking Hub:</b> Mashroi™ acts as a live compliance engine. It integrates with Trakheesi to ensure all property advertisements are linked to a verified broker and a legitimate property listing on DLDCHAIN, instantly flagging and preventing fraudulent ads.",
                                    "<b>Smart Contract Commission Flow:</b> Broker commissions can be written directly into EBRAM™ sales or lease agreements. Upon successful completion of the contract, the commission is automatically released from the MAKE™ escrow system to the broker's UNIVESTOR Wallet™, eliminating payment disputes and delays."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-2-3',
                    title: "Tokenization & Liquidity",
                    introduction: [{type: 'paragraph', text: "The tokenization framework, centered on <b class='text-primary'>DXBTOKENS</b> and the <b class='text-primary'>MAKE™ System</b>, is designed to unlock unprecedented liquidity in what is traditionally a highly illiquid asset class. It represents a shift from fractional ownership to direct, native digital ownership of DLD-registered property."}],
                    articles: [
                        {
                            id: 'article-2-3-1',
                            title: 'DXBTOKENS™: The Digital Asset',
                            content: [
                                {type: 'paragraph', text: "DXBTOKENS are not securities representing a share in a company that owns a property. They are the <span class='highlight'>direct, digital representation of legal ownership of the physical property itself</span>, with each token corresponding to a specific, measurable unit (e.g., 1 square foot). This distinction is legally and technically critical."},
                                {type: 'list', items: [
                                   "<b>Fiat-Only Transactions:</b> All transactions involving DXBTOKENS are conducted exclusively in the <b class='text-primary'>DLD Digital Dirham (DLD-AED)</b>. This eliminates the volatility and regulatory uncertainty of cryptocurrencies, making the system accessible and trustworthy for traditional and institutional investors.",
                                   "<b>Unprecedented Liquidity:</b> The core value proposition is the ability to transform a multi-million dirham property into a liquid, tradable asset. The goal is to enable investors to buy or sell their stake in a property in minutes, not months.",
                                   "<b>Types of Tokens:</b> While the primary token is an Equity Token (representing ownership), the framework allows for future use cases like Utility Tokens (for access rights to amenities) or Developer Tokens (for funding future projects)."
                                ]}
                            ]
                        },
                        {
                            id: 'article-2-3-2',
                            title: 'The MAKE™ System: Escrow & Market Logic',
                            content: [
                                {type: 'paragraph', text: "The MAKE™ System is the sophisticated escrow engine that guarantees the integrity of the token market. It is governed by a strict, event-driven logic to ensure that every DXBTOKEN is 100% backed by either the physical asset or its equivalent value in AED."},
                                {type: 'minorheading', text: "The Tokenization Lifecycle Events:"},
                                 {type: 'list', items: [
                                    "<b>1. MAKELIST:</b> An owner, via their UNIVESTOR Wallet™, lists a property for tokenization. EBRAM™ verifies all legal and property data.",
                                    "<b>2. MAKE_ID (Liquidity Commitment):</b> A licensed Liquidity Pool Officer (LPO) commits 100% of the property's appraised value in DLD-AED to the MAKE™ escrow. This is the critical step that provides guaranteed liquidity.",
                                    "<b>3. MAKE_IN (Token Distribution):</b> Upon successful deposit, DXBTOKENS are minted. The owner receives a portion of their equity in cash (e.g., 60%) and the rest as retained tokens (e.g., 40%). The remaining tokens are released to the public market, and a small percentage is allocated for fees. The LPO's capital is now backing the tokens on the market.",
                                    "<b>4. MPT (Market Price Transaction):</b> The public can now trade the tokens. The price is determined by market supply and demand, influenced by EBRAM's AI-weighted node system which provides real-time valuation data.",
                                    "<b>5. MAKE_DISMISS (Exit):</b> If a single entity acquires a super-majority (e.g., >90%) of a property's tokens, they can trigger a MAKE_DISMISS event. This process liquidates the remaining tokens, pays out any minority holders, and transfers the full, un-tokenized title deed of the physical property to the majority owner."
                                ]}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-2-4',
                    title: 'UNIVESTOR Wallet™',
                    introduction: [{type: 'paragraph', text: "The UNIVESTOR Wallet™ is the single, unified gateway for all participants to interact with the DLDCHAIN ecosystem. It is fundamentally tied to a user's verified digital identity, embodying the principle of <span class='highlight'>\"one wallet, one human\"</span>."}],
                    articles: [
                        {
                           id: 'article-2-4-1',
                           title: 'Core Principles',
                           content: [
                               {type: 'paragraph', text: "The wallet's design is guided by security, simplicity, and sovereignty."},
                               {type: 'list', items: [
                                   "<b>Identity-Bound:</b> The wallet is inextricably linked to a user's official digital identity (via UAE Pass). This is not an anonymous crypto wallet; every transaction is attributable to a legally verified entity, which is essential for KYC/AML compliance.",
                                   "<b>Passwordless Security:</b> Access is secured through modern authentication methods like biometric logins or multi-factor OTPs, eliminating the risks associated with passwords.",
                                   "<b>Asset Custodianship:</b> The wallet provides users with true self-custody of their assets (DLD-AED and DXBTOKENS), meaning they have full control over their funds and property tokens, secured by cryptographic keys."
                               ]}
                           ]
                        },
                        {
                           id: 'article-2-4-2',
                           title: 'Tiered Access & Functionality',
                           content: [
                               {type: 'paragraph', text: "The wallet interface intelligently adapts to the user's role, providing specific functionalities based on their verified identity:"},
                               {type: 'list', items: [
                                   "<b>Individual Investor/Owner:</b> View property portfolios, initiate tokenization, trade DXBTOKENS, manage rental income, sign EBRAM contracts, and vote on property-related decisions.",
                                   "<b>Real Estate Professional (via Mashroi™):</b> Manage client listings, oversee transactions, receive commission payments, access market analytics, and manage their compliance status.",
                                   "<b>Developer:</b> Submit new projects for tokenization, manage off-plan sales, oversee escrow accounts, and communicate with investors.",
                                   "<b>Government Entity:</b> Perform regulatory oversight, audit transactions, manage system parameters, and generate market-wide reports."
                               ]}
                           ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Architecture & Technical Deep Dive",
            chapters: [
                {
                    id: 'chapter-3-1',
                    title: "Technology Stack",
                    introduction: [{type: 'paragraph', text: "The DLDCHAIN technology stack is carefully selected to meet the demands of a sovereign-grade, enterprise-level system, prioritizing security, scalability, and interoperability."}],
                    articles: [
                        {
                            id: 'article-3-1-1',
                            title: 'Ledger: Hyperledger Fabric',
                            content: [
                                {type: 'paragraph', text: 'The core DLDCHAIN network is built on <b class="text-primary">Hyperledger Fabric</b>. This choice is deliberate and critical for the project\'s success. Unlike public blockchains like Ethereum, Fabric is a private, permissioned DLT platform, which is essential for a regulated industry like real estate.'},
                                {type: 'list', items: [
                                    "<b>Permissioned Network:</b> Only known, verified, and authorized entities (DLD, banks, licensed brokers) can participate as nodes. This eliminates the risk of anonymous malicious actors and ensures a high level of trust, accountability, and regulatory compliance (KYC/AML).",
                                    "<b>Data Confidentiality:</b> Fabric's \"Channels\" and \"Private Data Collections\" are powerful features that allow for confidential transactions. For example, the specific financial details of a mortgage agreement between a bank and a property owner can be shared privately between only those two parties, while only a non-sensitive hash of the transaction is committed to the main ledger for verification by other network members.",
                                    "<b>No Native Cryptocurrency:</b> Fabric does not require a volatile native cryptocurrency (like Ether) to pay for transactions. This aligns perfectly with DLDCHAIN’s fiat-only model using the stable DLD-AED, making the system economically predictable and accessible to traditional finance.",
                                    "<b>Pluggable Consensus:</b> The system can use efficient, crash-fault-tolerant consensus mechanisms like Raft, which are suitable for a consortium of trusted entities and enable much higher transaction throughput than proof-of-work systems."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-1-2',
                            title: 'Smart Contracts: Chaincode',
                            content: [
                                {type: 'paragraph', text: "Smart contracts on Hyperledger Fabric are known as <b class='text-primary'>Chaincode</b>. DLDCHAIN will utilize a robust and widely-supported language for its chaincode, such as Go or Node.js, to implement the logic for EBRAM, MAKE, and other core services. This provides a secure and performant runtime for the system's business logic."}
                            ]
                        },
                        {
                            id: 'article-3-1-3',
                            title: 'AI & Data Layer',
                            content: [
                                {type: 'paragraph', text: "The AI system for functions like EBRAMGPT, fraud flagging, and market analytics will be built using industry-standard Python libraries (e.g., TensorFlow, PyTorch, scikit-learn). This AI layer will interact with the blockchain through secure APIs, feeding insights to the smart contracts and user-facing applications without compromising the deterministic nature of the ledger itself."}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-3-2',
                    title: "Integration & Interoperability",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN is not designed to exist in a vacuum. Its success hinges on its ability to seamlessly and securely connect with existing government systems and the broader digital economy. The project's philosophy is to <span class='highlight'>\"connect, not replace\"</span>."}],
                    articles: [
                         {
                            id: 'article-3-2-1',
                            title: 'Government System Oracles',
                            content: [
                                {type: 'paragraph', text: "Existing, trusted government systems are treated as <b class='text-primary'>\"oracles\"</b>—authoritative sources of off-chain truth. DLDCHAIN integrates with them via secure, read-only APIs:"},
                                {type: 'list', items: [
                                    "<b>Ejari & Milka:</b> An event in an external system (e.g., a new Ejari registration or a title deed update in Milka) acts as a trusted trigger for a smart contract on DLDCHAIN, ensuring data consistency.",
                                    "<b>UAE Pass:</b> This is the foundational integration for identity, used for all KYC/AML and user authentication.",
                                    "<b>Cross-Ministry APIs:</b> Secure API gateways will manage data flows with other government bodies like the Ministry of Justice (for legal enforcement), DET (for tourism and business licensing), and the CBUAE (for financial oversight)."
                                ]}
                            ]
                        },
                        {
                            id: 'article-3-2-2',
                            title: 'Security and Auditing Framework',
                            content: [
                                {type: 'paragraph', text: "Security is multi-layered, following a zero-trust model:"},
                                 {type: 'list', items: [
                                    "<b>Smart Contract Audits:</b> All chaincode will undergo rigorous automated and manual audits using tools like Slither and Mythril before deployment. Fabric's endorsement policies will be used to ensure that critical transactions (like minting DXBTOKENS) require multi-signature approval from designated entities (e.g., DLD, MAKE Officer).",
                                    "<b>Network Security:</b> The permissioned nature of Fabric, combined with state-of-the-art encryption for data at rest and in transit (TLS 1.3), provides a robust defense against external attacks.",
                                    "<b>Inheritability Protocol:</b> A legally robust succession protocol is built into the smart contracts. In the event of a user's death, a verified legal process can trigger the secure transfer of assets to verified heirs, solving the \"lost key\" problem that plagues many blockchain systems."
                                ]}
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 'part-4',
            title: "Part IV: Governance, Roadmap & Vision",
            chapters: [
                {
                    id: 'chapter-4-1',
                    title: 'Governance & Economic Model',
                    introduction: [{type: 'paragraph', text: "A robust governance and economic framework is essential for the long-term stability, growth, and integrity of a sovereign protocol like DLDCHAIN."}],
                    articles: [
                        {
                            id: 'article-4-1-1',
                            title: 'Dual-Layer Governance',
                            content: [
                                {type: 'paragraph', text: "The project proposes a dual-layer governance structure to ensure both strategic alignment with Dubai's vision and efficient, secure network operations."},
                                {type: 'list', items: [
                                    "<b>Governing Council (Business & Policy Governance):</b> This is the highest authority, chaired by DLD with veto power. It includes key stakeholders like VARA, the CBUAE, the Dubai Future Foundation, and representatives from top-tier developers and banks. This council sets policy, approves major upgrades, and ensures the protocol serves the national interest.",
                                    "<b>Technical Committee (Operational Governance):</b> Reporting to the Council, this committee is composed of technical experts from the participating node operators. It manages day-to-day network operations, software updates, security protocols, and technical onboarding of new members."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-1-2',
                            title: 'Sustainable Economic Model',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN is designed to be a self-sustaining ecosystem that generates revenue to fund its own operations, maintenance, and future development, reducing the burden on government budgets."},
                                {type: 'minorheading', text: "Key Revenue Streams:"},
                                {type: 'list', items: [
                                    "<b>Token Issuance & Trading Fees:</b> A small, regulated fee on the minting of new DXBTOKENS and a micro-fee on secondary market transactions.",
                                    "<b>Mashroi™ Compliance & Licensing Fees:</b> Fees for broker licensing, renewals, continuous education courses, and access to premium analytics tools.",
                                    "<b>Public API Licensing:</b> Revenue from licensing access to verified, real-time, but non-sensitive market data to third-party platforms like property portals, banks, and analytics firms.",
                                    "<b>Value-Added Service Fees:</b> Fees for specialized services like expedited dispute resolution or complex commercial contract structuring via EBRAM."
                                ]}
                            ]
                        },
                    ]
                },
                {
                    id: 'chapter-4-2',
                    title: 'Implementation Roadmap',
                    introduction: [{type: 'paragraph', text: "The implementation of DLDCHAIN is envisioned as a deliberate, phased approach to ensure stability, security, and market adoption. The total timeline is projected at 36+ months."}],
                    articles: [
                        {
                            id: 'article-4-2-1',
                            title: 'Phase 1: Foundation (12-18 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Build the foundational infrastructure and establish the legal and organizational framework."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Assemble core team; develop core Hyperledger Fabric network; establish Governing Council; build secure oracle for Ejari data; onboard founding government partners; develop MVPs for DLD-AED, DXBTOKENS, EBRAM, and Mashroi™; draft comprehensive regulatory framework."}
                            ]
                        },
                        {
                            id: 'article-4-2-2',
                            title: 'Phase 2: Pilot & Expansion (18-24 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Launch and test the EBRAM suite in a controlled, real-world environment."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Audit EBRAM contracts; launch pilot program for new tenancy agreements; integrate with DEWA for utility connection test; gather feedback; launch first DXBTOKEN-based projects; roll out Mashroi™ to a pilot group of brokers."}
                            ]
                        },
                        {
                            id: 'article-4-2-3',
                            title: 'Phase 3: Full Rollout & Scaling (24-36 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Expand EBRAM to the entire rental market and pilot DLDCHAIN's role in capital markets."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Roll out EBRAM as the standard for all new leases; develop modules for short-term rentals; partner with a VARA-licensed exchange to pilot secondary trading of DXBTOKENS; begin onboarding institutional partners as full consortium nodes."}
                            ]
                        },
                        {
                            id: 'article-4-2-4',
                            title: 'Phase 4: Advanced Features (36+ months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Implement the most advanced features and expand platform connectivity."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Launch on-chain dispute resolution module; implement digital asset inheritance protocol; pilot cross-chain interoperability using frameworks like Hyperledger Cactus to connect DLDCHAIN to other global networks."}
                            ]
                        },
                    ]
                },
                 {
                    id: 'chapter-4-3',
                    title: 'Global Vision & Strategy',
                    introduction: [{type: 'paragraph', text: "DLDCHAIN's ambition extends far beyond the borders of Dubai. The project is strategically designed to establish Dubai as the undisputed global leader in digital real estate governance and to export this innovation to the world."}],
                    articles: [
                        {
                            id: 'article-4-3-1',
                            title: 'Hub for Global Tokenized Assets',
                            content: [
                                {type: 'paragraph', text: "The primary vision is to position Dubai as the world's premier <b class='text-primary'>\"Global Tokenized Property Exchange Hub\"</b>. By creating the most trusted, liquid, and efficient market for digital real estate assets, Dubai can attract a massive influx of global capital, talent, and innovation. The sovereign-backed nature of DLDCHAIN provides a level of trust that no private-sector competitor can match, making it the \"gold standard\" for international real estate investment."}
                            ]
                        },
                        {
                            id: 'article-4-3-2',
                            title: 'Exporting Sovereignty: A Multi-City Strategy',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN is designed as a \"master model for global adoption.\" The project includes a <span class='highlight'>Multi-City White-Label Strategy</span>, where the core framework, technology, and governance model can be licensed and adapted for use by other cities and nations around the world. This strategy would:"},
                                 {type: 'list', items: [
                                    "Create a new, high-value export for Dubai: digital governance itself.",
                                    "Establish a global network of interconnected, trusted real estate markets based on the Dubai model.",
                                    "Solidify Dubai's legacy as a pioneer in 21st-century governance and digital transformation."
                                ]}
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    conclusion: {
        id: 'tech-conclusion',
        title: "Conclusion: A New Digital Foundation",
        content: [
            {type: 'paragraph', text: 'DLDCHAIN is not merely an incremental improvement or a new application; it is presented as a <b class="text-primary">"constitutional system for real estate governance in the 21st century"</b>. It is a foundational, sovereign-grade infrastructure designed to be the enduring digital bedrock for one of Dubai\'s most critical economic sectors.'},
            {type: 'paragraph', text: 'By addressing core market inefficiencies through a combination of robust blockchain technology, sophisticated AI, and deep governmental integration, DLDCHAIN has the potential to unlock unprecedented liquidity, foster trust, and create a new paradigm of efficiency. It aligns perfectly with Dubai\'s national digital strategy and its ambition to lead the world in technological innovation and governance.'},
            {type: 'minorheading', text: 'Strategic Imperative'},
            {type: 'paragraph', text: 'The successful implementation of this project would not only transform Dubai\'s real estate market but also create a powerful new model for digital sovereignty that can be exported globally. It is a legacy project, designed to secure ownership, inspire confidence, and project Dubai\'s vision for the future onto the world stage.'},
        ]
    },
    appendices: [
        {
            id: 'appendix-a',
            title: "Appendix A: Smart Contract Pseudo-Code",
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
            title: 'Appendix B: Governance Framework',
            content: [
                {type: 'paragraph', text: 'The DLDCHAIN™ is structured as a <b class="text-primary">government-led consortium blockchain</b>, a hybrid model combining the strengths of private and public blockchains. This model ensures the necessary security, privacy, and control required for a regulated industry like real estate, while still benefiting from the decentralization and resilience of multiple trusted stakeholders.'},
                {type: 'minorheading', text: 'Consortium Membership'},
                 {type: 'list', items: [
                    "<strong>Core Consortium Members:</strong> The strategic nucleus includes DLD (Chair, with veto power), VARA (Vice-Chair, regulatory oversight), CBUAE (financial systems), and DFF (driving Innovation).",
                    "<strong>Strategic Stakeholder Participation:</strong> Major VARA-licensed real estate developers, top-tier financial institutions, and leading licensed real estate brokerage firms are invited to operate nodes, contributing to network security and aligning development with market needs."
                 ]},
                 {type: 'minorheading', text: 'Dual-Layer Governance Structure'},
                 {type: 'list', items: [
                    "<strong>Business Governance (Governing Council):</strong> Responsible for overall direction, policy, budgets, and IP ownership. Ensures strategic alignment and market relevance.",
                    "<strong>Operational Governance (Technical Committee):</strong> Manages the live network, security standards, software upgrades, and technical dispute resolution. Ensures smooth and secure functioning of the infrastructure."
                 ]},
                 {type: 'minorheading', text: 'On-Chain Governance Mechanisms'},
                 {type: 'list', items: [
                    "<strong>Automated Membership Onboarding:</strong> Smart contracts streamline the process of admitting new consortium members based on pre-defined criteria.",
                    "<strong>Transparent Proposal System:</strong> A formal, immutable log for all governance proposals (e.g., chaincode upgrades), recording status and voting outcomes transparently.",
                    "<strong>Automated Fee Management:</strong> Smart contracts collect minuscule fees on transactions and distribute funds to a treasury wallet controlled by the Governing Council, ensuring transparent revenue collection."
                 ]}
            ]
        },
        {
            id: 'appendix-c',
            title: "Appendix C: Tokenization Scenarios",
            content: [
                {type: 'paragraph', text: "This appendix provides a detailed, step-by-step walkthrough of distinct tokenization cases, demonstrating how DLDCHAIN™ seamlessly integrates its core components to unlock liquidity, ensure trust, and streamline transactions."},
                {type: 'minorheading', text: "Scenario 1: Individual Owner (Ready Property)"},
                {type: 'paragraph', text: "<strong>Context:</strong> An individual owns a ready apartment and wants to sell it quickly without a traditional listing process to unlock immediate liquidity."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Apartment, Dubai Marina",
                    "<strong>EBRAM™ Valued Price:</strong> AED 3,200,000",
                    "<strong>Action:</strong> Owner initiates tokenization via UNIVESTOR Wallet™, facilitated by a Mashroi™ broker.",
                    "<strong>Outcome:</strong> After MAKE_ID and MAKE_IN events, owner receives <b class='text-primary'>AED 1,920,000 (60%)</b> in instant cash and retains 40% equity as tradable DXBTOKENS™."
                ]},
                {type: 'minorheading', text: "Scenario 2: Mortgaged Property"},
                {type: 'paragraph', text: "<strong>Context:</strong> An owner wants to sell a mortgaged villa, efficiently settling the mortgage and unlocking equity."},
                 {type: 'list', items: [
                    "<strong>Property:</strong> Villa, Arabian Ranches",
                    "<strong>EBRAM™ Valued Price:</strong> AED 5,100,000",
                    "<strong>Outstanding Mortgage:</strong> AED 900,000",
                    "<strong>Action:</strong> Owner initiates tokenization, disclosing mortgage details. EBRAM™ verifies with the lender.",
                    "<strong>Outcome:</strong> During MAKE_ID, the LPO's committed funds first pay off the <b class='text-primary'>AED 900,000 mortgage</b>. The owner then receives 60% of their net equity (AED 4.2M), which is <b class='text-primary'>AED 2,520,000</b>."
                ]},
                {type: 'minorheading', text: "Scenario 3: Off-Plan Development"},
                {type: 'paragraph', text: "<strong>Context:</strong> A developer wants to tokenize a luxury off-plan villa to attract early institutional funding."},
                {type: 'list', items: [
                    "<strong>Property:</strong> Off-Plan Villa, Downtown",
                    "<strong>Asking Price:</strong> AED 11,000,000",
                    "<strong>Action:</strong> Developer submits project via their Developer Wallet. LPO commits funds.",
                    "<strong>Outcome:</strong> Developer receives <b class='text-primary'>AED 6,600,000 (60%)</b> for project funding and retains 40% as DXBTOKENS™. As construction milestones are verified on-chain, EBRAM™'s AI automatically adjusts the token price upwards."
                ]},
            ]
        }
    ]
};

    