'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BookOpen, Bot, Code, Send, Share2 } from 'lucide-react';

type ActiveView = 'documentation' | 'mindmap' | 'ai-console' | 'tech-docs' | 'project-validation' | 'media-center';

interface AppHeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  return (
    <header className="p-4 border-b flex items-center justify-between h-16 shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger className={cn('md:hidden', activeView !== 'documentation' && 'hidden')} />
        <h1 className="text-md font-headline font-bold">DLDCHAIN THE FIRST NATIVE REAL ESTATE BLOCKCHAIN</h1>
      </div>
      <div className="hidden md:flex items-center gap-2 bg-muted p-1 rounded-lg">
        <Button variant={activeView === 'documentation' ? 'default' : 'ghost'} onClick={() => setActiveView('documentation')}>
          <BookOpen className="mr-2" />
          Documentation
        </Button>
        <Button variant={activeView === 'tech-docs' ? 'default' : 'ghost'} onClick={() => setActiveView('tech-docs')}>
          <Code className="mr-2" />
          Technical Docs
        </Button>
        <Button variant={activeView === 'mindmap' ? 'default' : 'ghost'} onClick={() => setActiveView('mindmap')}>
          <Share2 className="mr-2" />
          Mind Map
        </Button>
        <Button variant={activeView === 'ai-console' ? 'default' : 'ghost'} onClick={() => setActiveView('ai-console')}>
          <Bot className="mr-2" />
          AI Console
        </Button>
        <Button variant={activeView === 'project-validation' ? 'default' : 'ghost'} onClick={() => setActiveView('project-validation')}>
          <Send className="mr-2" />
          Project Validation
        </Button>
        <Button variant={activeView === 'media-center' ? 'default' : 'ghost'} onClick={() => setActiveView('media-center')}>
          <Send className="mr-2" />
          Media Center
        </Button>
      </div>
    </header>
  );
}
