
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Home, LandPlot, Briefcase, Banknote, Gavel } from 'lucide-react';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { scenarios } from '@/lib/simulation-scenarios';

const propertyTypeIcons = {
    apartment: <Building className="h-5 w-5" />,
    villa: <Home className="h-5 w-5" />,
    land: <LandPlot className="h-5 w-5" />,
    commercial: <Briefcase className="h-5 w-5" />,
    briefcase: <Briefcase className="h-5 w-5" />,
    banknote: <Banknote className="h-5 w-5" />,
    gavel: <Gavel className="h-5 w-5" />,
};

const ReadyScenarios = ({ onScenarioSelect }: { onScenarioSelect: (scenario: any) => void }) => (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-4xl font-bold font-headline">DLDCHAIN™ Simulation Scenarios</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
                Explore these detailed, pre-built scenarios to understand how DLDCHAIN™ seamlessly integrates its core components to unlock liquidity, ensure trust, and streamline transactions across various real-world situations.
            </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scenarios.map(scenario => (
                <Card key={scenario.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           {propertyTypeIcons[scenario.icon as keyof typeof propertyTypeIcons] || <Building className="h-5 w-5" />}
                           {scenario.title}
                        </CardTitle>
                        <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        
                    </CardContent>
                    <CardFooter>
                         <Button variant="outline" onClick={() => onScenarioSelect(scenario)} className="w-full">
                            View Details <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
);

export function SimulationView() {
  const [selectedScenario, setSelectedScenario] = React.useState<any | null>(null);

  return (
    <div className="flex-1 overflow-hidden bg-background/50">
      <ScrollArea className="h-full">
        <div className="container mx-auto p-4 md:p-8 h-full">
          <ReadyScenarios onScenarioSelect={setSelectedScenario} />
        </div>
      </ScrollArea>
      
      {selectedScenario && (
        <Dialog open={!!selectedScenario} onOpenChange={(open) => !open && setSelectedScenario(null)}>
            <DialogContent className="sm:max-w-4xl p-0 grid grid-rows-[auto_1fr_auto] max-h-[90vh]">
                <DialogHeader className="p-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold font-headline">{selectedScenario.title}</DialogTitle>
                    <DialogDescription>
                        A detailed breakdown of the tokenization process for this scenario.
                    </DialogDescription>
                </DialogHeader>
                
                <ScrollArea>
                    <div className="prose dark:prose-invert max-w-full p-6 space-y-4">
                        <div>
                            <h4 className="font-semibold text-lg">Context</h4>
                            {selectedScenario.context}
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold text-lg">DLDCHAIN™ Features Highlighted</h4>
                            {selectedScenario.features}
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold text-lg">Simulation Steps & Technical Flow</h4>
                            {selectedScenario.steps}
                        </div>
                        <Separator />
                        <div>
                             <h4 className="font-semibold text-lg">Financial Summary</h4>
                            {selectedScenario.summary}
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter className="p-4 border-t bg-background">
                    {/* The close button is part of the DialogContent by default */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
