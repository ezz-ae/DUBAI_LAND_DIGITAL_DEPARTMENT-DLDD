'use client';
import React, { useState } from 'react';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(level < 1);

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };
  
  const handleNodeTextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNodeClick(node.name);
  };

  return (
    <div className={cn("my-1 relative", level > 0 && 'ml-6')}>
      <div
        className={cn(
          'flex items-center gap-1 cursor-pointer group'
        )}
        onClick={handleToggle}
      >
        {hasChildren ? (
          <div className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground">
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        ) : (
          <div className="w-5 h-5" /> 
        )}
        <span
          className={cn(
            'p-2 rounded-md transition-all hover:bg-accent/10 hover:text-accent-foreground',
            'shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
            level === 0 ? 'font-bold text-lg text-foreground/90 bg-card' : 'text-sm text-foreground/80 bg-card'
          )}
          onClick={handleNodeTextClick}
        >
          {node.name}
        </span>
      </div>
      {hasChildren && isOpen && (
        <div className="border-l-2 border-[var(--mindmap-line-color)] ml-[14px] pl-5 transition-all duration-300 ease-in-out">
          {node.children.map((child, index) => (
            <MindMapNode key={index} node={child} level={level + 1} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export const InteractiveMindMap: React.FC<{ onNodeClick: (topic: string) => void }> = ({ onNodeClick }) => {
  return (
    <div className="p-4 bg-card rounded-lg border">
      <MindMapNode node={mindMapData} level={0} onNodeClick={onNodeClick} />
    </div>
  );
};
