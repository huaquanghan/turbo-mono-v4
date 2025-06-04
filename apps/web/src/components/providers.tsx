'use client';

import * as React from 'react';
import { ThemeProvider, TooltipProvider, Toaster } from '@rp/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={0}>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}
