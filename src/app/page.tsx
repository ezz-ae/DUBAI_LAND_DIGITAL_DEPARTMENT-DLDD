'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
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
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, Loader2, PlayCircle, Send, Share2, Sparkles, Upload, Bot, User } from 'lucide-react';
import { ProjectPilotLogo } from '@/components/logo';
import Image from 'next/image';
import { summarizeDocument } from '@/ai/flows/summarize-document';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const mockDocuments = [
  {
    id: 1,
    name: 'Project Proposal.docx',
    content: `
Project: "NextGen CRM Platform"

Introduction:
This document outlines the proposal for the development of a Next-Generation Customer Relationship Management (CRM) platform. The platform aims to revolutionize how businesses interact with their customers by leveraging AI-driven insights, a highly intuitive user interface, and seamless integration capabilities.

Problem Statement:
Current CRM solutions are often cumbersome, expensive, and lack the intelligence needed to provide proactive customer engagement strategies. Businesses struggle with fragmented data, inefficient workflows, and a lack of actionable insights, leading to missed opportunities and decreased customer satisfaction.

Proposed Solution:
Our NextGen CRM platform will offer a unified, cloud-native solution with the following key features:
1.  **AI-Powered Insights:** Predictive analytics to forecast sales trends, identify at-risk customers, and recommend next-best actions.
2.  **360-Degree Customer View:** A single, comprehensive profile for each customer, aggregating data from all touchpoints.
3.  **Intuitive User Experience:** A clean, minimalist interface designed for rapid user adoption and efficiency.
4.  **Seamless Integrations:** An open API and pre-built connectors for popular business tools (e.g., email, marketing automation, e-commerce).
5.  **Mobile-First Design:** Full functionality on both desktop and mobile devices, ensuring productivity on the go.

Target Audience:
Small to medium-sized enterprises (SMEs) across various industries, including technology, retail, and professional services, that require a powerful yet affordable CRM solution.

Conclusion:
The NextGen CRM platform is poised to disrupt the market by offering a smarter, more user-friendly, and cost-effective alternative to existing solutions. We are confident that this project will deliver significant value to our customers and drive business growth.
`,
  },
  {
    id: 2,
    name: 'Market Research.pdf',
    content: 'This is the content for Market Research.pdf. It contains detailed analysis of the competitive landscape, target market demographics, and industry trends. The research indicates a strong demand for AI-driven features and mobile accessibility in CRM platforms. Key competitors are Salesforce, HubSpot, and Zoho, but there is a significant gap for a more intuitive and affordable solution for SMEs.',
  },
  {
    id: 3,
    name: 'Technical Spec.docx',
    content: 'This is the content for Technical Spec.docx. The platform will be built on a microservices architecture using Node.js for the backend and React for the frontend. It will be hosted on AWS, leveraging services like Lambda, S3, and DynamoDB for scalability and reliability. The AI module will use Python with TensorFlow and scikit-learn. Security will be a top priority, with end-to-end encryption and compliance with GDPR and CCPA standards.',
  },
];

const initialMessages = [
  { from: 'bot', text: 'Hello! How can I help you with this project?' },
];

export default function Home() {
  const { toast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState(mockDocuments[0]);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummary('');
    try {
      const result = await summarizeDocument({ documentText: selectedDoc.content });
      setSummary(result.summary);
      toast({
        title: "Summary Generated",
        description: "The document has been successfully summarized.",
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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      setMessages([...newMessages, { from: 'bot', text: 'Thank you for your question. As an AI assistant, I can provide information based on the loaded documents. How can I elaborate on the project details for you?' }]);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background font-body text-foreground">
        <Sidebar className="hidden lg:flex flex-col w-[280px] border-r bg-card/50">
          <SidebarHeader className="p-4 border-b">
            <ProjectPilotLogo />
          </SidebarHeader>
          <SidebarContent className="flex-1 p-2">
            <SidebarMenu>
              <SidebarGroupLabel className="px-2">Project Documents</SidebarGroupLabel>
              {mockDocuments.map((doc) => (
                <SidebarMenuItem key={doc.id}>
                  <SidebarMenuButton
                    onClick={() => setSelectedDoc(doc)}
                    isActive={selectedDoc.id === doc.id}
                    className="justify-start w-full"
                  >
                    <FileText />
                    <span className="truncate">{doc.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarHeader className="p-4 border-t">
            <Button variant="outline" className="w-full">
              <Upload />
              Upload Document
            </Button>
          </SidebarHeader>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="flex items-center justify-between p-4 border-b h-16">
            <div className="lg:hidden">
              <ProjectPilotLogo />
            </div>
            <h2 className="hidden lg:block font-headline text-2xl font-bold">{selectedDoc.name}</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Share2 />
                Share
              </Button>
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6 items-start">
              <div className="xl:col-span-2 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Audio Overview</CardTitle>
                      <CardDescription>Listen to a quick summary.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-6">
                      <Button size="lg" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                        <PlayCircle className={cn("h-16 w-16 text-primary transition-transform", isPlaying && "scale-110")} />
                      </Button>
                    </CardContent>
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
                          <p className="text-sm">{summary || 'Click below to generate a summary.'}</p>
                        </ScrollArea>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSummarize} disabled={isSummarizing} className="w-full">
                        <Sparkles />
                        {isSummarizing ? 'Summarizing...' : 'Summarize Document'}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>File Viewer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96 rounded-md border p-4">
                      <p className="whitespace-pre-wrap text-sm">{selectedDoc.content}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Mind Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="https://placehold.co/800x450"
                      alt="Project Mind Map"
                      width={800}
                      height={450}
                      className="rounded-lg object-cover w-full"
                      data-ai-hint="mind map diagram"
                    />
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
                    {messages.map((msg, index) => (
                      <div key={index} className={cn("flex items-start gap-3", msg.from === 'user' ? "justify-end" : "justify-start")}>
                        {msg.from === 'bot' && (
                          <Avatar className="w-8 h-8">
                            <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          "max-w-xs rounded-lg px-4 py-2 text-sm",
                          msg.from === 'user' ? "bg-primary text-primary-foreground" : "bg-muted"
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
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your question..."
                      autoComplete="off"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
