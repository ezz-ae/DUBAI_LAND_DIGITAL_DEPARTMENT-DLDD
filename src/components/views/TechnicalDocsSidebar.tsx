
'use client';

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from '@/components/ui/sidebar';
import { technicalDocuments } from '@/lib/technical-documents';
import { cn } from '@/lib/utils';
import type { TechnicalDocument } from '@/lib/technical-documents';

interface TechnicalDocsSidebarProps {
  selectedDoc: TechnicalDocument | null;
  setSelectedDoc: (doc: TechnicalDocument) => void;
}

export function TechnicalDocsSidebar({ selectedDoc, setSelectedDoc }: TechnicalDocsSidebarProps) {
  const documentGroups = technicalDocuments.reduce((acc, doc) => {
    const group = doc.group || 'general';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(doc);
    return acc;
  }, {} as Record<string, TechnicalDocument[]>);

  return (
    <Sidebar>
      <SidebarHeader className="p-2 border-b h-14 flex items-center">
        <SidebarGroupLabel className="px-2 font-semibold text-foreground text-base">Technical Book</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu className="list-none p-0">
          {Object.entries(documentGroups).map(([groupName, docs]) => (
            <div key={groupName}>
              <SidebarGroupLabel className="capitalize">{groupName}</SidebarGroupLabel>
              {docs.map((doc) => (
                <SidebarMenuItem key={doc.id}>
                  <SidebarMenuButton
                    onClick={() => setSelectedDoc(doc)}
                    isActive={selectedDoc?.id === doc.id}
                    tooltip={doc.name}
                    className="w-full justify-start"
                  >
                    <span className={cn("truncate", doc.lang === 'ar' && 'font-arabic')}>{doc.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
          {technicalDocuments.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">No documents loaded.</div>
          ): null}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
