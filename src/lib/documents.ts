
import { documentContents } from './document-content';

interface DLDDocument {
  id: number;
  name: string;
  group: string;
  lang: 'en' | 'ar';
  summary: string;
  keyTopics: string[];
  content: string;
}

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
    id: 19,
    name: "رؤية مشروع DLDCHAIN",
    group: 'vision',
    lang: 'ar',
    summary: "نظرة عامة عالية المستوى على مشروع DLDCHAIN وأهدافه وتأثيره المحتمل على سوق العقارات في دبي.",
    keyTopics: ["السجل السيادي", "الترميز", "العقود الذكية", "النظام البيئي"],
    content: documentContents['vision-ar']
  },
  {
    id: 2,
    name: "The Philosophy of DLDCHAIN™",
    group: 'philosophy',
    lang: 'en',
    summary: "Explores the foundational philosophies of trust, connection, ownership, value, and sovereignty that define the DLDCHAIN™ ecosystem.",
    keyTopics: ["Connecting Not Replacing", "Token = True = Owner", "Pure Value", "Sovereignty"],
    content: documentContents['philosophy-en']
  },
  {
    id: 3,
    name: "EBRAMGPT™: The AI Legal Copilot",
    group: 'components',
    lang: 'en',
    summary: "Details the AI-powered legal assistant that translates natural language into smart contracts, democratizing legal processes on DLDCHAIN™.",
    keyTopics: ["Natural Language to Code", "AI Governance", "Legal Copilot", "Context-Aware Drafting"],
    content: documentContents['ebramgpt-en']
  },
  {
    id: 4,
    name: "UNIVESTOR Wallet™: The Gateway",
    group: 'components',
    lang: 'en',
    summary: "An overview of the single, secure, government-issued digital wallet for all DLDCHAIN™ interactions, designed for simplicity and trust.",
    keyTopics: ["Unified Digital Identity", "Fiat-Only (DLD-AED)", "Password-Free Security", "Tiered Access"],
    content: documentContents['univestor-en']
  },
  {
    id: 5,
    name: "Mashroi™: The Intelligence Grid",
    group: 'components',
    lang: 'en',
    summary: "Explains the AI-driven professional hub for broker licensing, education, and compliance, fostering a merit-based real estate workforce.",
    keyTopics: ["Contribution Empowerment", "Smart Visa", "Compliance Tracking", "Digital Events"],
    content: documentContents['mashroi-en']
  },
  {
    id: 6,
    name: "Mashroi™ Digital Events",
    group: 'components',
    lang: 'en',
    summary: "Details the interactive virtual event platform within Mashroi™ for industry announcements, project launches, and professional networking.",
    keyTopics: ["Interactive Launchpads", "Audience Engagement", "Lead Generation", "AI Analytics"],
    content: documentContents['mashroi-events-en']
  },
  {
    id: 7,
    name: "DXBTOKENS™: Programmable Ownership",
    group: 'components',
    lang: 'en',
    summary: "A deep dive into the core tokenization protocol, where 1 sqft = 1 token, focusing on value, liquidity, and lifecycle management.",
    keyTopics: ["Value-Centric Assets", "Token Lifecycle", "Escrowship Doctrine", "MAKE™ System"],
    content: documentContents['dxbtokens-en']
  },
  {
    id: 8,
    name: "DLDCHAIN vs. Global Tokenization",
    group: 'strategy',
    lang: 'en',
    summary: "A comparative study highlighting DLDCHAIN™'s sovereign, legally-anchored, and AI-powered advantages over common global models.",
    keyTopics: ["Sovereign Standard", "Liquidity Guarantee", "Legal Superiority", "Intelligent Governance"],
    content: documentContents['tokenization-comparison-en']
  },
  {
    id: 9,
    name: "The Governance of DLDCHAIN™",
    group: 'strategy',
    lang: 'en',
    summary: "Outlines the sovereign control, unified government consortium, and dual-layer governance structure that ensures trust and independence.",
    keyTopics: ["Sovereign Anchor", "Consortium Model", "On-Chain Governance", "Global System Provider"],
    content: documentContents['governance-en']
  },
  {
    id: 10,
    name: "The Rise of the DLDD",
    group: 'strategy',
    lang: 'en',
    summary: "Details the transformation of the Dubai Land Department (DLD) into the Dubai Land Digital Department (DLDD), a global system provider.",
    keyTopics: ["Sovereign Operator", "Workflow Automation", "Data Intelligence Hub", "Global Leadership"],
    content: documentContents['dldd-en']
  },
  {
    id: 11,
    name: "Market Benefits of DLDCHAIN™",
    group: 'strategy',
    lang: 'en',
    summary: "A breakdown of the value created for every market participant, from property owners and investors to developers and brokers.",
    keyTopics: ["Mutual Value Creation", "Accelerated Liquidity", "Enhanced Trust", "New Revenue Streams"],
    content: documentContents['market-benefits-en']
  },
  {
    id: 12,
    name: "Liquidity on DLDCHAIN™",
    group: 'strategy',
    lang: 'en',
    summary: "Explains the paradigm shift in real estate finance through the MAKE™ System, dual smart contracts, and the unbreakable escrowship doctrine.",
    keyTopics: ["Sovereign Liquidity", "MAKE™ System", "Dual Smart Contracts", "Escrowship Doctrine"],
    content: documentContents['liquidity-en']
  },
  {
    id: 13,
    name: "The Mix of AI & Blockchain",
    group: 'strategy',
    lang: 'en',
    summary: "Details how the synergy of AI and Blockchain creates a smart, adaptive, and self-governing real estate protocol.",
    keyTopics: ["AI Legal Brain (EBRAM)", "Intelligent Governance", "Blockchain as Trust Anchor", "Smart Operating System"],
    content: documentContents['ai-blockchain-mix-en']
  },
  {
    id: 14,
    name: "New Market Opportunities",
    group: 'strategy',
    lang: 'en',
    summary: "A study of how DLDCHAIN™ acts as a catalyst for business innovation, creating new economic frontiers for all stakeholders.",
    keyTopics: ["Digital Kiosks", "Data Licensing", "Verified Listings", "Earn and Learn Model"],
    content: documentContents['new-market-opps-en']
  }
];
