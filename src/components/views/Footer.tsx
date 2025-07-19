
'use client';

import { AIAssistantFeedback } from "./AIAssistantFeedback";

export function AppFooter() {
  return (
    <footer className="p-4 border-t bg-background shrink-0">
      <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} DLDCHAIN. All rights reserved.</span>
        <AIAssistantFeedback />
      </div>
    </footer>
  );
}
