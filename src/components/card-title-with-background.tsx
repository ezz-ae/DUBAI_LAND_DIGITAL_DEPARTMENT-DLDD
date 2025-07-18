
import * as React from "react"
import { cn } from "@/lib/utils"

interface CardTitleWithBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const CardTitleWithBackground = React.forwardRef<
  HTMLDivElement,
  CardTitleWithBackgroundProps
>(({ className, title, subtitle, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-black p-4", className)}
    {...props}
  >
    {children ? (
      children
    ) : (
      <>
        <h3 className="text-2xl font-headline font-semibold leading-none tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </>
    )}
  </div>
))

CardTitleWithBackground.displayName = "CardTitleWithBackground"

    