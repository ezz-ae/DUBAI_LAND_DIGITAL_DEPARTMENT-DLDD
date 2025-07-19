
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
import { Star, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIAssistantFeedback() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: 'destructive',
        title: 'Please select a rating.',
      });
      return;
    }
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Feedback submitted:', { rating, feedback });
    setIsSubmitting(false);
    setFeedback('');
    setRating(0);
    setOpen(false);
    toast({
      title: 'Feedback Received!',
      description: "Thank you for sharing your opinion on the project.",
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
        aria-label="Evaluate Project"
      >
        <Star className="h-5 w-5 text-primary" />
        <span className="absolute right-0 top-0.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Project Evaluation</DialogTitle>
              <DialogDescription>
                Share your opinion on the DLDCHAIN project. Your feedback is valuable for its future development.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-8 w-8 cursor-pointer transition-colors",
                        rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                      )}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <Textarea
                id="feedback"
                placeholder="Add any comments or suggestions... (optional)"
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
