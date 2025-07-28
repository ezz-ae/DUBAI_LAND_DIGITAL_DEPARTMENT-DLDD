
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
    <div className="flex flex-1 overflow-hidden">
      <TechnicalDocsSidebar onLinkClick={handleLinkClick} selectedItemId={selectedItemId} />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex justify-center p-6 md:p-10" ref={contentWrapperRef}>
            <div className="w-full max-w-4xl">
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardContent className="p-4 md:p-8">
                    <div className="prose dark:prose-invert max-w-full">
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
