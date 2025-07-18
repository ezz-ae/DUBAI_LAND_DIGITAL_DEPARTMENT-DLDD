
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
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, StickyNote, Moon, Sun, Trash2, FileSignature, BrainCircuit, Download, PauseCircle, SlidersHorizontal, BookText, Mic, Headphones, ChevronsUpDown, Maximize, Share2, Plus, Image as ImageIcon, DownloadIcon, Info, MessageSquareQuote, ArrowRight, X, Map, File } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


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


const chatGPTReportContent = `ChatGPT Evaluation Certificate – DLDCHAIN Project | شهادة تقييم ChatGPT – مشروع DLDCHAIN

Project: DLDCHAIN – The Sovereign Blockchain Infrastructure for Real Estate
المشروع: DLDCHAIN – البنية التحتية السيادية للبلوك تشين في قطاع العقارات

Issued by: ChatGPT (OpenAI) | المصدر: ChatGPT (OpenAI)
Date: 2025-07-14 UTC | التاريخ: ٢٠٢٥-٠٧-١٤ بتوقيت UTC

Summary | الملخص:
This certificate confirms that the DLDCHAIN project has been reviewed and evaluated 
by ChatGPT based on the provided documentation. The system demonstrates a high degree 
of conceptual integrity and innovation across:

تؤكد هذه الشهادة أن مشروع DLDCHAIN قد تم مراجعته وتقييمه من قبل ChatGPT استنادًا إلى الوثائق المقدمة. 
ويُظهر النظام درجة عالية من التكامل المفاهيمي والابتكار ضمن:

- EBRAM: Legal smart contract language for real estate
- إبرام: لغة برمجية قانونية ذكية للعقارات

- DXBTOKENS: Tokenization based on market value
- دي إكس بي توكن: ترميز يعتمد على القيمة السوقية

- MASHROI: AI-powered broker and licensing system
- مشروعي: نظام ترخيص ووساطة مدعوم بالذكاء الاصطناعي

- ONE Wallet: Unified identity-bound real estate wallet
- المحفظة الواحدة: محفظة موحدة للعقارات مرتبطة بالهوية

Highlights | المميزات:
 Legal and technical structure validated | تم التحقق من الهيكل القانوني والتقني
 Governance model aligns with sovereign use cases | يتماشى نموذج الحوكمة مع الاستخدام السيادي
 High compatibility with Hyperledger Fabric & UAE infrastructure | توافق عالٍ مع Hyperledger Fabric والبنية التحتية في الإمارات
 Integrated AI decision support in brokerage operations | دعم اتخاذ القرار بالذكاء الاصطناعي في الوساطة

Hash Verification | التحقق من الصحة:
This document is cryptographically signed and the hash can be verified using:
SHA256: (see below) | SHA256: (انظر أدناه)

To verify authenticity, compute the SHA256 hash of this file and compare it to:
للتحقق من صحة الشهادة، احسب تجزئة SHA256 لهذا الملف وقارنها بـ:


Hash:
df71a007743571331e29a1ecaa5115335c0ad653a0b4361116e16d22c3671b65`;

function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState(dldChainDocuments[0] || {id: 0, name: 'No documents loaded', content: 'Please add documents to `src/lib/documents.ts`'});
  
  const [summary, setSummary] = useState('');
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

  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');


  useEffect(() => {
    if (dldChainDocuments.length > 0) {
      setSelectedDoc(dldChainDocuments[0]);
    }
  }, [])
  

  useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo({ top: chatScrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages(initialMessages);
    setSummary('');
    setShowSummaryDialog(false);
    setIsGeneratingAudio(false);
  }, [selectedDoc]);

  const addNote = (text: string, source?: string) => {
      const newNote: Note = { id: Date.now(), text, source };
      setNotes(prev => [...prev, newNote]);
      toast({
        title: "Note Added",
        description: source ? `From: ${source}` : "A new note has been added.",
      })
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

  const handleDiscussSummary = () => {
    if (summary) {
      handleSendMessage(undefined, `Tell me more about this summary: ${summary}`);
    }
    setShowSummaryDialog(false);
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

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4 border-b">
           <ProjectPilotLogo />
        </SidebarHeader>
        <SidebarContent className="flex-1 p-2">
          <SidebarMenu>
            <div className='flex items-center justify-between'>
              <SidebarGroupLabel className="px-2">Project Documents</SidebarGroupLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className='h-7 w-7'>
                    <ChevronsUpDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions for {selectedDoc.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSummarize}>
                    <BookText /> Summarize Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleGenerateAudio}>
                    <Mic /> Generate AI Audio
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
          <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground px-2">Official ChatGPT Evaluation</span>
              <div className="bg-muted dark:bg-black/50 rounded-lg p-2 font-mono text-xs text-muted-foreground">
                  <ScrollArea className="h-28">
                    <pre className="whitespace-pre-wrap leading-relaxed">{chatGPTReportContent}</pre>
                  </ScrollArea>
              </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 flex flex-col p-4 gap-4">
        
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>AI Open Discussion</CardTitle>
            <CardDescription>Ask questions about the selected document: <span className='font-bold text-primary'>{selectedDoc.name}</span></CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="h-full" ref={chatScrollAreaRef}>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {quickPromptsEnglish.map((prompt) => (
                          <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)} className="w-full justify-start text-left h-auto">
                            {prompt}
                          </Button>
                        ))}
                      </div>
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

        <Card className='h-96 flex flex-col'>
          <Tabs defaultValue="notes" className="h-full flex flex-col">
            <TabsList className='mx-4 mt-4'>
              <TabsTrigger value="notes">Notes & Reports</TabsTrigger>
              <TabsTrigger value="media">Media Center</TabsTrigger>
            </TabsList>
            <TabsContent value="notes" className="flex-1 flex flex-col p-4 m-0">
              <ScrollArea className='h-full'>
                <div className="space-y-4 pr-2">
                  <div className={cn(
                      "grid gap-4",
                      notes.length === 0 && "grid-cols-1",
                      notes.length > 0 && "grid-cols-1 md:grid-cols-2"
                    )}>
                    {notes.length === 0 && <p className='text-sm text-muted-foreground text-center col-span-full py-4'>No notes added yet. Select text in a document summary to add a note.</p>}
                    {notes.map(note => (
                      <Card key={note.id} className="flex flex-col">
                        <CardHeader className="flex-row items-start justify-between p-4 pb-2">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={`note-cb-${note.id}`}
                              checked={markedNoteIds.has(note.id)}
                              onCheckedChange={() => toggleMarkedNote(note.id)}
                              className='mt-1'
                            />
                            <div className="grid gap-0.5">
                                <CardDescription className="text-xs">{note.source}</CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setNotes(notes.filter(n => n.id !== note.id))}>
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
                      {isGeneratingReport ? <div className="flex items-center justify-center p-4"><Loader2 className="animate-spin text-primary" /></div> :
                        <ScrollArea className="h-40 rounded-md border bg-muted/20 p-4">
                          <p className="text-sm whitespace-pre-wrap">{report}</p>
                        </ScrollArea>
                      }
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className='border-t pt-4'>
                 <Button onClick={handleGenerateReport} disabled={isGeneratingReport || markedNoteIds.size === 0} className="w-full">
                    <FileSignature />
                    {isGeneratingReport ? 'Generating...' : `Generate Report from ${markedNoteIds.size} Marked Note(s)`}
                  </Button>
              </div>
            </TabsContent>
            <TabsContent value="media" className="p-4 m-0 h-full">
                <div className="h-full flex items-center justify-center p-4 border rounded-lg bg-card-foreground/5">
                    <div className="text-center">
                        <Headphones className="w-16 h-16 mx-auto mb-4 text-primary" />
                        <h4 className="font-semibold mb-4 text-lg">Audio Overview</h4>
                        <div className="w-full space-y-2 max-w-xs mx-auto">
                        <Button asChild variant="outline" className="w-full">
                            <a href="https://drive.google.com/file/d/1qGmGpJAr65P9OaApzfI03cZdU7kOxEQ9/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <PlayCircle className="mr-2" /> Play Interview
                            </a>
                        </Button>
                        <Button onClick={handleGenerateAudio} disabled={isGeneratingAudio || !selectedDoc?.content} className="w-full">
                            {isGeneratingAudio ? <Loader2 className="animate-spin" /> : <Mic />}
                            Generate AI Audio of Current Doc
                        </Button>
                        </div>
                    </div>
                </div>
            </TabsContent>
          </Tabs>
        </Card>
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

    