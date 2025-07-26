export type ContentItem =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'code'; text: string }
  | { type: 'list'; items: string[] };
