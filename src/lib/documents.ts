
import { technicalBook } from './technical-documents';
import type { ContentItem } from './types';


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

const allTechnicalContent = technicalBook.parts.flatMap(part => 
  part.chapters.flatMap(chapter => 
    [chapter.introduction, ...chapter.articles.flatMap(article => article.content)]
  )
).flat();

const stringifyContent = (items: ContentItem[]): string => {
  return items.map(item => {
    if (item.type === 'paragraph' || item.type === 'heading' || item.type === 'subheading' || item.type === 'minorheading') {
      return item.text;
    }
    if (item.type === 'list') {
      return item.items.join(' ');
    }
    if (item.type === 'code') {
      return item.text;
    }
    return '';
  }).join(' ').replace(/<[^>]*>/g, ''); // Also strip HTML for AI context
};

export const dldChainDocuments: DLDDocument[] = [
  // This can be simplified or removed if not used elsewhere,
  // but kept for now for context in other views.
  {
    id: 1,
    name: "DLDCHAIN Project Vision",
    group: 'vision',
    lang: 'en',
    summary: "A high-level overview of the DLDCHAIN project, its goals, and its potential impact on Dubai's real estate market.",
    keyTopics: ["Sovereign Ledger", "Tokenization", "Smart Contracts", "Ecosystem"],
    content: executiveSummaryContent
  },
  {
    id: 19,
    name: "[AI] Full Technical Book",
    group: 'ai',
    lang: 'en',
    summary: "The complete technical book for AI conversation. This document contains the full, aggregated text from all parts of the technical analysis book.",
    keyTopics: ["Architecture", "Smart Contracts", "Security", "Simulations", "Hyperledger Fabric"],
    content: stringifyContent(allTechnicalContent)
  }
];

export type DLDDoc = (typeof dldChainDocuments)[0];
