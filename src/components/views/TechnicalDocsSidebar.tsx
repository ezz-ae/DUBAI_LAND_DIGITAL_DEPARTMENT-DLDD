
'use client';

import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from '@/components/ui/sidebar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { technicalBook } from '@/lib/technical-documents';
import { cn } from '@/lib/utils';
import type { BookPart, BookChapter, BookArticle } from '@/lib/technical-documents';

interface TechnicalDocsSidebarProps {
  onLinkClick: (id: string) => void;
}

export function TechnicalDocsSidebar({ onLinkClick }: TechnicalDocsSidebarProps) {
  
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onLinkClick(id);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-2 border-b h-14 flex items-center">
        <SidebarGroupLabel className="px-2 font-semibold text-foreground text-base">Table of Contents</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-0">
        <SidebarMenu className="list-none p-2">
            <Accordion type="multiple" className="w-full">
              {technicalBook.parts.map((part) => (
                  <AccordionItem value={part.id} key={part.id}>
                    <AccordionTrigger className="text-sm font-semibold text-primary hover:no-underline px-3 py-2">
                      {part.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="list-none p-0">
                          {part.chapters.map((chapter) => (
                             <li key={chapter.id} className="flex flex-col items-start pl-3">
                                <a href={`#${chapter.id}`} onClick={(e) => handleLinkClick(e, chapter.id)} className="font-semibold py-1.5 text-sm w-full text-left hover:text-primary transition-colors">
                                    {chapter.title}
                                </a>
                                <ul className="list-none p-0 pl-3">
                                    {chapter.articles.map((article) => (
                                        <li key={article.id}>
                                            <a href={`#${article.id}`} onClick={(e) => handleLinkClick(e, article.id)} className="text-muted-foreground py-1 text-sm w-full text-left block hover:text-primary transition-colors">
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
                           <a href={`#${appendix.id}`} onClick={(e) => handleLinkClick(e, appendix.id)} className="text-muted-foreground py-1 text-sm w-full text-left block hover:text-primary transition-colors">
                                {appendix.title}
                           </a>
                       </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

            </Accordion>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
