import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';

import { cn } from "../lib/utils";

// Variantes de clase para el componente Label
const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

// Componente Label utilizando Radix UI y CVA para clases condicionales
const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)} // Aplica las variantes y las clases adicionales
    {...props}
  />
));

// Asigna un nombre al componente para depuración
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
