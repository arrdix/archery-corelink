'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface ProviderProps {
    children: ReactNode
}

const queryClient = new QueryClient()

export function Providers({ children }: ProviderProps): JSX.Element {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
