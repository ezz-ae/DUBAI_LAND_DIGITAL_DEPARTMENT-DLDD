
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BookOpen, Bot, Code, Send, Share2, Music } from 'lucide-react';

type ActiveView = 'documentation' | 'mindmap' | 'ai-console' | 'tech-docs' | 'project-validation' | 'media-center';

interface AppHeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

const navItems = [
    { view: 'documentation', icon: BookOpen, label: 'Documentation' },
    { view: 'tech-docs', icon: Code, label: 'Technical Docs' },
    { view: 'mindmap', icon: Share2, label: 'Mind Map' },
    { view: 'ai-console', icon: Bot, label: 'AI Console' },
    { view: 'project-validation', icon: Send, label: 'Project Validation' },
    { view: 'media-center', icon: Music, label: 'Media Center' },
] as const;


export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  const [hoveredView, setHoveredView] = useState<ActiveView | null>(null);

  return (
    <header className="p-4 border-b flex items-center justify-between h-16 shrink-0 gap-4">
      <div className="flex items-center gap-4 flex-shrink-0">
        <SidebarTrigger className={cn('md:hidden', !['documentation', 'tech-docs'].includes(activeView) && 'hidden')} />
        <h1 className="text-md font-headline font-bold whitespace-nowrap">DLDCHAIN THE FIRST NATIVE REAL ESTATE BLOCKCHAIN</h1>
      </div>
      <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg">
          {navItems.map((item) => {
            const isVisible = activeView === item.view || hoveredView === item.view;
            return (
              <Button
                  key={item.view}
                  variant={activeView === item.view ? 'default' : 'ghost'}
                  onClick={() => setActiveView(item.view)}
                  onMouseEnter={() => setHoveredView(item.view)}
                  onMouseLeave={() => setHoveredView(null)}
                  className="h-8 transition-all duration-300 ease-in-out"
                  style={{ width: isVisible ? 'auto' : '2rem', padding: isVisible ? '0 0.75rem' : '0' }}
              >
                  <item.icon className="h-4 w-4" />
                  <span className={cn(
                    "ml-2 transition-all duration-300 ease-in-out overflow-hidden",
                    isVisible ? "max-w-xs opacity-100" : "max-w-0 opacity-0"
                  )}>
                    {item.label}
                  </span>
              </Button>
            )
          })}
      </div>
    </header>
  );
}
