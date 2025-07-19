
'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from '@/components/ui/sidebar';
import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { dldChainDocuments } from '@/lib/documents';
import { SourceGuide } from '@/components/source-guide';
import { CardTitleWithBackground } from '@/components/card-title-with-background';
import { cn } from '@/lib/utils';
import type { DLDDoc } from '@/app/page';

interface DocumentationViewProps {
  selectedDoc: DLDDoc | null;
  setSelectedDoc: (doc: DLDDoc) => void;
  onTopicClick: (topic: string) => void;
  toast: (options: any) => void;
}

export function DocumentationView({ selectedDoc, setSelectedDoc, onTopicClick, toast }: DocumentationViewProps) {
  const { theme, setTheme } = useTheme();
  const [textSize, setTextSize] = useState('text-base');
  const sourceGuideRef = useRef<HTMLDivElement>(null);

  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');

  const handleLanguageToggle = () => {
    const targetDocId = isArabic ? 1 : 19; // Simplified toggle logic
    const docToSwitch = dldChainDocuments.find(d => d.id === targetDocId);
    if (docToSwitch) {
      setSelectedDoc(docToSwitch);
    } else {
      toast({ variant: 'destructive', title: 'Document not found' });
    }
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>
        <SidebarHeader className="p-2 border-b">
          <SidebarGroupLabel className="px-2 font-semibold text-foreground">Project Documents</SidebarGroupLabel>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu className="list-none">
            {dldChainDocuments.length > 0 ? dldChainDocuments.map((doc) => (
              <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedDoc(doc)}
                  isActive={selectedDoc?.id === doc.id}
                  tooltip={doc.name}
                  className="w-full justify-start"
                >
                  <span className="truncate">{doc.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )) : (
              <div className="p-2 text-sm text-muted-foreground">No documents loaded.</div>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t flex items-center justify-end">
          <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 bg-muted/30 dark:bg-muted/10 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto w-full h-full">
          {selectedDoc ? (
            <div className="flex flex-col gap-6 h-full">
              <div ref={sourceGuideRef}>
                <SourceGuide
                  summary={selectedDoc.summary}
                  keyTopics={selectedDoc.keyTopics}
                  isArabic={isArabic}
                  onTopicClick={onTopicClick}
                />
              </div>
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardTitleWithBackground>
                  <h3 className="text-lg font-headline font-semibold leading-none tracking-tight">{selectedDoc.name}</h3>
                  <div className="flex items-center gap-1">
                     <Button variant='outline' size="sm" onClick={handleLanguageToggle}><Languages className="h-4 w-4 mr-2"/>{isArabic ? 'English' : 'العربية'}</Button>
                    <Button variant={textSize === 'text-sm' ? 'secondary' : 'outline'} size="sm" onClick={() => setTextSize('text-sm')}>A</Button>
                    <Button variant={textSize === 'text-base' ? 'secondary' : 'outline'} size="sm" onClick={() => setTextSize('text-base')}>A</Button>
                    <Button variant={textSize === 'text-lg' ? 'secondary' : 'outline'} size="sm" onClick={() => setTextSize('text-lg')}>A</Button>
                  </div>
                </CardTitleWithBackground>
                <CardContent className="p-0 flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                      <div
                        dir={isArabic ? 'rtl' : 'ltr'}
                        className={cn(
                          "p-6 whitespace-pre-wrap prose prose-sm md:prose-base dark:prose-invert max-w-none",
                           textSize,
                          isArabic && "font-arabic"
                        )}
                        dangerouslySetInnerHTML={{ __html: selectedDoc.content }}
                      >
                      </div>
                    </ScrollArea>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full py-16">
              <h2 className="text-2xl font-semibold">Select a document to begin</h2>
              <p>Choose a document from the sidebar to view its content and start your review.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
