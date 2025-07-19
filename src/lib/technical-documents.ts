
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

type ContentItem = CodeContent | TextContent | ListContent;

interface TechnicalDocument {
  id: number;
  name: string;
  summary: string;
  content: ContentItem[];
}

export const technicalDocuments: TechnicalDocument[] = [];
