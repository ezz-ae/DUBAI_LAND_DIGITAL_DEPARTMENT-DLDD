
'use client';
import * as React from "react"
import { Sparkle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SourceGuideProps {
  summary: string;
  topics: string[];
  isArabic?: boolean;
}

export function SourceGuide({ summary, topics, isArabic }: SourceGuideProps) {
  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="mb-6 p-4 rounded-lg bg-muted/30 dark:bg-black/30 border border-border/50"
    >
      <h3 className="flex items-center gap-2 text-lg font-headline font-semibold mb-3">
        <Sparkle className="text-accent" />
        Summary
      </h3>
      <div className={cn("grid gap-4 md:grid-cols-3")}>
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-1">Overview</h4>
          <p className={cn("text-sm text-muted-foreground", isArabic && "font-arabic")}>{summary}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Topics</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Button key={topic} variant="outline" size="sm" className="bg-background/50">
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
