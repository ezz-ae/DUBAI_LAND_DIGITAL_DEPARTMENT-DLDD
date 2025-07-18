
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
  const strokeColorVar = level > 0 ? `var(--mindmap-line-color)` : 'var(--mindmap-line-color)';
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <path 
        d={path} 
        stroke={strokeColorVar}
        fill="transparent" 
        strokeWidth="2"
      />
    </svg>
  );
};


const MindMapNode: React.FC<MindMapNodeProps> = ({ node, level, onNodeDoubleClick, isExpanded, toggleExpand, position, parentPosition }) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleSingleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if(hasChildren) {
      toggleExpand(node.id);
    }
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
  
  const calculateSubtreeHeight = (currentNode: MindMapNodeData): number => {
    const isExpanded = expandedNodes.has(currentNode.id);
    if (!isExpanded || !currentNode.children || currentNode.children.length === 0) {
      return NODE_HEIGHT + VERTICAL_SPACING;
    }
    return currentNode.children.reduce((acc, child) => acc + calculateSubtreeHeight(child), 0);
  };
  
  const traverse = (currentNode: MindMapNodeData, currentLevel: number, currentY: number): { height: number } => {
    const x = currentLevel * (NODE_WIDTH + HORIZONTAL_SPACING);
    const isExpanded = expandedNodes.has(currentNode.id);
    
    // Only calculate children height if expanded
    let childrenHeight = 0;
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
        childrenHeight = currentNode.children.reduce((acc, child) => acc + calculateSubtreeHeight(child), 0);
    }
    const totalSubtreeHeight = Math.max(NODE_HEIGHT + VERTICAL_SPACING, childrenHeight);

    positions[currentNode.id] = { x, y: currentY, level: currentLevel };
    
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
      let childYOffset = currentY - (childrenHeight / 2);
      currentNode.children.forEach(child => {
        const childSubtreeHeight = calculateSubtreeHeight(child);
        const childCenterY = childYOffset + (childSubtreeHeight / 2);
        traverse(child, currentLevel + 1, childCenterY);
        childYOffset += childSubtreeHeight;
      });
    }

    return { height: totalSubtreeHeight };
  };
  
  traverse(node, 0, 0);
  
  const allY = Object.values(positions).map(p => p.y);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const totalTreeHeight = maxY - minY + NODE_HEIGHT;
  
  const yOffset = -minY + 50; // Add padding
  Object.keys(positions).forEach(id => {
    positions[id].y += yOffset;
  });

  const allX = Object.values(positions).map(p => p.x);
  const maxX = Math.max(...allX);
  const totalTreeWidth = maxX + NODE_WIDTH + 50;

  return { layout: positions, height: totalTreeHeight + 100, width: totalTreeWidth + 100 };
};


export const InteractiveMindMap: React.FC<{ onNodeDoubleClick: (topic: string) => void }> = ({ onNodeDoubleClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        // Collapse the node and all its children
        const nodesToCollapse = new Set([nodeId]);
        const queue = node.children?.filter(c => c.id === nodeId) || [];
        while(queue.length > 0) {
            const current = queue.shift();
            if(current) {
                nodesToCollapse.add(current.id);
                current.children?.forEach(child => queue.push(child));
            }
        }
        nodesToCollapse.forEach(id => newSet.delete(id));
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);
  
  useState(() => {
    setExpandedNodes(new Set([mindMapData.id]));
  });

  const { layout, height, width } = calculateLayout(mindMapData, expandedNodes);
  
  const renderedNodes: React.ReactNode[] = [];
  
  const buildRenderTree = (node: MindMapNodeData, parentPos?: {x:number, y:number}) => {
    if (!layout[node.id]) return;
    
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
        initialScale={0.8}
        centerOnInit
        limitToBounds={false}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="relative" style={{ height: `100%`, width: `100%`}}>
             {renderedNodes}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

    