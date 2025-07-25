
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
    name: "Business & Strategic Vision Book",
    group: 'business',
    lang: 'en',
    summary: "An introduction to the DLDCHAIN™ Business & Strategic Vision, outlining the strategic imperative and the promise of unprecedented trust.",
    keyTopics: ["Sovereign Protocol", "Digital Governance", "Strategic Vision", "City as Code"],
    content: documentContents['business-vision-book']
  },
  {
    id: 4,
    name: "Ecosystem Value Creation",
    group: 'business',
    lang: 'en',
    summary: "Explores how the DLDCHAIN™ ecosystem creates and transforms value through its core applications like EBRAM™, DXBTOKENS™, and Mashroi™.",
    keyTopics: ["Value Creation", "EBRAM", "DXBTOKENS", "Mashroi", "UNIVESTOR Wallet"],
    content: documentContents['ecosystem-value-creation']
  },
  {
    id: 5,
    name: "Integrated Ecosystem & Governance",
    group: 'business',
    lang: 'en',
    summary: "Details the 'Connecting, Not Replacing' philosophy and the deep integration with Dubai's existing digital ecosystem and governmental bodies.",
    keyTopics: ["Integration", "Smart Oracles", "Governance", "Cross-Ministry"],
    content: documentContents['integrated-ecosystem']
  },
  {
    id: 6,
    name: "Liquidity & Financial Backbone",
    group: 'business',
    lang: 'en',
    summary: "A deep dive into the MAKE™ System, Liquidity Officers (LPOs), and the lifecycle of liquidity provision within DLDCHAIN™.",
    keyTopics: ["MAKE System", "Liquidity", "LPO", "Financial Backbone"],
    content: documentContents['liquidity-backbone']
  },
  {
    id: 7,
    name: "LPO Revenue Model & System Synergy",
    group: 'business',
    lang: 'en',
    summary: "Outlines the revenue model for Liquidity Officers and the critical synergy between the MAKE™ and EBRAM™ systems.",
    keyTopics: ["Revenue Model", "Synergy", "EBRAM", "MAKE System"],
    content: documentContents['lpo-revenue-synergy']
  },
  {
    id: 8,
    name: "Market Making & Price Stability",
    group: 'business',
    lang: 'en',
    summary: "Provides the full market making statement for DLDCHAIN™, explaining how prices are stabilized through AI and the MAKE™ System.",
    keyTopics: ["Market Making", "Price Stability", "AI Pricing", "Mashroi"],
    content: documentContents['market-making']
  },
  {
    id: 10,
    name: "Operational Models & Compliance",
    group: 'business',
    lang: 'en',
    summary: "Details the operational models, workflow automation, legal compliance, and real-world case scenarios within DLDCHAIN™.",
    keyTopics: ["Compliance", "Case Scenarios", "Dispute Resolution", "Inheritance"],
    content: documentContents['ops-model-compliance']
  },
  {
    id: 11,
    name: "Communication & Implementation",
    group: 'business',
    lang: 'en',
    summary: "Outlines the communication strategy, presentation bundles, and the phased implementation roadmap for the DLDCHAIN™ project.",
    keyTopics: ["Roadmap", "Implementation", "Communication", "Phased Rollout"],
    content: documentContents['communication-implementation']
  },
  {
    id: 12,
    name: "Conclusion & Business Appendices",
    group: 'business',
    lang: 'en',
    summary: "Summarizes the economic and reputational impact of DLDCHAIN™ and provides detailed business-focused appendices.",
    keyTopics: ["Economic Impact", "Reputation", "Revenue Model", "Cost-Benefit"],
    content: documentContents['conclusion-appendices']
  }
];

export type DLDDoc = (typeof dldChainDocuments)[0];
