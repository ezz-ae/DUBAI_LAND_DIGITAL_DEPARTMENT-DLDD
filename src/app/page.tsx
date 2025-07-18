
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox";
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
import { FileText, Loader2, PlayCircle, Send, Sparkles, Bot, User, Moon, Sun, PauseCircle, MessageSquare, StickyNote, Music4, BrainCircuit } from 'lucide-react';
import { ProjectPilotLogo } from '@/components/logo';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { askQuestion } from '@/ai/flows/ask-question';
import { generateAudio } from '@/ai/flows/audio-overview';
import { generateReport } from '@/ai/flows/notes';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from "next-themes"
import { dldChainDocuments } from '@/lib/documents';
import { SourceGuide } from '@/components/source-guide';
import { explainTopic } from '@/ai/flows/explain-topic';
import { InteractiveMindMap } from '@/components/interactive-mind-map';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CardTitleWithBackground } from '@/components/card-title-with-background';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';


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

type Note = { id: number; title: string; content: string; source: string; marked: boolean };
type DLDDoc = typeof dldChainDocuments[0];

function PageContent() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme()
  const { state: sidebarState } = useSidebar();
  const [selectedDoc, setSelectedDoc] = useState<DLDDoc | null>(dldChainDocuments.find(d => d.id === 18) || dldChainDocuments[0] || null);
  const [isMindMapOpen, setIsMindMapOpen] = useState(false);
  
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioState, setAudioState] = useState<{ element: HTMLAudioElement | null; isPlaying: boolean }>({ element: null, isPlaying: false });

  const chatScrollAreaRef = useRef<HTMLDivElement>(null);
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState('');
  const [reportType, setReportType] = useState('technical');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');

  const fetchSummary = async (doc: DLDDoc) => {
    if (!doc) return;
    setIsSummarizing(true);
    setSummary('');
    try {
      const result = await summarizeDocument({ documentText: doc.content });
      setSummary(result.summary);
    } catch (error) {
      console.error('Error summarizing document:', error);
      toast({
        variant: "destructive",
        title: "Summarization Failed",
        description: "Could not generate summary for this document.",
      });
      setSummary('Failed to generate summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  useEffect(() => {
    if (selectedDoc) {
      fetchSummary(selectedDoc);
    }
  }, [selectedDoc]); 


  useEffect(() => {
    if (chatScrollAreaRef.current) {
        const lastMessage = chatScrollAreaRef.current.lastElementChild;
        if(lastMessage) {
            lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [messages]);
  
  const handleSelectDocument = (doc: DLDDoc) => {
    setSelectedDoc(doc);
  };

  const handleSendMessage = async (e?: React.FormEvent, message?: string) => {
    if(e) e.preventDefault();
    const currentMessage = message || input;
    if (!currentMessage.trim() || isAnswering ) return;
    
    const context = selectedDoc?.content || dldChainDocuments.map(d => d.content).join('\n\n');

    const newMessages = [...messages, { from: 'user', text: currentMessage }];
    setMessages(newMessages);
    setInput('');
    setIsAnswering(true);

    try {
      const result = await askQuestion({ question: currentMessage, context: context });
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

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !selectedDoc) {
      toast({ variant: 'destructive', title: 'Error', description: 'Title, content, and a selected document are required.' });
      return;
    }
    const newNote: Note = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      source: selectedDoc.name,
      marked: false,
    };
    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddNoteDialog(false);
    toast({ title: 'Note Added', description: 'Your new note has been saved.' });
  };
  
  const handleToggleNoteMark = (id: number) => {
    setNotes(notes.map(note => note.id === id ? { ...note, marked: !note.marked } : note));
  };
  
  const handleGenerateReport = async () => {
    const markedNotes = notes.filter(note => note.marked).map(note => `- ${note.title}: ${note.content}`);
    if (markedNotes.length === 0) {
      toast({ variant: "destructive", title: "No notes selected", description: "Please mark the notes you want to include in the report." });
      return;
    }
    setIsGeneratingReport(true);
    setGeneratedReport('');
    try {
      const result = await generateReport({ notes: markedNotes, reportType: reportType as any });
      setGeneratedReport(result.report);
    } catch (error) {
      console.error('Error generating report:', error);
      toast({ variant: "destructive", title: "Report Generation Failed", description: "Could not generate report. Please try again." });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleDiscussNote = (noteContent: string) => {
    setSelectedNote(null);
    handleSendMessage(undefined, `Based on my note "${noteContent}", can you elaborate further?`);
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
    if (!selectedDoc) return;
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

  const handleMindMapNodeDoubleClick = (topic: string) => {
    setIsMindMapOpen(false);
    handleSendMessage(undefined, `Tell me more about ${topic}.`);
  };

  const handleLanguageToggle = () => {
    if (isArabic) {
      const englishDoc = dldChainDocuments.find(d => d.id === 20); // DLDCHAIN English Vision
      if (englishDoc) setSelectedDoc(englishDoc);
    } else {
      const arabicDoc = dldChainDocuments.find(d => d.id === 19); // DLDCHAIN Arabic Vision
      if (arabicDoc) setSelectedDoc(arabicDoc);
    }
  };

  const [textSize, setTextSize] = useState('text-base');

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
                  onClick={() => handleSelectDocument(doc)}
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
            <Button variant="outline" onClick={() => setIsMindMapOpen(true)}>
              <BrainCircuit className="mr-2" />
              View Mind Map
            </Button>
          </div>
        </header>
        
        <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
          {selectedDoc ? (
             <div className="flex flex-col gap-6">
              <SourceGuide 
                summary={summary}
                isSummarizing={isSummarizing}
                isArabic={isArabic}
                onTopicClick={handleTopicClick}
              />
              <Card className="flex-1 flex flex-col">
                <CardTitleWithBackground>
                  <div>
                    <h3 className="text-lg font-headline font-semibold leading-none tracking-tight">{selectedDoc.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant='outline' size="sm" onClick={handleLanguageToggle}>{isArabic ? 'EN' : 'AR'}</Button>
                    <Button variant={textSize === 'text-sm' ? 'default' : 'outline'} size="sm" onClick={() => setTextSize('text-sm')}>Sm</Button>
                    <Button variant={textSize === 'text-base' ? 'default' : 'outline'} size="sm" onClick={() => setTextSize('text-base')}>Md</Button>
                    <Button variant={textSize === 'text-lg' ? 'default' : 'outline'} size="sm" onClick={() => setTextSize('text-lg')}>Lg</Button>
                  </div>
                </CardTitleWithBackground>
                <CardContent className="p-0">
                    <ScrollArea className="h-[60vh]">
                        <div 
                          dir={isArabic ? 'rtl' : 'ltr'} 
                          className={cn(
                            "p-6 whitespace-pre-wrap leading-relaxed",
                            textSize,
                            isArabic && "font-arabic"
                          )}
                        >
                          {selectedDoc.content}
                        </div>
                    </ScrollArea>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full">
              <FileText className="w-16 h-16 mb-4" />
              <h2 className="text-2xl font-semibold">Select a document to begin</h2>
              <p>Choose a document from the sidebar to view its content and start your review.</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>AI Console</CardTitle>
              <CardDescription>Ask questions about any document or topic.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-4 space-y-4" ref={chatScrollAreaRef}>
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
          
          <Card>
            <CardHeader>
              <CardTitle>Notes &amp; Reports</CardTitle>
              <CardDescription>Create notes from documents and generate AI-powered reports from your findings.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                  <div className="p-4">
                  {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {notes.map(note => (
                        <Card key={note.id} className="cursor-pointer hover:border-primary" onClick={() => setSelectedNote(note)}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base flex items-start justify-between">
                              <span className="truncate flex-1">{note.title}</span>
                              <Checkbox
                                checked={note.marked}
                                onClick={(e) => { e.stopPropagation(); handleToggleNoteMark(note.id); }}
                                className="ml-2"
                              />
                            </CardTitle>
                            <CardDescription className="text-xs truncate">Source: {note.source}</CardDescription>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-8">No notes yet. Select a document and add one to get started!</div>
                  )}

                  {generatedReport && (
                      <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                          <h3 className="font-semibold mb-2">Generated Report</h3>
                          <p className="text-sm whitespace-pre-wrap">{generatedReport}</p>
                      </div>
                  )}
                  </div>
            </CardContent>
              <CardFooter className="border-t p-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <Button onClick={() => setShowAddNoteDialog(true)} className="flex-1 sm:flex-none" disabled={!selectedDoc}><StickyNote className="mr-2"/> Add Note</Button>
                <div className="flex-1" />
                <Select onValueChange={setReportType} defaultValue={reportType}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Report Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="managerial">Managerial</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
                    {isGeneratingReport ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    Generate Report
                </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>Media Center</CardTitle>
                <CardDescription>Generate and listen to AI-powered audio overviews of the documents.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-6 min-h-[200px]">
                <Music4 className="w-16 h-16 text-primary" />
                <p className="text-sm text-muted-foreground">
                    {audioState.element ? "Audio is ready to play." : "Generate an audio summary for the selected document."}
                </p>
                <Button onClick={handleGenerateAudio} size="lg" disabled={isGeneratingAudio || !selectedDoc}>
                    {isGeneratingAudio ? <Loader2 className="animate-spin" /> : audioState.isPlaying ? <PauseCircle /> : <PlayCircle />}
                    <span className="ml-2">{isGeneratingAudio ? 'Generating Audio...' : audioState.isPlaying ? 'Pause Audio' : audioState.element ? 'Play Audio Overview' : 'Generate AI Audio'}</span>
                </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={isMindMapOpen} onOpenChange={setIsMindMapOpen}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Interactive Mind Map</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <InteractiveMindMap onNodeDoubleClick={handleMindMapNodeDoubleClick} />
          </div>
          <DialogFooter className='pt-4'>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      

      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
            <DialogDescription>Create a new note based on document: <span className="font-bold text-primary">{selectedDoc?.name}</span></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Note Title" value={newNoteTitle} onChange={e => setNewNoteTitle(e.target.value)} />
            <Textarea placeholder="Note Content..." value={newNoteContent} onChange={e => setNewNoteContent(e.target.value)} className="min-h-[100px]" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddNoteDialog(false)}>Cancel</Button>
            <Button onClick={handleAddNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {selectedNote && (
        <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedNote.title}</DialogTitle>
              <DialogDescription>Note from: {selectedNote.source}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[50vh] my-4">
              <p className="whitespace-pre-wrap">{selectedNote.content}</p>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedNote(null)}>Close</Button>
              <Button onClick={() => handleDiscussNote(selectedNote.content)}>
                <MessageSquare className="mr-2" /> Discuss with AI
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
