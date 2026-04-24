import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "danger" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    
    const variants = {
      default: "bg-[#bfdbfe] hover:bg-[#93c5fd] text-black", // Blue
      secondary: "bg-[#fef08a] hover:bg-[#fde047] text-black", // Yellow
      danger: "bg-[#fecaca] hover:bg-[#fca5a5] text-black", // Red
      outline: "bg-white hover:bg-zinc-100 text-black",
    };

    const sizes = {
      default: "h-12 px-6 py-2 text-base",
      sm: "h-9 px-4 text-sm",
      lg: "h-14 px-8 text-lg uppercase tracking-wider",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-black rounded-xl border-4 border-black",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
          "hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          "active:translate-y-1 active:translate-x-1 active:shadow-none",
          "disabled:opacity-50 disabled:pointer-events-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
