'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children, ...props }: {
  children: React.ReactNode
} & React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
