
'use client';

import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppHeader } from '@/components/views/Header';
import { TechnicalDocsView } from '@/components/views/TechnicalDocsView';
import { MindmapView } from '@/components/views/MindmapView';
import { AiConsoleView } from '@/components/views/AiConsoleView';
import { SimulationView } from '@/components/views/SimulationView';
import { MediaCenterView } from '@/components/views/MediaCenterView';
import { dldChainDocuments } from '@/lib/documents';
import type { DLDDoc } from '@/lib/documents';

export type ActiveView = 'tech-docs' | 'mindmap' | 'ai-console' | 'simulation' | 'media-center';

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>('tech-docs');
  const [selectedDoc, setSelectedDoc] = useState<DLDDoc | null>(null);
  
  // State to pass a topic from one view to another (e.g., Docs -> AI Console)
  const [topicToExplain, setTopicToExplain] = useState<string | null>(null);
  const [topicToDiscuss, setTopicToDiscuss] = useState<string | null>(null);


  useEffect(() => {
    // Set a default document for context in other views if needed
    if (dldChainDocuments.length > 0) {
      const defaultDoc = dldChainDocuments.find(d => d.id === 19) || dldChainDocuments[0];
      setSelectedDoc(defaultDoc);
    }
  }, []);

  const handleExplainTopic = (topic: string) => {
    setTopicToExplain(topic);
    setActiveView('ai-console');
  };

  const handleDiscussTopic = (topic: string) => {
    setTopicToDiscuss(topic);
    setActiveView('ai-console');
  }

  // Clear the one-time topic when leaving the AI console
  useEffect(() => {
    if (activeView !== 'ai-console') {
      if (topicToExplain) setTopicToExplain(null);
      if (topicToDiscuss) setTopicToDiscuss(null);
    }
  }, [activeView, topicToExplain, topicToDiscuss]);


  const renderContent = () => {
    switch (activeView) {
      case 'tech-docs':
        return <TechnicalDocsView />;
      case 'mindmap':
        return <MindmapView onNodeDoubleClick={handleDiscussTopic} />;
      case 'ai-console':
        return (
          <AiConsoleView 
            selectedDoc={selectedDoc}
            initialTopicToExplain={topicToExplain}
            initialTopicToDiscuss={topicToDiscuss}
            onViewChange={setActiveView}
          />
        );
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
