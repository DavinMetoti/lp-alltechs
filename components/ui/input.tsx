import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2 text-sm text-zinc-900 shadow-xs transition-all duration-200 placeholder:text-zinc-400 focus-visible:border-orange-500 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm text-zinc-900 shadow-xs transition-all duration-200 placeholder:text-zinc-400 focus-visible:border-orange-500 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none",
        className
      )}
      {...props}
    />
  )
}

export { Input, Textarea }
