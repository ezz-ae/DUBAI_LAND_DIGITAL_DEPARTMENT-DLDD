
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
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, StickyNote, Moon, Sun, Trash2, FileSignature, BrainCircuit, Download, PauseCircle, SlidersHorizontal, BookText, Mic, Headphones, ChevronsUpDown, Maximize, Share2, Plus, Image as ImageIcon, DownloadIcon, Info, MessageSquareQuote, ArrowRight, X, Map, File, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { ProjectPilotLogo } from '@/components/logo';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { askQuestion } from '@/ai/flows/ask-question';
import { generateReport } from '@/ai/flows/notes';
import type { GenerateReportInput } from '@/ai/schemas/notes';
import { generateAudio } from '@/ai/flows/audio-overview';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from "next-themes"
import { dldChainDocuments } from '@/lib/documents';
import { CardTitleWithBackground } from '@/components/card-title-with-background';
import { Checkbox } from '@/components/ui/checkbox';
import { SourceGuide } from '@/components/source-guide';
import { InteractiveMindMap } from '@/components/interactive-mind-map';
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


type Note = {
  id: number | string;
  text: string;
  source?: string;
};

type TextSize = "sm" | "base" | "lg";


function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState(dldChainDocuments[0] || {id: 0, name: 'No documents loaded', content: 'Please add documents to `src/lib/documents.ts`'});
  
  const [summary, setSummary] = useState(selectedDoc?.summary || '');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);

  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Note[]>([]);
  const [markedNoteIds, setMarkedNoteIds] = useState<Set<number | string>>(new Set());
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('sm');
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);


  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');


  useEffect(() => {
    if (dldChainDocuments.length > 0) {
      const doc = dldChainDocuments[0]
      setSelectedDoc(doc);
      setSummary(doc.summary);
    }
  }, [])
  

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo({ top: chatScrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages(initialMessages);
    setSummary(selectedDoc.summary);
    setShowSummaryDialog(false);
    setIsGeneratingAudio(false);
  }, [selectedDoc]);

  const addNote = (text: string, source?: string) => {
      const newNote: Note = { id: Date.now(), text, source };
      setNotes(prev => [...prev, newNote]);
  };
  
  const toggleMarkedNote = (noteId: number | string) => {
    setMarkedNoteIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(noteId)) {
            newSet.delete(noteId);
        } else {
            newSet.add(noteId);
        }
        return newSet;
    });
  };
  
  const handleGenerateReport = async () => {
    const markedNotes = notes.filter(note => markedNoteIds.has(note.id));
    
    if (markedNotes.length === 0) {
      toast({ variant: 'destructive', title: "No notes marked for report", description: "Please mark one or more notes to include in the report." });
      return;
    }
    
    toast({ title: `Generating report...`, description: "Please wait a moment." });
    setIsGeneratingReport(true);
    setReport('');
    try {
      const result = await generateReport({ notes: markedNotes.map(n => n.text), reportType: 'technical' });
      setReport(result.report);
      toast({ title: "Report Generated Successfully", description: "Your report is now available below." });
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
    if (!selectedDoc || !selectedDoc.content) return;
    setIsSummarizing(true);
    setShowSummaryDialog(true);
    setSummary('');
    try {
      const result = await summarizeDocument({ documentText: selectedDoc.content });
      setSummary(result.summary);
      addNote(result.summary, `Summary of ${selectedDoc.name}`);
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

  const handleDiscussNote = () => {
    if (selectedNote) {
      handleSendMessage(undefined, `Tell me more about this note: ${selectedNote.text}`);
    }
    setIsNoteDialogOpen(false);
    setSelectedNote(null);
  };
  
  const handleGenerateAudio = async () => {
    if (!selectedDoc?.content || isGeneratingAudio) return;

    toast({ title: 'Generating Audio...', description: 'Please wait while we generate the audio overview.' });
    setIsGeneratingAudio(true);

    try {
      const result = await generateAudio({ text: selectedDoc.content.substring(0, 4000) });
      const audioSrc = result.audio;
      const audioElement = new Audio(audioSrc);
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

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setIsNoteDialogOpen(true);
  };


  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar>
        <SidebarHeader className="p-4 border-b">
           <ProjectPilotLogo />
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            <div className='flex items-center justify-between'>
              <SidebarGroupLabel className="px-2">Project Documents</SidebarGroupLabel>
            </div>
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
        <SidebarFooter className="p-2 border-t">
          <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
            <h1 className="text-xl font-headline font-semibold">Project Pilot</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSummarize} variant="outline" size="sm">
              <Sparkles /> Summarize Document
            </Button>
            <Button onClick={handleGenerateAudio} variant="outline" size="sm" disabled={isGeneratingAudio}>
                {isGeneratingAudio ? <Loader2 className="animate-spin" /> : <Mic />}
                <span>Generate AI Audio</span>
            </Button>
          </div>
        </header>
        
        <div className="flex-1 grid md:grid-cols-3 overflow-hidden gap-4 p-4">
          <div className="md:col-span-1 flex flex-col gap-4">
              <Card className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle>AI Open Discussion</CardTitle>
                  <CardDescription>Ask questions about <span className='font-bold text-primary'>{selectedDoc.name}</span></CardDescription>
                </CardHeader>
                <CardContent className="flex-1 p-0 flex flex-col">
                  <ScrollArea className="flex-1 h-96" ref={chatScrollAreaRef}>
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
                            msg.from === 'bot' && index === 0 && 'w-full md:w-10/12',
                            msg.from === 'bot' && index > 0 && 'w-full',
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
                              {quickPromptsEnglish.map((prompt) => (
                                <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)} className="w-full justify-start text-left h-auto">
                                  {prompt}
                                </Button>
                              ))}
                              <div className="space-y-2" dir="rtl">
                              {quickPromptsArabic.map((prompt) => (
                                <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)} className="w-full justify-start text-right font-arabic h-auto">
                                  {prompt}
                                </Button>
                              ))}
                              </div>
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

              <Card className="flex flex-col">
                  <CardHeader>
                      <CardTitle>Notes & Reports</CardTitle>
                      <CardDescription>
                          {markedNoteIds.size > 0
                              ? `${markedNoteIds.size} note(s) marked for report`
                              : 'Select text in a summary to create a note.'}
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-4 h-96">
                      <ScrollArea className="flex-1 -mx-4 h-full">
                          <div className="px-4 space-y-4">
                              <div className="grid gap-4 grid-cols-1">
                                  {notes.length === 0 && (
                                      <p className="text-sm text-muted-foreground text-center py-4">
                                          No notes added yet.
                                      </p>
                                  )}
                                  {notes.map((note) => (
                                      <Card
                                          key={note.id}
                                          onClick={() => handleNoteClick(note)}
                                          className="cursor-pointer hover:bg-muted/50 transition-colors"
                                      >
                                          <CardHeader className="flex-row items-start justify-between p-4 pb-2">
                                              <div className="flex items-start gap-3">
                                                  <Checkbox
                                                      id={`note-cb-${note.id}`}
                                                      checked={markedNoteIds.has(note.id)}
                                                      onCheckedChange={(e) => {
                                                          e.stopPropagation();
                                                          toggleMarkedNote(note.id);
                                                      }}
                                                      className='mt-1'
                                                  />
                                                  <div className="grid gap-0.5">
                                                      <CardDescription className="text-xs">{note.source}</CardDescription>
                                                  </div>
                                              </div>
                                              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={(e) => { e.stopPropagation(); setNotes(notes.filter(n => n.id !== note.id))}}>
                                                  <X className="h-4 w-4" />
                                              </Button>
                                          </CardHeader>
                                          <CardContent className='px-4 pb-4 pt-0 text-sm text-muted-foreground truncate'>{note.text}</CardContent>
                                      </Card>
                                  ))}
                              </div>
                              {(isGeneratingReport || report) && (
                                  <div className="space-y-2 pt-6 mt-6 border-t">
                                      <h4 className="font-medium text-foreground/80">AI Generated Report</h4>
                                      {isGeneratingReport ? (
                                          <div className="flex items-center justify-center p-4">
                                              <Loader2 className="animate-spin text-primary" />
                                          </div>
                                      ) : (
                                          <ScrollArea className="h-40 rounded-md border bg-muted/20 p-4">
                                              <p className="text-sm whitespace-pre-wrap">{report}</p>
                                          </ScrollArea>
                                      )}
                                  </div>
                              )}
                          </div>
                      </ScrollArea>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                      <Button onClick={handleGenerateReport} disabled={isGeneratingReport || markedNoteIds.size === 0} className="w-full">
                          <FileSignature />
                          {isGeneratingReport ? 'Generating...' : `Generate Report from ${markedNoteIds.size} Marked Note(s)`}
                      </Button>
                  </CardFooter>
              </Card>

          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
              <SourceGuide 
                summary={summary} 
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
                      onMouseUp={(e) => {
                          const selection = window.getSelection()?.toString().trim();
                          if (selection) {
                            addNote(selection, `Selection from ${selectedDoc.name}`);
                            window.getSelection()?.removeAllRanges();
                            toast({
                              title: "Note Added",
                              description: "Your selected text has been saved as a note.",
                            })
                          }
                      }}
                    >
                      {selectedDoc.content}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              <Collapsible onOpenChange={setIsMindMapOpen}>
                <div className='flex items-center justify-between p-2'>
                  <h3 className="text-xl font-headline font-semibold">DLDCHAIN STRUCTURE MINDMAP</h3>
                  <div className="flex items-center gap-2">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon">
                          <ChevronDown className={cn("h-5 w-5 transition-transform", isMindMapOpen && "rotate-180")}/>
                      </Button>
                    </CollapsibleTrigger>
                    <Button variant="ghost" size="icon" onClick={() => setIsMapDialogOpen(true)}>
                      <Maximize />
                    </Button>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="h-96 rounded-lg border bg-muted/20">
                    <InteractiveMindMap onNodeDoubleClick={handleTopicClick} />
                  </div>
                </CollapsibleContent>
              </Collapsible>
          </div>
        </div>
      </main>

      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent onMouseUp={(e) => {
            const selection = window.getSelection()?.toString().trim();
            if (selection) {
              addNote(selection, `Selection from ${selectedDoc.name} Summary`);
              window.getSelection()?.removeAllRanges();
            }
        }}>
          <DialogHeader>
            <DialogTitle>AI Generated Summary for <span className='text-primary'>{selectedDoc.name}</span></DialogTitle>
             <p className='text-sm text-muted-foreground'>You can select any text from this summary to add it to your notes.</p>
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
            <Button onClick={() => {
              if (summary) handleSendMessage(undefined, `Tell me more about this summary: ${summary}`);
              setShowSummaryDialog(false);
            }} disabled={isSummarizing || !summary}>
              <Sparkles className="mr-2 h-4 w-4"/>
              Discuss with AI
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent className="max-w-7xl h-[90vh]">
            <InteractiveMindMap onNodeDoubleClick={(topic) => {
                handleTopicClick(topic);
                setIsMapDialogOpen(false);
            }} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note Details</DialogTitle>
            <DialogDescription>{selectedNote?.source}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-64">
            <p className="text-sm whitespace-pre-wrap">{selectedNote?.text}</p>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={handleDiscussNote}>
              <Sparkles className="mr-2 h-4 w-4" />
              Discuss with AI
            </Button>
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
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

    