
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, Moon, Sun, Mic, PauseCircle } from 'lucide-react';
import { ProjectPilotLogo } from '@/components/logo';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { askQuestion } from '@/ai/flows/ask-question';
import { generateAudio } from '@/ai/flows/audio-overview';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from "next-themes"
import { dldChainDocuments } from '@/lib/documents';
import { SourceGuide } from '@/components/source-guide';
import { explainTopic } from '@/ai/flows/explain-topic';

const initialMessages = [
  { from: 'bot', text: "Welcome to the DLDCHAIN Project Pilot. This is a sovereign, government-led blockchain ecosystem developed to serve as the digital side of the Dubai Land Department (DLD) to revolutionize real estate governance. This system utilizes DXBTOKENS for property ownership, the DLD Digital Dirham as its exclusive fiat-pegged currency, and EBRAM for automating various smart contracts, including rentals and sales, with AI integration (EBRAMGPT) for legal interpretation and dispute resolution. Please select a document from the sidebar to begin your review or ask me a question." },
];

const quickPromptsEnglish = [
  "What is the DLDCHAIN project scope?",
  "Explain the EBRAM legal system.",
  "How does Tokenization work?",
];

const quickPromptsArabic = [
  "ما هو نطاق مشروع DLDCHAIN؟",
  "اشرح نظام أبرام القانوني.",
  "كيف تعمل عملية الترميز؟",
];

type TextSize = "sm" | "base" | "lg";

function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState(dldChainDocuments[0] || {id: 0, name: 'No documents loaded', content: 'Please add documents to `src/lib/documents.ts`', summary: '', topics: []});
  
  const [summary, setSummary] = useState(selectedDoc?.summary || '');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);

  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioState, setAudioState] = useState<{ element: HTMLAudioElement | null; isPlaying: boolean }>({ element: null, isPlaying: false });

  const chatScrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [textSize, setTextSize] = useState<TextSize>('base');
  
  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');

  useEffect(() => {
    if (dldChainDocuments.length > 0) {
      const doc = dldChainDocuments[0]
      setSelectedDoc(doc);
      setSummary(doc.summary);
    }
  }, []);
  
  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo({ top: chatScrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages(initialMessages);
    setSummary(selectedDoc.summary);
    setShowSummaryDialog(false);
    
    if (audioState.element) {
        audioState.element.pause();
        setAudioState({ element: null, isPlaying: false });
    }
  }, [selectedDoc]);

  const handleSummarize = async () => {
    if (!selectedDoc || !selectedDoc.content) return;
    setIsSummarizing(true);
    setShowSummaryDialog(true);
    setSummary('');
    try {
      const result = await summarizeDocument({ documentText: selectedDoc.content });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: "Could not generate summary. Please try again.",
      });
      setSummary('Failed to generate summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent, message?: string) => {
    if(e) e.preventDefault();
    const currentMessage = message || input;
    if (!currentMessage.trim() || isAnswering || !selectedDoc?.content) return;

    const newMessages = [...messages, { from: 'user', text: currentMessage }];
    setMessages(newMessages);
    setInput('');
    setIsAnswering(true);

    try {
      const result = await askQuestion({ question: currentMessage, context: selectedDoc.content });
      const botAnswer = result.answer;
      const isBotAnswerArabic = /[\u0600-\u06FF]/.test(botAnswer);
      setMessages([...newMessages, { from: 'bot', text: botAnswer, isArabic: isBotAnswerArabic }]);
    } catch (error) {
      console.error('Error asking question:', error);
      setMessages([...newMessages, { from: 'bot', text: 'Sorry, I encountered an error. Please try again.', isArabic: false }]);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an answer. Please try again.",
      });
    } finally {
      setIsAnswering(false);
    }
  };
  
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

  const handleTopicClick = async (topic: string) => {
    toast({ title: `Explaining: ${topic}`, description: "The AI is preparing an explanation..."});
    const newMessages = [...messages, { from: 'user', text: `Explain this topic for me: ${topic}` }];
    setMessages(newMessages);
    setIsAnswering(true);
    
    try {
      const result = await explainTopic({ topic: topic, context: selectedDoc.content });
      const botAnswer = result.explanation;
      const isBotAnswerArabic = /[\u0600-\u06FF]/.test(botAnswer);
      setMessages([...newMessages, { from: 'bot', text: botAnswer, isArabic: isBotAnswerArabic }]);
    } catch (error) {
      console.error('Error explaining topic:', error);
      setMessages([...newMessages, { from: 'bot', text: 'Sorry, I encountered an error explaining that topic. Please try again.', isArabic: false }]);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an explanation. Please try again.",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
           <ProjectPilotLogo />
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            <SidebarGroupLabel className="px-2">Project Documents</SidebarGroupLabel>
            {dldChainDocuments.length > 0 ? dldChainDocuments.map((doc) => (
               <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedDoc(doc)}
                  isActive={selectedDoc?.id === doc.id}
                  className="justify-start w-full"
                  tooltip={sidebarState === 'collapsed' ? doc.name : undefined}
                >
                  <FileText />
                  <span>{doc.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )) : (
              <div className="p-2 text-sm text-muted-foreground">No documents loaded.</div>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t flex items-center justify-between">
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>N</AvatarFallback>
                    </Avatar>
                </Button>
                <Button variant="ghost" size="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M15.2 3a2 2 0 0 1 2.8.7l2.8 4.4a2 2 0 0 1 .2 1.6v7a2 2 0 0 1-2 2h-4.4a2 2 0 0 1-1.6-.2l-4.4-2.8a2 2 0 0 1-.7-2.8z"/><path d="M15.2 3a2 2 0 0 0-2.8.7l-2.8 4.4a2 2 0 0 0-.2 1.6v7a2 2 0 0 0 2 2h4.4a2 2 0 0 0 1.6-.2l4.4-2.8a2 2 0 0 0 .7-2.8z"/></svg>
                </Button>
            </div>
            <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-headline font-semibold">Project Pilot</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSummarize} variant="outline" size="sm">
              <Sparkles /> Summarize Document
            </Button>
            <Button onClick={handleGenerateAudio} variant="outline" size="sm" disabled={isGeneratingAudio}>
                {isGeneratingAudio ? <Loader2 className="animate-spin" /> : audioState.isPlaying ? <PauseCircle /> : <Mic />}
                <span>{isGeneratingAudio ? 'Generating...' : audioState.isPlaying ? 'Pause Audio' : audioState.element ? 'Play Audio' : 'Generate AI Audio'}</span>
            </Button>
          </div>
        </header>
        
        <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3 overflow-hidden gap-4 p-4">
          <div className="lg:col-span-1 flex flex-col gap-4">
              <Card className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle>AI Open Discussion</CardTitle>
                  <CardDescription>Ask questions about <span className='font-bold text-primary'>{selectedDoc.name}</span></CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 flex flex-col">
                  <ScrollArea className="flex-1" ref={chatScrollAreaRef}>
                    <div className="p-4 space-y-4">
                    {messages.map((msg: any, index) => (
                      <div key={index} className={cn("flex items-start gap-3 w-full", msg.from === 'user' ? "justify-end" : "justify-start")}>
                        {msg.from === 'bot' && (
                          <Avatar className="w-8 h-8 shrink-0">
                            <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn("flex flex-col gap-2", msg.from === 'user' ? 'items-end' : 'items-start', msg.from === 'bot' && 'w-full')}>
                          <div dir={msg.isArabic ? 'rtl' : 'ltr'} className={cn(
                            "max-w-prose rounded-lg px-4 py-2 text-sm",
                            msg.from === 'user' ? "bg-primary text-primary-foreground" : "bg-muted",
                            msg.isArabic && "font-arabic"
                          )}>
                            {msg.text}
                          </div>
                        </div>
                          {msg.from === 'user' && (
                          <Avatar className="w-8 h-8 shrink-0">
                              <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}
                      {messages.length <= 1 && (
                        <div className="pt-4">
                          <p className="text-sm text-center text-muted-foreground mb-4">Or try one of these prompts:</p>
                          <div className="grid grid-cols-1 gap-2">
                              {(isArabic ? quickPromptsArabic : quickPromptsEnglish).map((prompt) => (
                                <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)} className={cn("w-full justify-start text-left h-auto", isArabic && "justify-end text-right font-arabic")}>
                                  {prompt}
                                </Button>
                              ))}
                          </div>
                        </div>
                      )}
                    {isAnswering && (
                        <div className="flex items-start gap-3 justify-start">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                          </Avatar>
                          <div className="max-w-xs rounded-lg px-4 py-2 text-sm bg-muted flex items-center">
                            <Loader2 className="animate-spin h-4 w-4" />
                          </div>
                        </div>
                    )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input
                      dir={isArabic ? 'rtl' : 'ltr'}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your question..."
                      autoComplete="off"
                      disabled={isAnswering}
                      className={cn(isArabic && "font-arabic")}
                    />
                    <Button type="submit" size="icon" disabled={isAnswering}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
              <SourceGuide 
                summary={selectedDoc.summary} 
                topics={selectedDoc.topics || []}
                isArabic={isArabic}
                onTopicClick={handleTopicClick}
              />
              <Card className="flex-1 flex flex-col">
                <CardHeader className='flex-row items-center justify-between'>
                  <div>
                    <CardTitle>{selectedDoc.name}</CardTitle>
                    <CardDescription>Main document content</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setTextSize("sm")} className={cn(textSize === 'sm' && 'bg-muted')}>Sm</Button>
                    <Button variant="ghost" size="sm" onClick={() => setTextSize("base")} className={cn(textSize === 'base' && 'bg-muted')}>Md</Button>
                    <Button variant="ghost" size="sm" onClick={() => setTextSize("lg")} className={cn(textSize === 'lg' && 'bg-muted')}>Lg</Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full">
                    <div 
                      dir={isArabic ? 'rtl' : 'ltr'} 
                      className={cn(
                        "p-6 whitespace-pre-wrap leading-relaxed",
                        isArabic && "font-arabic",
                        `text-${textSize}`
                      )}
                    >
                      {selectedDoc.content}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
          </div>
        </div>
      </main>

      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Generated Summary for <span className='text-primary'>{selectedDoc.name}</span></DialogTitle>
          </DialogHeader>
          {isSummarizing ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            <ScrollArea className="max-h-[60vh]">
              <p className="text-sm whitespace-pre-wrap">{summary}</p>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Home() {
  return (
    <SidebarProvider>
      <PageContent />
    </SidebarProvider>
  )
}
