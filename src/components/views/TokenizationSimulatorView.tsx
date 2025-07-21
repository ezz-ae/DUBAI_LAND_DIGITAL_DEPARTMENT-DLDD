
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Building, Home, LandPlot, CheckCircle, ArrowRight, FlaskConical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { simulateTokenization } from '@/ai/flows/simulate-tokenization';
import type { SimulateTokenizationOutput } from '@/ai/schemas/simulate-tokenization';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  propertyType: z.enum(['apartment', 'villa', 'off-plan']),
  appraisedValue: z.coerce.number().positive({ message: "Appraised value must be positive." }),
  sizeSqFt: z.coerce.number().positive({ message: "Size must be positive." }),
  mortgageBalance: z.coerce.number().min(0).optional().default(0),
});

const propertyTypeIcons = {
    apartment: <Building className="h-5 w-5" />,
    villa: <Home className="h-5 w-5" />,
    'off-plan': <LandPlot className="h-5 w-5" />,
};

export function TokenizationSimulatorView() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulateTokenizationOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: 'apartment',
      appraisedValue: 1500000,
      sizeSqFt: 1000,
      mortgageBalance: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSimulationResult(null);
    try {
      const result = await simulateTokenization(values);
      setSimulationResult(result);
    } catch (error) {
      console.error("Error running simulation:", error);
      toast({
        variant: "destructive",
        title: "Simulation Failed",
        description: "Could not generate the simulation. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background/50">
      <div className="container mx-auto p-4 md:p-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Form Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Tokenization Simulator</CardTitle>
                <CardDescription>Enter property details to simulate its tokenization on the DLDCHAIN.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="off-plan">Off-Plan Unit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appraisedValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Appraised Value (AED)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 2000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sizeSqFt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size (sq. ft.)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 1200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="mortgageBalance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mortgage Balance (AED)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter 0 if none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                      Run Simulation
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2">
             {isLoading && (
                 <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-card rounded-lg border">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <h3 className="text-xl font-semibold">Generating Simulation...</h3>
                    <p className="text-muted-foreground">The AI is processing the tokenization lifecycle. Please wait.</p>
                </div>
             )}
            
            {simulationResult && !isLoading && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        {propertyTypeIcons[simulationResult.setup.propertyType.toLowerCase() as keyof typeof propertyTypeIcons]}
                        {simulationResult.simulationTitle}
                    </CardTitle>
                    <CardDescription>This simulation outlines the complete tokenization process from submission to value distribution.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-4">Simulation Setup</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-muted/50 p-3 rounded-md">
                            <dt className="font-medium text-muted-foreground">Appraised Value</dt>
                            <dd className="font-semibold text-primary text-base">{simulationResult.setup.appraisedValue} AED</dd>
                        </div>
                         <div className="bg-muted/50 p-3 rounded-md">
                            <dt className="font-medium text-muted-foreground">Size / Total Tokens</dt>
                            <dd className="font-semibold text-primary text-base">{simulationResult.setup.sizeSqFt} sq ft ({simulationResult.setup.totalTokens} DXBTOKENS)</dd>
                        </div>
                         <div className="bg-muted/50 p-3 rounded-md">
                            <dt className="font-medium text-muted-foreground">Value per sq ft / Token</dt>
                            <dd className="font-semibold text-primary text-base">{simulationResult.setup.pricePerSqFt} AED</dd>
                        </div>
                         <div className="bg-muted/50 p-3 rounded-md">
                            <dt className="font-medium text-muted-foreground">Mortgage Balance</dt>
                            <dd className="font-semibold text-base">{simulationResult.setup.mortgageBalance} AED</dd>
                        </div>
                         <div className="bg-muted/50 p-3 rounded-md">
                            <dt className="font-medium text-muted-foreground">Owner's Equity</dt>
                            <dd className="font-semibold text-base">{simulationResult.setup.ownerEquity} AED</dd>
                        </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Liquidity & Tokenization Cycle</CardTitle>
                        <CardDescription>Step-by-step breakdown of the EBRAM and MAKE system processes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-6">
                             <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                            {simulationResult.liquidityCycle.map((item, index) => (
                                <div key={index} className="relative mb-8">
                                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground -translate-x-1/2">
                                        <span className="text-xs font-bold">{item.step}</span>
                                    </div>
                                    <div className="ml-8">
                                        <h4 className="font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Financial Outcome & Value Creation</CardTitle>
                        <CardDescription>Projected financial results for all stakeholders after a 1-year period with 8% market appreciation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                       <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                           <span className="font-medium">Owner's Initial Cash-Out</span>
                           <span className="font-bold text-lg">{simulationResult.financialOutcome.ownerInitialCashOut} AED</span>
                       </div>
                       <div className="flex justify-between items-center p-3">
                           <span className="text-muted-foreground">Owner's Retained Tokens Value (at MPT)</span>
                           <span className="font-semibold">{simulationResult.financialOutcome.ownerRetainedTokensValue} AED</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-primary/10 rounded-md">
                           <strong className="text-primary">Owner's Total Realized Value</strong>
                           <strong className="text-primary text-lg">{simulationResult.financialOutcome.ownerTotalValue} AED</strong>
                       </div>
                       <Separator className="my-4" />
                       <div className="flex justify-between items-center p-3">
                           <span className="text-muted-foreground">Liquidity Provider (MAKE) Profit</span>
                           <span className="font-semibold">{simulationResult.financialOutcome.liquidityProviderProfit} AED</span>
                       </div>
                       <div className="flex justify-between items-center p-3">
                           <span className="text-muted-foreground">Market Investor Potential ROI</span>
                           <span className="font-semibold text-green-600">{simulationResult.financialOutcome.marketInvestorPotentialROI}</span>
                       </div>
                       <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md mt-4">
                           <strong className="text-lg">Total Value Created by DLDCHAIN</strong>
                           <strong className="text-lg text-green-600">{simulationResult.financialOutcome.totalValueCreated} AED</strong>
                       </div>
                    </CardContent>
                </Card>

              </div>
            )}

            {!simulationResult && !isLoading && (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8 bg-card rounded-lg border">
                    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                        <FlaskConical className="h-12 w-12" />
                    </div>
                    <h3 className="text-2xl font-semibold">Ready to Simulate?</h3>
                    <p className="text-muted-foreground max-w-md mt-2">Use the form on the left to input your property details and see how the DLDCHAIN protocol can unlock its value. The AI will generate a personalized, step-by-step breakdown.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
