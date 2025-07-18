
'use client';
import React, { useState, useRef, useCallback } from 'react';
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

const LEVEL_COLORS = [
  'bg-primary text-primary-foreground', // Level 0 (Root)
  'bg-mindmap-node-bg', // Level 1
  'bg-mindmap-level-1-bg', // Level 2
  'bg-mindmap-level-2-bg', // Level 3
  'bg-mindmap-level-3-bg', // Level 4
];

const NODE_WIDTH = 200;
const NODE_HEIGHT = 40;
const HORIZONTAL_SPACING = 150;
const VERTICAL_SPACING = 20;

const Line = ({ from, to }: { from: {x:number, y:number}, to: {x:number, y:number} }) => {
  const path = `M ${from.x} ${from.y} C ${from.x + HORIZONTAL_SPACING / 2} ${from.y}, ${to.x - HORIZONTAL_SPACING / 2} ${to.y}, ${to.x} ${to.y}`;
  return <path d={path} stroke="hsl(var(--mindmap-line-color))" fill="transparent" strokeWidth="1.5" />;
};


const MindMapNode: React.FC<MindMapNodeProps> = ({ node, level, onNodeDoubleClick, isExpanded, toggleExpand, position, parentPosition }) => {
  const hasChildren = node.children && node.children.length > 0;

  const handleSingleClick = () => {
    toggleExpand(node.id);
  };
  
  const handleDoubleClick = () => {
    onNodeDoubleClick(node.name);
  };

  const colorClass = LEVEL_COLORS[level] || 'bg-mindmap-node-bg';

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
        className="absolute"
        onDoubleClick={handleDoubleClick}
      >
        <button
          onClick={handleSingleClick}
          className={cn(
            'w-full h-full flex items-center justify-center p-2 rounded-md cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 text-xs font-medium text-center',
            'shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]',
             colorClass
          )}
        >
          {node.name}
          {hasChildren && (
            <div className="absolute -right-2 -top-2 bg-background rounded-full">
              {isExpanded ? <MinusCircle className="w-4 h-4 text-muted-foreground" /> : <PlusCircle className="w-4 h-4 text-muted-foreground"/>}
            </div>
          )}
        </button>
      </div>
    </>
  );
};


const calculateLayout = (node: MindMapNodeData, expandedNodes: Set<string>, level = 0, yOffset = 0) => {
  let positions: { [id: string]: { x: number; y: number, level: number } } = {};
  let totalHeight = 0;

  const traverse = (currentNode: MindMapNodeData, currentLevel: number, currentY: number) => {
    const x = currentLevel * (NODE_WIDTH + HORIZONTAL_SPACING);
    positions[currentNode.id] = { x, y: currentY, level: currentLevel };
    
    let childrenHeight = 0;
    const isExpanded = expandedNodes.has(currentNode.id);
    
    if (isExpanded && currentNode.children && currentNode.children.length > 0) {
      const childrenYStart = currentY - (currentNode.children.reduce((acc, child) => acc + calculateSubtreeHeight(child, expandedNodes), 0) / 2) + (NODE_HEIGHT / 2);
      
      let childY = childrenYStart;
      currentNode.children.forEach(child => {
        const { positions: childPositions, height: childHeight } = traverse(child, currentLevel + 1, childY);
        positions = { ...positions, ...childPositions };
        childY += childHeight;
        childrenHeight += childHeight;
      });
    }

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
  
  const { positions: finalPositions } = traverse(node, level, yOffset);
  const totalTreeHeight = calculateSubtreeHeight(node, expandedNodes);

  // Center the whole tree vertically
  const finalLayout: { [id: string]: { x: number; y: number, level: number } } = {};
  Object.keys(finalPositions).forEach(id => {
      finalLayout[id] = {
          ...finalPositions[id],
          y: finalPositions[id].y + (totalTreeHeight / 2)
      };
  });

  return { layout: finalLayout, height: totalTreeHeight };
};


export const InteractiveMindMap: React.FC<{ onNodeDoubleClick: (topic: string) => void }> = ({ onNodeDoubleClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set([mindMapData.id]));

  const toggleExpand = useCallback((nodeId: string) => {
    if (nodeId === mindMapData.id) return; // Prevent collapsing the root
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const { layout, height } = calculateLayout(mindMapData, expandedNodes);
  
  const renderedNodes: React.ReactNode[] = [];
  const nodesToRender = [mindMapData];
  const renderedIds = new Set();
  
  const buildRenderTree = (node: MindMapNodeData, parentPos?: {x:number, y:number}) => {
    if (renderedIds.has(node.id)) return;
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
        position={nodePos}
        parentPosition={parentPos}
      />
    );

    if (expandedNodes.has(node.id) && node.children) {
      node.children.forEach(child => buildRenderTree(child, nodePos));
    }
  };

  buildRenderTree(mindMapData);

  return (
    <div className="w-full h-full bg-muted/20">
      <TransformWrapper
        minScale={0.2}
        initialScale={0.8}
        centerOnInit
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: 'fit-content', height: 'fit-content' }}
        >
          <div className="relative" style={{ height: `${height + 100}px`, width: '4000px' }}>
             {renderedNodes}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
