
'use client';
import React from 'react';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface MindMapNode {
  id: string;
  name: string;
  children?: MindMapNode[];
}

interface MindMapNodeProps {
  node: MindMapNode;
  level: number;
  onNodeClick: (topic: string) => void;
  isRoot?: boolean;
}

const MindMapNodeComponent: React.FC<MindMapNodeProps> = ({ node, level, onNodeClick, isRoot = false }) => {
  const hasChildren = node.children && node.children.length > 0;
  
  const NodeButton = () => (
     <button
      onClick={() => onNodeClick(node.name)}
      className={cn(
        'flex items-center justify-between gap-2 p-2 rounded-md cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm',
        'shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]',
        isRoot 
          ? 'bg-primary text-primary-foreground font-bold' 
          : 'bg-mindmap-node-bg hover:bg-mindmap-node-hover-bg text-card-foreground',
      )}
    >
      {isRoot && <ChevronLeft className="w-4 h-4" />}
      <span>{node.name}</span>
      {!isRoot && <ChevronRight className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="flex items-center">
      {isRoot && <NodeButton />}

      {hasChildren && (
        <div className="flex items-center ml-4">
          <svg width="20" height={node.children.length * 50} className="mr-4">
            <path d={`M0,${(node.children.length * 50)/2} C10,${(node.children.length * 50)/2} 10,0 20,0`} stroke="var(--mindmap-line-color)" fill="transparent" strokeWidth="1.5" />
            {node.children.map((_, index) => (
                <path key={index} d={`M0,${(node.children.length * 50)/2} C10,${(node.children.length * 50)/2} 10,${25 + index * 50} 20,${25 + index * 50}`} stroke="var(--mindmap-line-color)" fill="transparent" strokeWidth="1.5" />
            ))}
          </svg>
          <div className="flex flex-col justify-around space-y-4">
            {node.children.map((child) => (
              <MindMapNodeComponent key={child.id} node={child} level={level + 1} onNodeClick={onNodeClick} />
            ))}
          </div>
        </div>
      )}

      {!isRoot && <NodeButton />}
    </div>
  );
};

export const InteractiveMindMap: React.FC<{ onNodeClick: (topic: string) => void }> = ({ onNodeClick }) => {
  return (
    <div className="p-4 bg-card rounded-lg flex justify-center overflow-x-auto">
      <MindMapNodeComponent node={mindMapData} level={0} onNodeClick={onNodeClick} isRoot={true} />
    </div>
  );
};
