
'use client';
import React, { useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

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

const LEVEL_CLASSES: Record<number, { bg: string; text: string }> = {
  0: { bg: 'bg-[hsl(var(--mindmap-level-0-bg))]', text: 'text-[hsl(var(--mindmap-level-0-text))]' },
  1: { bg: 'bg-[hsl(var(--mindmap-level-1-bg))]', text: 'text-[hsl(var(--mindmap-level-1-text))]' },
  2: { bg: 'bg-[hsl(var(--mindmap-level-2-bg))]', text: 'text-[hsl(var(--mindmap-level-2-text))]' },
};


const NODE_WIDTH = 220;
const NODE_HEIGHT = 48;
const HORIZONTAL_SPACING = 150;
const VERTICAL_SPACING = 20;

const Line = ({ from, to }: { from: {x:number, y:number}, to: {x:number, y:number} }) => {
  const path = `M ${from.x} ${from.y} C ${from.x + HORIZONTAL_SPACING / 2} ${from.y}, ${to.x - HORIZONTAL_SPACING / 2} ${to.y}, ${to.x} ${to.y}`;
  
  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
      <path 
        d={path} 
        stroke="var(--mindmap-line-color)"
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
  
  const levelClass = LEVEL_CLASSES[level] || { bg: 'bg-mindmap-node-bg', text: 'text-foreground' };

  return (
    <>
      {parentPosition && <Line from={{x: parentPosition.x + NODE_WIDTH, y: parentPosition.y + NODE_HEIGHT / 2}} to={{x: position.x, y: position.y + NODE_HEIGHT / 2}} />}
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
            'w-full h-full flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border',
            'hover:shadow-lg hover:border-mindmap-node-border-hover hover:scale-105',
             'text-xs font-medium',
             levelClass.bg,
             levelClass.text
          )}
        >
          <span className="flex-1 text-center">{node.name}</span>
          {hasChildren && (
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/10 dark:bg-white/10">
              <ChevronRight className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-90")} />
            </div>
          )}
          {!hasChildren && <div className="w-5 h-5" /> /* Placeholder for alignment */}
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
    const isExpanded = expandedNodes.has(currentNode.id);
    
    let childrenHeight = 0;
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
      childrenHeight = currentNode.children.reduce((acc, child) => acc + calculateSubtreeHeight(child), 0) - VERTICAL_SPACING;
    }
    const nodeY = currentY + (childrenHeight / 2);

    const x = currentLevel * (NODE_WIDTH + HORIZONTAL_SPACING);
    positions[currentNode.id] = { x, y: nodeY, level: currentLevel };
    
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
      let childYOffset = currentY;
      currentNode.children.forEach(child => {
        const childSubtreeHeight = calculateSubtreeHeight(child);
        traverse(child, currentLevel + 1, childYOffset);
        childYOffset += childSubtreeHeight;
      });
    }

    return { height: Math.max(NODE_HEIGHT + VERTICAL_SPACING, childrenHeight + VERTICAL_SPACING) };
  };
  
  traverse(node, 0, 0);

  // Recenter the tree vertically
  const allY = Object.values(positions).map(p => p.y);
  const minY = Math.min(...allY);
  const maxY = Math.max(...allY);
  const treeHeight = maxY - minY;
  const yOffset = -minY - treeHeight / 2;

  Object.keys(positions).forEach(id => {
    positions[id].y += yOffset;
  });

  const allX = Object.values(positions).map(p => p.x);
  const maxX = Math.max(...allX);
  const totalTreeWidth = maxX + NODE_WIDTH + 50;

  return { layout: positions, height: treeHeight + 100, width: totalTreeWidth + 100 };
};


export const InteractiveMindMap: React.FC<{ onNodeDoubleClick: (topic: string) => void }> = ({ onNodeDoubleClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([mindMapData.id]));

  const toggleExpand = useCallback((nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        const nodesToCollapse = new Set([nodeId]);
        const queue: MindMapNodeData[] = [];
        
        const findNode = (root: MindMapNodeData, id: string): MindMapNodeData | null => {
          if (root.id === id) return root;
          if (root.children) {
            for (const child of root.children) {
              const found = findNode(child, id);
              if (found) return found;
            }
          }
          return null;
        }

        const startNode = findNode(mindMapData, nodeId);
        if (startNode) queue.push(startNode);
        
        while (queue.length > 0) {
          const current = queue.shift();
          if (current && current.children) {
            current.children.forEach(child => {
              nodesToCollapse.add(child.id);
              queue.push(child);
            });
          }
        }
        
        nodesToCollapse.forEach(id => newSet.delete(id));
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);
  
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
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
              contentStyle={{ width: `${width}px`, height: `${height}px` }}
            >
              <div className="relative" style={{ height: `${height}px`, width: `${width}px`}}>
                 {renderedNodes}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};
