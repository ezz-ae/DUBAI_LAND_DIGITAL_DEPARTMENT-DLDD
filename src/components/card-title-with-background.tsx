
import * as React from "react"
import { cn } from "@/lib/utils"

interface CardTitleWithBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardTitleWithBackground = React.forwardRef<
  HTMLDivElement,
  CardTitleWithBackgroundProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("bg-card p-4 border-b flex items-center justify-between", className)}
    {...props}
  >
    {children}
  </div>
))

CardTitleWithBackground.displayName = "CardTitleWithBackground"
