import { Send } from 'lucide-react';
import { useSidebar } from './ui/sidebar';

export function ProjectPilotLogo() {
  const { state } = useSidebar();
  return (
    <div className="flex items-center gap-2" aria-label="ProjectPilot Logo">
      <div className="bg-primary p-2 rounded-lg">
        <Send className="h-5 w-5 text-primary-foreground" />
      </div>
      {state === 'expanded' && (
        <h1 className="text-lg font-headline font-bold text-foreground">ProjectPilot</h1>
      )}
    </div>
  );
}
