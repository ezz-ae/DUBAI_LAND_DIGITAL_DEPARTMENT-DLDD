
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Loader2, PlayCircle, Send, Share2, Sparkles, Bot, User, StickyNote, Moon, Sun, Trash2, FileSignature, BrainCircuit, Download, PauseCircle } from 'lucide-react';
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
  { from: 'bot', text: 'Hello! How can I help you with the DLDCHAIN Protocol?' },
];

type Note = {
  id: number;
  text: string;
};

function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState(dldChainDocuments[0]);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
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

  const isArabic = selectedDoc.id === 1;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    handleSummarize();
    setMessages(initialMessages);
    // Stop audio and reset state when doc changes
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAnswering) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    const userMessage = input;
    setInput('');
    setIsAnswering(true);

    try {
      const result = await askQuestion({ question: userMessage, context: selectedDoc.content });
      const botAnswer = result.answer;
      // Simple language detection for RTL
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

    if (!summary || isGeneratingAudio) return;

    setIsGeneratingAudio(true);
    try {
      const result = await generateAudio({ text: summary });
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

      <SidebarInset className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b h-16">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="lg:hidden"/>
            <div className="hidden lg:block">
              <ProjectPilotLogo />
            </div>
            <h2 className="hidden lg:block font-headline text-2xl font-bold">{selectedDoc.name}</h2>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="outline">
              <Share2 />
              Share
            </Button>
            <Avatar>
              <AvatarImage data-ai-hint="male portrait" src="https://placehold.co/40x40" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6 items-start">
            <div className="xl:col-span-2 flex flex-col gap-6">
               <Card>
                <CardHeader>
                  <CardTitle>File Viewer</CardTitle>
                  <CardDescription>Select text to add it to your notes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea dir={isArabic ? 'rtl' : 'ltr'} className={cn("h-96 rounded-md border p-4", isArabic && "font-arabic")} ref={fileContentRef} onMouseUp={handleSelection}>
                    <p className="whitespace-pre-wrap text-sm">{selectedDoc.content}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Audio Overview</CardTitle>
                    <CardDescription>Listen to the AI-generated summary.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-center p-6">
                    <Button size="lg" variant="ghost" onClick={handlePlayAudio} disabled={isGeneratingAudio || isSummarizing || !summary}>
                      {isGeneratingAudio ? (
                        <Loader2 className="h-16 w-16 animate-spin text-primary" />
                      ) : isPlaying ? (
                        <PauseCircle className="h-16 w-16 text-primary" />
                      ) : (
                        <PlayCircle className="h-16 w-16 text-primary" />
                      )}
                    </Button>
                    <audio ref={audioRef} className="hidden" />
                    {summary && isPlaying && (
                       <ScrollArea className="h-24 mt-4 w-full">
                        <p className="text-sm text-center">{summary}</p>
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
                    <CardTitle>AI Summarization</CardTitle>
                    <CardDescription>Get key points instantly.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-24">
                    {isSummarizing ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="animate-spin text-primary" />
                      </div>
                    ) : (
                      <ScrollArea className="h-full">
                        <p className="text-sm">{summary || 'Summary will appear here.'}</p>
                      </ScrollArea>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSummarize} disabled={isSummarizing} className="w-full">
                      <Sparkles />
                      {isSummarizing ? 'Summarizing...' : 'Regenerate Summary'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
               <Card>
                <CardHeader>
                    <CardTitle>Notes & Reports</CardTitle>
                    <CardDescription>Review notes, get clarifications, and generate reports.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Your Notes</h4>
                      <ScrollArea className="h-40 rounded-md border p-2">
                        {notes.length === 0 && <p className="text-sm text-muted-foreground p-2">Select text from the document viewer to add notes.</p>}
                        <div className="space-y-2">
                          {notes.map(note => (
                            <div key={note.id} className="flex items-start justify-between gap-2 bg-muted/50 p-2 rounded-md">
                              <p className="text-sm flex-1">{note.text}</p>
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
                        <h4 className="font-medium">Clarification</h4>
                         <Button onClick={handleClarify} disabled={isClarifying || notes.length === 0} size="sm" className="w-full">
                            <BrainCircuit />
                            {isClarifying && !report ? 'Getting Clarification...' : 'Get Clarification on Notes'}
                          </Button>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Report Generation</h4>
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
                          <h4 className="font-medium">AI Generated Explanation</h4>
                          {isClarifying ? <Loader2 className="animate-spin text-primary" /> :
                           <ScrollArea className="h-32 rounded-md border p-2">
                            <p className="text-sm whitespace-pre-wrap">{clarification}</p>
                          </ScrollArea>
                          }
                        </div>
                      )}
                      {(isGeneratingReport || report) && (
                        <div className="space-y-2 pt-2">
                         <h4 className="font-medium">AI Generated Report</h4>
                          {isGeneratingReport ? <Loader2 className="animate-spin text-primary" /> :
                            <ScrollArea className="h-40 rounded-md border p-2">
                              <p className="text-sm whitespace-pre-wrap">{report}</p>
                            </ScrollArea>
                          }
                        </div>
                      )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Mind Map</CardTitle>
                  <CardDescription>Click on a node to get a detailed explanation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InteractiveMindMap onNodeClick={handleExplainTopic} />
                </CardContent>
              </Card>
            </div>

            <Card className="xl:col-span-1 h-full flex flex-col sticky top-6">
              <CardHeader className="border-b">
                <CardTitle>Interactive Q&A</CardTitle>
                <CardDescription>Ask questions about the project.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-20rem)]" ref={scrollAreaRef}>
                  <div className="p-4 space-y-4">
                  {messages.map((msg: any, index) => (
                    <div key={index} className={cn("flex items-start gap-3", msg.from === 'user' ? "justify-end" : "justify-start")}>
                      {msg.from === 'bot' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                      )}
                      <div dir={msg.isArabic ? 'rtl' : 'ltr'} className={cn(
                        "max-w-xs rounded-lg px-4 py-2 text-sm",
                        msg.from === 'user' ? "bg-primary text-primary-foreground" : "bg-muted",
                        msg.isArabic && "font-arabic" 
                      )}>
                        {msg.text}
                      </div>
                       {msg.from === 'user' && (
                        <Avatar className="w-8 h-8">
                           <AvatarFallback><User className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
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
          </div>
        </main>
      </SidebarInset>
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
