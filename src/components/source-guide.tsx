
'use client';
import * as React from "react"
import { Sparkle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SourceGuideProps {
  summary: string;
  isSummarizing: boolean;
  isArabic?: boolean;
  onTopicClick: (topic: string) => void;
}

export function SourceGuide({ summary, isSummarizing, isArabic, onTopicClick }: SourceGuideProps) {
  const [topics, setTopics] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    if (summary) {
        const potentialTopics = summary.match(/\b([A-Z][a-zA-Z\s,]+)\b/g) || [];
        const uniqueTopics = [...new Set(potentialTopics
            .map(t => t.trim().replace(/,$/, ''))
            .filter(t => t.split(' ').length > 1 && t.split(' ').length < 5)
        )];
        setTopics(uniqueTopics.slice(0, 5));
    } else {
        setTopics([]);
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
             AI Summary
          </h4>
          {isSummarizing ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin h-4 w-4" />
              <span>Generating summary...</span>
            </div>
          ) : (
            <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic")}>
              {summary || "No summary available."}
            </p>
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {isSummarizing ? (
                 <div className="text-xs text-muted-foreground">Extracting topics...</div>
            ) : topics.length > 0 ? (
                topics.map((topic) => (
                    <Button key={topic} variant="outline" size="sm" className="bg-card" onClick={() => onTopicClick(topic)}>
                        {topic}
                    </Button>
                ))
            ) : (
                <p className="text-xs text-muted-foreground">No topics found in summary.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
