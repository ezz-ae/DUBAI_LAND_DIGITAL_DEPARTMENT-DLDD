
'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalBook } from '@/lib/technical-documents';
import type { ContentItem } from '@/lib/technical-documents';
import { TechnicalDocsSidebar } from './TechnicalDocsSidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const renderContentItem = (item: ContentItem, index: number) => {
    if (item.type === 'paragraph') {
      return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'heading') {
      return <h3 key={index} className="font-headline font-bold" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'subheading') {
      return <h4 key={index} className="font-headline font-semibold" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'code') {
      return (
        <pre key={index}>
          <code>{item.text}</code>
        </pre>
      );
    }
    if (item.type === 'list') {
      return <ul key={index} className="list-disc space-y-2">{item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
    }
    return null;
}

const findItemAndSiblings = (id: string) => {
    const flatNavItems: { id: string; title: string }[] = [];
    
    const introduction = { id: technicalBook.introduction.id, title: technicalBook.introduction.title };
    flatNavItems.push(introduction);

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

    const currentIndex = flatNavItems.findIndex(item => item.id === id);
    if (currentIndex === -1) return { current: null, prev: null, next: null };

    const currentItem = findItem(id);
    const prevItem = currentIndex > 0 ? findItem(flatNavItems[currentIndex - 1].id) : null;
    const nextItem = currentIndex < flatNavItems.length - 1 ? findItem(flatNavItems[currentIndex + 1].id) : null;

    return { current: currentItem, prev: prevItem, next: nextItem };
}

const findItem = (id: string) => {
    if (id === technicalBook.introduction.id) {
        return {
            id: technicalBook.introduction.id,
            title: technicalBook.introduction.title,
            content: technicalBook.introduction.content,
            type: 'introduction'
        };
    }

    for (const part of technicalBook.parts) {
        for (const chapter of part.chapters) {
            if (chapter.id === id) return { ...chapter, type: 'chapter' };
            for (const article of chapter.articles) {
                if (article.id === id) return { ...article, type: 'article' };
            }
        }
    }

    for (const appendix of technicalBook.appendices) {
        if (appendix.id === id) return { ...appendix, type: 'appendix' };
    }

    return null;
}


export function TechnicalDocsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string>(technicalBook.introduction.id);

  const { current, prev, next } = findItemAndSiblings(selectedItemId);

  const handleLinkClick = (id: string) => {
    setSelectedItemId(id);
  };
  
  useEffect(() => {
    const container = scrollRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedItemId]);

  const renderContent = () => {
    if (!current) return null;

    let title: string = '';
    let contentToRender: ContentItem[] = [];

    if ('content' in current && Array.isArray(current.content)) {
        title = current.title;
        contentToRender = current.content;
    } else if (current.type === 'chapter') {
        title = current.title;
        contentToRender.push(...current.introduction);
        current.articles.forEach(article => {
            contentToRender.push({ type: 'heading', text: article.title });
            contentToRender.push(...article.content);
        });
    }

    return (
        <div id={current.id} className="py-4">
            <h1 className="font-headline text-4xl font-bold text-primary border-b-2 border-primary pb-2 mb-6">{title}</h1>
            {contentToRender.map(renderContentItem)}
        </div>
    );
  }

  const renderNavigationFooter = () => {
    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => handleLinkClick(prev!.id)} disabled={!prev} className="truncate max-w-[45%]">
                <ArrowLeft className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">Previous: {prev?.title}</span>
            </Button>
            <Button variant="outline" onClick={() => handleLinkClick(next!.id)} disabled={!next} className="truncate max-w-[45%]">
                <span className="truncate">Next: {next?.title}</span>
                <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
            </Button>
        </div>
    )
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <TechnicalDocsSidebar onLinkClick={handleLinkClick} selectedItemId={selectedItemId} />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-7xl mx-auto w-full h-full p-6 md:p-10">
            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardContent className="px-4 md:px-8">
                  <div className="prose dark:prose-invert max-w-full">
                    {renderContent()}
                  </div>
                  {renderNavigationFooter()}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
