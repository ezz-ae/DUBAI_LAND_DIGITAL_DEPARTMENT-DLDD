
'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, Sparkles, Bot, User, StickyNote, PlayCircle, PauseCircle, Music4 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Note, ReportType } from '@/app/page';

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

interface AiConsoleViewProps {
  messages: any[];
  input: string;
  setInput: (value: string) => void;
  isAnswering: boolean;
  handleSendMessage: (e?: React.FormEvent, message?: string) => void;
  isArabic: boolean;
  notes: Note[];
  handleToggleNoteMark: (id: number) => void;
  setSelectedNote: (note: Note | null) => void;
  generatedReport: string;
  reportType: ReportType;
  setReportType: (type: ReportType) => void;
  isGeneratingReport: boolean;
  handleGenerateReport: () => void;
  setShowAddNoteDialog: (show: boolean) => void;
  activeView: string;
  selectedDoc: any;
  isGeneratingAudio: boolean;
  audioState: { element: HTMLAudioElement | null; isPlaying: boolean };
  handleGenerateAudio: () => void;
}

export function AiConsoleView({
  messages,
  input,
  setInput,
  isAnswering,
  handleSendMessage,
  isArabic,
  notes,
  handleToggleNoteMark,
  setSelectedNote,
  generatedReport,
  reportType,
  setReportType,
  isGeneratingReport,
  handleGenerateReport,
  setShowAddNoteDialog,
  activeView,
  selectedDoc,
  isGeneratingAudio,
  audioState,
  handleGenerateAudio,
}: AiConsoleViewProps) {
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isAnswering]);
  
  return (
    <ScrollArea className="flex-1 bg-ai-console">
      <div className="container mx-auto p-4 md:p-6 grid gap-6 max-w-7xl">
        <Card className="ai-console-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5" /> AI Console</CardTitle>
            <CardDescription>Ask questions about any document or topic.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
              <div className="h-96 overflow-y-auto" ref={chatScrollRef}>
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
                  {messages.length <= 1 && (
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
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Generated Report</h3>
                        <ScrollArea className="max-h-60">
                           <p className="text-sm whitespace-pre-wrap pr-4">{generatedReport}</p>
                        </ScrollArea>
                    </div>
                )}
                </div>
          </CardContent>
            <CardFooter className="border-t p-4 flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <Button onClick={() => setShowAddNoteDialog(true)} className="flex-1 sm:flex-none" disabled={activeView !== 'documentation' || !selectedDoc}><StickyNote className="mr-2 h-4 w-4"/> Add Note</Button>
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

        <Card className="ai-console-card">
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><Music4 className="h-5 w-5" /> Media Center</CardTitle>
              <CardDescription>Generate and listen to AI-powered audio overviews of the documents.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4 text-center p-6 min-h-[200px]">
              <Music4 className="w-16 h-16 text-primary" />
              <p className="text-sm text-muted-foreground">
                  {audioState.element ? "Audio is ready to play." : "Generate an audio summary for the selected document."}
              </p>
              <Button onClick={handleGenerateAudio} size="lg" disabled={isGeneratingAudio || activeView !== 'documentation' || !selectedDoc}>
                  {isGeneratingAudio ? <Loader2 className="animate-spin" /> : audioState.isPlaying ? <PauseCircle /> : <PlayCircle />}
                  <span className="ml-2">{isGeneratingAudio ? 'Generating Audio...' : audioState.isPlaying ? 'Pause Audio' : audioState.element ? 'Play Audio Overview' : 'Generate AI Audio'}</span>
              </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
