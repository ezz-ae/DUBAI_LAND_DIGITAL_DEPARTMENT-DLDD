
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalDocuments } from '@/lib/technical-documents';
import type { TechnicalDocument } from '@/lib/technical-documents';
import { TechnicalDocsSidebar } from './TechnicalDocsSidebar';

export function TechnicalDocsView() {
  const [selectedDoc, setSelectedDoc] = useState<TechnicalDocument | null>(null);

  useEffect(() => {
    if (technicalDocuments.length > 0 && !selectedDoc) {
      setSelectedDoc(technicalDocuments[0]);
    }
  }, [selectedDoc]);

  return (
    <div className="flex flex-1 overflow-hidden">
      <TechnicalDocsSidebar selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto w-full h-full p-6">
          {selectedDoc ? (
            <Card className="flex-1 flex flex-col overflow-hidden">
              <CardHeader>
                <CardTitle>{selectedDoc.name}</CardTitle>
                {selectedDoc.summary && <CardDescription>{selectedDoc.summary}</CardDescription>}
              </CardHeader>
              <CardContent>
                {selectedDoc.content.map((item, index) => {
                  if (item.type === 'paragraph') {
                    return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} />;
                  }
                  if (item.type === 'heading') {
                    return <h3 key={index} className="mt-4 mb-2 font-semibold text-lg" dangerouslySetInnerHTML={{ __html: item.text }} />;
                  }
                  if (item.type === 'subheading') {
                    return <h4 key={index} className="mt-3 mb-1 font-semibold text-md" dangerouslySetInnerHTML={{ __html: item.text }} />;
                  }
                  if (item.type === 'code') {
                    return (
                      <pre key={index} className="relative my-4 rounded-lg bg-muted/50 p-4 border font-code text-sm overflow-x-auto">
                        <code>{item.text}</code>
                      </pre>
                    );
                  }
                  if (item.type === 'list') {
                    return <ul key={index} className="list-disc pl-5 my-2 space-y-1">{item.items.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: li }} />)}</ul>;
                  }
                  return null;
                })}
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full py-16">
              <h2 className="text-2xl font-semibold">Select a document to begin</h2>
              <p>Choose a document from the sidebar to view its content.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
