
'use client';

import { InteractiveMindMap } from '@/components/interactive-mind-map';

interface MindmapViewProps {
  onNodeDoubleClick: (nodeId: string) => void;
}

export function MindmapView({ onNodeDoubleClick }: MindmapViewProps) {
  return (
    <div className="flex-1 p-6 bg-ai-console">
      <InteractiveMindMap onNodeDoubleClick={onNodeDoubleClick} />
    </div>
  );
}
