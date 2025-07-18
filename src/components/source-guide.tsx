
'use client';
import * as React from "react"
import { Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";


interface SourceGuideProps {
  summary: string;
  isArabic?: boolean;
  onTopicClick: (topic: string) => void;
}

export function SourceGuide({ summary, isArabic, onTopicClick }: SourceGuideProps) {
  const [topics, setTopics] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    // A simple heuristic to extract potential topics from a summary.
    // This could be replaced with a more sophisticated AI call in the future.
    if (summary) {
        const potentialTopics = summary.match(/\b([A-Z][a-zA-Z\s,]+)\b/g) || [];
        const uniqueTopics = [...new Set(potentialTopics
            .map(t => t.trim().replace(/,$/, ''))
            .filter(t => t.split(' ').length > 1 && t.split(' ').length < 5)
        )];
        setTopics(uniqueTopics.slice(0, 5)); // Limit to 5 topics
    }
  }, [summary]);
  
  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="p-4 rounded-lg bg-background border"
    >
      <div className={cn("grid gap-4 md:grid-cols-3")}>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-1 flex items-center gap-2">
             <Sparkle className="text-accent h-4 w-4" />
             Summary
          </h4>
          <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic")}>{summary || "No summary available. Click 'Summarize Document' in the header to generate one."}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="bg-card" onClick={() => onTopicClick(topic)}>
                {topic}
              </Button>
            ))}
             {topics.length === 0 && summary && <p className="text-xs text-muted-foreground">No distinct topics found in summary.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
