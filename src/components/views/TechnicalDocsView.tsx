
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalBook } from '@/lib/technical-documents';
import type { BookPart, BookChapter, BookArticle, ContentItem } from '@/lib/technical-documents';
import { TechnicalDocsSidebar } from './TechnicalDocsSidebar';
import { Separator } from '@/components/ui/separator';

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

const renderArticle = (article: BookArticle) => (
  <section key={article.id} id={article.id} className="py-4 article-section">
    <h3 className="font-headline text-2xl font-bold border-b pb-2 mb-4">{article.title}</h3>
    {article.content.map(renderContentItem)}
  </section>
);

const renderChapter = (chapter: BookChapter) => (
  <section key={chapter.id} id={chapter.id} className="py-4 chapter-section">
    <h2 className="font-headline text-3xl font-bold text-primary border-b-2 border-primary pb-2 mb-6">{chapter.title}</h2>
    {chapter.articles.map(renderArticle)}
  </section>
);

const renderPart = (part: BookPart) => (
  <section key={part.id} id={part.id} className="py-8 part-section">
     <h1 className="font-headline text-5xl font-bold mb-4">{part.title}</h1>
     <Separator className="my-6" />
    {part.chapters.map(renderChapter)}
  </section>
);

const FullBookContent = () => (
    <>
        {technicalBook.parts.map(renderPart)}
        <section id="book-conclusion" className="py-8">
            <h1 className="font-headline text-5xl font-bold mb-4">{technicalBook.conclusion.title}</h1>
            <Separator className="my-6" />
            {technicalBook.conclusion.content.map(renderContentItem)}
        </section>
        <section id="appendices" className="py-8">
            <h1 className="font-headline text-5xl font-bold mb-4">Appendices</h1>
            <Separator className="my-6" />
            {technicalBook.appendices.map(appendix => (
                 <section key={appendix.id} id={appendix.id} className="py-4">
                    <h2 className="font-headline text-3xl font-bold text-primary border-b-2 border-primary pb-2 mb-6">{appendix.title}</h2>
                    {appendix.content.map(renderContentItem)}
                </section>
            ))}
        </section>
    </>
);


export function TechnicalDocsView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFullBook, setShowFullBook] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const handleLinkClick = (id: string) => {
    setShowFullBook(true);
    setPendingScrollId(id);
  };

  useEffect(() => {
    if (pendingScrollId && showFullBook) {
      const element = document.getElementById(pendingScrollId);
      if (element && scrollRef.current) {
          const container = scrollRef.current.querySelector('div[data-radix-scroll-area-viewport]');
          if(container) {
              const offsetTop = element.offsetTop - container.getBoundingClientRect().top;
              container.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      }
      setPendingScrollId(null);
    }
  }, [pendingScrollId, showFullBook]);

  return (
    <div className="flex flex-1 overflow-hidden">
      <TechnicalDocsSidebar onLinkClick={handleLinkClick} />
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="max-w-7xl mx-auto w-full h-full p-6 md:p-10">
            <Card className="flex-1 flex flex-col overflow-hidden prose dark:prose-invert max-w-none">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-4xl">{technicalBook.title}</CardTitle>
                <CardDescription className="text-md">{technicalBook.subtitle}</CardDescription>
                 <div className="text-sm text-muted-foreground pt-4">
                    <p>Prepared for: {technicalBook.preparedFor}</p>
                    <p>Prepared by: {technicalBook.preparedBy}</p>
                    <p>Date: {technicalBook.date}</p>
                 </div>
              </CardHeader>
              <CardContent className="px-4 md:px-8">
                {showFullBook ? (
                    <FullBookContent />
                ) : (
                    <section id="book-introduction" className="py-8">
                        <h1 className="font-headline text-5xl font-bold mb-4">{technicalBook.introduction.title}</h1>
                        <Separator className="my-6" />
                        {technicalBook.introduction.content.map(renderContentItem)}
                    </section>
                )}
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
