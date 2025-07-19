
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateAudio } from '@/ai/flows/audio-overview';
import { Loader2, Music4, PauseCircle, PlayCircle } from 'lucide-react';
import type { DLDDoc } from '@/lib/documents';

interface MediaCenterViewProps {
  selectedDoc: DLDDoc | null;
}

export function MediaCenterView({ selectedDoc }: MediaCenterViewProps) {
  const { toast } = useToast();
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioState, setAudioState] = useState<{ element: HTMLAudioElement | null; isPlaying: boolean }>({ element: null, isPlaying: false });

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

    toast({ title: 'Generating Audio...', description: 'Please wait while we generate the audio overview.' });
    setIsGeneratingAudio(true);

    try {
      const result = await generateAudio({ text: selectedDoc.content.substring(0, 4000) });
      const audioSrc = result.audio;
      const audioElement = new Audio(audioSrc);
      
      audioElement.onplay = () => setAudioState({ element: audioElement, isPlaying: true });
      audioElement.onpause = () => setAudioState(prev => ({ ...prev, isPlaying: false }));
      audioElement.onended = () => setAudioState({ element: null, isPlaying: false });

      audioElement.play();
    } catch (error) {
      console.error('Error generating audio:', error);
      toast({
        variant: 'destructive',
        title: 'Audio Generation Failed',
        description: 'Could not generate audio overview. Please try again.',
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="flex-1 p-6 bg-background/50">
      <div className="max-w-7xl mx-auto w-full">
        <Card className="ai-console-card">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Music4 className="h-5 w-5" /> Media Center</CardTitle>
              <CardDescription>Generate and listen to AI-powered audio overviews of the documents.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-6 min-h-[400px]">
              <Music4 className="w-24 h-24 text-primary" />
              <p className="text-muted-foreground max-w-md">
                  { !selectedDoc 
                    ? "Please select a document from the 'Documentation' tab first to enable audio generation."
                    : audioState.element ? "Audio is ready to play." : "Generate an audio summary for the selected document."
                  }
              </p>
              <Button onClick={handleGenerateAudio} size="lg" disabled={isGeneratingAudio || !selectedDoc}>
                  {isGeneratingAudio ? <Loader2 className="animate-spin" /> : audioState.isPlaying ? <PauseCircle /> : <PlayCircle />}
                  <span className="ml-2">{isGeneratingAudio ? 'Generating Audio...' : audioState.isPlaying ? 'Pause Audio' : audioState.element ? 'Play Audio Overview' : 'Generate AI Audio'}</span>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
