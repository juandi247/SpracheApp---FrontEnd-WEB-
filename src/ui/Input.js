import React from "react";

import { cn } from "../lib/utils"; // Asegúrate de tener esta utilidad disponible

export function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

// Exportando con `forwardRef` para compatibilidad
export default React.forwardRef(Input);
