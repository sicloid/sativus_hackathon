import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "neutral";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  
  const variants = {
    default: "bg-[#c4b5fd] text-black", // Purple
    success: "bg-[#bbf7d0] text-black", // Green
    warning: "bg-[#fef08a] text-black", // Yellow
    danger: "bg-[#fecaca] text-black",  // Red
    neutral: "bg-white text-black",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border-2 border-black px-3 py-1 text-xs font-black uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
