
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIAssistantFeedback() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        variant: 'destructive',
        title: 'Feedback cannot be empty.',
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Feedback submitted:', feedback);
    setIsSubmitting(false);
    setFeedback('');
    setOpen(false);
    toast({
      title: 'Feedback Received!',
      description: "Thank you for helping us improve the AI assistant.",
      action: <ThumbsUp className="h-5 w-5 text-primary" />,
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'relative rounded-full p-2 transition-colors hover:bg-accent'
        )}
        aria-label="Evaluate AI Assistant"
      >
        <Bot className="h-5 w-5 text-primary" />
        <span className="absolute right-0 top-0.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Evaluate AI Assistant</DialogTitle>
              <DialogDescription>
                Your feedback is valuable. How can we improve the AI responses or functionality?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                id="feedback"
                placeholder="Tell us what you think..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px]"
                disabled={isSubmitting}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
