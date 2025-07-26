
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
    content: stringifyContent(technicalBook.introduction.content)
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

    