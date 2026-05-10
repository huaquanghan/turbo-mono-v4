"use client"

import { ThemeProvider, Toaster, TooltipProvider } from "@rp/ui"
import * as React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider>
			<TooltipProvider delayDuration={0}>
				{children}
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>
	)
}
