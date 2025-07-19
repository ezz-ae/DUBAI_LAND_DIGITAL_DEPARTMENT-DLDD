import { Send } from 'lucide-react';
import { useSidebar } from './ui/sidebar';

export function ProjectPilotLogo() {
  const { state } = useSidebar();
  return (
    <div className="flex items-center gap-2" aria-label="DLDCHAIN Protocol Logo">
      <div className="bg-primary p-2 rounded-lg">
        <Send className="h-5 w-5 text-primary-foreground" />
      </div>
      {state === 'expanded' && (
        <div className="flex flex-col">
           <h1 className="text-sm font-headline font-bold text-foreground leading-tight">DLDCHAIN</h1>
        </div>
      )}
    </div>
  );
}

    