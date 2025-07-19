
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MessageSquare } from 'lucide-react';

import { askQuestion } from '@/ai/flows/ask-question';
import { generateAudio } from '@/ai/flows/audio-overview';
import { generateReport } from '@/ai/flows/notes';
import { explainTopic } from '@/ai/flows/explain-topic';

import { useToast } from '@/hooks/use-toast';
import { dldChainDocuments } from '@/lib/documents';

import { AppHeader } from '@/components/views/Header';
import { DocumentationView } from '@/components/views/DocumentationView';
import { TechnicalDocsView } from '@/components/views/TechnicalDocsView';
import { MindmapView } from '@/components/views/MindmapView';
import { AiConsoleView } from '@/components/views/AiConsoleView';
import { ProjectValidationView } from '@/components/views/ProjectValidationView';
import { MediaCenterView } from '@/components/views/MediaCenterView';


const initialMessages = [
  { from: 'bot', text: "Welcome to the DLDCHAIN Project Pilot. This is a sovereign, government-led blockchain ecosystem developed to serve as the digital side of the Dubai Land Department (DLD) to revolutionize real estate governance. This system utilizes DXBTOKENS for property ownership, the DLD Digital Dirham as its exclusive fiat-pegged currency, and EBRAM for automating various smart contracts, including rentals and sales, with AI integration (EBRAMGPT) for legal interpretation and dispute resolution. Please select a document from the sidebar to begin your review or ask me a question." },
];

export type Note = { id: number; title: string; content: string; source: string; marked: boolean };
export type ReportType = 'technical' | 'managerial' | 'legal' | 'financial';
export type DLDDoc = typeof dldChainDocuments[0];
export type ActiveView = 'documentation' | 'mindmap' | 'ai-console' | 'tech-docs' | 'project-validation' | 'media-center';

export default function Home() {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<ActiveView>('documentation');
  
  const [selectedDoc, setSelectedDoc] = useState<DLDDoc | null>(null);
  
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioState, setAudioState] = useState<{ element: HTMLAudioElement | null; isPlaying: boolean }>({ element: null, isPlaying: false });
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [generatedReport, setGeneratedReport] = useState('');
  const [reportType, setReportType] = useState<ReportType>('technical');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const isArabic = selectedDoc?.name.includes('Arabic') || selectedDoc?.name.includes('الرؤية');

  useEffect(() => {
    if (dldChainDocuments.length > 0) {
      const defaultDoc = dldChainDocuments.find(d => d.id === 1) || dldChainDocuments[0];
      setSelectedDoc(defaultDoc);
    }
  }, []);
  
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
    setActiveView('ai-console');
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
    setActiveView('ai-console');
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
    setActiveView('ai-console');
    handleSendMessage(undefined, `Tell me more about ${topic}.`);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'documentation':
        return <DocumentationView selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} onTopicClick={handleTopicClick} toast={toast} />;
      case 'tech-docs':
        return <TechnicalDocsView />;
      case 'mindmap':
        return <MindmapView onNodeDoubleClick={handleMindMapNodeDoubleClick} />;
      case 'ai-console':
        return (
          <AiConsoleView
            messages={messages}
            input={input}
            setInput={setInput}
            isAnswering={isAnswering}
            handleSendMessage={handleSendMessage}
            isArabic={isArabic}
            notes={notes}
            handleToggleNoteMark={handleToggleNoteMark}
            setSelectedNote={setSelectedNote}
            generatedReport={generatedReport}
            reportType={reportType}
            setReportType={setReportType}
            isGeneratingReport={isGeneratingReport}
            handleGenerateReport={handleGenerateReport}
            setShowAddNoteDialog={setShowAddNoteDialog}
            activeView={activeView}
            selectedDoc={selectedDoc}
            isGeneratingAudio={isGeneratingAudio}
            audioState={audioState}
            handleGenerateAudio={handleGenerateAudio}
          />
        );
      case 'project-validation':
        return <ProjectValidationView />;
      case 'media-center':
        return <MediaCenterView />;
      default:
        return null;
    }
  }

  return (
    <SidebarProvider>
      <div className="w-full bg-background text-foreground flex flex-col flex-1">
        <AppHeader activeView={activeView} setActiveView={setActiveView} />
        <div className="flex flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
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
    </SidebarProvider>
  )
}
