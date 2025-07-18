
'use client';
import React, { useState, useCallback } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { mindMapData } from '@/lib/mindmap-data';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

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
            <div className="absolute -right-3 -top-3 bg-background rounded-full flex items-center justify-center w-6 h-6 z-10 border border-muted-foreground/50">
              {isExpanded ? <Minus className="w-4 h-4 text-muted-foreground group-hover:text-primary" /> : <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary"/>}
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
