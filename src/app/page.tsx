
'use client';

import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/views/Header';
import { TechnicalDocsView } from '@/components/views/TechnicalDocsView';
import { MindmapView } from '@/components/views/MindmapView';
import { SimulationView } from '@/components/views/SimulationView';
import { MediaCenterView } from '@/components/views/MediaCenterView';
import { dldChainDocuments } from '@/lib/documents';
import type { DLDDoc } from '@/lib/documents';

export type ActiveView = 'tech-docs' | 'mindmap' | 'simulation' | 'media-center';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>('tech-docs');
  const [selectedDoc, setSelectedDoc] = useState<DLDDoc | null>(null);
  const [initialDocId, setInitialDocId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Set a default document for context in other views if needed
    if (dldChainDocuments.length > 0) {
      const defaultDoc = dldChainDocuments.find(d => d.id === 1) || dldChainDocuments[0];
      setSelectedDoc(defaultDoc);
    }
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'tech-docs':
        return <TechnicalDocsView initialDocId={initialDocId} />;
      case 'mindmap':
        return <MindmapView />;
      case 'simulation':
        return <SimulationView />;
      case 'media-center':
        return <MediaCenterView selectedDoc={selectedDoc} />;
      default:
        return <TechnicalDocsView />;
    }
  }

  return (
    <SidebarProvider>
      <div className="w-full bg-background text-foreground flex flex-col flex-1 min-h-screen">
        <AppHeader activeView={activeView} setActiveView={setActiveView} />
        <div className="flex flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </SidebarProvider>
  )
}
