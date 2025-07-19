
'use client';

export function AppFooter() {
  return (
    <footer className="p-4 border-t bg-background shrink-0">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DLDCHAIN. All rights reserved.
      </div>
    </footer>
  );
}
