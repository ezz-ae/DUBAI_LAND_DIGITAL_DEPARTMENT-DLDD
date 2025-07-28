
import { technicalBook } from './technical-documents';
import type { ContentItem } from '@/lib/types';


interface DLDDocument {
  id: number;
  name: string;
  group: string;
  lang: 'en' | 'ar';
  summary: string;
  keyTopics: string[];
  content: string;
}

const executiveSummaryContent = `DLDCHAIN: Dubai's Sovereign Real Estate Operating System
Executive Summary
DLDCHAIN is a proposed sovereign-grade real estate governance infrastructure, transforming Dubai's property market into a secure, efficient, and globally exportable system. It deeply integrates blockchain technology, AI reporting, and comprehensive governmental compliance, positioning the Dubai Land Department (DLD) and Real Estate Regulatory Authority (RERA) at the forefront of achieving national digital goals aligned with UAE Vision 2031. This system is unequivocally "Authored by Dubai. Operated by Dubai. For the world," aiming to become a "legacy system—not a product" that "secures ownership," "inspires confidence," and "exports sovereignty."

I. Core System Design & Purpose
DLDCHAIN is a "smart blockchain" and a "foundational digital utility" that moves "beyond simply recording data" to enable "real-time intelligence, automated decision-making, predictive insights, and proactive governance." It is a "purpose-built, government-led, permissioned blockchain" tailored for the complexities of property transactions in Dubai.

1. Sovereign Ledger & Direct DLD Control
DLDCHAIN operates as a "Sovereign Ledger," directly governed by the Dubai Land Department (DLD). This means the DLD "becomes the network," setting rules, controlling access, managing the ledger, and guaranteeing its stability and integrity. This transforms DLD from merely regulating private digital platforms to becoming the foundational operator of the digital market itself, mitigating platform risks and eliminating long-term dependencies.

2. Hyperledger Fabric: Government-Grade Foundation
The selection of Hyperledger Fabric is paramount due to its: Permissioned Network, Modular and Configurable Architecture, No Native Speculative Cryptocurrency, and Channels and Private Data Collections.

3. Comprehensive AI Integration: Intelligent Governance
AI is a core tool for enhancing market governance and transparency. This includes the EBRAM™ AI-Weighted Node System for dynamic property valuations, EBRAMGPT™ as an AI Legal Copilot, the Mashroi™ AI Engine for professional governance, and Automated Market Reports for proactive policy making.

II. Key Components
1. EBRAM™: The central "smart contract system" and "legal-transactional language" of DLDCHAIN, envisioned as "the law, coded and automated." It handles the entire lifecycle of real estate agreements.
2. DXBTOKENS™: Represent "native ownership" of physical properties, enabling unprecedented liquidity. Their value is based on intrinsic worth, not rental streams.
3. DLD Digital Dirham (DLD-AED): The exclusive, fiat-pegged stablecoin for all transactions, eliminating crypto volatility.
4. Mashroi™: The "Nation’s Real Estate Intelligence Grid," a mandatory hub for professionalizing the brokerage ecosystem through AI-driven licensing, education, and compliance.
5. MAKE™ System: The sovereign, internal liquidity backbone ensuring every DXBTOKEN™ is 100% AED-backed.
6. UNIVESTOR Wallet™: The singular, secure, user-friendly gateway for all ecosystem interactions.

III. Comprehensive Integration & Governance
DLDCHAIN follows a "connect, not replace" philosophy, turning existing systems like Ejari and Milka into "Smart Verification Oracles." It operates under a government-led consortium with a dual-layer governance structure.

IV. Benefits & Global Ambition
DLDCHAIN addresses market challenges like illiquidity and information asymmetry. It generates new revenue streams through service fees (not taxes) and aims to tokenize up to 7% of Dubai's real estate market by 2033 (AED 60 billion). The vision is to export this "Sovereign Model for Cities Worldwide" via a "Multi-City White-Label Strategy."

V. Key Milestones & Roadmap
Building on successful 2025 milestones, a 36+ month phased roadmap will cover development, pilot programs, and full market integration.

VI. Security, Compliance & Dispute Resolution
The system prioritizes "deep security," with features like automated compliance, on-chain dispute resolution for common issues, and a legally robust Digital Asset Inheritance ("Lost Key Solution") protocol.
`;

const technicalAnalysisContent = `DLDCHAIN Technical Analysis
This document provides a comprehensive technical examination of DLDCHAIN™, the groundbreaking blockchain-based real estate governance system. It dissects each component of the ecosystem – including EBRAM™, DXBTOKENS™, the MAKE™ System, Mashroi™, and the UNIVESTOR Wallet™ – detailing their purpose, functionality, and technical architecture.

1. Core Architecture: Hyperledger Fabric
DLDCHAIN is built upon Hyperledger Fabric, a permissioned, enterprise-grade distributed ledger technology (DLT) platform. This choice is deliberate and central to the system's design for the following reasons:
- Permissioned Network: Only known, verified, and authorized entities (DLD, banks, licensed brokers) can participate as nodes. This ensures a high level of trust, accountability, and regulatory compliance (KYC/AML).
- Data Confidentiality: Fabric's "Channels" and "Private Data Collections" allow for confidential transactions. For example, the financial details of a mortgage agreement can be shared privately, while only a hash of the transaction is committed to the main ledger for verification.
- No Native Cryptocurrency: Fabric does not require a volatile native cryptocurrency. This aligns with DLDCHAIN's fiat-only model using the stable DLD-AED, making the system economically predictable.
- Pluggable Consensus: Allows for the use of efficient consensus mechanisms (like Raft) suitable for a consortium of trusted entities, enabling high transaction throughput.

2. EBRAM™: The Intelligent Contract Engine
EBRAM™ is the unified smart contract layer and legal-transactional language of DLDCHAIN™, designed to be "the law, coded and automated."
- Dual-Layer Architecture: It uses a human-readable legal logic layer (EBRAM DSL) and a computational execution layer (Python/Go Chaincode) to ensure precision between legal intent and digital execution.
- EBRAMGPT™ (AI Legal Copilot): A powerful AI assistant that translates natural language (Arabic, English) into valid EBRAM™ smart clauses. It offers context-aware drafting, suggests missing protections, flags risks, and facilitates AI-coordinated group negotiations.
- AI-Weighted Node System: This "sentient economic layer" uses AI to assign "weights" to real-world and on-chain events (e.g., property status, last valuation) to dynamically influence property valuations and DXBTOKEN™ prices, preventing "unlogical" transactions.

3. DXBTOKENS™: Programmable Real Estate Ownership
DXBTOKENS™ are the native, verifiable digital shares of physical properties, fractionalized on a "1 sqft = 1 token" basis.
- Value-Centric, Not Yield-Focused: The token's value is derived from the underlying asset's appreciation, not rental income. This decouples value from tenancy risk and provides greater stability.
- Rigorous Minting Process: Only DLD-approved "mega-projects" are eligible. DLDCHAIN™ is the sole minting authority, ensuring centralized control and regulatory compliance.
- Guaranteed Liquidity: The MAKE™ System ensures every DXBTOKEN™ is 100% backed by AED, providing unparalleled liquidity and investor confidence.

4. The MAKE™ System: Sovereign Liquidity Backbone
The MAKE™ System is DLDCHAIN's internal, non-public, and permissioned liquidity infrastructure. Its core principle is "No liquidity = no token."
- Liquidity Pool Officers (LPOs): Regulated financial institutions (banks, escrow offices) act as verified "signers" who commit 100% of a property's AED value to underwrite its tokenization.
- Escrowship Doctrine: This is a unique security lock where Owner ≠ Trader. When tokens are in a MAKE™ Pool (in "escrowship"), the LPO acts as a custodian, not a beneficial owner. This cryptographically prevents misuse and ensures legal clarity.
- MAKE™ Event Lifecycle: A precise series of events (MAKELIST, MAKETRADE, MAKE_ID, MAKE_IN, MAKE_DISMISS) governs the entire liquidity flow from tokenization to final settlement, all orchestrated by EBRAM™'s legal logic.

5. Mashroi™: The Nation’s Real Estate Intelligence Grid
Mashroi™ is the AI-powered hub for real estate professionals, designed to transform and professionalize the brokerage ecosystem through merit-based governance.
- Smart Licensing & Visas: Automates broker licensing, education, and the issuance of 3-month renewable "smart visas," all linked to performance and compliance.
- AI-Driven Compliance: "Mashroi™ watchers" use AI to monitor for unethical behavior or misinformation, enforcing rules with automated fines.
- Contribution-Based Empowerment: A meritocratic system where a broker's reputation, visibility, and opportunities are earned through verified contributions and learning, not purchased.

6. UNIVESTOR Wallet™: The Single Gateway
The wallet is the singular, secure, government-issued digital identity and access point for all interactions within the ecosystem, designed for users with "zero technical knowledge."
- Password-Free Security: Utilizes dynamic OTPs and smart cookies for secure access, eliminating password-related risks.
- Fiat-Only (DLD-AED): Operates exclusively with the DLD Digital Dirham, a stablecoin pegged 1:1 to the UAE Dirham, removing crypto volatility.
- Tiered & Personalized Access: The interface and functionalities adapt to the user's verified role (Investor, Developer, Broker, etc.), ensuring a streamlined and relevant experience.

7. Security & Integration Strategy
Security is multi-layered, following a zero-trust model, and the system is designed to "connect, not replace" existing trusted government systems.
- Smart Verification Oracles: Existing systems like Ejari (rental contracts) and Milka (title deeds) are treated as "oracles." DLDCHAIN integrates with them via secure, read-only APIs, making them active triggers for on-chain smart contracts.
- API Gateway: A robust API gateway manages all inbound and outbound data flows, handling authentication, rate limiting, and data transformation for interactions with external partners like banks and other government agencies.
- Smart Contract Security: All EBRAM chaincode undergoes rigorous static analysis, dynamic analysis, and formal verification before deployment. Endorsement policies on Fabric ensure that critical transactions require multi-signature approval from designated entities.

8. Conclusion
The technical architecture of DLDCHAIN is sound, secure, and highly pragmatic. The choice of Hyperledger Fabric provides a strong foundation for a sovereign system, while the innovative EBRAM engine, MAKE liquidity system, and Mashroi professional hub create a uniquely intelligent and trustworthy ecosystem. The API-first integration strategy allows for powerful automation without replacing trusted legacy systems. The security model is comprehensive, addressing identity, data, and transactional integrity. This technical design is fully capable of delivering on the project's ambitious vision.
`;

export const dldChainDocuments: DLDDocument[] = [
  // This can be simplified or removed if not used elsewhere,
  // but kept for now for context in other views.
  {
    id: 1,
    name: "DLDCHAIN Project Overview",
    group: 'vision',
    lang: 'en',
    summary: "A high-level overview of the DLDCHAIN project, its goals, and its potential impact on Dubai's real estate market.",
    keyTopics: ["Sovereign Ledger", "Tokenization", "Smart Contracts", "Ecosystem"],
    content: executiveSummaryContent
  },
  {
    id: 2,
    name: "DLDCHAIN Technical Analysis",
    group: 'technical',
    lang: 'en',
    summary: "A comprehensive overview of the DLDCHAIN technical architecture, core components, and security protocols.",
    keyTopics: ["Hyperledger Fabric", "EBRAM", "MAKE System", "Mashroi"],
    content: technicalAnalysisContent
  }
];

export type DLDDoc = (typeof dldChainDocuments)[0];
