
'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Music4, PauseCircle, PlayCircle, Download, Mic2 } from 'lucide-react';
import type { DLDDoc } from '@/lib/documents';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { generateAudioInterviewFlow } from '@/ai/flows/audio-flow';

interface MediaCenterViewProps {
  selectedDoc: DLDDoc | null;
}

const downloadItems = [
    { title: "DLDCHAIN Project Overview", description: "A high-level summary of the project's vision, goals, and core components.", file: "/report/overview" },
    { title: "Project Feasibility Study", description: "In-depth analysis of the project's viability, market fit, and economic model.", file: "/report/feasibility" },
    { title: "Technical Analysis", description: "A comprehensive overview of the technical architecture, including blockchain choice and security protocols.", file: "/report/technical" },
    { title: "Generated Reports", description: "Access AI-generated reports created from your notes in the AI Console.", file: "#", disabled: true },
]

export function MediaCenterView({ selectedDoc }: MediaCenterViewProps) {
  const { toast } = useToast();
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [interviewLength, setInterviewLength] = useState<'short' | 'long'>('short');
  const interviewUrl = "https://drive.google.com/file/d/1qGmGpJAr65P9OaApzfI03cZdU7kOxEQ9/view?usp=sharing";

  const handlePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  const handleGenerateAudio = async () => {
    if (!selectedDoc?.content || isGeneratingAudio) return;

    if (audioUrl) {
        handlePlayPause();
        return;
    }

    toast({ title: 'Generating Audio Interview...', description: 'Please wait. This may take a moment.' });
    setIsGeneratingAudio(true);
    setAudioUrl(null);
    if(audioRef.current) audioRef.current = null;


    try {
      const result = await generateAudioInterviewFlow({
        documentContent: selectedDoc.content,
        interviewLength,
      });

      if (result.audioDataUri) {
        setAudioUrl(result.audioDataUri);
        toast({ title: 'Audio Generated!', description: 'Your AI audio interview is ready to play.' });
      } else {
        throw new Error("No audio data returned from flow.");
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: 'Could not generate the audio interview. Please try again.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleResetAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setAudioUrl(null);
    setIsPlaying(false);
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
                    : audioUrl ? "Audio is ready. Press play or download." : "Select an interview length and generate an audio summary for the selected document."
                  }
              </p>
              
              <RadioGroup 
                defaultValue="short" 
                className={cn("flex items-center gap-4", (isGeneratingAudio || isPlaying) && 'opacity-50 pointer-events-none')}
                onValueChange={(value: 'short' | 'long') => setInterviewLength(value)}
                disabled={isGeneratingAudio || isPlaying}
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

              {audioUrl && (
                  <audio 
                    ref={audioRef} 
                    src={audioUrl} 
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full"
                    controls
                  />
              )}


              <div className="flex gap-2">
                <Button onClick={handleGenerateAudio} size="lg" disabled={isGeneratingAudio || !selectedDoc}>
                    {isGeneratingAudio ? <Loader2 className="animate-spin" /> : isPlaying ? <PauseCircle /> : <PlayCircle />}
                    <span className="ml-2">{isGeneratingAudio ? 'Generating...' : isPlaying ? 'Pause' : audioUrl ? 'Play' : 'Generate'}</span>
                </Button>
                {audioUrl && (
                  <>
                    <Button asChild size="lg" variant="outline">
                      <a href={audioUrl} download={`${selectedDoc?.name || 'interview'}.wav`}><Download/></a>
                    </Button>
                    <Button onClick={handleResetAudio} size="lg" variant="destructive">
                      Reset
                    </Button>
                  </>
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
                            <li className="flex items-start justify-between p-2 rounded-lg hover:bg-muted/50 gap-2">
                                <div className="flex-1">
                                    <h4 className="font-semibold">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Button asChild variant="outline" size="sm" disabled={item.disabled} className="shrink-0">
                                    <a href={item.disabled ? undefined : item.file} target={item.disabled ? undefined : "_blank"} rel="noopener noreferrer">
                                        <Download className="h-4 w-4 mr-2" />
                                        {item.disabled ? 'Coming Soon' : 'View & Print'}
                                    </a>
                                </Button>
                            </li>
                            {index < downloadItems.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </ul>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}
