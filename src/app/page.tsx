
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
  DialogTrigger,
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
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, StickyNote, Moon, Sun, Trash2, FileSignature, BrainCircuit, Download, PauseCircle, SlidersHorizontal, BookText, Mic, Headphones, ChevronsUpDown, Maximize, Share2, Plus, Image as ImageIcon, DownloadIcon, Info, MessageSquareQuote, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { ProjectPilotLogo } from '@/components/logo';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { askQuestion } from '@/ai/flows/ask-question';
import { generateReport } from '@/ai/flows/notes';
import type { GenerateReportInput } from '@/ai/schemas/notes';
import { generateAudio } from '@/ai/flows/audio-overview';
import { explainTopic } from '@/ai/flows/explain-topic';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from "next-themes"
import { dldChainDocuments } from '@/lib/documents';
import { InteractiveMindMap } from '@/components/interactive-mind-map';
import { CardTitleWithBackground } from '@/components/card-title-with-background';
import { SourceGuide } from '@/components/source-guide';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  isDefault?: boolean;
};

type TextSize = "sm" | "base" | "lg";

const defaultNote: Note = {
  id: 'default-liquidity-map',
  text: `Liquidity Map`,
  source: 'DLDCHAIN Core Concept',
  isDefault: true,
};

const liquidityMapSteps = [
    { title: "EBRAMINT", description: "Legal review" },
    { title: "MAKE Request", description: "Pool Signed" },
    { title: "MAKE-IN", description: "Token = Escrow" },
    { title: "DXBTOKEN Trading", description: "Layered Orders" },
    { title: "MAKE-OUT", description: "Ownership Claim" },
    { title: "MAKE-DISMISS", description: "Finalize" }
];


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
  const fileContentRef = useRef<HTMLDivElement>(null);
  const discussionCardRef = useRef<HTMLDivElement>(null);

  const [notes, setNotes] = useState<Note[]>([defaultNote]);
  const [markedNoteIds, setMarkedNoteIds] = useState<Set<number | string>>(new Set());
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [report, setReport] = useState('');
  const [textSize, setTextSize] = useState<TextSize>('sm');
  const [activeNoteDialog, setActiveNoteDialog] = useState<Note | null>(null);

  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');

  const sourceGuideSummary = `This extensive conversation details the conceptualization and architectural design of DLDCHAIN, a proposed sovereign digital real estate platform for Dubai. The core purpose is to transform property ownership, transactions, and governance by assigning a digital identity to every square foot of land and property in the city, beyond just tokenization. Key components include EBRAM, the smart contract engine functioning as a legal-transactional language for real estate rules; Mashroi, an AI-driven system for professionalizing the real estate workforce by rewarding contributions and ensuring fairness; DXBTOKENS, representing native, verifiable shares of DLD-registered properties for unprecedented liquidity; and MAKE, a private financial layer handling liquidity pools and cash flow. The entire system is envisioned as a "constitutional upgrade" to Dubai's real estate, aiming for global leadership in digital land governance and setting a new standard for transparency, efficiency, and automated trust.`;
  const sourceGuideTopics = ["DLDCHAIN Ecosystem", "Real Estate Tokenization", "AI-Driven Governance", "Digital Identity", "Financial Liquidity"];

  const mockupImages = [
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 1", hint: "futuristic city" },
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 2", hint: "blockchain interface" },
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 3", hint: "digital wallet" },
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 4", hint: "data visualization" },
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 5", hint: "real estate" },
    { src: "https://placehold.co/1200x800.png", alt: "Project mockup 6", hint: "smart contract" },
  ];

  useEffect(() => {
    if (dldChainDocuments.length > 0) {
      setSelectedDoc(dldChainDocuments[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  const handleDiscussNote = (note: Note) => {
    if (note.isDefault) {
      handleSendMessage(undefined, `Tell me more about the: ${note.text}`);
    } else {
      handleSendMessage(undefined, `Let's discuss this note: "${note.text}"`);
    }
    setActiveNoteDialog(null);
    discussionCardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };


  const handleSelection = () => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      addNote(selection, `Selection from ${selectedDoc.name}`);
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleExplainTopic = async (topic: string) => {
    discussionCardRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAnswering(true);
    
    const newMessages = [...messages, { from: 'user', text: `Please explain: "${topic}"` }];
    setMessages(newMessages);

    toast({ title: "Generating Explanation", description: `Getting details for: ${topic}` });
    try {
      const result = await explainTopic({ topic: topic, context: selectedDoc.content });
      const botAnswer = result.explanation;
       const isBotAnswerArabic = /[\u0600-\u06FF]/.test(botAnswer);
      setMessages([...newMessages, { 
        from: 'bot', 
        text: botAnswer, 
        isArabic: isBotAnswerArabic,
        topic: topic
      }]);
    } catch (error) {
       console.error('Error explaining topic:', error);
      toast({
        variant: "destructive",
        title: "Explanation Failed",
        description: "Could not get explanation. Please try again.",
      });
      setMessages([...newMessages, { from: 'bot', text: 'Sorry, I encountered an error explaining that topic.', isArabic: false }]);
    } finally {
      setIsAnswering(false);
    }
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
      // Using 'technical' as a default since UI for selection is removed.
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
    discussionCardRef.current?.scrollIntoView({ behavior: 'smooth' });
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

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b h-16 shrink-0">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="lg:hidden"/>
            <div className="hidden lg:block">
              <ProjectPilotLogo />
            </div>
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
            <CardHeader className='flex-row items-center justify-between bg-card-foreground/5 dark:bg-card-foreground/10 p-4'>
                <div>
                  <CardTitle className="text-2xl">{selectedDoc?.name || 'Document Viewer'}</CardTitle>
                  <CardDescription className="mt-1">Select any content to take a note and dive deeper.</CardDescription>
                </div>
                <Button onClick={handleSummarize} disabled={isSummarizing || !selectedDoc?.content} size="sm">
                  {isSummarizing ? <Loader2 className="animate-spin" /> : <BookText />}
                  Summarize
                </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea dir={isArabic ? 'rtl' : 'ltr'} className="h-[60vh] p-4" ref={fileContentRef} onMouseUp={handleSelection}>
                <SourceGuide summary={sourceGuideSummary} topics={sourceGuideTopics} isArabic={isArabic} />
                <p className={cn("whitespace-pre-wrap", textSizeClass[textSize], isArabic && "font-arabic")}>{selectedDoc?.content || "No document selected or content is empty."}</p>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Collapsible>
            <Card>
              <CollapsibleTrigger asChild>
                  <CardTitleWithBackground
                    title="DLDCHAIN STRUCTURE MINDMAP"
                    subtitle="An interactive overview of the project's architecture."
                  >
                    <div className="flex items-center justify-between w-full cursor-pointer">
                      <div>
                        <h3 className="text-2xl font-headline font-semibold leading-none tracking-tight">DLDCHAIN STRUCTURE MINDMAP</h3>
                        <p className="text-sm text-muted-foreground mt-1">An interactive overview of the project&apos;s architecture. Click to expand.</p>
                      </div>
                       <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                              <Maximize className="mr-2" />
                              Explore Map
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
                              <DialogHeader>
                                <DialogTitle>Interactive Project Mind Map</DialogTitle>
                              </DialogHeader>
                              <div className="flex-1 overflow-hidden border rounded-lg bg-background">
                                <InteractiveMindMap onNodeDoubleClick={handleExplainTopic} />
                              </div>
                          </DialogContent>
                        </Dialog>
                    </div>
                  </CardTitleWithBackground>
              </CollapsibleTrigger>
              <CollapsibleContent>
                  <div className="h-96 w-full border-t">
                    <InteractiveMindMap onNodeDoubleClick={handleExplainTopic} />
                  </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>


          <Card ref={discussionCardRef}>
            <CardTitleWithBackground title="AI Open Discussion" subtitle="Ask questions about the project." />
            <CardContent className="p-0">
              <ScrollArea className="h-96" ref={chatScrollAreaRef}>
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
                       {msg.from === 'bot' && msg.topic && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addNote(msg.text, `Explanation for: ${msg.topic}`)}
                        >
                          <Plus className="mr-2" /> Add Explanation to Notes
                        </Button>
                      )}
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
          
          <Card>
            <CardTitleWithBackground title="Media Center" subtitle="Explore project audio, visuals, and downloadable assets." />
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Audio Section */}
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card-foreground/5">
                <Headphones className="w-10 h-10 mb-2 text-primary" />
                <h4 className="font-semibold mb-2">Audio</h4>
                <div className="w-full space-y-2">
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://drive.google.com/file/d/1qGmGpJAr65P9OaApzfI03cZdU7kOxEQ9/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                      <PlayCircle className="mr-2" /> Play Interview
                    </a>
                  </Button>
                  <Button onClick={handleGenerateAudio} disabled={isGeneratingAudio || !selectedDoc?.content} className="w-full">
                    {isGeneratingAudio ? <Loader2 className="animate-spin" /> : <Mic />}
                    Generate AI Audio
                  </Button>
                </div>
              </div>

              {/* Mockups Section */}
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card-foreground/5">
                <ImageIcon className="w-10 h-10 mb-2 text-primary" />
                <h4 className="font-semibold mb-2">Mockups & Concepts</h4>
                 <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Maximize className="mr-2" /> View Project Mockups
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl h-[80vh] flex flex-col">
                      <DialogHeader>
                        <DialogTitle>Project Mockups</DialogTitle>
                      </DialogHeader>
                      <div className="flex-1 relative">
                        <Carousel className="w-full h-full">
                          <CarouselContent className="h-full">
                            {mockupImages.map((img, index) => (
                              <CarouselItem key={index} className="flex items-center justify-center p-4">
                                <Image 
                                  src={img.src} 
                                  alt={img.alt} 
                                  width={1200}
                                  height={800}
                                  className="object-contain max-h-full max-w-full rounded-lg"
                                  data-ai-hint={img.hint}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
                          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
                        </Carousel>
                      </div>
                    </DialogContent>
                  </Dialog>
              </div>

              {/* Downloads Section */}
              <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card-foreground/5">
                <DownloadIcon className="w-10 h-10 mb-2 text-primary" />
                <h4 className="font-semibold mb-2">Downloads</h4>
                <div className="w-full space-y-2">
                   <Button variant="outline" className="w-full" disabled>
                      <Download className="mr-2" /> Download Full Project Study
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleGenerateReport()}>
                    <FileSignature className="mr-2" /> Download Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
            
          <Card>
            <CardTitleWithBackground title="Notes & Reports" subtitle="Review notes, mark them for reporting, and generate insights." />
            <CardContent className="p-6">
                <div className={cn(
                    "grid gap-4",
                    notes.length === 1 && "grid-cols-1",
                    notes.length === 2 && "grid-cols-1 md:grid-cols-2",
                    notes.length >= 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  )}>
                  {notes.map(note => (
                    <Card key={note.id} className="flex flex-col">
                      <CardHeader className="flex-row items-start justify-between p-4">
                        <div className="flex items-start gap-3">
                           {!note.isDefault && (
                             <Checkbox
                                id={`note-${note.id}`}
                                checked={markedNoteIds.has(note.id)}
                                onCheckedChange={() => toggleMarkedNote(note.id)}
                                className='mt-1'
                              />
                           )}
                           <div className="grid gap-0.5">
                              <CardTitle className="text-base">{note.text}</CardTitle>
                              {note.source && <CardDescription className="text-xs">{note.source}</CardDescription>}
                           </div>
                        </div>
                          {!note.isDefault && (
                             <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setNotes(notes.filter(n => n.id !== note.id))}>
                               <X className="h-4 w-4" />
                             </Button>
                          )}
                      </CardHeader>
                        {note.isDefault && (
                            <CardContent className="px-4 pb-4 pt-0">
                                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                                {liquidityMapSteps.map((step, index) => (
                                    <React.Fragment key={step.title}>
                                    <div className="flex flex-col items-center text-center">
                                        <div className="bg-primary/20 text-primary-foreground font-bold rounded-md px-3 py-1 text-xs">
                                        {step.title}
                                        </div>
                                        <div className="text-muted-foreground text-xs mt-1 w-20">
                                        {step.description}
                                        </div>
                                    </div>
                                    {index < liquidityMapSteps.length - 1 && (
                                        <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
                                    )}
                                    </React.Fragment>
                                ))}
                                </div>
                            </CardContent>
                        )}
                        <CardFooter className="p-4 pt-0 mt-auto">
                           <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveNoteDialog(note)}>
                              <MessageSquareQuote className="mr-2 h-4 w-4" />
                              Discuss with AI
                           </Button>
                        </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                   <div className="flex flex-col sm:flex-row gap-4 items-center">
                       <h4 className="font-medium text-foreground/80 flex items-center gap-2 shrink-0">
                          Report Generation
                       </h4>
                       <div className="flex w-full items-center gap-2">
                         <Button onClick={() => handleGenerateReport()} disabled={isGeneratingReport || markedNoteIds.size === 0}>
                           <FileSignature />
                           {isGeneratingReport ? 'Generating...' : `Generate Report (${markedNoteIds.size} marked)`}
                         </Button>
                         <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Mark notes using the checkboxes, then generate a report.</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                       </div>
                   </div>
                  {(isGeneratingReport || report) && (
                    <div className="space-y-2 pt-4 mt-4 border-t">
                      <h4 className="font-medium text-foreground/80">AI Generated Report</h4>
                      {isGeneratingReport ? <div className="flex items-center justify-center p-4"><Loader2 className="animate-spin text-primary" /></div> :
                        <ScrollArea className="h-40 rounded-md border bg-muted/20 p-4">
                          <p className="text-sm whitespace-pre-wrap">{report}</p>
                        </ScrollArea>
                      }
                    </div>
                  )}
                </div>
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
      <Dialog open={!!activeNoteDialog} onOpenChange={(isOpen) => !isOpen && setActiveNoteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note Details</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-64">
            <p className="text-sm whitespace-pre-wrap">{activeNoteDialog?.text}</p>
            {activeNoteDialog?.source && <p className="text-xs text-muted-foreground mt-2">Source: {activeNoteDialog.source}</p>}
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
             {activeNoteDialog && (
              <Button onClick={() => handleDiscussNote(activeNoteDialog)}>
                <MessageSquareQuote className="mr-2 h-4 w-4"/>
                Discuss with AI
              </Button>
            )}
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

    
