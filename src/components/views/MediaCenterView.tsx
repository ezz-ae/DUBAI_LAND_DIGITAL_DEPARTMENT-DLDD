
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateAudio } from '@/ai/flows/audio-overview';
import { Loader2, Music4, PauseCircle, PlayCircle, Download, Mic2 } from 'lucide-react';
import type { DLDDoc } from '@/lib/documents';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface MediaCenterViewProps {
  selectedDoc: DLDDoc | null;
}

const downloadItems = [
    { title: "DLDCHAIN Project Overview", description: "A high-level summary of the project's vision, goals, and core components.", file: "/report/overview" },
    { title: "Project Feasibility Study", description: "In-depth analysis of the project's viability, market fit, and economic model.", file: "/report/feasibility" },
    { title: "Technical Analysis Overview", description: "A summary of the technical architecture, including blockchain choice and security protocols.", file: "/report/technical" },
    { title: "Generated Reports", description: "Access AI-generated reports created from your notes in the AI Console.", file: "#", disabled: true },
]

export function MediaCenterView({ selectedDoc }: MediaCenterViewProps) {
  const { toast } = useToast();
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioState, setAudioState] = useState<{ element: HTMLAudioElement | null; isPlaying: boolean }>({ element: null, isPlaying: false });
  const [interviewLength, setInterviewLength] = useState<'short' | 'long'>('short');
  const interviewUrl = "https://drive.google.com/file/d/1qGmGpJAr65P9OaApzfI03cZdU7kOxEQ9/view?usp=sharing";

  const handleGenerateAudio = async () => {
    if (!selectedDoc?.content || isGeneratingAudio) return;

    if (audioState.element) {
        if (audioState.isPlaying) {
            audioState.element.pause();
            setAudioState(prev => ({...prev, isPlaying: false}));
        } else {
            audioState.element.play();
            setAudioState(prev => ({...prev, isPlaying: true}));
        }
        return;
    }

    toast({ title: 'Generating Audio Interview...', description: 'Please wait while we generate the audio overview.' });
    setIsGeneratingAudio(true);

    try {
      const result = await generateAudio({ content: selectedDoc.content, length: interviewLength });
      const audioSrc = result.audio;
      const audioElement = new Audio(audioSrc);
      
      audioElement.onplay = () => setAudioState({ element: audioElement, isPlaying: true });
      audioElement.onpause = () => setAudioState(prev => ({ ...prev, isPlaying: false }));
      audioElement.onended = () => {
        setAudioState({ element: null, isPlaying: false });
      };

      audioElement.play();
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: 'Could not generate audio interview. Please try again.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleStopAudio = () => {
    if (audioState.element) {
      audioState.element.pause();
      audioState.element.currentTime = 0;
    }
    setAudioState({ element: null, isPlaying: false });
  };


  return (
    <div className="flex-1 p-6 bg-background/50">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <Card className="ai-console-card lg:col-span-1">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Music4 className="h-5 w-5" /> AI Audio Interview</CardTitle>
              <CardDescription>Generate AI-powered audio overviews of the documents.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6 text-center p-6 min-h-[400px]">
              <p className="text-muted-foreground max-w-md text-sm">
                  { !selectedDoc 
                    ? "Please select a document from the 'Documentation' tab first to enable audio generation."
                    : audioState.element ? "Audio is ready. Press play or pause." : "Select an interview length and generate an audio summary for the selected document."
                  }
              </p>
              
              <RadioGroup 
                defaultValue="short" 
                className={cn("flex items-center gap-4", (isGeneratingAudio || audioState.isPlaying) && 'opacity-50 pointer-events-none')}
                onValueChange={(value: 'short' | 'long') => setInterviewLength(value)}
                disabled={isGeneratingAudio || audioState.isPlaying}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short-interview" />
                  <Label htmlFor="short-interview">Short Interview</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long-interview" />
                  <Label htmlFor="long-interview">Long Interview</Label>
                </div>
              </RadioGroup>

              <div className="flex gap-2">
                <Button onClick={handleGenerateAudio} size="lg" disabled={isGeneratingAudio || !selectedDoc}>
                    {isGeneratingAudio ? <Loader2 className="animate-spin" /> : audioState.isPlaying ? <PauseCircle /> : <PlayCircle />}
                    <span className="ml-2">{isGeneratingAudio ? 'Generating...' : audioState.isPlaying ? 'Pause' : audioState.element ? 'Play' : 'Generate'}</span>
                </Button>
                {audioState.element && (
                  <Button onClick={handleStopAudio} size="lg" variant="outline">
                    Reset
                  </Button>
                )}
              </div>
          </CardContent>
        </Card>
        
        <Card className="ai-console-card lg:col-span-1">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mic2 className="h-5 w-5" /> Featured Interview</CardTitle>
              <CardDescription>Listen to the official DLDCHAIN project interview.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-6 text-center p-6 min-h-[400px]">
              <Mic2 className="w-24 h-24 text-primary" />
              <p className="text-muted-foreground max-w-md text-sm">
                  Hear directly from the visionaries behind the project. This official interview covers the core concepts, strategic goals, and transformative potential of the DLDCHAIN protocol.
              </p>
              <Button asChild size="lg">
                <a href={interviewUrl} target="_blank" rel="noopener noreferrer">Listen Now</a>
              </Button>
          </CardContent>
        </Card>


        <Card className="ai-console-card lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" /> Download Center</CardTitle>
                <CardDescription>Access key project documents and reports.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 min-h-[400px] flex flex-col">
                <ul className="space-y-3 flex-1">
                    {downloadItems.map((item, index) => (
                        <React.Fragment key={item.title}>
                            <li className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Button asChild variant="outline" size="sm" disabled={item.disabled}>
                                    <a href={item.file} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-4 w-4 mr-2" />
                                        {item.disabled ? 'Coming Soon' : 'View & Print'}
                                    </a>
                                </Button>
                            </li>
                            {index < downloadItems.length - 1 && !item.disabled && <Separator />}
                        </React.Fragment>
                    ))}
                </ul>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
