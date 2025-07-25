
import { documentContents } from './document-content';
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

const allTechnicalContent = technicalBook.parts.flatMap(part => 
  part.chapters.flatMap(chapter => 
    [chapter.introduction, ...chapter.articles.flatMap(article => article.content)]
  )
).flat();

const stringifyContent = (items: ContentItem[]): string => {
  return items.map(item => {
    if (item.type === 'paragraph' || item.type === 'heading' || item.type === 'subheading') {
      return item.text;
    }
    if (item.type === 'list') {
      return item.items.join(' ');
    }
    if (item.type === 'code') {
      return item.text;
    }
    return '';
  }).join(' ');
};

export const dldChainDocuments: DLDDocument[] = [
  {
    id: 1,
    name: "DLDCHAIN Project Vision",
    group: 'vision',
    lang: 'en',
    summary: "A high-level overview of the DLDCHAIN project, its goals, and its potential impact on Dubai's real estate market.",
    keyTopics: ["Sovereign Ledger", "Tokenization", "Smart Contracts", "Ecosystem"],
    content: documentContents['vision-en']
  },
  {
    id: 2,
    name: "رؤية مشروع DLDCHAIN",
    group: 'vision',
    lang: 'ar',
    summary: "نظرة عامة عالية المستوى على مشروع DLDCHAIN وأهدافه وتأثيره المحتمل على سوق العقارات في دبي.",
    keyTopics: ["السجل السيادي", "الترميز", "العقود الذكية", "النظام البيئي"],
    content: documentContents['vision-ar']
  },
  {
    id: 3,
    name: "The Philosophy of DLDCHAIN™",
    group: 'philosophy',
    lang: 'en',
    summary: "Exploring the foundational philosophies of trust, ownership, value, and sovereignty that define DLDCHAIN's new paradigm for digital real estate governance.",
    keyTopics: ["Connection", "Ownership", "Value", "Trust", "Intelligence", "Sovereignty"],
    content: documentContents['philosophy-of-dldchain']
  },
  {
    id: 4,
    name: "EBRAMGPT™: The AI-Powered Legal Copilot",
    group: 'philosophy',
    lang: 'en',
    summary: "A detailed look at how EBRAMGPT™ transforms legal processes from natural language into sovereign smart contracts on DLDCHAIN™, democratizing legal access.",
    keyTopics: ["AI Copilot", "Natural Language to Code", "Context-Aware Drafting", "Risk Mitigation"],
    content: documentContents['ebram-gpt-philosophy']
  },
  {
    id: 5,
    name: "UNIVESTOR Wallet™: The Single Gateway",
    group: 'philosophy',
    lang: 'en',
    summary: "An examination of the UNIVESTOR Wallet™ as the secure, user-centric portal for all DLDCHAIN™ interactions, emphasizing its role in simplifying digital real estate.",
    keyTopics: ["Unified Digital Identity", "Fiat-Only (DLD-AED)", "Zero Technical Burden", "Tiered Access"],
    content: documentContents['univestor-wallet-philosophy']
  },
  {
    id: 6,
    name: "Mashroi™: The Nation’s Real Estate Intelligence Grid",
    group: 'philosophy',
    lang: 'en',
    summary: "Detailing Mashroi's unique philosophy as a 'governmental governless' contribution-based system that redefines HR governance and meritocracy in real estate.",
    keyTopics: ["Contribution-Based Empowerment", "AI Governance", "Merit System", "Digital Events"],
    content: documentContents['mashroi-philosophy']
  },
   {
    id: 7,
    name: "Mashroi™ Digital Events: The Industry's Live Hub",
    group: 'philosophy',
    lang: 'en',
    summary: "How Mashroi™ Digital Events creates a verified, intelligent, and interactive live platform for the entire real estate industry to connect, communicate, and collaborate.",
    keyTopics: ["Interactive Launchpads", "Audience Engagement", "Verified Engagement", "Market Connection"],
    content: documentContents['mashroi-events-philosophy']
  },
  {
    id: 8,
    name: "DXBTOKENS™: Programmable Real Estate Ownership",
    group: 'philosophy',
    lang: 'en',
    summary: "A deep dive into DXBTOKENS™ as the core of Dubai's programmable real estate, revolutionizing liquidity, trust, and global accessibility through a value-first model.",
    keyTopics: ["Value-Centric Tokenization", "MAKE™ System", "Escrowship Doctrine", "Legal Finality"],
    content: documentContents['dxbtokens-philosophy']
  },
  {
    id: 9,
    name: "DLDCHAIN™ vs. Global Tokenization: A Comparative Study",
    group: 'philosophy',
    lang: 'en',
    summary: "An analysis comparing DLDCHAIN's sovereign, legally-anchored model against common global tokenization approaches, highlighting its unique advantages.",
    keyTopics: ["Sovereign Standard", "Legal Superiority", "Guaranteed Liquidity", "AI-Driven Governance"],
    content: documentContents['dldchain-vs-global']
  },
  {
    id: 10,
    name: "The Governance of DLDCHAIN™",
    group: 'philosophy',
    lang: 'en',
    summary: "A study of DLDCHAIN's governance model, which ensures sovereign control, unified authority, and independence, establishing DLD as a global system provider.",
    keyTopics: ["Sovereign Anchor", "Consortium Model", "Dual-Layer Governance", "Independence"],
    content: documentContents['governance-philosophy']
  },
  {
    id: 11,
    name: "DLD to DLDD: The Transformation",
    group: 'philosophy',
    lang: 'en',
    summary: "How DLDCHAIN™ catalyzes the evolution of the Dubai Land Department into a sovereign digital operating system (DLDD) for real estate.",
    keyTopics: ["Operational Transformation", "Technological Empowerment", "Regulatory Evolution", "Global Impact"],
    content: documentContents['dld-to-dldd']
  },
  {
    id: 12,
    name: "Data Security and API Network",
    group: 'philosophy',
    lang: 'en',
    summary: "A comprehensive study of DLDCHAIN's advanced data security measures and sophisticated API network, which protect data and power seamless connectivity.",
    keyTopics: ["Data Security", "API Network", "Immutable Records", "Confidentiality"],
    content: documentContents['data-security']
  },
  {
    id: 13,
    name: "The Market Benefits of DLDCHAIN™",
    group: 'philosophy',
    lang: 'en',
    summary: "Detailing the value creation across the ecosystem, showing how every participant gains from Dubai's sovereign real estate operating system.",
    keyTopics: ["Mutual Value Creation", "Stakeholder Benefits", "Economic Impact", "Market Transformation"],
    content: documentContents['market-benefits']
  },
  {
    id: 14,
    name: "Liquidity on DLDCHAIN™: A Paradigm Shift",
    group: 'philosophy',
    lang: 'en',
    summary: "A deep dive into DLDCHAIN's revolutionary liquidity model, built on the dual smart contract logic of EBRAM™ and the MAKE™ System.",
    keyTopics: ["Sovereign Liquidity", "MAKE™ System", "Dual Smart Contracts", "Escrowship"],
    content: documentContents['liquidity-philosophy']
  },
  {
    id: 15,
    name: "The Mixed Technology of AI and Blockchain",
    group: 'philosophy',
    lang: 'en',
    summary: "An exploration of how the synergy of AI and Blockchain makes DLDCHAIN™ an intelligent, adaptive, and self-governing real estate protocol.",
    keyTopics: ["AI Governance", "Intelligent Contracts", "Blockchain Trust Anchor", "Predictive Governance"],
    content: documentContents['ai-blockchain-mix']
  },
  {
    id: 16,
    name: "New Market Opportunities from DLDCHAIN™",
    group: 'philosophy',
    lang: 'en',
    summary: "A study of the new economic frontiers and business models catalyzed by DLDCHAIN™, from digital brokerage services to advanced data analytics.",
    keyTopics: ["Business Innovation", "Digital Brokerage", "Data Monetization", "PropTech Solutions"],
    content: documentContents['new-market-opportunities']
  },
  {
    id: 17,
    name: "Business & Strategic Vision Book (Full)",
    group: 'business',
    lang: 'en',
    summary: "The complete Business & Strategic Vision Book for DLDCHAIN™, detailing the strategic purpose, business value, and transformative potential of the entire ecosystem.",
    keyTopics: ["Strategic Vision", "Business Model", "Ecosystem Value", "Global Expansion"],
    content: documentContents['business-vision-book-full']
  },
   {
    id: 18,
    name: "DLDCHAIN™ Simulation: Real-World Scenarios",
    group: 'simulations',
    lang: 'en',
    summary: "A detailed, step-by-step walkthrough of three distinct tokenization cases: an individual apartment, a mortgaged villa, and a luxury off-plan unit.",
    keyTopics: ["Simulations", "Tokenization Scenarios", "Ready Property", "Mortgaged Property", "Off-Plan"],
    content: documentContents['simulation-scenarios']
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

    