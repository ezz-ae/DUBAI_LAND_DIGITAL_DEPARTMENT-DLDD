
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalBook } from '@/lib/technical-documents';
import type { BookChapter, BookArticle, ContentItem } from '@/lib/technical-documents';
import { TechnicalDocsSidebar } from './TechnicalDocsSidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const renderContentItem = (item: ContentItem, index: number) => {
    if (item.type === 'paragraph') {
      return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'heading') {
      return <h3 key={index} className="mt-6 mb-3 font-headline text-xl font-bold" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'subheading') {
      return <h4 key={index} className="mt-4 mb-2 font-headline text-lg font-semibold" dangerouslySetInnerHTML={{ __html: item.text }} />;
    }
    if (item.type === 'code') {
      return (
        <pre key={index} className="relative my-4 rounded-lg bg-muted/50 p-4 border font-code text-sm overflow-x-auto">
          <code>{item.text}</code>
        </pre>
      );
    }
    if (item.type === 'list') {
      return <ul key={index} className="list-disc pl-6 my-4 space-y-2">{item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
    }
    return null;
}

const findItem = (id: string) => {
    if (id === 'book-introduction') {
        return {
            id: technicalBook.introduction.id,
            title: technicalBook.introduction.title,
            content: technicalBook.introduction.content,
            type: 'introduction'
        };
    }

    for (const part of technicalBook.parts) {
        if(part.id === id) {
            return { ...part, type: 'part' };
        }
        for (const chapter of part.chapters) {
            if (chapter.id === id) {
                return { ...chapter, type: 'chapter' };
            }
            for (const article of chapter.articles) {
                if (article.id === id) {
                    return { ...article, type: 'article' };
                }
            }
        }
    }

    for (const appendix of technicalBook.appendices) {
        if (appendix.id === id) {
            return { ...appendix, type: 'appendix' };
        }
    }

    return null;
}


export function TechnicalDocsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>('book-introduction');

  const flatNavItems = useMemo(() => {
    const items: { id: string; title: string }[] = [];
    items.push({ id: technicalBook.introduction.id, title: technicalBook.introduction.title });
    technicalBook.parts.forEach(part => {
      part.chapters.forEach(chapter => {
        chapter.articles.forEach(article => {
          items.push({ id: article.id, title: article.title });
        });
      });
    });
    technicalBook.appendices.forEach(appendix => {
        items.push({ id: appendix.id, title: appendix.title });
    });
    return items;
  }, []);

  const { prevItem, nextItem } = useMemo(() => {
    if (!selectedItemId) return { prevItem: null, nextItem: null };
    const currentIndex = flatNavItems.findIndex(item => item.id === selectedItemId);
    if (currentIndex === -1) return { prevItem: null, nextItem: null };
    
    const prev = currentIndex > 0 ? flatNavItems[currentIndex - 1] : null;
    const next = currentIndex < flatNavItems.length - 1 ? flatNavItems[currentIndex + 1] : null;

    return { prevItem: prev, nextItem: next };
  }, [selectedItemId, flatNavItems]);


  const handleLinkClick = (id: string) => {
    setSelectedItemId(id);
    const container = scrollRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const selectedItem = selectedItemId ? findItem(selectedItemId) : findItem('book-introduction');

  const renderContent = () => {
    if (!selectedItem) {
        // Default view: Render introduction
        return (
            <section id={technicalBook.introduction.id} className="py-8">
                <h1 className="font-headline text-5xl font-bold mb-4">{technicalBook.introduction.title}</h1>
                <Separator className="my-6" />
                {technicalBook.introduction.content.map(renderContentItem)}
            </section>
        )
    }

    if (selectedItem.type === 'chapter') {
      return (
          <section id={selectedItem.id} className="py-8">
              <h2 className="font-headline text-3xl font-bold text-primary border-b-2 border-primary pb-2 mb-6">{selectedItem.title}</h2>
              {selectedItem.introduction.map(renderContentItem)}
              <Separator className="my-6"/>
              {selectedItem.articles.map(article => (
                  <article key={article.id} id={article.id} className="pt-6">
                      <h3 className="font-headline text-xl font-bold mb-4">{article.title}</h3>
                      {article.content.map(renderContentItem)}
                  </article>
              ))}
          </section>
      )
    }
    
    // This handles articles, appendices, and the book introduction
    if ('content' in selectedItem && Array.isArray(selectedItem.content)) {
        return (
            <section id={selectedItem.id} className="py-4">
                <h2 className="font-headline text-3xl font-bold text-primary border-b-2 border-primary pb-2 mb-6">{selectedItem.title}</h2>
                {selectedItem.content.map(renderContentItem)}
            </section>
        );
    }
  }

  const renderNavigationFooter = () => {
    if (!selectedItemId || !findItem(selectedItemId)) return null;

    return (
        <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button variant="outline" onClick={() => handleLinkClick(prevItem!.id)} disabled={!prevItem}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: {prevItem?.title}
            </Button>
            <Button variant="outline" onClick={() => handleLinkClick(nextItem!.id)} disabled={!nextItem}>
                Next: {nextItem?.title}
                <ArrowRight className="ml-2 h-4 w-4" />
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
            <Card className="flex-1 flex flex-col overflow-hidden prose dark:prose-invert max-w-none">
              <CardContent className="px-4 md:px-8">
                {renderContent()}
                {renderNavigationFooter()}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
