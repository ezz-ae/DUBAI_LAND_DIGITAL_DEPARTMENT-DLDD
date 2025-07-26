
import { documentContents } from './document-content';
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
    name: "Introduction: Business & Strategic Vision",
    group: 'business',
    lang: 'en',
    summary: "A comprehensive examination of DLDCHAIN™, the groundbreaking blockchain-based real estate governance system pioneered by the Dubai Land Department (DLD).",
    keyTopics: ["Business Model", "Strategy", "Value Creation", "Ecosystem"],
    content: documentContents['business-vision-book-full']
  },
  {
    id: 4,
    name: "Ecosystem Value Creation",
    group: 'business',
    lang: 'en',
    summary: "How DLDCHAIN's core applications and sovereign protocol drive business value, automate processes, and create new economic opportunities.",
    keyTopics: ["Sovereign Protocol", "EBRAM", "DXBTOKENS", "Mashroi"],
    content: documentContents['ecosystem-value-creation-4']
  },
  {
    id: 5,
    name: "Integrated Ecosystem & Governance",
    group: 'business',
    lang: 'en',
    summary: "Exploring DLDCHAIN's 'connect, not replace' philosophy for seamless integration with Dubai's existing digital infrastructure and its multi-layered governance model.",
    keyTopics: ["Integration", "Governance", "Oracles", "Cross-Ministry"],
    content: documentContents['integrated-ecosystem-5']
  },
  {
    id: 6,
    name: "Liquidity and Financial Backbone",
    group: 'business',
    lang: 'en',
    summary: "A deep dive into the MAKE™ System, its Liquidity Pool Officers (LPOs), and the unique mechanisms that ensure sovereign, 100% AED-backed liquidity.",
    keyTopics: ["MAKE System", "Liquidity", "LPO", "Financial Backbone"],
    content: documentContents['liquidity-financial-backbone-6']
  },
  {
    id: 7,
    name: "Revenue Model & Synergy",
    group: 'business',
    lang: 'en',
    summary: "A breakdown of the revenue models for Liquidity Officers and the critical synergy between the MAKE™ System's financial power and EBRAM™'s legal intelligence.",
    keyTopics: ["Revenue Model", "Synergy", "MAKE & EBRAM", "Confidentiality"],
    content: documentContents['revenue-model-lpo-7']
  },
  {
    id: 8,
    name: "Market Making & Price Stability",
    group: 'business',
    lang: 'en',
    summary: "The full market making statement for DLDCHAIN™, detailing how organic market activity is facilitated while ensuring price stability and regulatory compliance.",
    keyTopics: ["Market Making", "Price Stability", "EBRAM AI", "Organic Trading"],
    content: documentContents['market-making-8']
  },
  {
    id: 10,
    name: "Operational Models & Compliance",
    group: 'business',
    lang: 'en',
    summary: "How DLDCHAIN™ transforms real estate workflows through automation and ensures legal and regulatory compliance via its integrated model.",
    keyTopics: ["Workflow Automation", "Compliance", "Case Scenarios", "Dispute Resolution"],
    content: documentContents['operational-models-10']
  },
  {
    id: 11,
    name: "Communication & Implementation",
    group: 'business',
    lang: 'en',
    summary: "Outlines the communication strategy, tailored presentation bundles, and the detailed phased implementation roadmap for DLDCHAIN™.",
    keyTopics: ["Communication", "Implementation", "Roadmap", "Phased Rollout"],
    content: documentContents['communication-implementation-11']
  },
  {
    id: 12,
    name: "Conclusion & Appendices",
    group: 'business',
    lang: 'en',
    summary: "The concluding vision for DLDCHAIN™, summarizing its economic and reputational impact, and detailed appendices covering key terms, revenue models, and stakeholder benefits.",
    keyTopics: ["Economic Impact", "Reputation", "Glossary", "Revenue Models"],
    content: documentContents['conclusion-appendices-12']
  },
  {
    id: 17,
    name: "DLDCHAIN™ Full Business & Strategic Vision Book",
    group: 'business-full',
    lang: 'en',
    summary: "The complete Business & Strategic Vision Book for DLDCHAIN™, detailing the strategic purpose, business value, and transformative potential of the entire ecosystem.",
    keyTopics: ["Strategic Vision", "Business Model", "Ecosystem Value", "Global Expansion"],
    content: documentContents['business-vision-book-full']
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
