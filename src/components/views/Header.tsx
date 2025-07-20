
'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BookOpen, Bot, Code, Send, Share2, Music } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


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
  return (
    <header className="p-4 border-b flex items-center justify-between h-16 shrink-0 gap-4">
      <div className="flex items-center gap-4 flex-shrink-0">
        <SidebarTrigger className={cn('md:hidden', !['documentation', 'tech-docs'].includes(activeView) && 'hidden')} />
        <h1 className="text-md font-headline font-bold whitespace-nowrap">DLDCHAIN THE FIRST NATIVE REAL ESTATE BLOCKCHAIN</h1>
      </div>
      <TooltipProvider>
        <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg">
            {navItems.map((item) => (
              <Tooltip key={item.view}>
                <TooltipTrigger asChild>
                    <Button
                        variant={activeView === item.view ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setActiveView(item.view)}
                        className="h-8 w-8"
                    >
                        <item.icon className="h-4 w-4" />
                        <span className="sr-only">{item.label}</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
        </div>
      </TooltipProvider>
    </header>
  );
}
