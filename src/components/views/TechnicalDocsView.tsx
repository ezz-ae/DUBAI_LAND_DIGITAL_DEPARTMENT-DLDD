
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalBook } from '@/lib/technical-documents';
import type { ContentItem } from '@/lib/technical-documents';
import { TechnicalDocsSidebar } from './TechnicalDocsSidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';


interface TechnicalDocsViewProps {
  initialDocId?: string;
}

const heroHighlights = [
  {
    title: 'Sovereign Governance',
    description:
      'DLD becomes the network, owning the ledger, access rules, and operational integrity so real estate transactions stay trusted and stable.',
  },
  {
    title: 'Government-grade Fabric',
    description:
      'Hyperledger Fabric powers permissioned channels, private data collections, and a modular architecture that adapts to regulatory and jurisdictional needs.',
  },
  {
    title: 'Intelligent Ecosystem',
    description:
      'AI agents like EBRAM™, EBRAMGPT™, and Mashroi™ weigh real-world data, translate legal language, and govern broker conduct proactively.',
  },
  {
    title: 'Real-World Value',
    description:
      'DXBTOKENS™, the DLD Digital Dirham, MAKE™ liquidity infrastructure, and the UNIVESTOR Wallet™ anchor every digital share to AED-backed assets.',
  },
];

const heroBrandTitle = 'Dubai Land Digital Department - Concept \\ DLDD';

const heroStats = [
  { label: 'Vision', value: '“Authored by Dubai. Operated by Dubai. For the world.”' },
  { label: 'Tokenization Target', value: '7% of Dubai real estate by 2033 (AED 60B)' },
  { label: 'Trust Anchor', value: 'Fiat-only DLD Digital Dirham + 100% AED-backed DXBTOKENS™' },
];

const timelineSteps = [
  {
    title: 'Phase I – Sovereign Foundation',
    timeframe: 'Months 0‑6',
    description:
      'Lock in governance, access control, and compliance with Hyperledger Fabric while establishing the sovereign ledger and Mashroi™ professional hub.',
  },
  {
    title: 'Phase II – Intelligent Operations',
    timeframe: 'Months 6‑18',
    description:
      'Deploy EBRAM™ contract logic, introduce AI-weighted decisioning, and connect UNIVESTOR Wallet™ for regulated identity onboarding.',
  },
  {
    title: 'Phase III – Value Deployment',
    timeframe: 'Months 18‑30',
    description:
      'Tokenize targeted assets, issue DXBTOKENS™, activate MAKE™ liquidity infrastructure, and deliver real-time analytics to regulators.',
  },
  {
    title: 'Phase IV – Global Expansion',
    timeframe: 'Months 30+',
    description:
      'License the DLDD model, offer the sovereign stack as a white-label package, and operate a Multi-City hub for trusted property digitization.',
  },
];

const renderContentItem = (item: ContentItem, baseKey: string) => {
    if (item.type === 'paragraph') {
      return <p key={`${baseKey}-p`} dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'heading') {
      return <h2 key={`${baseKey}-h2`} className="font-headline text-3xl font-bold text-primary border-b-2 border-primary/50 pb-2 mb-4 scroll-mt-20" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'subheading') {
      return <h3 key={`${baseKey}-h3`} className="font-headline text-2xl font-bold mt-6 mb-3" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
     if (item.type === 'minorheading') {
      return <h4 key={`${baseKey}-h4`} className="font-headline text-xl font-semibold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'code') {
      return (
        <pre key={`${baseKey}-pre`} className="whitespace-pre-wrap">
          <code>{item.text}</code>
        </pre>
      );
    }
    if (item.type === 'list') {
      return <ul key={`${baseKey}-ul`} className="list-disc space-y-2 pl-5">{item.items.map((li, i) => <li key={`${baseKey}-li-${i}`} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
    }
    return null;
}

const findItemAndSiblings = (id: string) => {
    const flatNavItems: { id: string; title: string }[] = [];
    
    flatNavItems.push({ id: technicalBook.overview.id, title: technicalBook.overview.title });
    flatNavItems.push({ id: technicalBook.introduction.id, title: technicalBook.introduction.title });

    for (const part of technicalBook.parts) {
      for (const chapter of part.chapters) {
        flatNavItems.push({ id: chapter.id, title: chapter.title });
        for (const article of chapter.articles) {
          flatNavItems.push({ id: article.id, title: article.title });
        }
      }
    }
    
    for (const appendix of technicalBook.appendices) {
      flatNavItems.push({ id: appendix.id, title: appendix.title });
    }
    
    flatNavItems.push({ id: technicalBook.conclusion.id, title: technicalBook.conclusion.title });


    const currentIndex = flatNavItems.findIndex(item => item.id === id);
    if (currentIndex === -1) return { current: null, prev: null, next: null };

    const currentItem = findItem(id);
    const prevItem = currentIndex > 0 ? findItem(flatNavItems[currentIndex - 1].id) : null;
    const nextItem = currentIndex < flatNavItems.length - 1 ? findItem(flatNavItems[currentIndex + 1].id) : null;

    return { current: currentItem, prev: prevItem, next: nextItem };
}

const findItem = (id: string) => {
    if (id === technicalBook.overview.id) {
        return {
            id: technicalBook.overview.id,
            title: technicalBook.overview.title,
            content: technicalBook.overview.content,
            type: 'overview'
        };
    }

    if (id === technicalBook.introduction.id) {
        return {
            id: technicalBook.introduction.id,
            title: technicalBook.introduction.title,
            content: technicalBook.introduction.content,
            type: 'introduction'
        };
    }
    
    if (id === technicalBook.conclusion.id) {
        return {
            id: technicalBook.conclusion.id,
            title: technicalBook.conclusion.title,
            content: technicalBook.conclusion.content,
            type: 'conclusion'
        };
    }

    for (const part of technicalBook.parts) {
        for (const chapter of part.chapters) {
            if (chapter.id === id) return { ...chapter, type: 'chapter' };
            const article = chapter.articles.find(a => a.id === id);
            if (article) return { ...article, type: 'article' };
        }
    }

    const appendix = technicalBook.appendices.find(a => a.id === id);
    if (appendix) return { ...appendix, type: 'appendix' };

    return null;
}


export function TechnicalDocsView({ initialDocId }: TechnicalDocsViewProps) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>(initialDocId || technicalBook.overview.id);
  const isMobile = useIsMobile();

  const overviewParagraphs = technicalBook.overview.content.filter((item): item is Extract<ContentItem, { type: 'paragraph' }> => item.type === 'paragraph');
  const overviewLists = technicalBook.overview.content.filter((item): item is Extract<ContentItem, { type: 'list' }> => item.type === 'list');
  const heroIntroParagraphs = overviewParagraphs.slice(0, 2);

  const summaryListSections = [
    {
      title: 'Government-grade foundation',
      subtitle: 'Hyperledger Fabric pillars',
      items: overviewLists[0]?.items ?? [],
    },
    {
      title: 'AI-enabled governance',
      subtitle: 'Sentient intelligence stack',
      items: overviewLists[1]?.items ?? [],
    },
    {
      title: 'Key components',
      subtitle: 'Strategic building blocks',
      items: overviewLists[2]?.items ?? [],
    },
  ].filter((section) => section.items.length > 0);

  const { current, prev, next } = findItemAndSiblings(selectedItemId);

  const handleLinkClick = (id: string) => {
    setSelectedItemId(id);
  };
  
  useEffect(() => {
    if(initialDocId) {
      setSelectedItemId(initialDocId);
    }
  }, [initialDocId]);

  useEffect(() => {
    // Defer the scroll action to ensure the DOM has updated.
    setTimeout(() => {
        const element = document.getElementById(selectedItemId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback for chapter views or if element not found, scroll to top of content
            contentWrapperRef.current?.parentElement?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, 100); // A small delay to ensure rendering is complete
  }, [selectedItemId]);

  const renderContent = () => {
    if (!current) return null;

    let title: string = '';
    let allContent: React.ReactNode[] = [];

    if (current.type === 'chapter') {
        title = current.title;
        allContent.push(...current.introduction.map((item, index) => renderContentItem(item, `${current.id}-intro-${index}`)));
        current.articles.forEach(article => {
            allContent.push(<Separator key={`${article.id}-separator`} className="my-8" />);
            allContent.push(<div key={`${article.id}-content-wrapper`}><h2 id={article.id} className="font-headline text-3xl font-bold text-primary border-b-2 border-primary/50 pb-2 mb-4 scroll-mt-20">{article.title}</h2></div>);
            allContent.push(...article.content.map((item, index) => renderContentItem(item, `${article.id}-content-${index}`)));
        });
    } else if ('content' in current && Array.isArray(current.content)) {
        title = current.title;
        allContent.push(...current.content.map((item, index) => renderContentItem(item, `${current.id}-content-${index}`)));
    }

    return (
        <div id={current.id}>
            <h1 className="font-headline text-4xl font-bold text-primary border-b-2 border-primary pb-2 mb-6 scroll-mt-20">{title}</h1>
            {allContent}
        </div>
    );
  }

  const renderNavigationFooter = () => {
    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => handleLinkClick(prev!.id)} disabled={!prev}>
                <ArrowLeft className="h-4 w-4 shrink-0 md:mr-2" />
                {!isMobile && <span className="truncate">Previous: {prev?.title}</span>}
            </Button>
            <Button variant="outline" onClick={() => handleLinkClick(next!.id)} disabled={!next}>
                 {!isMobile && <span className="truncate">Next: {next?.title}</span>}
                <ArrowRight className="h-4 w-4 shrink-0 md:ml-2" />
            </Button>
        </div>
    )
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <TechnicalDocsSidebar
        onLinkClick={handleLinkClick}
        selectedItemId={selectedItemId}
        className="rounded-3xl border border-border/30 bg-background/80 shadow-xl shadow-slate-900/10"
      />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex justify-center px-4 md:px-8 py-6 md:py-10" ref={contentWrapperRef}>
            <div className="w-full max-w-6xl space-y-10">
              <section className="bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-950/60 rounded-3xl border border-border/30 p-6 md:p-10 shadow-2xl shadow-slate-950/40">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Sovereign Real Estate Operating System</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-headline font-bold text-white">
                  {heroBrandTitle}
                </h1>
                <p className="text-base text-white/70 mt-1">{technicalBook.title}</p>
                <p className="text-lg text-muted-foreground mt-2 max-w-3xl">{technicalBook.subtitle}</p>
                <div className="mt-6 space-y-3 text-sm text-slate-200">
                  {heroIntroParagraphs.map((item, index) => (
                    <p key={`intro-${index}`} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.text }} />
                  ))}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 text-sm leading-snug text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="grid gap-4 md:grid-cols-2">
                {heroHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-3xl border border-border/60 bg-background/70 p-5 shadow-[0_5px_20px_rgba(2,6,23,0.35)]"
                  >
                    <h3 className="text-lg font-headline font-semibold text-primary">{highlight.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                ))}
              </section>

              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Roadmap</p>
                    <h2 className="text-2xl font-headline font-bold mt-1">Mission Phases &amp; Value Delivery</h2>
                  </div>
                  <span className="text-sm text-foreground/70">Strategy mapped to sovereign milestones</span>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {timelineSteps.map((step) => (
                    <div
                      key={step.title}
                      className="rounded-3xl border border-border/50 bg-white/5 p-5 shadow-lg shadow-slate-900/10"
                    >
                      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{step.timeframe}</p>
                      <h3 className="mt-2 text-lg font-headline font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{step.description}</p>
                      <div className="mt-3 h-px bg-border/40" />
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-primary">Sovereign-grade execution</span>
                    </div>
                  ))}
                </div>
              </section>

              {summaryListSections.length > 0 && (
                <section className="grid gap-4 md:grid-cols-3">
                  {summaryListSections.map((section) => (
                    <Card key={section.title} className="rounded-3xl border border-border/40 bg-background/70 shadow-lg shadow-slate-900/10">
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{section.subtitle}</p>
                          <h3 className="text-lg font-headline font-semibold">{section.title}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-foreground/80">
                          {section.items.map((item, index) => (
                            <li
                              key={`${section.title}-${index}`}
                              className="relative pl-4 text-foreground/80"
                              dangerouslySetInnerHTML={{ __html: item }}
                            />
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </section>
              )}

              <Card className="flex-1 flex flex-col overflow-hidden rounded-3xl border border-border/40 bg-background/80 shadow-2xl shadow-slate-950/20">
                <CardContent className="p-4 md:p-8">
                  <div className="prose dark:prose-invert max-w-full space-y-4">
                    {renderContent()}
                  </div>
                  {renderNavigationFooter()}
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
