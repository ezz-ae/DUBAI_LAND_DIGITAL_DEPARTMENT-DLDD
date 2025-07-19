'use client';

import { InteractiveMindMap } from '@/components/interactive-mind-map';

interface MindmapViewProps {
  onNodeDoubleClick: (topic: string) => void;
}

export function MindmapView({ onNodeDoubleClick }: MindmapViewProps) {
  return (
    <div className="flex-1 p-4 bg-ai-console">
      <InteractiveMindMap onNodeDoubleClick={onNodeDoubleClick} />
    </div>
  );
}
