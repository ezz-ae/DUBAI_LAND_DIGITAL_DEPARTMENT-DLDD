
'use client';

import React from 'react';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from '@/components/ui/sidebar';
import { technicalBook } from '@/lib/technical-documents';
import { cn } from '@/lib/utils';
import type { BookPart, BookChapter, BookArticle } from '@/lib/technical-documents';

interface TechnicalDocsSidebarProps {
  onLinkClick: (id: string) => void;
}

export function TechnicalDocsSidebar({ onLinkClick }: TechnicalDocsSidebarProps) {
  
  const renderEntry = (entry: BookPart | BookChapter | BookArticle, level: number) => {
    const id = entry.id;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onLinkClick(id);
    };

    const commonClasses = "w-full justify-start text-left h-auto py-1.5";
    let button;

    switch (level) {
      case 0: // Part
        button = (
          <h3 className="px-3 py-2 text-sm font-semibold text-primary">{entry.title}</h3>
        );
        break;
      case 1: // Chapter
        button = (
          <SidebarMenuButton
            asChild
            size="sm"
            className={cn(commonClasses, "font-semibold pl-3")}
          >
            <a href={`#${id}`} onClick={handleClick}>{entry.title}</a>
          </SidebarMenuButton>
        );
        break;
      default: // Article
        button = (
           <SidebarMenuButton
            asChild
            size="sm"
            className={cn(commonClasses, "text-muted-foreground pl-6")}
          >
            <a href={`#${id}`} onClick={handleClick}>{entry.title}</a>
          </SidebarMenuButton>
        );
        break;
    }

    return (
      <React.Fragment key={id}>
        <SidebarMenuItem>
          {button}
        </SidebarMenuItem>
        {'chapters' in entry && entry.chapters.map(chapter => renderEntry(chapter, 1))}
        {'articles' in entry && entry.articles.map(article => renderEntry(article, 2))}
      </React.Fragment>
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-2 border-b h-14 flex items-center">
        <SidebarGroupLabel className="px-2 font-semibold text-foreground text-base">Table of Contents</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-0">
        <SidebarMenu className="list-none p-2">
            {technicalBook.parts.map(part => renderEntry(part, 0))}
             <h3 className="px-3 py-2 text-sm font-semibold text-primary">Appendices</h3>
             {technicalBook.appendices.map(appendix => (
                 <SidebarMenuItem key={appendix.id}>
                     <SidebarMenuButton
                        asChild
                        size="sm"
                        className="w-full justify-start text-left h-auto py-1.5 text-muted-foreground pl-3"
                      >
                        <a href={`#${appendix.id}`} onClick={(e) => {e.preventDefault(); onLinkClick(appendix.id);}}>{appendix.title}</a>
                      </SidebarMenuButton>
                 </SidebarMenuItem>
             ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
