
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
            title: "Part I: Project Genesis and Core Identity",
            chapters: [
                {
                    id: 'chapter-1-1',
                    title: 'The Sovereign Vision',
                    introduction: [{type: 'paragraph', text: "The core purpose of DLDCHAIN is to serve as Dubai's <b class='text-primary'>\"sovereign real estate operating system\"</b>, a \"constitutional system for real estate governance in the 21st century\". Its overarching vision is encapsulated in the subline: <span class='highlight'>\"Built by Dubai. Shared with the world.\"</span>"}],
                    articles: [
                        {
                            id: 'article-1-1-1',
                            title: 'A Dubai-Authored Protocol',
                            content: [
                                {type: 'paragraph', text: 'This emphasizes that it is "Not made in Silicon Valley. Not imported from tech giants. <b class="text-primary">Authored by Dubai. Operated by Dubai. For the world.</b>". The project aims to secure ownership, inspire confidence, and export sovereignty. It is designed as a "real-time transformation model, rooted in law, driven by AI, secured by sovereign authority". The project is positioned as a "master model for global adoption, owned by Dubai".'}
                            ]
                        },
                        {
                            id: 'article-1-1-2',
                            title: 'Core Challenges Addressed',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN is designed to address fundamental challenges within Dubai's traditional real estate market, particularly <b class='text-primary'>\"Information Asymmetry & Data Integrity\"</b> and <b class='text-primary'>\"Transactional Friction & Opacity\"</b>."},
                                {type: 'list', items: [
                                    "<b>Information Asymmetry & Data Integrity:</b> By creating a transparent and immutable record of real estate transactions, DLDCHAIN ensures that all stakeholders have access to verified, real-time data, reducing discrepancies and fraud. The integration with existing DLD systems like Ejari and Milka ensures a single source of truth for property information.",
                                    "<b>Transactional Friction & Opacity:</b> The system automates various stages of the real estate lifecycle through smart contracts, significantly reducing manual processes, delays, and hidden costs. This includes streamlining agreements, dispute resolution, and advertising control. The goal is to move towards a state where processes like Ejari can \"execute itself\" and rental disputes can be resolved in minutes, rather than going to traditional channels."
                                ]}
                            ]
                        }
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
                    title: "System Components",
                    introduction: [{type: 'paragraph', text: "DLDCHAIN's identity is defined through its key layers and components, forming a comprehensive ecosystem for real estate governance."}],
                    articles: [
                        {
                            id: 'article-2-1-1',
                            title: 'EBRAM™: The Smart Contract Engine',
                            content: [
                                {type: 'paragraph', text: "A smart contract system designed to automate and execute real estate agreements. It streamlines the entire real estate transaction lifecycle, from agreements to dispute resolution and advertising control."},
                                {type: 'list', items: [
                                    "Key functionalities include automated residential leases, short-term rentals integrating with DET's holiday home permit system, and potentially self-executing Ejari contracts.",
                                    "Integration with DEWA is planned to test automated utility connection approval during pilot phases.",
                                    "EBRAM will eventually roll out as the standard process for all new residential, commercial, and retail leases registered in Ejari."
                                ]}
                            ]
                        },
                         {
                            id: 'article-2-1-2',
                            title: 'Mashroi™: The Professional Hub',
                            content: [
                                {type: 'paragraph', text: "Positioned as a broker license and education platform. It will offer a visa-issuing solution (a 3-month renewable digital visa) and function as a full compliance and ethical tracking hub."},
                                {type: 'paragraph', text: "It is intended to be fully integrated into DLD and RERA as a mandatory gateway, similar to Ejari. Mashroi emphasizes profit channels and simplicity for all users, aiming to eliminate confusion and fear while ensuring full legal control."}
                            ]
                        },
                        {
                            id: 'article-2-1-3',
                            title: 'MAKE™ System: The Escrow Logic',
                            content: [
                                {type: 'paragraph', text: "Addresses advanced technicalities of escrow, providing a secure and compliant mechanism for transactions. It defines the escrow logic workflow with detailed event sequences and pseudocode for the MAKE smart contract logic."},
                                {type: 'paragraph', text: "Focuses on technical controls and cryptographic safeguards for security and compliance, with challenges and mitigation strategies outlined for escrow-specific risks."}
                            ]
                        },
                         {
                            id: 'article-2-1-4',
                            title: 'DXBTOKENS™: The Asset',
                            content: [
                                {type: 'paragraph', text: "Introduced as a revolutionary approach to real estate ownership, aiming for <b class='text-primary'>\"unprecedented liquidity\"</b>. They represent \"native ownership\" of physical, DLD-registered properties in Dubai, moving beyond traditional fractional ownership or crowdfunding."},
                                {type: 'paragraph', text: "The bold claim is that investors can <span class='highlight'>\"sell and buy another within 5 minutes\"</span>. The system will include simulations for off-plan property tokenization, tokenizing mortgaged villas, and general property liquidity cycles. A 'Prypco Mint' pilot in May 2025 has already demonstrated successful tokenization of property title deeds in MENA, validating the concept."}
                            ]
                        },
                        {
                            id: 'article-2-1-5',
                            title: 'DLD Digital Dirham (DLD-AED)',
                            content: [
                                {type: 'paragraph', text: "Proposed as the exclusive native currency within the DLDCHAIN ecosystem. Its strategic significance lies in mitigating risks and attracting traditional investors, particularly given the <b class='text-primary'>\"fiat-only approach\"</b> of the pilot projects. This fiat-only approach is crucial for building confidence among traditional investors."}
                            ]
                        },
                        {
                            id: 'article-2-1-6',
                            title: 'The AI System',
                            content: [
                                {type: 'paragraph', text: 'The DLDCHAIN incorporates a sophisticated AI system with "weighted nodes" and "market logic" referred to as "No More No Less". AI will be leveraged for crucial functions like "flagging fraud" and "generating reports," contributing to "smart reports, security, and prevention".'},
                                {type: 'paragraph', text: 'This capability will automate "all types of market reports in all levels," providing real-time insights and market intelligence. The AI will also feature an "OpenAI-powered text-to-action landing and guidance system" and "real-time GPT integration for broker help and documentation".'}
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
                    title: "System & API Architecture",
                    introduction: [{type: 'paragraph', text: "The proposed architecture of DLDCHAIN involves Foundational, Core Services, and Application Layers, designed to support key functionalities like DXBTOKENS and EBRAM."}],
                    articles: [
                        {
                            id: 'article-3-1-1',
                            title: 'System Architecture Overview',
                            content: [
                                {type: 'paragraph', text: 'The core DLDCHAIN network will be based on the <b class="text-primary">Hyperledger Fabric</b> architecture. The full documentation will include detailed system architecture, technical blueprints of EBRAM smart contracts, wallet issuance, and the property token lifecycle. It will also cover smart contract samples (pseudo code + actual structure) and escrow logic per transaction type.'}
                            ]
                        },
                        {
                            id: 'article-3-1-2',
                            title: 'API and Platform Integrations',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN will feature comprehensive API and platform integrations, including DLD internal APIs, cross-ministry logic (e.g., Justice, DET, Central Bank of the UAE), and external portal compliance layers (e.g., Bayut, Property Finder)."},
                                {type: 'paragraph', text: "A secure, one-way oracle for reading new registration data from the live Ejari database will be built. The <b class='text-primary'>\"connect, not replace\"</b> philosophy guides this integration strategy, contributing to the overall strength and utility of the ecosystem."}
                            ]
                        }
                    ]
                },
                {
                    id: 'chapter-3-2',
                    title: "Security & Auditing",
                    introduction: [{type: 'paragraph', text: "Security is paramount in a sovereign-grade system. DLDCHAIN employs a multi-layered security framework and rigorous auditing processes."}],
                    articles: [
                         {
                            id: 'article-3-2-1',
                            title: 'Security Framework',
                            content: [
                                {type: 'paragraph', text: "The technical deep dive specifies detailed security measures including encryption, key management, and access control. It outlines security testing components, processes (penetration testing, audits), metrics, and tools."}
                            ]
                        },
                        {
                            id: 'article-3-2-2',
                            title: 'Lender Integration',
                            content: [
                                {type: 'paragraph', text: "The project includes technical perspectives on lender integration, outlining objectives, key components, workflows, and technical architecture (API specifications, data sharing). Challenges and mitigations for technical integration risks are also detailed."}
                            ]
                        },
                        {
                            id: 'article-3-2-3',
                            title: 'Smart Contract Auditing',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN specifies the use of various smart contract auditing tools such as Slither, Mythril, Oyente, Securify, and Manticore, in addition to Hyperledger Explorer, to ensure robust security and functionality. The documentation details their application to DLDCHAIN and addresses auditing challenges and mitigations."}
                            ]
                        },
                         {
                            id: 'article-3-2-4',
                            title: 'Proving Organic Nature',
                            content: [
                                {type: 'paragraph', text: "The technical analysis includes methodologies to prove the organic nature of DLDCHAIN through technical metrics and data analysis methods, quantifying it via algorithmic measures. Challenges in proving organic nature are also considered."}
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
                    introduction: [{type: 'paragraph', text: "DLDCHAIN proposes a dual-layer governance structure to ensure both strategic direction and efficient network management, alongside a robust economic model."}],
                    articles: [
                        {
                            id: 'article-4-1-1',
                            title: 'Governance Structure',
                            content: [
                                {type: 'paragraph', text: "A dual-layer governance structure ensures both strategic direction and efficient network management."},
                                {type: 'list', items: [
                                    "<b>Governing Council (Business Governance):</b> Formally established with DLD as Chair (and veto power), VARA (Virtual Assets Regulatory Authority) as Vice-Chair, and representation from CBUAE, DFF, Tier 1 Developers, Major Banks, and Top-Tier Brokerages. This council is responsible for strategic oversight and business-level decisions.",
                                    "<b>Technical Committee (Operational Governance):</b> Works under the Governing Council to manage the operational aspects of the network. This structure ensures that the project remains aligned with national interests and is protected under sovereign authority."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-1-2',
                            title: 'Economic & Revenue Models',
                            content: [
                                {type: 'paragraph', text: "DLDCHAIN is designed to generate multiple revenue channels and optimize economic benefits for various stakeholders. Potential revenue streams include:"},
                                {type: 'list', items: [
                                    "Token Issuance Fees",
                                    "Compliance Gate Revenues (Mashroi)",
                                    "Broker Visa Revenue",
                                    "Escrow Margin Revenues",
                                    "Public API Licensing"
                                ]},
                                {type: 'paragraph', text: "The project envisions a \"valuation forecast for tokenizing a significant portion of Dubai’s property market,\" highlighting revenue channels for DLD, brokers, and developers. This model aims to create a \"self-operating profit matrix\" for all stakeholders."}
                            ]
                        },
                    ]
                },
                {
                    id: 'chapter-4-2',
                    title: 'Implementation Roadmap',
                    introduction: [{type: 'paragraph', text: "The implementation of DLDCHAIN is planned as a deliberate, four-phase approach, totaling 36+ months."}],
                    articles: [
                        {
                            id: 'article-4-2-1',
                            title: 'Phase 1: Foundation (12-18 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Build foundational infrastructure and establish the legal and organizational framework."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Assemble a core project team; manage a \"sandbox\" for new use cases; develop the core Hyperledger Fabric network; establish the Governing Council and Technical Committee; build a secure, one-way oracle for Ejari data; onboard founding government partners; develop DLD-AED MVP, pilot DXBTOKENS projects, and create EBRAM and Realtor Network MVPs; draft a comprehensive regulatory framework."}
                            ]
                        },
                        {
                            id: 'article-4-2-2',
                            title: 'Phase 2: Pilot & Expansion (18-24 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Launch and test the EBRAM smart contract suite in a controlled, real-world environment."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Develop and audit EBRAM smart contracts for residential leases; launch a pilot program for new tenancy agreements; integrate with DEWA for automated utility connections; gather feedback; launch the first DXBTOKEN; roll out the EBRAM rental system and Realtor Network; provide Data Integrity API to major portals."}
                            ]
                        },
                        {
                            id: 'article-4-2-3',
                            title: 'Phase 3: Full Rollout & Scaling (24-36 months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Expand EBRAM to the entire rental market and pilot DLDCHAIN's role in capital markets. Scale the ecosystem to become the primary infrastructure for all Dubai real estate."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Roll out the EBRAM framework as the standard process for all leases; develop EBRAM modules for short-term rentals; partner with a VARA-licensed digital asset exchange to pilot secondary trading; onboard institutional partners as nodes."}
                            ]
                        },
                        {
                            id: 'article-4-2-4',
                            title: 'Phase 4: Advanced Features (36+ months)',
                            content: [
                                {type: 'paragraph', text: "<b>Objective:</b> Implement the most advanced features and expand platform connectivity."},
                                {type: 'paragraph', text: "<b>Key Activities:</b> Develop and launch the on-chain dispute resolution module; finalize and implement the legal and technical framework for digital asset inheritance; explore and pilot cross-chain interoperability using frameworks like Hyperledger Cactus."}
                            ]
                        },
                    ]
                },
                 {
                    id: 'chapter-4-3',
                    title: 'Global Vision & Documentation',
                    introduction: [{type: 'paragraph', text: "Dubai's strategic vision for DLDCHAIN extends beyond its borders, supported by a meticulous documentation and presentation strategy."}],
                    articles: [
                        {
                            id: 'article-4-3-1',
                            title: 'Global Export Framework',
                            content: [
                                {type: 'paragraph', text: "The vision is to position Dubai as a <b class='text-primary'>\"Global Tokenized Property Exchange Hub\"</b>. This involves:"},
                                 {type: 'list', items: [
                                    "<b>Sovereign Model for Cities Worldwide:</b> DLDCHAIN is presented as a \"master model for global adoption, owned by Dubai.\" Its sovereign attribution and national contribution reinforce its legitimacy and differentiate it from commercially owned products.",
                                    "<b>Multi-City White-Label Strategy:</b> The intent is to develop DLDCHAIN as a replicable framework that can be white-labeled and adopted by other cities globally, effectively \"exporting sovereignty\" and Dubai's innovation in real estate governance."
                                ]}
                            ]
                        },
                        {
                            id: 'article-4-3-2',
                            title: 'Documentation Strategy',
                            content: [
                                {type: 'paragraph', text: "The DLDCHAIN project emphasizes meticulous documentation to convey its depth and strategic importance, aiming for <b class='text-primary'>\"nothing less than the Bitcoin-level documentation\"</b> for real estate blockchain governance."},
                                 {type: 'list', items: [
                                    "<b>Full Technical & Business Documentation (100+ pages):</b> A \"comprehensive sovereign-grade blueprint\" described as \"an Ethereum Yellow Paper meets the Dubai Land Department.\"",
                                    "<b>High-Impact Slide Deck (20 slides):</b> A visually stunning presentation with a \"clean, sovereign design\" and animated case studies.",
                                    "<b>Executive Summary (1-Page PDF):</b> A concise, quick-read version for decision-makers.",
                                    "<b>Verbal Pitch Framework:</b> A script for a powerful 5-minute pitch.",
                                    "<b>Interactive Landing Page:</b> A \"motion-driven, interactive experience\" designed to function like a \"Netflix x Apple x Dubai Government innovation portal.\""
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
        title: "Conclusion",
        content: [
            {type: 'paragraph', text: 'DLDCHAIN is not merely a proposal; it is presented as a <b class="text-primary">"constitutional system for real estate governance in the 21st century"</b>. This "legacy system" aims to secure ownership, inspire confidence, and export sovereignty. The project represents a comprehensive and deeply integrated vision for the future of real estate, aligning with Dubai\'s national digital goals and positioning the city as a global leader in innovation.'},
            {type: 'paragraph', text: 'The implementation of DLDCHAIN has the potential to fundamentally transform real estate practices, offering unparalleled transparency, efficiency, and liquidity through a meticulously designed technical, regulatory, and financial framework.'},
            {type: 'minorheading', text: 'Next Step'},
            {type: 'paragraph', text: 'To further solidify the strategic implications for senior leadership, we should prepare a detailed risk assessment and mitigation plan, addressing potential technical vulnerabilities, regulatory hurdles in global expansion, and financial market volatility. This would provide a complete picture for decision-makers.'},
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

    