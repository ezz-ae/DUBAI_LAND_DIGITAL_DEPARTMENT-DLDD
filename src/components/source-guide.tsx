
'use client';
import * as React from "react"
import { Sparkle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SourceGuideProps {
  summary?: string;
  isArabic?: boolean;
  onTopicClick: (topic: string) => void;
  keyTopics?: string[];
}

export function SourceGuide({ summary, isArabic, onTopicClick, keyTopics = [] }: SourceGuideProps) {
  
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
          <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic")}>
            {summary || "No summary available."}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {keyTopics.length > 0 ? (
                keyTopics.map((topic) => (
                    <Button key={topic} variant="outline" size="sm" className={cn("bg-card", isArabic && "font-arabic")} onClick={() => onTopicClick(topic)}>
                        {topic}
                    </Button>
                ))
            ) : (
                <p className="text-xs text-muted-foreground">No topics found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
