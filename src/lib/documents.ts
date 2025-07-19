
interface DLDDocument {
  id: number;
  name: string;
  summary: string;
  keyTopics: string[];
  content: string;
}

export const dldChainDocuments: DLDDocument[] = [];
