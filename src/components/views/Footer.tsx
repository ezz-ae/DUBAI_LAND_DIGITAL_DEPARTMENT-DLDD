
'use client';

import { EvaluationCertificate } from "./EvaluationCertificate";

export function AppFooter() {
  return (
    <footer className="p-4 border-t bg-background shrink-0">
      <div className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} DLDCHAIN. All rights reserved.</span>
        <EvaluationCertificate />
      </div>
    </footer>
  );
}
