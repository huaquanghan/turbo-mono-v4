'use client';

import * as React from 'react';
import { ThemeProvider, TooltipProvider, Toaster } from '@rp/ui';
import { RemoteConfigProvider } from '@rp/remote-config/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={0}>
        <RemoteConfigProvider appId="web">
          {children}
          <Toaster />
        </RemoteConfigProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
