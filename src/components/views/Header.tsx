
'use client';

import { useState } from 'react';
import type { LucideProps } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { BookOpen, Share2, Music, Menu, FlaskConical } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type ActiveView = 'tech-docs' | 'mindmap' | 'simulation' | 'media-center';

interface AppHeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

interface NavItem {
  view: ActiveView;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  label: string;
}

const navItems: NavItem[] = [
    { view: 'tech-docs', icon: BookOpen, label: 'Technical Docs' },
    { view: 'mindmap', icon: Share2, label: 'Mind Map' },
    { view: 'simulation', icon: FlaskConical, label: 'Simulation' },
    { view: 'media-center', icon: Music, label: 'Media Center' },
];


export function AppHeader({ activeView, setActiveView }: AppHeaderProps) {
  const [hoveredView, setHoveredView] = useState<ActiveView | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="p-4 border-b flex items-center justify-between h-16 shrink-0 gap-4">
      <div className="flex items-center gap-4 flex-shrink-0">
        <SidebarTrigger className={cn('hidden', activeView === 'tech-docs' && 'md:hidden')} />
        <h1 className="text-md font-headline font-bold whitespace-nowrap">
          <span className="hidden sm:inline">DLDCHAIN NATIVE REAL ESTATE BLOCKCHAIN</span>
          <span className="sm:hidden">DLDCHAIN</span>
        </h1>
      </div>

      {/* Desktop Navigation */}
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
                  <item.icon className="h-4 w-4 shrink-0" />
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

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant={activeView === item.view ? 'default' : 'ghost'}
                  onClick={() => {
                    setActiveView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
