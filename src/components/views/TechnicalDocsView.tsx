'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { technicalDocuments } from '@/lib/technical-documents';

export function TechnicalDocsView() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-6">
        {technicalDocuments.map(doc => (
          <Card key={doc.id} className="mb-6">
            <CardHeader>
              <CardTitle>{doc.name}</CardTitle>
              <CardDescription>{doc.summary}</CardDescription>
            </CardHeader>
            <CardContent>
              {doc.content.map((item, index) => {
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
        ))}
        {technicalDocuments.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
                <p>No technical documents available yet.</p>
            </div>
        )}
      </div>
    </ScrollArea>
  );
}
