import React from 'react';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';

interface MindMapNodeProps {
  node: {
    name: string;
    children?: any[];
  };
  level: number;
  onNodeClick: (topic: string) => void;
}

const MindMapNode: React.FC<MindMapNodeProps> = ({ node, level, onNodeClick }) => {
  const isRoot = level === 0;
  const isMainBranch = level === 1;

  return (
    <div className={cn('flex items-center my-2', isRoot ? 'justify-center' : 'ml-4')}>
      {!isRoot && (
        <div
          className={cn(
            'mr-2 h-px bg-border',
            isMainBranch ? 'w-8' : 'w-4'
          )}
        />
      )}
      <div
        className={cn(
          'p-2 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:scale-105',
          isRoot
            ? 'bg-primary text-primary-foreground text-lg font-bold'
            : 'bg-card border text-card-foreground',
          isMainBranch ? 'font-semibold' : 'text-sm'
        )}
        onClick={() => onNodeClick(node.name)}
      >
        {node.name}
      </div>
      {node.children && (
        <div className={cn('flex', isRoot ? 'flex-row gap-8' : 'flex-col pl-4')}>
          {node.children.map((child, index) => (
            <MindMapNode key={index} node={child} level={level + 1} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
};


interface MindMapBranchProps {
  node: {
    name: string;
    children?: any[];
  };
  onNodeClick: (topic: string) => void;
}

const MindMapBranch: React.FC<MindMapBranchProps> = ({ node, onNodeClick }) => (
  <div className="flex flex-col items-center">
    <div
      className="bg-secondary text-secondary-foreground font-bold p-3 rounded-lg cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 border-primary/50"
      onClick={() => onNodeClick(node.name)}
    >
      {node.name}
    </div>
    <div className="flex flex-col items-start mt-4 pl-8 border-l-2 border-border relative">
      <div className="absolute -left-px top-1/2 w-8 h-px bg-border" />
      {node.children?.map((child, index) => (
        <div key={index} className="flex items-center my-3 relative">
           <div className="absolute -left-8 w-8 h-px bg-border" />
           <div
            className="bg-card border text-card-foreground p-2 rounded-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 text-sm"
            onClick={() => onNodeClick(child.name)}
          >
            {child.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);


export const InteractiveMindMap: React.FC<{ onNodeClick: (topic: string) => void }> = ({ onNodeClick }) => {
  const mainNode = mindMapData;
  const branches = mainNode.children || [];
  
  // Split branches for a two-sided layout
  const midPoint = Math.ceil(branches.length / 2);
  const leftBranches = branches.slice(0, midPoint);
  const rightBranches = branches.slice(midPoint);

  return (
    <div className="flex justify-center items-start p-4 bg-background rounded-lg">
      <div className="flex flex-col gap-8 w-1/3 items-end pr-8 border-r-2 border-primary">
         {leftBranches.map((branch, index) => (
           <div key={index} className="flex items-center w-full justify-end">
              <div className="flex flex-col items-end text-right">
                <div
                  className="bg-secondary text-secondary-foreground font-semibold p-2 rounded-lg cursor-pointer transition-all hover:shadow-xl hover:scale-105 border border-border"
                  onClick={() => onNodeClick(branch.name)}
                >
                  {branch.name}
                </div>
                <div className="flex flex-col items-end mt-2 pr-4 border-r-2 border-border relative">
                   {branch.children?.map((child, childIndex) => (
                     <div key={childIndex} className="flex items-center my-1.5 relative">
                        <div
                          className="bg-card text-card-foreground p-1.5 rounded-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 text-xs"
                          onClick={() => onNodeClick(child.name)}
                        >
                          {child.name}
                        </div>
                        <div className="absolute -right-4 w-4 h-px bg-border" />
                     </div>
                   ))}
                </div>
              </div>
              <div className="w-8 h-px bg-primary ml-2"/>
           </div>
         ))}
      </div>
      
      <div className="flex-shrink-0 mx-8">
         <div
            className="bg-primary text-primary-foreground text-xl font-bold p-4 rounded-full aspect-square flex items-center justify-center cursor-pointer transition-all hover:shadow-2xl hover:scale-110 w-48 h-48"
            onClick={() => onNodeClick(mainNode.name)}
        >
            <div className="text-center leading-tight">{mainNode.name}</div>
        </div>
      </div>
      
       <div className="flex flex-col gap-8 w-1/3 items-start pl-8 border-l-2 border-primary">
         {rightBranches.map((branch, index) => (
           <div key={index} className="flex items-center w-full justify-start">
             <div className="w-8 h-px bg-primary mr-2"/>
              <div className="flex flex-col items-start text-left">
                <div
                  className="bg-secondary text-secondary-foreground font-semibold p-2 rounded-lg cursor-pointer transition-all hover:shadow-xl hover:scale-105 border border-border"
                  onClick={() => onNodeClick(branch.name)}
                >
                  {branch.name}
                </div>
                <div className="flex flex-col items-start mt-2 pl-4 border-l-2 border-border relative">
                   {branch.children?.map((child, childIndex) => (
                     <div key={childIndex} className="flex items-center my-1.5 relative">
                        <div className="absolute -left-4 w-4 h-px bg-border" />
                        <div
                          className="bg-card text-card-foreground p-1.5 rounded-md cursor-pointer transition-all hover:shadow-lg hover:scale-105 text-xs"
                          onClick={() => onNodeClick(child.name)}
                        >
                          {child.name}
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
