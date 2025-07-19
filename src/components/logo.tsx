
import { useSidebar } from './ui/sidebar';

export function ProjectPilotLogo() {
  const { state } = useSidebar();
  return (
    <div className="flex items-center gap-2" aria-label="DLDCHAIN Logo">
      <div className="text-foreground">
        <svg
          role="img"
          aria-label="DLDCHAIN Logo"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
        >
          <path d="M11.111 5.333H8.889V3.111h2.222V5.333zM18.889 12c0-4.911-3.978-8.889-8.889-8.889H4.444v17.778h5.556C14.911 20.889 18.889 16.911 18.889 12zM8.889 18.667V7.556h1.111c3.556 0 6.445 2.889 6.445 6.444 0 3.556-2.889 6.445-6.445 6.445H8.889v-1.778z"/>
        </svg>
      </div>
      {state === 'expanded' && (
        <div className="flex items-baseline gap-1.5">
           <h1 className="text-sm font-headline font-bold text-foreground">DLDCHAIN</h1>
           <span className="text-xs text-muted-foreground font-headline">PROTOCOL</span>
        </div>
      )}
    </div>
  );
}
