
'use client';
import * as React from "react"
import { Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SourceGuideProps {
  summary: string;
  topics: string[];
  isArabic?: boolean;
  onTopicClick: (topic: string) => void;
}

export function SourceGuide({ summary, topics, isArabic, onTopicClick }: SourceGuideProps) {
  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="p-4 rounded-lg bg-card border"
    >
      <div className={cn("grid gap-4 md:grid-cols-3")}>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-1 flex items-center gap-2">
             <Sparkle className="text-accent h-4 w-4" />
             Summary
          </h4>
          <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic")}>{summary || "No summary available. Click 'Summarize Document' to generate one."}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="bg-background/50" onClick={() => onTopicClick(topic)}>
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

    