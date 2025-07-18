
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, StickyNote, Moon, Sun, Trash2, FileSignature, BrainCircuit, Download, PauseCircle, SlidersHorizontal, BookText } from 'lucide-react';
import { ProjectPilotLogo } from '@/components/logo';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { askQuestion } from '@/ai/flows/ask-question';
import { getClarification, generateReport } from '@/ai/flows/notes';
import type { GenerateReportInput } from '@/ai/schemas/notes';
import { generateAudio } from '@/ai/flows/audio-overview';
import { explainTopic } from '@/ai/flows/explain-topic';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from "next-themes"
import { dldChainDocuments } from '@/lib/documents';
import { InteractiveMindMap } from '@/components/interactive-mind-map';

const initialMessages = [
  { from: 'bot', text: "a sovereign, government-led blockchain ecosystem developed to serve as the digital side of the Dubai Land Department (DLD) to revolutionize real estate governance. This system utilizes DXBTOKENS for property ownership, the DLD Digital Dirham as its exclusive fiat-pegged currency, and EBRAM for automating various smart contracts, including rentals and sales, with AI integration (EBRAMGPT) for legal interpretation and dispute resolution. Mashroi acts as a central hub for real estate professionals, managing broker licensing, education, visa facilitation, and performance-based rewards through AI-powered systems. The entire framework emphasizes deep integration with existing governmental bodies like Ejari, Milka, and Trakheesi, aiming to enhance transparency, efficiency, and trust in Dubai's real estate market while attracting global investment." },
];

const quickPrompts = [
  "Explain the EBRAM system",
  "What makes the MAKE system different?",
  "ابدا حوار عن المشروع باللغه العربية",
  "اذكر اهم ما يميز المشروع وكيف يتوافق ذلك مع البنية الحالية",
  "اشرح نظام الترميز وماالذي يجعلة مختلفاً",
];

type Note = {
  id: number;
  text: string;
};

type TextSize = "sm" | "base" | "lg";

function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState(dldChainDocuments[0]);
  
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileContentRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [isClarifying, setIsClarifying] = useState(false);
  const [clarification, setClarification] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState('');
  const [reportType, setReportType] = useState<GenerateReportInput['reportType']>('technical');
  const [textSize, setTextSize] = useState<TextSize>('sm');

  const isArabic = selectedDoc.id === 1;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages(initialMessages);
    setSummary('');
    setShowSummaryDialog(false);
    if(audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    setAudioSrc(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoc]);

  const handleSelection = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      const newNote: Note = { id: Date.now(), text: selection };
      setNotes(prev => [...prev, newNote]);
      toast({
        title: "Note Added",
        description: "Selected text has been added to your notes.",
      })
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleClarify = async () => {
    if (notes.length === 0) {
      toast({ variant: 'destructive', title: "No notes to clarify", description: "Please add some notes first." });
      return;
    }
    setIsClarifying(true);
    setClarification('');
    setReport('');
    try {
      const result = await getClarification({ notes: notes.map(n => n.text) });
      setClarification(result.clarification);
    } catch (error) {
      console.error('Error getting clarification:', error);
      toast({
        variant: "destructive",
        title: "Clarification Failed",
        description: "Could not get clarification. Please try again.",
      });
    } finally {
      setIsClarifying(false);
    }
  };

  const handleExplainTopic = async (topic: string) => {
    setIsClarifying(true);
    setClarification('');
    setReport('');
    toast({ title: "Generating Explanation", description: `Getting details for: ${topic}` });
    try {
      const result = await explainTopic({ topic: topic, context: selectedDoc.content });
      setClarification(result.explanation);
    } catch (error) {
       console.error('Error explaining topic:', error);
      toast({
        variant: "destructive",
        title: "Explanation Failed",
        description: "Could not get explanation. Please try again.",
      });
    } finally {
      setIsClarifying(false);
    }
  };
  
  const handleGenerateReport = async () => {
    if (notes.length === 0) {
      toast({ variant: 'destructive', title: "No notes to generate report from", description: "Please add some notes first." });
      return;
    }
    setIsGeneratingReport(true);
    setReport('');
    setClarification('');
    try {
      const result = await generateReport({ notes: notes.map(n => n.text), reportType });
      setReport(result.report);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        variant: "destructive",
        title: "Report Generation Failed",
        description: "Could not generate report. Please try again.",
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setShowSummaryDialog(true);
    setSummary('');
    try {
      const result = await summarizeDocument({ documentText: selectedDoc.content });
      setSummary(result.summary);
      const newNote: Note = { id: Date.now(), text: `Summary of ${selectedDoc.name}:\n${result.summary}` };
      setNotes(prev => [newNote, ...prev]);
      toast({
        title: "Summary Added to Notes",
      });
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

  const handleSendMessage = async (e: React.FormEvent | undefined, message?: string) => {
    if(e) e.preventDefault();
    const currentMessage = message || input;
    if (!currentMessage.trim() || isAnswering) return;

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

  const handleDiscussSummary = () => {
    if (summary) {
      handleSendMessage(undefined, `Tell me more about this summary: ${summary}`);
    }
    setShowSummaryDialog(false);
  };
  
  const handlePlayAudio = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioSrc) {
      audioRef.current?.play();
      setIsPlaying(true);
      return;
    }

    if (!selectedDoc.content || isGeneratingAudio) return;

    setIsGeneratingAudio(true);
    let textToSummarizeAndPlay = summary;
    if (!textToSummarizeAndPlay) {
      try {
        const result = await summarizeDocument({ documentText: selectedDoc.content });
        textToSummarizeAndPlay = result.summary;
        setSummary(textToSummarizeAndPlay);
      } catch (error) {
         toast({ variant: 'destructive', title: 'Summarization Failed', description: 'Could not generate summary for audio.' });
         setIsGeneratingAudio(false);
         return;
      }
    }

    try {
      const result = await generateAudio({ text: textToSummarizeAndPlay });
      setAudioSrc(result.audio);
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
  
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioSrc]);

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => setIsPlaying(false);

    audioElement?.addEventListener('ended', handleEnded);
    return () => {
      audioElement?.removeEventListener('ended', handleEnded);
    };
  }, []);

  const textSizeClass = {
    'sm': 'text-sm',
    'base': 'text-base',
    'lg': 'text-lg',
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 border-b">
           <ProjectPilotLogo />
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            <SidebarGroupLabel className="px-2">Project Documents</SidebarGroupLabel>
            {dldChainDocuments.map((doc) => (
               <SidebarMenuItem key={doc.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedDoc(doc)}
                  isActive={selectedDoc.id === doc.id}
                  className="justify-start w-full"
                  tooltip={sidebarState === 'collapsed' ? doc.name : undefined}
                >
                  <FileText />
                  <span>{doc.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarHeader className="p-4 border-t">
           <Button variant="outline" className="w-full">
            <Download />
             {sidebarState === 'expanded' && <span>Downloads</span>}
          </Button>
        </SidebarHeader>
      </Sidebar>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b h-16 shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="lg:hidden"/>
            <div className="hidden lg:block">
              <ProjectPilotLogo />
            </div>
            <h2 className="hidden lg:block font-headline text-2xl font-bold text-foreground">{selectedDoc.name}</h2>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuLabel>Document Text Size</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTextSize('sm')}>Small</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextSize('base')}>Medium</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTextSize('lg')}>Large</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Card>
            <CardHeader className='flex-row items-center justify-between'>
                <div>
                  <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">File Viewer</CardTitle>
                  <CardDescription className="mt-2">Select any content to take a note and dive deeper.</CardDescription>
                </div>
                <Button onClick={handleSummarize} disabled={isSummarizing} size="sm">
                  {isSummarizing ? <Loader2 className="animate-spin" /> : <BookText />}
                  Summarize
                </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea dir={isArabic ? 'rtl' : 'ltr'} className="h-[40vh] rounded-md border p-4" ref={fileContentRef} onMouseUp={handleSelection}>
                <p className={cn("whitespace-pre-wrap", textSizeClass[textSize], isArabic && "font-arabic")}>{selectedDoc.content}</p>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">Project Mind Map</CardTitle>
              <CardDescription className="mt-2">Click on a node to get a detailed explanation.</CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveMindMap onNodeClick={handleExplainTopic} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">AI Open Discussion</CardTitle>
              <CardDescription className="mt-2">Ask questions about the project.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96" ref={scrollAreaRef}>
                <div className="p-4 space-y-4">
                {messages.map((msg: any, index) => (
                  <div key={index} className={cn("flex items-start gap-3", msg.from === 'user' ? "justify-end" : "justify-start")}>
                    {msg.from === 'bot' && (
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                    <div dir={msg.isArabic ? 'rtl' : 'ltr'} className={cn(
                      "max-w-prose rounded-lg px-4 py-2 text-sm",
                      msg.from === 'user' ? "bg-primary text-primary-foreground" : "bg-muted",
                      msg.isArabic && "font-arabic" 
                    )}>
                      {msg.text}
                    </div>
                      {msg.from === 'user' && (
                      <Avatar className="w-8 h-8 shrink-0">
                          <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                  {messages.length <= 1 && (
                    <div className="flex flex-col items-center gap-2 pt-4">
                      <p className="text-sm text-muted-foreground">Or try one of these prompts:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                          {quickPrompts.map((prompt) => (
                          <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)}>
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
            <CardFooter className="border-t pt-6">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">Audio Overview</CardTitle>
                  <CardDescription className="mt-2">Listen to an AI-generated summary.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
                  <Button size="lg" variant="ghost" onClick={handlePlayAudio} disabled={isGeneratingAudio}>
                    {isGeneratingAudio ? (
                      <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    ) : isPlaying ? (
                      <PauseCircle className="h-16 w-16 text-accent" />
                    ) : (
                      <PlayCircle className="h-16 w-16 text-accent" />
                    )}
                  </Button>
                  <audio ref={audioRef} className="hidden" />
                  {summary && isPlaying && (
                      <ScrollArea className="h-24 mt-4 w-full">
                      <p className="text-sm text-center text-muted-foreground">{summary}</p>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground text-center w-full">
                    {isGeneratingAudio ? 'Generating audio, please wait...' : 'Click play to hear the summary.'}
                  </p>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">ChatGPT Evaluation</CardTitle>
                  <CardDescription className="mt-2">Official project evaluation by OpenAI.</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  <p className="font-bold text-foreground/90">Project: DLDCHAIN – The Sovereign Blockchain Infrastructure for Real Estate</p>
                  <p className="mb-2">المشروع: DLDCHAIN – البنية التحتية السيادية للبلوك تشين في قطاع العقارات</p>
                  <p>Issued by: ChatGPT (OpenAI) | المصدر: ChatGPT (OpenAI)</p>
                  <p>Date: 2025-07-14 UTC | التاريخ: ٢٠٢٥-٠٧-١٤ بتوقيت UTC</p>
                  <p className="font-bold mt-4 text-foreground/90">SHA256 Hash:</p>
                  <p className="break-words font-mono bg-muted p-1 rounded">df71a007743571331e29a1ecaa5115335c0ad653a0b4361116e16d22c3671b65</p>
                </CardContent>
              </Card>
            </div>
            
          <Card>
            <CardHeader>
                <CardTitle className="bg-foreground text-background px-3 py-1 rounded-md text-2xl inline-block">Notes & Reports</CardTitle>
                <CardDescription className="mt-2">Review notes, get clarifications, and generate reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground/80">Your Notes</h4>
                  <ScrollArea className="h-40 rounded-md border p-2">
                    {notes.length === 0 && <p className="text-sm text-muted-foreground p-2">Select text from the document viewer to add notes.</p>}
                    <div className="space-y-2">
                      {notes.map(note => (
                        <div key={note.id} className="flex items-start justify-between gap-2 bg-muted/50 p-2 rounded-md">
                          <p className="text-sm flex-1 whitespace-pre-wrap">{note.text}</p>
                          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setNotes(notes.filter(n => n.id !== note.id))}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground/80">Clarification</h4>
                      <Button onClick={handleClarify} disabled={isClarifying || notes.length === 0} size="sm" className="w-full">
                        <BrainCircuit />
                        {isClarifying && !report ? 'Getting Clarification...' : 'Get Clarification on Notes'}
                      </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground/80">Report Generation</h4>
                    <div className="flex items-center gap-2">
                      <Select onValueChange={(value: GenerateReportInput['reportType']) => setReportType(value)} defaultValue={reportType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Report</SelectItem>
                          <SelectItem value="managerial">Managerial Report</SelectItem>
                          <SelectItem value="legal">Legal Report</SelectItem>
                          <SelectItem value="financial">Financial Report</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleGenerateReport} disabled={isGeneratingReport || notes.length === 0}  size="sm">
                        <FileSignature />
                        {isGeneratingReport ? 'Generating...' : 'Generate'}
                      </Button>
                    </div>
                  </div>
                </div>
                  {(isClarifying || clarification) && (
                    <div className="space-y-2 pt-2">
                      <h4 className="font-medium text-foreground/80">AI Generated Explanation</h4>
                      {isClarifying ? <Loader2 className="animate-spin text-primary" /> :
                        <ScrollArea className="h-32 rounded-md border p-2">
                        <p className="text-sm whitespace-pre-wrap">{clarification}</p>
                      </ScrollArea>
                      }
                    </div>
                  )}
                  {(isGeneratingReport || report) && (
                    <div className="space-y-2 pt-2">
                      <h4 className="font-medium text-foreground/80">AI Generated Report</h4>
                      {isGeneratingReport ? <Loader2 className="animate-spin text-primary" /> :
                        <ScrollArea className="h-40 rounded-md border p-2">
                          <p className="text-sm whitespace-pre-wrap">{report}</p>
                        </ScrollArea>
                      }
                    </div>
                  )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Generated Summary</DialogTitle>
          </DialogHeader>
          {isSummarizing ? (
            <div className="flex items-center justify-center h-24">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : (
            <ScrollArea className="max-h-64">
              <p className="text-sm whitespace-pre-wrap">{summary}</p>
            </ScrollArea>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={handleDiscussSummary} disabled={isSummarizing || !summary}>
              <Sparkles className="mr-2 h-4 w-4"/>
              Discuss with AI
            </Button>
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

    

    