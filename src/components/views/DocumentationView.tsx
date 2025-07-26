
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel, SidebarFooter } from '@/components/ui/sidebar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from 'next-themes';
import { dldChainDocuments } from '@/lib/documents';
import { SourceGuide } from '@/components/source-guide';
import { CardTitleWithBackground } from '@/components/card-title-with-background';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


export type DLDDoc = typeof dldChainDocuments[0];

interface DocumentationViewProps {
  selectedDoc: DLDDoc | null;
  setSelectedDoc: (doc: DLDDoc) => void;
  onTopicClick: (topic: string) => void;
}

const documentGroups = dldChainDocuments.reduce((acc, doc) => {
  if (doc.lang === 'en') {
    const group = acc.find(g => g.id === doc.group);
    if (group) {
      group.docs.push(doc);
    } else {
      acc.push({ id: doc.group, title: doc.group.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), docs: [doc] });
    }
  }
  return acc;
}, [] as { id: string; title: string; docs: DLDDoc[] });


const groupTitles: Record<string, string> = {
  'vision': "Project Vision",
  'business': "Business & Strategic Vision Book",
  'business-full': "Full Business Book",
  'ai': "AI Context Documents"
}

export function DocumentationView({ selectedDoc, setSelectedDoc, onTopicClick }: DocumentationViewProps) {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [textSize, setTextSize] = useState('text-base');

  const isArabic = selectedDoc?.lang === 'ar';

  const handleLanguageToggle = () => {
    if (!selectedDoc) return;
    const docGroup = dldChainDocuments.filter(d => d.group === selectedDoc.group);
    const targetLang = isArabic ? 'en' : 'ar';
    
    let targetDoc;
    // A more robust way to find the counterpart would be to have a direct mapping if available.
    // This logic assumes a parallel structure between languages which might not always hold.
    targetDoc = dldChainDocuments.find(d => d.name === selectedDoc.name && d.lang === targetLang);

    if (!targetDoc) {
      // Fallback for documents that might not have a direct name match
      targetDoc = dldChainDocuments.find(d => d.group === selectedDoc.group && d.lang === targetLang);
    }
    
    if (targetDoc) {
      setSelectedDoc(targetDoc);
    } else {
      toast({ variant: 'destructive', title: 'Translation not available for this document.' });
    }
  };


  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar>
        <SidebarHeader className="p-2 border-b h-14 flex items-center">
          <SidebarGroupLabel className="px-2 font-semibold text-foreground text-base">Project Documents</SidebarGroupLabel>
        </SidebarHeader>
        <SidebarContent className="flex-1 p-0">
          <ScrollArea className="h-full">
            <SidebarMenu className="list-none p-2">
              <Accordion type="multiple" className="w-full" defaultValue={['vision', 'business']}>
                {documentGroups.map((group) => {
                  if (group.docs.length === 0 || group.id === 'ai') return null; // Hide AI group
                  return (
                    <AccordionItem value={group.id} key={group.id}>
                      <AccordionTrigger className="text-sm font-semibold hover:no-underline px-3 py-2 text-primary/80 hover:text-primary">
                        {groupTitles[group.id] || group.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-1 pl-2">
                        <ul className="list-none p-0">
                          {group.docs.map((doc) => (
                             <SidebarMenuItem key={doc.id}>
                                <SidebarMenuButton
                                  onClick={() => setSelectedDoc(doc)}
                                  isActive={selectedDoc?.id === doc.id}
                                  tooltip={doc.name}
                                  className="w-full justify-start text-muted-foreground"
                                >
                                  <span className="truncate">{doc.name}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t flex items-center justify-center">
          <Button variant="ghost" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size="icon" className="w-full justify-center">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto w-full h-full p-6">
          {selectedDoc ? (
            <div className="flex flex-col gap-6 h-full">
              <div>
                <SourceGuide
                  summary={selectedDoc.summary}
                  keyTopics={selectedDoc.keyTopics}
                  isArabic={isArabic}
                  onTopicClick={onTopicClick}
                />
              </div>
              <Card className="flex-1 flex flex-col overflow-hidden h-content-area">
                <CardTitleWithBackground>
                  <h3 className={cn("text-lg font-headline font-semibold leading-none tracking-tight", isArabic && 'font-arabic')}>{selectedDoc.name}</h3>
                  <div className="flex items-center gap-1">
                     <Button variant='outline' size="sm" onClick={handleLanguageToggle}><Languages className="h-4 w-4 mr-2"/>{isArabic ? 'English' : 'العربية'}</Button>
                    <div className="flex items-center rounded-md border bg-background p-0.5">
                      <Button variant={textSize === 'text-sm' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setTextSize('text-sm')}>A</Button>
                      <Button variant={textSize === 'text-base' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setTextSize('text-base')}>A</Button>
                      <Button variant={textSize === 'text-lg' ? 'secondary' : 'ghost'} size="sm" className="h-7 px-2" onClick={() => setTextSize('text-lg')}>A</Button>
                    </div>
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
