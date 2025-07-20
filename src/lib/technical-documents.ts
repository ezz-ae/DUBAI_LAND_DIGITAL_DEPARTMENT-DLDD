


interface CodeContent {
    type: 'code';
    language: string;
    text: string;
}

interface TextContent {
    type: 'paragraph' | 'heading' | 'subheading';
    text: string;
}

interface ListContent {
    type: 'list';
    items: string[];
}

export type ContentItem = CodeContent | TextContent | ListContent;

export interface BookArticle {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface BookChapter {
  id: string;
  title: string;
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
    preparedFor: string;
    preparedBy: string;
    date: string;
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
    title: "DLDCHAIN: The Architectural Governance Protocol for Dubai's Real Estate Future",
    subtitle: "A Comprehensive Technical Analysis",
    preparedFor: "Dubai Land Department (DLD) and Strategic Partners",
    preparedBy: "Mahmoud Ezz, Dubai Resident | Real Estate Specialist | Technology Architect",
    date: "Q4 2025 – Dubai, UAE",
    introduction: {
        id: 'book-introduction',
        title: "Book Introduction: Driving Digital Sovereignty in Real Estate",
        content: []
    },
    parts: [
        {
            id: 'part-1',
            title: "Part I: The Strategic Vision",
            chapters: [
                {
                    id: 'chapter-1',
                    title: "Chapter 1: From Registry to Operating System",
                    articles: [
                        { id: 'article-1-1', title: 'Article 1.1: The Vision of "City as Code"', content: [] },
                        { id: 'article-1-2', title: 'Article 1.2: DLD as Chain Governor', content: [] },
                        { id: 'article-1-3', title: 'Article 1.3: Cross-Entity Integration', content: [] }
                    ]
                },
                {
                    id: 'chapter-2',
                    title: "Chapter 2: Foundational Principles",
                    articles: [
                        { id: 'article-2-1', title: 'Article 2.1: DLD-AED Overview', content: [] },
                        { id: 'article-2-2', title: 'Article 2.2: DLD-AED Mechanism', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-2',
            title: "Part II: Core Protocol Pillars",
            chapters: [
                {
                    id: 'chapter-3',
                    title: "Chapter 3: EBRAM Language",
                    articles: [
                        { id: 'article-3-1', title: 'Article 3.1: EBRAM Overview', content: [] },
                        { id: 'article-3-2', title: 'Article 3.2: EBRAM Syntax & Logic', content: [] },
                        { id: 'article-3-3', title: 'Article 3.3: EBRAM Integrations', content: [] },
                        { id: 'article-3-4', title: 'Article 3.4: EBRAM Smart Pricing', content: [] }
                    ]
                },
                {
                    id: 'chapter-4',
                    title: "Chapter 4: EBRAMGPT AI Advisor",
                    articles: [
                        { id: 'article-4-1', title: 'Article 4.1: EBRAMGPT Overview', content: [] },
                        { id: 'article-4-2', title: 'Article 4.2: EBRAMGPT Functionalities', content: [] },
                        { id: 'article-4-3', title: 'Article 4.3: EBRAMGPT Systems & Impact', content: [] }
                    ]
                },
                {
                    id: 'chapter-5',
                    title: "Chapter 5: DXBTOKENS",
                    articles: [
                        { id: 'article-5-1', title: 'Article 5.1: DXBTOKENS Overview', content: [] },
                        { id: 'article-5-2', title: 'Article 5.2: DXBTOKENS Lifecycle', content: [] }
                    ]
                },
                {
                    id: 'chapter-6',
                    title: "Chapter 6: The MAKE System",
                    articles: [
                        { id: 'article-6-1', title: 'Article 6.1: MAKE System Overview', content: [] },
                        { id: 'article-6-2', title: 'Article 6.2: MAKE System Lifecycle', content: [] },
                        { id: 'article-6-3', title: 'Article 6.3: MAKE System Security', content: [] },
                        { id: 'article-6-4', title: 'Article 6.4: MAKE & EBRAM Synergy', content: [] }
                    ]
                },
                {
                    id: 'chapter-7',
                    title: "Chapter 7: Mashroi Intelligence Grid",
                    articles: [
                        { id: 'article-7-1', title: 'Article 7.1: Mashroi Overview', content: [] },
                        { id: 'article-7-2', title: 'Article 7.2: Mashroi Functionalities', content: [] },
                        { id: 'article-7-3', title: 'Article 7.3: Mashroi Governance', content: [] }
                    ]
                },
                {
                    id: 'chapter-8',
                    title: "Chapter 8: The UNIVESTOR Wallet",
                    articles: [
                        { id: 'article-8-1', title: 'Article 8.1: UNIVESTOR Wallet Overview', content: [] },
                        { id: 'article-8-2', title: 'Article 8.2: UNIVESTOR Wallet Functionalities', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-3',
            title: "Part III: Technical Architecture",
            chapters: [
                {
                    id: 'chapter-9',
                    title: "Chapter 9: Core Blockchain Architecture",
                    articles: [
                        { id: 'article-9-1', title: 'Article 9.1: Hyperledger Fabric in DLDCHAIN', content: [] }
                    ]
                },
                {
                    id: 'chapter-10',
                    title: "Chapter 10: Technical Development Plan",
                    articles: [
                        { id: 'article-10-1', title: 'Article 10.1: System Architecture Overview', content: [] },
                        { id: 'article-10-2', title: 'Article 10.2: Mocking Up Key Elements', content: [] },
                        { id: 'article-10-3', title: 'Article 10.3: EBRAM Smart Contract Development', content: [] },
                        { id: 'article-10-4', title: 'Article 10.4: Phased Technical Development', content: [] },
                        { id: 'article-10-5', title: 'Article 10.5: Tools and Technologies', content: [] }
                    ]
                },
                {
                    id: 'chapter-11',
                    title: "Chapter 11: DLDCHAIN Technical Map",
                    articles: [
                        { id: 'article-11-1', title: 'Article 11.1: Core Components Breakdown', content: [] },
                        { id: 'article-11-2', title: 'Article 11.2: External Integrations', content: [] },
                        { id: 'article-11-3', title: 'Article 11.3: Data Flow', content: [] },
                        { id: 'article-11-4', title: 'Article 11.4: Security Framework', content: [] }
                    ]
                },
                {
                    id: 'chapter-12',
                    title: "Chapter 12: DLDCHAIN Smart Contract",
                    articles: [
                        { id: 'article-12-1', title: 'Article 12.1: Contract Overview & Code', content: [] },
                        { id: 'article-12-2', title: 'Article 12.2: Contract Explanation', content: [] },
                        { id: 'article-12-3', title: 'Article 12.3: Auditability & Compliance', content: [] }
                    ]
                }
            ]
        },
        {
            id: 'part-4',
            title: "Part IV: Economic & Governance",
            chapters: [
                {
                    id: 'chapter-13',
                    title: "Chapter 13: Economic Models",
                    articles: [
                        { id: 'article-13-1', title: 'Article 13.1: Economic Models Overview', content: [] },
                        { id: 'article-13-2', title: 'Article 13.2: Key Revenue Streams', content: [] },
                        { id: 'article-13-3', title: 'Article 13.3: Strategic Alignment', content: [] }
                    ]
                },
                {
                    id: 'chapter-14',
                    title: "Chapter 14: Automation & Reporting",
                    articles: [
                        { id: 'article-14-1', title: 'Article 14.1: Engine Overview', content: [] },
                        { id: 'article-14-2', title: 'Article 14.2: Market Analytics', content: [] },
                        { id: 'article-14-3', title: 'Article 14.3: Automated Compliance', content: [] }
                    ]
                },
                {
                    id: 'chapter-15',
                    title: "Chapter 15: Compliance & Risk",
                    articles: [
                        { id: 'article-15-1', title: 'Article 15.1: EBRAM Veracity Commons', content: [] },
                        { id: 'article-15-2', title: 'Article 15.2: Security Overview', content: [] },
                        { id: 'article-15-3', title: 'Article 15.3: Advanced Security', content: [] }
                    ]
                },
                 {
                    id: 'chapter-16',
                    title: "Chapter 16: Governmental Integration",
                    articles: [
                        { id: 'article-16-1', title: 'Article 16.1: Integration Overview', content: [] },
                        { id: 'article-16-2', title: 'Article 16.2: Stakeholder Integration', content: [] },
                    ]
                },
            ]
        },
        {
            id: 'part-5',
            title: "Part V: Global Vision & Impact",
            chapters: [
                { id: 'chapter-17', title: 'Chapter 17: Talent & Innovation', articles: [] },
                { id: 'chapter-18', title: 'Chapter 18: Modernizing Mortgages', articles: [] },
                { id: 'chapter-19', title: 'Chapter 19: Mortgaged Property Tokenization', articles: [] },
                { id: 'chapter-20', title: 'Chapter 20: Off-Plan Property Tokenization', articles: [] },
                { id: 'chapter-21', title: 'Chapter 21: Market Making System', articles: [] },
                { id: 'chapter-22', title: 'Chapter 22: Broker Income via Tokenization', articles: [] },
                { id: 'chapter-23', title: 'Chapter 23: Integration Philosophy', articles: [] },
                {
                    id: 'chapter-24',
                    title: "Chapter 24: Global Export Framework",
                    articles: [
                        { id: 'article-24-1', title: 'Article 24.1: Sovereign Model for Cities', content: [] },
                        { id: 'article-24-2', title: 'Article 24.2: Export Challenges', content: [] }
                    ]
                },
                { id: 'chapter-25', title: 'Chapter 25: Implementation Roadmap', articles: [] },
                { id: 'chapter-26', title: 'Chapter 26: External Evaluation', articles: [] },
            ]
        }
    ],
    conclusion: {
        id: 'book-conclusion-main',
        title: 'Book Conclusion: Realizing the Future of Real Estate Governance',
        content: []
    },
    appendices: [
        { id: 'appendix-a', title: 'Appendix A: Tokenization Smart Contract', content: [] },
        { id: 'appendix-b', title: 'Appendix B: MAKE Escrow Solidity Contract', content: [] },
        { id: 'appendix-c', title: 'Appendix C: Technical Map (Visualization)', content: [] },
        { id: 'appendix-d', title: 'Appendix D: MAKE System (Flowchart)', content: [] },
        { id: 'appendix-e', title: 'Appendix E: EBRAM Workflow (Flowchart)', content: [] },
        { id: 'appendix-f', title: 'Appendix F: EBRAMGPT Workflow (Flowchart)', content: [] },
        { id: 'appendix-g', title: 'Appendix G: Mashroi Workflow (Flowchart)', content: [] },
        { id: 'appendix-h', title: 'Appendix H: DXBTOKENS Liquidity Cycle (Flowchart)', content: [] },
        { id: 'appendix-i', title: 'Appendix I: Mortgaged Villa Cycle (Flowchart)', content: [] },
        { id: 'appendix-j', title: 'Appendix J: Off-Plan Cycle (Flowchart)', content: [] },
        { id: 'appendix-k', title: 'Appendix K: Revenue Growth (Chart)', content: [] },
        { id: 'appendix-l', title: 'Appendix L: Global Revenue (Chart)', content: [] },
        { id: 'appendix-m', title: 'Appendix M: Security Testing (Flowchart)', content: [] },
        { id: 'appendix-n', title: 'Appendix N: Auditing Workflow (Flowchart)', content: [] },
    ]
};
