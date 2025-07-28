
'use client';

import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { technicalBook } from '@/lib/technical-documents';
import { cn } from '@/lib/utils';
import type { BookPart, BookChapter, BookArticle } from '@/lib/technical-documents';
import { ScrollArea } from '../ui/scroll-area';

interface TechnicalDocsSidebarProps {
  onLinkClick: (id: string) => void;
  selectedItemId: string | null;
}

export function TechnicalDocsSidebar({ onLinkClick, selectedItemId }: TechnicalDocsSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onLinkClick(id);
    if (isMobile) {
      setOpenMobile(false); // Close mobile sidebar on link click
    }
  };

  // Function to determine the default open accordions based on the selected item
  const getDefaultAccordionValues = () => {
    if (!selectedItemId) return [];
    
    for (const part of technicalBook.parts) {
      if (part.chapters.some(chapter => chapter.id === selectedItemId || chapter.articles.some(a => a.id === selectedItemId))) {
        return [part.id];
      }
    }
    
    if (technicalBook.appendices.some(a => a.id === selectedItemId)) {
        return ['appendices'];
    }

    return [];
  }

  const content = (
    <>
      <SidebarHeader>
         <h2 className="px-2 font-semibold text-foreground text-base">Table of Contents</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
            <div className="list-none p-2">
                <Accordion type="multiple" className="w-full" key={selectedItemId} defaultValue={getDefaultAccordionValues()}>
                  <a href="#book-overview" onClick={(e) => handleLinkClick(e, 'book-overview')} 
                     className={cn("font-semibold py-1.5 text-sm w-full text-left hover:text-primary transition-colors block px-3", selectedItemId === 'book-overview' && 'text-primary')}>
                      Project Overview
                  </a>
                  <a href="#book-introduction" onClick={(e) => handleLinkClick(e, 'book-introduction')} 
                     className={cn("font-semibold py-1.5 text-sm w-full text-left hover:text-primary transition-colors block px-3", selectedItemId === 'book-introduction' && 'text-primary')}>
                      Introduction
                  </a>
                  {technicalBook.parts.map((part) => (
                      <AccordionItem value={part.id} key={part.id}>
                        <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline px-3 py-2">
                          {part.title}
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <ul className="list-none p-0">
                              {part.chapters.map((chapter) => (
                                 <li key={chapter.id} className="flex flex-col items-start pl-3">
                                    <a href={`#${chapter.id}`} onClick={(e) => handleLinkClick(e, chapter.id)} 
                                       className={cn("font-semibold py-1.5 text-sm w-full text-left hover:text-primary transition-colors", selectedItemId === chapter.id && 'text-primary')}>
                                        {chapter.title}
                                    </a>
                                    <ul className="list-none p-0 pl-3">
                                        {chapter.articles.map((article) => (
                                            <li key={article.id}>
                                                <a href={`#${article.id}`} onClick={(e) => handleLinkClick(e, article.id)} 
                                                   className={cn("text-muted-foreground py-1 text-sm w-full text-left block hover:text-primary transition-colors", selectedItemId === article.id && 'text-primary')}>
                                                    {article.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                 </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                  ))}

                  <AccordionItem value="appendices">
                    <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline px-3 py-2">
                      Appendices
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-none p-0">
                        {technicalBook.appendices.map((appendix) => (
                           <li key={appendix.id} className="pl-3">
                               <a href={`#${appendix.id}`} onClick={(e) => handleLinkClick(e, appendix.id)} 
                                  className={cn("text-muted-foreground py-1 text-sm w-full text-left block hover:text-primary transition-colors", selectedItemId === appendix.id && 'text-primary')}>
                                    {appendix.title}
                               </a>
                           </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                   <a href="#tech-conclusion" onClick={(e) => handleLinkClick(e, 'tech-conclusion')} 
                     className={cn("font-semibold py-1.5 text-sm w-full text-left hover:text-primary transition-colors block px-3 mt-2", selectedItemId === 'tech-conclusion' && 'text-primary')}>
                      Conclusion
                  </a>

                </Accordion>
            </div>
        </ScrollArea>
      </SidebarContent>
    </>
  );

  return (
    <Sidebar>
      {content}
    </Sidebar>
  );
}
