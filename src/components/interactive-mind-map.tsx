
'use client';
import React, { useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface MindMapNodeData {
  id: string;
  name: string;
  children?: MindMapNodeData[];
}

interface MindMapNodeProps {
  node: MindMapNodeData;
  level: number;
  onNodeDoubleClick: (topic: string) => void;
  isExpanded: boolean;
  toggleExpand: (nodeId: string) => void;
  position: { x: number; y: number };
  parentPosition?: { x: number; y: number };
}

const LEVEL_BG_CLASSES: Record<number, string> = {
  0: 'from-mindmap-level-0-bg/50',
  1: 'from-mindmap-level-1-bg/50 shadow-level-1',
  2: 'from-mindmap-level-2-bg/50 shadow-level-2',
  3: 'from-mindmap-level-3-bg/50 shadow-level-3',
  4: 'from-mindmap-level-4-bg/50',
};

const NODE_WIDTH = 220;
const NODE_HEIGHT = 48;
const HORIZONTAL_SPACING = 150;
const VERTICAL_SPACING = 20;

const Line = ({ from, to, level }: { from: {x:number, y:number}, to: {x:number, y:number}, level: number }) => {
  const path = `M ${from.x} ${from.y} C ${from.x + HORIZONTAL_SPACING / 2} ${from.y}, ${to.x - HORIZONTAL_SPACING / 2} ${to.y}, ${to.x} ${to.y}`;
  const strokeColorVar = `var(--mindmap-level-${level}-bg)`;
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
       <defs>
        <filter id={`neon-glow-${level}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path 
        d={path} 
        stroke={strokeColorVar}
        fill="transparent" 
        strokeWidth="2"
        filter={`url(#neon-glow-${level})`}
      />
    </svg>
  );
};


const MindMapNode: React.FC<MindMapNodeProps> = ({ node, level, onNodeDoubleClick, isExpanded, toggleExpand, position, parentPosition }) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleSingleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent double click from firing
    toggleExpand(node.id);
  };
  
  const handleDoubleClick = () => {
    onNodeDoubleClick(node.name);
  };
  
  const bgClass = LEVEL_BG_CLASSES[level] || 'from-mindmap-node-bg/50';

  return (
    <>
      {parentPosition && <Line from={{x: parentPosition.x + NODE_WIDTH, y: parentPosition.y + NODE_HEIGHT / 2}} to={{x: position.x, y: position.y + NODE_HEIGHT / 2}} level={level} />}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${NODE_WIDTH}px`,
          height: `${NODE_HEIGHT}px`,
        }}
        className="absolute group"
        onClick={handleSingleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className={cn(
            'w-full h-full flex items-center justify-center p-2 rounded-lg cursor-pointer transition-all relative',
            'bg-gradient-to-br to-mindmap-node-bg shadow-lg border border-white/10',
            'hover:shadow-2xl hover:border-mindmap-node-border-hover hover:scale-105',
             'text-xs font-medium text-center text-white/90',
             bgClass
          )}
        >
          {node.name}
          {hasChildren && (
            <div className="absolute -right-3 -top-3 bg-background rounded-full flex items-center justify-center w-6 h-6 z-10">
              {isExpanded ? <MinusCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary" /> : <PlusCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary"/>}
            </div>
          )}
        </div>
      </div>
    </>
  );
};


const calculateLayout = (node: MindMapNodeData, expandedNodes: Set<string>) => {
  let positions: { [id: string]: { x: number; y: number, level: number } } = {};
  
  const traverse = (currentNode: MindMapNodeData, currentLevel: number, currentY: number): { positions: typeof positions; height: number } => {
    const x = currentLevel * (NODE_WIDTH + HORIZONTAL_SPACING);
    
    let childrenHeight = 0;
    const isExpanded = expandedNodes.has(currentNode.id);
    
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
      const childrenSubtreeHeights = currentNode.children.map(child => calculateSubtreeHeight(child, expandedNodes));
      const totalChildrenHeight = childrenSubtreeHeights.reduce((acc, height) => acc + height, 0);

      let childY = currentY - (totalChildrenHeight / 2);

      currentNode.children.forEach((child, index) => {
        const childSubtreeHeight = childrenSubtreeHeights[index];
        const childCenterY = childY + childSubtreeHeight / 2;
        
        const { positions: childPositions } = traverse(child, currentLevel + 1, childCenterY);
        positions = { ...positions, ...childPositions };
        childY += childSubtreeHeight;
        childrenHeight += childSubtreeHeight;
      });
    }

    positions[currentNode.id] = { x, y: currentY, level: currentLevel };
    
    const height = Math.max(NODE_HEIGHT + VERTICAL_SPACING, childrenHeight);
    return { positions, height };
  };
  
  const calculateSubtreeHeight = (currentNode: MindMapNodeData, expandedNodes: Set<string>): number => {
    const isExpanded = expandedNodes.has(currentNode.id);
    if (!isExpanded || !currentNode.children || currentNode.children.length === 0) {
      return NODE_HEIGHT + VERTICAL_SPACING;
    }
    return currentNode.children.reduce((acc, child) => acc + calculateSubtreeHeight(child, expandedNodes), 0);
  };
  
  const totalTreeHeight = calculateSubtreeHeight(node, expandedNodes);
  const initialY = (totalTreeHeight / 2);
  const { positions: finalPositions } = traverse(node, 0, initialY);

  return { layout: finalPositions, height: totalTreeHeight };
};


export const InteractiveMindMap: React.FC<{ onNodeDoubleClick: (topic: string) => void }> = ({ onNodeDoubleClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([mindMapData.id]));

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        // Do not allow collapsing the root node
        if (nodeId !== mindMapData.id) {
            newSet.delete(nodeId);
        }
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);
  
  // Set initial state to fully collapsed except the root
  useState(() => {
    setExpandedNodes(new Set([mindMapData.id]));
  });

  const { layout, height } = calculateLayout(mindMapData, expandedNodes);
  
  const renderedNodes: React.ReactNode[] = [];
  const renderedIds = new Set();
  
  const buildRenderTree = (node: MindMapNodeData, parentPos?: {x:number, y:number}) => {
    if (!layout[node.id] || renderedIds.has(node.id)) return;
    renderedIds.add(node.id);
    
    const nodePos = layout[node.id];

    renderedNodes.push(
      <MindMapNode
        key={node.id}
        node={node}
        level={nodePos.level}
        onNodeDoubleClick={onNodeDoubleClick}
        isExpanded={expandedNodes.has(node.id)}
        toggleExpand={toggleExpand}
        position={{...nodePos, y: nodePos.y - NODE_HEIGHT / 2}}
        parentPosition={parentPos ? {...parentPos, y: parentPos.y - NODE_HEIGHT / 2} : undefined}
      />
    );

    if (expandedNodes.has(node.id) && node.children) {
      node.children.forEach(child => buildRenderTree(child, nodePos));
    }
  };

  buildRenderTree(mindMapData);

  return (
    <div className="w-full h-full overflow-hidden bg-background rounded-lg border">
      <TransformWrapper
        minScale={0.2}
        initialScale={1}
        centerOnInit
        limitToBounds={false}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: 'fit-content', height: 'fit-content' }}
        >
          <div className="relative" style={{ height: `${height + 100}px`, width: '4000px', padding: '50px' }}>
             {renderedNodes}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
