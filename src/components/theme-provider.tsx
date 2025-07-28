
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useIsMobile } from "@/hooks/use-mobile"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const defaultTheme = isMobile ? 'dark' : 'system';

  if (!mounted) {
    // Avoids hydration mismatch
    return null;
  }
  
  return <NextThemesProvider {...props} defaultTheme={defaultTheme}>{children}</NextThemesProvider>
}
