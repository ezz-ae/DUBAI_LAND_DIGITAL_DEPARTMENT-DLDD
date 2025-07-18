
'use client';
import React from 'react';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';

interface MindMapNodeProps {
  node: {
    id: string;
    name: string;
    children?: any[];
  };
  level: number;
  onNodeClick: (topic: string) => void;
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ node, level, onNodeClick }) => {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex items-center">
      <div
        onClick={() => onNodeClick(node.name)}
        className={cn(
          'p-3 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1',
          'shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.4)]',
          level === 0 ? 'bg-primary text-primary-foreground font-bold text-lg' : 'bg-card border text-card-foreground'
        )}
      >
        {node.name}
      </div>

      {hasChildren && (
        <div className="flex flex-col justify-center ml-8 space-y-4 relative">
          {/* Vertical line from node */}
          <div className="absolute left-[-2rem] top-1/2 h-full w-px bg-mindmap-line-color"></div>

          {node.children.map((child, index) => (
            <div key={child.id} className="flex items-center relative">
              {/* Horizontal line to child */}
              <div className="absolute left-[-2rem] top-1/2 h-px w-8 bg-mindmap-line-color"></div>
              <MindMapNode node={child} level={level + 1} onNodeClick={onNodeClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export const InteractiveMindMap: React.FC<{ onNodeClick: (topic: string) => void }> = ({ onNodeClick }) => {
  return (
    <div className="p-4 bg-card rounded-lg border flex justify-center">
      <MindMapNode node={mindMapData} level={0} onNodeClick={onNodeClick} />
    </div>
  );
};
