
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Sparkles, Bot, User, StickyNote, MessageSquare, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dldChainDocuments } from '@/lib/documents';
import { useToast } from '@/hooks/use-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


import type { ActiveView } from '@/app/page';
import type { DLDDoc } from '@/lib/documents';
import { chatWithDocumentFlow } from '@/ai/flows/chat-flow';
import { generateReportFlow } from '@/ai/flows/report-flow';


export type Note = { id: number; title: string; content: string; source: string; marked: boolean };
export type ReportType = 'technical' | 'managerial' | 'legal' | 'financial';
type EmailTopic = 'project-overview' | 'technical-overview' | 'tokenization-overview' | 'ebram-language' | 'custom';

const emailFormSchema = z.object({
  recipient: z.string().email({ message: 'Please enter a valid email address.' }),
  topic: z.custom<EmailTopic>(),
  customTopic: z.string().optional(),
}).refine(data => {
    if (data.topic === 'custom') {
        return data.customTopic && data.customTopic.trim() !== '';
    }
    return true;
}, {
    message: "Custom topic cannot be empty.",
    path: ["customTopic"],
});


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

const initialMessages = [
  { from: 'bot', text: "Welcome to the DLDCHAIN Project Pilot. This is a sovereign, government-led blockchain ecosystem developed to serve as the digital side of the Dubai Land Department (DLD) to revolutionize real estate governance. This system utilizes DXBTOKENS for property ownership, the DLD Digital Dirham as its exclusive fiat-pegged currency, and EBRAM for automating various smart contracts, including rentals and sales, with AI integration (EBRAMGPT) for legal interpretation and dispute resolution. Please select a document from the sidebar to begin your review or ask me a question." },
];


interface AiConsoleViewProps {
  selectedDoc: DLDDoc | null;
  initialTopicToExplain?: string | null;
  initialTopicToDiscuss?: string | null;
  onViewChange: (view: ActiveView) => void;
}

export function AiConsoleView({
  selectedDoc,
  initialTopicToExplain,
  initialTopicToDiscuss,
  onViewChange
}: AiConsoleViewProps) {
  const { toast } = useToast();
  const chatScrollRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState('');
  const [reportType, setReportType] = useState<ReportType>('technical');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const isArabic = selectedDoc?.lang === 'ar';
  
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
      resolver: zodResolver(emailFormSchema),
      defaultValues: {
          recipient: '',
          topic: 'project-overview',
          customTopic: '',
      }
  });
  const watchedTopic = emailForm.watch('topic');


  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isAnswering]);

  const handleSendMessage = async (e?: React.FormEvent, message?: string) => {
    if(e) e.preventDefault();
    const currentMessage = message || input;
    if (!currentMessage.trim() || isAnswering ) return;

    const newMessages = [...messages, { from: 'user', text: currentMessage }];
    setMessages(newMessages);
    setInput('');
    setIsAnswering(true);

    try {
      const docForAi = dldChainDocuments.find(d => d.id === 19);
      if (!docForAi) {
        throw new Error("AI context document not found.");
      }

      const result = await chatWithDocumentFlow({
        question: currentMessage,
        documentContent: docForAi.content,
        isArabic: isArabic,
      });

      setMessages([...newMessages, { from: 'bot', text: result.answer, isArabic: isArabic }]);
    } catch (error) {
      console.error('Error asking question:', error);
      const errorMessage = 'Sorry, I encountered an error. Please try again.';
      setMessages([...newMessages, { from: 'bot', text: errorMessage, isArabic: false }]);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an answer. Please try again.",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  const handleExplainTopic = async (topic: string) => {
    toast({ title: `Explaining: ${topic}`, description: "The AI is preparing an explanation..."});
    const prompt = `Explain this topic for me in detail: ${topic}`;
    const newMessages = [...messages, { from: 'user', text: prompt }];
    setMessages(newMessages);
    setIsAnswering(true);
    
    try {
      const docForAi = dldChainDocuments.find(d => d.id === 19);
       if (!docForAi) {
        throw new Error("AI context document not found.");
      }
      
      const result = await chatWithDocumentFlow({
        question: prompt,
        documentContent: docForAi.content,
        isArabic: isArabic,
      });

      setMessages([...newMessages, { from: 'bot', text: result.answer, isArabic: isArabic }]);
    } catch (error) {
      console.error('Error explaining topic:', error);
      const errorMessage = 'Sorry, I encountered an error explaining that topic. Please try again.';
      setMessages([...newMessages, { from: 'bot', text: errorMessage, isArabic: false }]);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get an explanation. Please try again.",
      });
    } finally {
      setIsAnswering(false);
    }
  };

  useEffect(() => {
    if (initialTopicToExplain) {
      handleExplainTopic(initialTopicToExplain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopicToExplain]);

  useEffect(() => {
    if (initialTopicToDiscuss) {
      handleSendMessage(undefined, `Tell me more about ${initialTopicToDiscuss}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTopicToDiscuss]);


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
    const markedNotesContent = notes.filter(note => note.marked).map(note => `- ${note.title}: ${note.content}`);
    if (markedNotesContent.length === 0) {
      toast({ variant: "destructive", title: "No notes selected", description: "Please mark the notes you want to include in the report." });
      return;
    }
    setIsGeneratingReport(true);
    setGeneratedReport('');
    try {
        const result = await generateReportFlow({
            notes: markedNotesContent,
            reportType: reportType,
        });
       setGeneratedReport(result.report);
       toast({ title: "Report Generated", description: "Your AI-powered report is ready."});
    } catch (error) {
      console.error('Error generating report:', error);
      toast({ variant: "destructive", title: "Report Generation Failed", description: "Could not generate report. Please try again." });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleDiscussNote = (noteContent: string) => {
    setSelectedNote(null);
    const prompt = `Based on my note "${noteContent}", can you elaborate further?`;
    handleSendMessage(undefined, prompt);
  };

  const handleEmailReport = () => {
    if (!generatedReport) return;
    const subject = `DLDCHAIN Report: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`;
    const body = encodeURIComponent(`Here is the generated ${reportType} report:\n\n${generatedReport}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

    const handleSendEmail = (values: z.infer<typeof emailFormSchema>) => {
        let subject = "Information about the DLDCHAIN Project";
        let body = "Here is the information you requested about the DLDCHAIN project:\n\n";

        const topics: Record<EmailTopic, {title: string, contentDocId: number | null }> = {
            'project-overview': { title: "Project Overview", contentDocId: 1 },
            'technical-overview': { title: "Technical Overview", contentDocId: 19 },
            'tokenization-overview': { title: "Tokenization Overview", contentDocId: 8 },
            'ebram-language': { title: "EBRAM Language Overview", contentDocId: 4 },
            'custom': { title: `Custom Topic: ${values.customTopic}`, contentDocId: null }
        };

        const selectedTopic = topics[values.topic];
        subject = `DLDCHAIN: ${selectedTopic.title}`;

        if (selectedTopic.contentDocId) {
            const doc = dldChainDocuments.find(d => d.id === selectedTopic.contentDocId);
            const plainTextContent = doc?.content.replace(/<[^>]*>/g, '\n').replace(/\n\n+/g, '\n\n');
            body += `${selectedTopic.title}\n\n${plainTextContent}`;
        } else if (values.topic === 'custom' && values.customTopic) {
            body += `Please provide information on the following topic:\n\n${values.customTopic}`;
        }

        const mailtoLink = `mailto:${values.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        toast({ title: "Email Client Opened", description: "Your email client has been opened with the pre-filled information." });
    };

  
  const isChatEmpty = messages.length <= 1;
  
  return (
    <div className="flex-1 overflow-hidden">
    <ScrollArea className="h-full bg-background/50">
      <div className="container mx-auto p-6 grid gap-6 max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Card className="ai-console-card xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" /> AI Console</CardTitle>
              <CardDescription>Ask questions about any document or topic.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-96" ref={chatScrollRef}>
                  <div className="p-4 space-y-4">
                  {messages.map((msg: any, index) => (
                    <div key={index} className={cn("flex items-start gap-3 w-full", msg.from === 'user' ? "justify-end" : "justify-start")}>
                      {msg.from === 'bot' && (
                        <Avatar className="w-8 h-8 shrink-0 border">
                          <AvatarFallback className="bg-transparent"><Bot className="w-5 h-5 text-primary"/></AvatarFallback>
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
                        <Avatar className="w-8 h-8 shrink-0 border">
                            <AvatarFallback className="bg-transparent"><User className="w-5 h-5"/></AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                    {isChatEmpty && (
                      <div className="pt-4">
                        <p className="text-sm text-center text-muted-foreground mb-4">Or try one of these prompts:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {(isArabic ? quickPromptsArabic : quickPromptsEnglish).map((prompt) => (
                              <Button key={prompt} variant="outline" size="sm" onClick={(e) => handleSendMessage(e, prompt)} className={cn("w-full justify-start text-left h-auto py-2", isArabic && "justify-end text-right font-arabic")}>
                                {prompt}
                              </Button>
                            ))}
                        </div>
                      </div>
                    )}
                  {isAnswering && (
                      <div className="flex items-start gap-3 justify-start">
                        <Avatar className="w-8 h-8 border">
                          <AvatarFallback className="bg-transparent"><Bot className="w-5 h-5 text-primary"/></AvatarFallback>
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
                <Button type="submit" size="icon" disabled={isAnswering || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
           <Card className="ai-console-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Email Center</CardTitle>
                <CardDescription>Share project information via email.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(handleSendEmail)} className="space-y-4">
                        <FormField
                            control={emailForm.control}
                            name="recipient"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="visitor@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={emailForm.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Information Topic</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a topic" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="project-overview">Project Overview</SelectItem>
                                            <SelectItem value="technical-overview">Technical Overview</SelectItem>
                                            <SelectItem value="tokenization-overview">Tokenization Overview</SelectItem>
                                            <SelectItem value="ebram-language">EBRAM Language</SelectItem>
                                            <SelectItem value="custom">Custom Topic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {watchedTopic === 'custom' && (
                            <FormField
                                control={emailForm.control}
                                name="customTopic"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Custom Topic</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., How does Mashroi work?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button type="submit" className="w-full">
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                        </Button>
                    </form>
                </Form>
            </CardContent>
          </Card>
        </div>
        
        <Card className="ai-console-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><StickyNote className="h-5 w-5" /> Notes &amp; Reports</CardTitle>
            <CardDescription>Create notes from documents and generate AI-powered reports from your findings.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
                <div className="p-4">
                <ScrollArea className="h-72">
                  {notes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-4">
                      {notes.map(note => (
                        <Card key={note.id} className="cursor-pointer hover:border-primary bg-card/50 transition-colors" onClick={() => setSelectedNote(note)}>
                          <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                            <div>
                              <CardTitle className="text-base truncate">{note.title}</CardTitle>
                              <CardDescription className="text-xs truncate pt-1">Source: {note.source}</CardDescription>
                            </div>
                            <Checkbox
                                checked={note.marked}
                                onClick={(e) => { e.stopPropagation(); handleToggleNoteMark(note.id); }}
                                className="ml-2"
                              />
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
                </ScrollArea>

                {generatedReport && (
                    <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Generated Report</h3>
                           <Button variant="outline" size="sm" onClick={handleEmailReport}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Report
                            </Button>
                        </div>
                        <ScrollArea className="max-h-60">
                           <div className="text-sm whitespace-pre-wrap pr-4 prose prose-sm dark:prose-invert max-w-none">{generatedReport}</div>
                        </ScrollArea>
                    </div>
                )}
                </div>
          </CardContent>
            <CardFooter className="border-t p-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <Button onClick={() => setShowAddNoteDialog(true)} className="flex-1 sm:flex-none" disabled={!selectedDoc}><StickyNote className="mr-2 h-4 w-4"/> Add Note</Button>
              <div className="flex-1" />
              <Select onValueChange={(v) => setReportType(v as ReportType)} defaultValue={reportType}>
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
              <Button onClick={handleGenerateReport} disabled={isGeneratingReport || notes.filter(n => n.marked).length === 0}>
                  {isGeneratingReport ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generate Report
              </Button>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>

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
                <MessageSquare className="mr-2 h-4 w-4" /> Discuss with AI
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
