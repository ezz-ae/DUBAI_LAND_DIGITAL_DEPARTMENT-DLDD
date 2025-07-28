
'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, Mic2, StickyNote, Mail, PlusCircle } from 'lucide-react';
import type { DLDDoc } from '@/lib/documents';
import { Separator } from '@/components/ui/separator';
import { dldChainDocuments } from '@/lib/documents';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '../ui/checkbox';


interface MediaCenterViewProps {
  selectedDoc: DLDDoc | null;
}
export type Note = { id: number; title: string; content: string; source: string; marked: boolean };
type EmailTopic = 'project-overview' | 'technical-analysis' | 'tokenization-overview' | 'ebram-language';

const defaultNotes: Note[] = [
    {
        id: 1,
        title: 'AI as an "Intelligent Referee"',
        content: "The EBRAM™ AI-Weighted Node System acts as a 'sentient economic layer' and an 'intelligent referee.' It uses AI to assign calibrated 'weights' to real-world and on-chain events (e.g., EBRAMINT™ Date, Owner Verified status, Last Valuation Audit) to dynamically and objectively influence property valuations and DXBTOKEN™ prices. The system can even block 'unlogical' transactions before they are finalized.",
        source: "Technical Docs: EBRAM™",
        marked: true,
    },
    {
        id: 2,
        title: 'Guaranteed Liquidity: "No Liquidity = No Token"',
        content: "The MAKE™ System is DLDCHAIN's sovereign financial layer. Its core principle is 'No liquidity = no token,' meaning every DXBTOKEN™ issued is 100% backed by an equivalent value in AED, confirmed on-chain by a regulated Liquidity Pool Officer (LPO) before the token is ever minted. This eliminates counterparty risk and guarantees market stability.",
        source: "Technical Docs: MAKE™ System",
        marked: false,
    },
    {
        id: 3,
        title: 'Unambiguous Ownership: "Token = True = Owner"',
        content: "This is a fundamental legal and system truth at all stages of the asset lifecycle. It asserts that legal ownership always resides with the entity (wallet address) holding the DXBTOKEN™. There is no hidden claim or external custody that divorces the token from its underlying asset rights. This is cryptographically enforced by the 'Escrowship Doctrine,' where a trading token cannot simultaneously be used for utility (e.g., renting).",
        source: "Technical Docs: DXBTOKENS™",
        marked: false,
    }
];


const emailFormSchema = z.object({
  recipient: z.string().email({ message: 'Please enter a valid email address.' }),
  topic: z.custom<EmailTopic>(),
});

const downloadItems = [
    { title: "DLDCHAIN Project Overview", description: "A high-level summary of the project's vision, goals, and core components.", file: "/report/overview" },
    { title: "DLDCHAIN Technical Analysis", description: "A comprehensive overview of the technical architecture, core components, and security protocols.", file: "/report/technical" },
]

export function MediaCenterView({ selectedDoc }: MediaCenterViewProps) {
  const { toast } = useToast();
  const interviewUrl = "https://firebasestorage.googleapis.com/v0/b/dldchain.firebasestorage.app/o/DLDCHAIN%20AUDIO%20OVERVIEW.wav?alt=media&token=19d7c6c6-7af3-4a97-b69d-b9749bcd4d40";

  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
      resolver: zodResolver(emailFormSchema),
      defaultValues: {
          recipient: 'future@dubai.ae',
          topic: 'project-overview',
      }
  });

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      toast({ variant: 'destructive', title: 'Error', description: 'Title and content are required.' });
      return;
    }
    const newNote: Note = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      source: "Manual Note",
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

  const handleSendEmail = (values: z.infer<typeof emailFormSchema>) => {
      let subject = "Information about the DLDCHAIN Project";
      let body = "Here is the information you requested about the DLDCHAIN project:\n\n";

      const topics: Record<EmailTopic, {title: string, contentDocId: number | null }> = {
          'project-overview': { title: "Project Overview", contentDocId: 1 },
          'technical-analysis': { title: "Technical Analysis", contentDocId: 2 },
          'tokenization-overview': { title: "Tokenization Overview", contentDocId: 1 }, // Fallback to overview
          'ebram-language': { title: "EBRAM Language Overview", contentDocId: 1 }, // Fallback to overview
      };

      const selectedTopic = topics[values.topic];
      subject = `DLDCHAIN: ${selectedTopic.title}`;

      if (selectedTopic.contentDocId) {
          const doc = dldChainDocuments.find(d => d.id === selectedTopic.contentDocId);
          // A simple conversion to plain text. More sophisticated parsing could be added.
          const plainTextContent = doc?.content.replace(/<[^>]*>/g, '\n').replace(/\n\n+/g, '\n\n').trim();
          body += `${selectedTopic.title}\n\n${plainTextContent}`;
      }

      const mailtoLink = `mailto:${values.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
      toast({ title: "Email Client Opened", description: "Your email client has been opened with the pre-filled information." });
  };

  return (
    <div className="flex-1 p-6 bg-background/50">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 flex flex-col gap-6">
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
                                                <SelectItem value="technical-analysis">Technical Analysis</SelectItem>
                                                <SelectItem value="tokenization-overview">Tokenization Overview</SelectItem>
                                                <SelectItem value="ebram-language">EBRAM Language</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="ai-console-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><StickyNote className="h-5 w-5" /> Notes</CardTitle>
                <CardDescription>Create notes from documents to generate your own reports and summaries.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                    <div className="p-4">
                    <ScrollArea className="h-72">
                      {notes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-4">
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
                                <p className="text-sm text-muted-foreground line-clamp-3 break-words">{note.content}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-8">No notes yet. Click "Add Note" to get started.</div>
                      )}
                    </ScrollArea>
                    </div>
              </CardContent>
                <CardFooter className="border-t p-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                  <Button onClick={() => setShowAddNoteDialog(true)} className="flex-1 sm:flex-none"><PlusCircle className="mr-2 h-4 w-4"/> Add Note</Button>
              </CardFooter>
            </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="ai-console-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mic2 className="h-5 w-5" /> Featured Interview</CardTitle>
                <CardDescription>Listen to the official DLDCHAIN project interview.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-6">
                <Mic2 className="w-10 h-10 text-primary mb-2" />
                <p className="text-muted-foreground text-sm">
                    Hear directly from the visionaries behind the project.
                </p>
                <audio controls className="w-full">
                  <source src={interviewUrl} type="audio/wav" />
                  Your browser does not support the audio element. Please use the download link.
                </audio>
                 <Button asChild variant="outline" size="sm" className="mt-2">
                  <a href={interviewUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download Interview
                  </a>
                </Button>
            </CardContent>
          </Card>


          <Card className="ai-console-card">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Download className="h-5 w-5" /> Download Center</CardTitle>
                  <CardDescription>Access key project documents and reports.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                  <ul className="space-y-3">
                      {downloadItems.map((item, index) => (
                          <React.Fragment key={item.title}>
                              <li className="flex items-start justify-between p-2 rounded-lg hover:bg-muted/50 gap-2">
                                  <div className="flex-1">
                                      <h4 className="font-semibold">{item.title}</h4>
                                      <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                  <Button asChild variant="outline" size="sm" className="shrink-0">
                                      <a href={item.file} target="_blank" rel="noopener noreferrer">
                                          <Download className="h-4 w-4 mr-2" />
                                          View & Print
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

      <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
             <DialogDescription>
              Enter a title and content for your note.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Note Title" value={newNoteTitle} onChange={e => setNewNoteTitle(e.target.value)} />
            <Textarea placeholder="Note Content..." value={newNoteContent} onChange={e => setNewNoteContent(e.target.value)} className="min-h-[150px]" />
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
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
