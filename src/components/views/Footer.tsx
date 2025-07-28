
'use client';

import { AIAssistantFeedback } from "./AIAssistantFeedback";
import { EvaluationCertificate } from "./EvaluationCertificate";

export function AppFooter() {
  return (
    <footer className="p-4 border-t bg-background shrink-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground gap-2 sm:gap-4">
        <AIAssistantFeedback />
        <EvaluationCertificate />
        <span className="text-center sm:text-right">© {new Date().getFullYear()} DLDCHAIN. All rights reserved.</span>
      </div>
    </footer>
  );
}
